+++
date = 2025-01-22
title = "Azure Blob Storage: Strategic Configurations for Cost Savings and Speed"
description = "The complexities of balancing performance and cost when uploading data to Azure Blob Storage are explored, with a focus on StorageTransferOptions configurations. Practical insights, real-world examples, and detailed explanations help users optimize their data transfer processes."

[extra]
promo_image = "promo-azure-blob-storage-strategic-configurations-cost-savings-speed.png"

[taxonomies]
tags = ["Cloud", "Azure Blob Storage"]
+++

We all know the saying "storage is cheap" and by all accounts -- yes. **Storing** the data is quite inexepensive, and ingress data is free. However, you are charged for the operations. And that is the rub. You must be very careful trying to balance performance and cost --especially at scale-- because operations add up.

While we were building My DJ Cloud (a SaaS cloud storage offering) one of the initial, obvious concerns was simply the cost of storage. We've learned a lot over the years, and I'll share some of the findings here using some semi-real world examples below.

For the sake of this article we can assume we are uploading block blobs using the C# SDK as follows:

```c#
Stream stream = __some data__;
BlobClient blobClient = blobContainerClient.GetBlobClient(blobName);
BlobUploadOptions options = new BlobUploadOptions() { 
    TransferOptions = __StorageTransferOptions__
};
_ = await blobClient.UploadAsync(stream, options);
```

So what happens when you call `UploadAsync(stream, option)`?

To answer that question it helps to know a few things.

1. What are "operations"
2. How many bytes are in the stream
3. How is `StorageTransferOptions` configured

## Understanding Upload Operations and the Azure Storage REST API

There are three operations we will look at for standard block blob uploads.

### [Put Blob](https://learn.microsoft.com/en-us/rest/api/storageservices/put-blob?tabs=microsoft-entra-id)

Simply put -- you can upload a blob in "One-shot" meaning that the entire blob is uploaded in a single API call, `Put Blob`. There are [limitations](https://learn.microsoft.com/en-us/rest/api/storageservices/put-blob#remarks) (which change every few years) and at this time you can upload up to 5,000 MiB in "one-shot."

### [Put Block](https://learn.microsoft.com/en-us/rest/api/storageservices/put-block?tabs=microsoft-entra-id) and [Put Block List](https://learn.microsoft.com/en-us/rest/api/storageservices/put-block-list?tabs=microsoft-entra-id) 

If you need to upload more than 5,000 MiB, or you want to upload the blob in concurrent sub-transfers, then you need to use `Put Block` + `Put Block List`.

![](azure-storage-put-block.png)

In this scenario you can create and upload chunks, or blocks, of the file with _n_ calls to `Put Block`. When all blocks are uploaded, then you must trigger the writing of the blob with a call to `Put Block List`.

## C# SDK and `StorageTransferOptions`

Now that we have a basic understanding of the underlying storage apis we can focus our attention back to the C# SDK. The `StorageTransferOptions` configuration can significantly impact both the speed and cost of the operation. Properly tuning these settings can optimize performance and reduce expenses, but it requires careful consideration and testing.

- **MaximumConcurrency**: The maximum number of subtransfers that may be used in parallel.
- **MaximumTransferSize**: The maximum length of a transfer in bytes.
- **InitialTransferSize**: "Defines a separate data size limitation for an initial attempt to do the entire operation at once with no subtransfers."

There is typically some confusion on the `InitialTransferSize`! If the file you are trying to upload is less than this value, then the entire file will be uploaded in "one-shot." If your file exceeds this amount, your file will be broken down into chunks/blocks that are `MaximumTransferSize` in size (and `InitialTransferSize` is ignored entirely).

> [!TIP]
> Number of Operations = 
>    FileSize < InitialTransferSize ? 1 : (Ceiling(FileSize / MaximumTransferSize) + 1)

### Default `StorageTransferOptions` (for Block Blobs)

So if we don't provide a `StorageTransferOptions` then how are blobs uploaded? Microsoft Docs will tell you:

> ... the _client libraries_ will use defaults for each individual value, if not provided. **These defaults are typically performant in a data center environment, but not likely to be suitable for home consumer environments.** Poorly tuned `StorageTransferOptions` can result in excessively long operations and even request timeouts. It's best to be proactive in testing the values in `StorageTransferOptions`, and tuning them based on the needs of your application and environment.
> https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-tune-upload-download#performance-tuning-with-storagetransferoptions

Okay, what are the defaults though? That is a great question that I couldn't find in documentation. In GitHub we can [see](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/storage/Azure.Storage.Common/src/Shared/Constants.cs#L231) that `DefaultConcurrentTransfersCount=5`. As for the  `InitialTransferSize` and `MaximumTransferSize` -- after my experience I've found that the default values are:

```c#
DefaultConcurrentTransfersCount = 5
InitialTransferSize = 256 MiB // 262,144 KiB -or- 268,435,456 bytes
MaximumTransferSize = 8 MiB // 8,192 KiB -or - 8,388,608 bytes
```

> Note: 
> I have [posted about KB vs KiB](/post/when-is-a-kilboyte-not-a-kilobyte). It is important to point out that MS code says `public const int KB = 1024`. In my writing, I try to be explicit with `KiB`, but for this post if you see `KB`, trust we are talking `KiB`.

### Tuning for Cost

So now we know, by default, if we were uploading some files of various sizes, we would be looking at the following number of operations.

| File Size                            | Put Blob Operations | Put Block Operations | Put Block List Operations | Total Write Operations | Cost*      |
| ------------------------------------ | ------------------- | -------------------- | ------------------------- | ---------------------- | ---------- |
| 0 - 255.99 MiB<br/>268,435,455 bytes | 1                   | 0                    | 0                         | 1                      | $0.0000065 |
| 256 MiB<br/>268,435,456 bytes        | 0                   | 32                   | 1                         | 33                     | $0.0002145 |
| 500 MiB                              | 0                   | 63                   | 1                         | 64                     | $0.0004160 |

\* Full [pricing](https://azure.microsoft.com/en-us/pricing/details/storage/blobs/) is here, but we'll use typical Hot blob write cost of $0.065 / 10k

### Impact on Speed

Properly tuning these values can improve the speed of data transfers. For example, increasing `MaximumConcurrency` can allow more parallel subtransfers, potentially speeding up the upload process. However, setting these values too high can lead to resource contention and decreased performance. Unfortunately, there is no real one-size-fits-all solution here and will require testing and potentially crafting various "upload strategies" depending on the situation (file size, connection type, I/O, other environmental factors).

I'll share some real-world, unscientific, numbers from my machine to Azure to give some insight into how the concurrency and blob sizes can change performance. 

| File Size | Concurrency | Initial Transfer Size | Max Transfer Size | Milliseconds | Write Operations |
| --------- | ----------- | --------------------- | ----------------- | ------------ | ---------------- |
| 8 MiB     | 10          | 512 KiB               | 512 KiB           | 1,029        | 17               |
| 8 MiB     | 5           | 256 MiB               | 8 MiB             | 1,144        | 1                |
| 8 MiB     | 10          | 1 MiB                 | 1 MiB             | 1,241        | 9                |

## Real World Example

### 400,000 8 MiB Files

For this exercise, we'll assume the files are all 8 MiB each and total data is 3.052 TiB. Using our previously discovered numbers...

| File Size | Concurrency | Initial Transfer Size | Max Transfer Size | Write Operations | Estimated Transfer Time | Estimated Write Cost |
| --------- | ----------- | --------------------- | ----------------- | ---------------: | ----------------------: | -------------------: |
| 8 MiB     | 10          | 512 KiB               | 512 KiB           |        6,800,000 |             114.3 hours |               $44.20 |
| 8 MiB     | 5 (default) | 256 MiB (default)     | 8 MiB (default)   |          400,000 |             127.1 hours |                $2.60 |
| 8 MiB     | 10          | 1 MiB                 | 1 MiB             |        3,600,000 |             137.9 hours |               $23.40 |

The results are always very interesting. The default values aren't terrible in terms of performance or cost. Because the files are uploaded in one-shot the write operations are at the absolute minimum. However, if you want to shave 13 hours off of the runtime it will cost you $41.60.

Oh -- and is it "cheap" to store 3.052 TiB (in hot tier)? $57.50/month

### Conclusion

Changing `StorageTransferOptions` can have a significant impact on both the speed and cost of uploading data to Azure Blob Storage. By carefully tuning these settings, you can optimize performance and reduce expenses. However, it's important to test different configurations to find the best balance for your specific use case.
