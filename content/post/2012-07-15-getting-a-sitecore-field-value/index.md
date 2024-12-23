+++
template = "post.html"
date = 2012-07-15
slug = "getting-a-sitecore-field-value"
title = "Getting a Sitecore field value"
description = ""

[taxonomies]
tags = ["Sitecore", "Tips"]
+++

There are many ways to get the value of a Sitecore field and each is slightly different.

<!-- more -->

```c#
string fieldName = "__Icon";
Sitecore.Data.Items.Item someItem = Sitecore.Context.Database.GetItem("/sitecore/content");
Sitecore.Data.Fields.Field someField = someItem.Fields[fieldName]; // you could use field name, ID or index here

// assumptions:
// 1. The Item exists
// 2. The field exists and has a value on the item
// 3. This was written against Sitecore 6.4.1.101221
                
// Method 1: Indexer on Item supports using a field's name, index, or ID
string value1 = someItem[fieldName];

// Method 2: Get the value from the field
string value2 = someField.Value; // This is commonly seen as someItem.Fields[fieldName].Value

// Method 3: 
string value3 = someField.GetValue(true);

// Method 4: 
string value4 = someField.GetValue(false);

// Method 5: 
string value5 = someField.GetValue(true, true);

// Method 6: 
string value6 = someField.GetValue(false, true);

// Method 7: 
string value7 = someField.GetValue(false, false);

// Method 8: 
string value8 = someField.GetValue(true, false);

// Method 9: 
string value9 = someItem.InnerData.Fields[theField.ID]; 
```

**Method 1**

This method uses an indexer on the item. If the field doesn't exist on the item you will get an empty string. If the field does exist you will get the same result as method 2.

**Method 2**

You need to have a field to use this method! If you called method 2 by the more commonly used notation of someItem.Fields[fieldName].Value you can get a null reference exception when trying to access the Value. The first  value to be found will be returned. 

1.  The Value
2.  If the item is a clone, the clone source's value
3.  Standard Value
4.  The field's default value
5.  Empty String

**Method 3 & Method 5**

These two are functionally equivalent. This method gets the value of the field similar to method 2.

**Methods 4 & Method 6**

These two are functionally equivalent. This method gets the value of the field without checking a clone's source or the standard values. The first value to be found will be returned. 

1.  The Value
2.  The field's default value
3.  Empty String

**Method 7** 

This method gets the value of the field without checking a clone's source, standard values or default value! The first value to be found will be returned. 

1.  The Value
2.  Null


**Method 8** 

This method gets the value of the field without checking the default value! The first value to be found will be returned. 

1.  The Value
2.  If the item is a clone, the clone source's value
3.  Standard Value
4.  Null


**Method 9**

The FieldList object at ItemData.Fields on an item is the real container of field information for that item. The FieldCollection on Item.Fields is really a way into the FieldList on the ItemData. ItemData is also a much more raw form. Internally the FieldList is a HashList<ID, string> where the key is the field id and the value is the raw value of the field. Cloned Values, Standard Values and Default Values do not exist in the FieldList and using this method would return null where the field has no value.

**Sitecore Bug** 

By calling `Field.GetValue(false)`, `Field.GetValue(false, true)`, or `Field.GetValue(false, false)` you can cause the `Field.ContainsStandardValues` property to have an invalid value! This has been logged as bug #368493 with Sitecore.