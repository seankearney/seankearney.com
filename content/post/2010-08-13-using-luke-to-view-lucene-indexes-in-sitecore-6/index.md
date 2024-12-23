+++
date = 2010-08-13
slug = "using-luke-to-view-lucene-indexes-in-sitecore-6"
title = "Using Luke to view Lucene indexes in Sitecore 6"
description = ""

[taxonomies]
tags = ["Sitecore", "Lucene"]
+++

As a Sitecore developer who is a fan of leveraging Lucene in my projects I've always been aggravated that, starting with Sitecore 6, I couldn't use Luke to view my indexes. As [Jens Mikkelsen](http://mcore.wordpress.com/2008/11/05/sitecores-lucene-integration/) points out  this was due to custom compression that Sitecore uses for the Lucene index.

<!-- more -->

To get around these compression issues Jens, and others, have come up with the Index Viewer shared source module and this tool was the only way to help with Sitecore-Lucene indexes. Until now. I've figured out to get around the custom compression and allow Luke to view our indexes!

The breakthrough was based on a [comment](http://mcore.wordpress.com/2008/11/05/sitecores-lucene-integration/#comment-133) by Alexy on where we could look into defining our own compression implementation. I started digging through the Lucene code and the answer was right there for us!  
Here's the solution.

1.  Go get a copy of [SharpZipLib](http://www.icsharpcode.net/OpenSource/SharpZipLib/)
2.  Grab a copy of Lucene.Net.dll from your Sitecore 6 web root
3.  Grab the code below and add it to your project along with references to the above two dll's
4.  Compile the project and move the resulting DLL and ICSharpCode.SharpZipLib.dll to your Sitecore /bin directory
5.  Update the Web.Config appSetting "Lucene.Net.CompressionLib.class" with your new info
6.  Rebuild your search indexes
7.  Grab the latest [Luke](http://code.google.com/p/luke/downloads/list) and point it at your index

Custom Compression Code (based on [this class](https://svn.apache.org/repos/asf/lucene/lucene.net/tags/Lucene.Net_2_4_0/src/Lucene.Net/SharpZipLibAdapter.cs)):

```c#
public class SharpZipLibAdapter : SupportClass.CompressionSupport.ICompressionAdapter  
{  
    public byte[] Compress(byte[] input, int offset, int length)  
    {  
        // Create the compressor with highest level of compression  
        Deflater compressor = new Deflater();  
        compressor.SetLevel(Deflater.BEST_COMPRESSION);  

        // Give the compressor the data to compress  
        compressor.SetInput(input, offset, length);  
        compressor.Finish();  

        /*  
            * Create an expandable byte array to hold the compressed data.  
            * You cannot use an array that's the same size as the orginal because  
            * there is no guarantee that the compressed data will be smaller than  
            * the uncompressed data.  
            */  
        MemoryStream bos = new MemoryStream(input.Length);  

        // Compress the data  
        byte[] buf = new byte[1024];  
        while (!compressor.IsFinished)  
        {  
            int count = compressor.Deflate(buf);  
            bos.Write(buf, 0, count);  
        }  

        // Get the compressed data  
        return bos.ToArray();  
    }  

    public byte[] Uncompress(byte[] input)  
    {  
        Inflater decompressor = new Inflater();  
        decompressor.SetInput(input);  

        // Create an expandable byte array to hold the decompressed data  
        MemoryStream bos = new MemoryStream(input.Length);  

        // Decompress the data  
        byte[] buf = new byte[1024];  
        while (!decompressor.IsFinished)  
        {  
            int count = decompressor.Inflate(buf);  
            bos.Write(buf, 0, count);  
        }  

        // Get the decompressed data  
        return bos.ToArray();  
    }  

    public byte[] Compress(byte[] input)  
    {  
        // Create the compressor with highest level of compression  
        Deflater compressor = new Deflater();  
        compressor.SetLevel(Deflater.BEST_COMPRESSION);  

        // Give the compressor the data to compress  
        compressor.SetInput(input);  
        compressor.Finish();  

        /*  
            * Create an expandable byte array to hold the compressed data.  
            * You cannot use an array that's the same size as the orginal because  
            * there is no guarantee that the compressed data will be smaller than  
            * the uncompressed data.  
            */  
        MemoryStream bos = new MemoryStream(input.Length);  

        // Compress the data  
        byte[] buf = new byte[1024];  
        while (!compressor.IsFinished)  
        {  
            int count = compressor.Deflate(buf);  
            bos.Write(buf, 0, count);  
        }  

        // Get the compressed data  
        return bos.ToArray();  
    }  
}
```

Disclaimer: This was tested with Sitecore 6.2.0.100104