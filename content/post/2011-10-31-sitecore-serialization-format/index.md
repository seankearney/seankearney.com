+++
template = "post.html"
date = 2011-10-31
slug = "sitecore-serialization-format"
title = "Sitecore Serialization Format"
description = ""

[taxonomies]
tags = ["Sitecore", "Serialization"]
+++

We, at [Hedgehog Development](http://www.hhogdev.com), have been intimately working with Sitecore serialization since it was released with Sitecore 6.0 in 2008. Specifically our interest has been in helping developers bring their Sitecore items into Visual Studio and essentially allow you to treat your Sitecore items as code. We do this with our [Team Development for Sitecore](http://teamdevelopmentforsitecore.com) product.

I was having a discussion the other day and was asked to elaborate on the serialization format that Sitecore uses. I figured I would have some notes, or official documentation, on the format, but I couldn't find any! I figured this is a good a place as any to describe the serialization format that Sitecore uses.

<!-- more -->

Serialized files are UTF-8 encoded and the first line in a serialized item must be `----item----`

Immediately following the item declaration are the properties of the item that are the same regardless of version or language. The properties are:

```
Version: always 1
Id: The Sitecore ID of the item
Database: The database this item came from
Path: The path where the item should be
Parent: The ID of its parent
Name: The name of the item
Master: The branch template used for creation
Template: The ID of the template that this item is based on
TemplateKey: The name of the template
```

Notes:

- Version is always 1
  - The path property isn't used for reverting.  
- The Parent ID property is used for placing the item in the tree.
- The Name property is used for naming the item
  - The TemplateKey isn't used for reverting. 
  - The Template ID property specifies the template to be used.

Immediately following the item properties, but before the first `----version----` we have any 'shared' fields that may exist. Shared field are special in that the value of a shared field is shared amonst all languages and versions of an item.

The field serialization format is rather simple. All text values are written to the serialization file exactly as they are stored in Sitecore. In the case of binary fields the data is base-64 encoded. The field definition with a line with `----field----` and then we have the following properties:

- `Field`: The ID of the field
- `Name`: The name of the field
- `Key`: The lowercase name of the field
- `Content Length`: The number of unicode characters in the field value

Immediately following the content length property we have an empty line (`\n\n`). The subsequent line(s) contains the content of the specified length. Afrter the field value we must have another empty line (`\n\n`). There then may be any number of empty lines before the next section.

Notes:

- The name or key properties aren't used with update/revert. 
- The ID property is used to identify the field for setting the value.

Once we have defined the shared fields we come into the definition for a specific language and version. This is signified by a `----version----` line. The version definition simply defines the following properties:

- `Language`: The language of the version
- `Version`: The number version
- `Revision`: The ID of the version

Proceeding the version definition is any field definitions specific to that version of the item. Field definitions are repeated until a new version definition, or the end of the file, appears.

Sample:

```
----item----
version: 1
id: {BC5CA70D-1567-40D4-B710-8B711D8A399F}
database: master
path: /sitecore/content/Home/Item Name
parent: {110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9}
name: Item Name
master: {00000000-0000-0000-0000-000000000000}
template: {A5828170-FFCD-4634-A3A0-525604920993}
templatekey: Sample Template

----field----
field: {35BED290-4531-4518-AE89-86E05455E951}
name: Shared
key: shared
content-length: 21

value of shared field
----field----
field: {44B60993-4B91-4276-A2A7-02DD3AC31DED}
name: UnversionedShared
key: unversionedshared
content-length: 33

value of unversioned shared field
----version----
language: da
version: 1
revision: 19ffb2ef-b370-4e04-94b6-fcca3876a15e

----field----
field: {3E92B1BE-11EA-451A-99BC-34D3B6EB7E41}
name: Field 1
key: field 1
content-length: 38

{872C8B70-8F6E-485D-A054-B6174E62494C}
----version----
language: en
version: 1
revision: 2be76b57-6f0f-471f-900a-266c1a58188a

----field----
field: {3E92B1BE-11EA-451A-99BC-34D3B6EB7E41}
name: Field 1
key: field 1
content-length: 38

{BC5CA70D-1567-40D4-B710-8B711D8A399F}
```