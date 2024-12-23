+++
template = "post.html"
date = 2012-07-30
slug = "getting-a-special-field-value-in-sitecore"
title = "Getting a special field value in Sitecore"
description = ""

[taxonomies]
tags = ["Sitecore", "Tips"]
+++

Did you know that you can access special properties of a Sitecore item the same way you get a typical field's value? 

<!-- more -->

Supported 'special fields' are:

```
*   @id = Item.ID.ToString()
*   @key = Item.Key
*   @lang = Item.Language.ToString()
*   @mid = Item.BranchID.ToString()
*   @name = Item.Name
*   @tid = Item.TemplateID.ToString()
*   @ver = Item.Version.ToString()
```

Example:

```c#
Sitecore.Data.Items.Item item = Sitecore.Context.Database.GetItem("/sitecore/content");

string id = item["@id"];
string key = item["@key"];
string lang = item["@lang"];
string mid = item["@mid"];
string name = item["@name"];
string tid = item["@tid"];
string ver = item["@ver"];

Sitecore.Diagnostics.Assert.IsTrue(id == item.ID.ToString(), "No match");
Sitecore.Diagnostics.Assert.IsTrue(key == item.Key.ToString(), "No match");
Sitecore.Diagnostics.Assert.IsTrue(lang == item.Language.ToString(), "No match");
Sitecore.Diagnostics.Assert.IsTrue(mid == item.BranchId.ToString(), "No match");
Sitecore.Diagnostics.Assert.IsTrue(name == item.Name.ToString(), "No match");
Sitecore.Diagnostics.Assert.IsTrue(tid == item.TemplateID.ToString(), "No match");
Sitecore.Diagnostics.Assert.IsTrue(ver == item.Version.ToString(), "No match");
```