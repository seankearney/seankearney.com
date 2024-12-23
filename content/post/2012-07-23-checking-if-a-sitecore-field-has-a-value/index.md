+++
date = 2012-07-23
slug = "checking-if-a-sitecore-field-has-a-value"
title = "Checking if a Sitecore field has a value"
description = ""

[taxonomies]
tags = ["Sitecore", "Tips"]
+++

When trying to determine if a Sitecore field has a value there are two basic ways.

`Sitecore.Context.Item.Fields["fieldName"].HasValue`

or

`Sitecore.Context.Item.Fields["fieldName"].Value != ""`

<!-- more -->

There are a few major differences.

1.  HasValue will not include checking a clone's original value, Standard Values or Default Values
2.  HasValue will return true if the field value is an empty string
3.  Field.Value will return the clone's original value, Standard Value or Default Values if the field doesn't have a value
4.  If there is no value on the field, clone's original value, standard values, or default value Field.Value will return an empty string

Therefore, `Sitecore.Context.Item.Fields["fieldName"].Value == null` **will never** evaluate to true!

**Beware. Sitecore Bug** 

By calling `Field.HasValue` you will cause the `Field.ContainsStandardValues` property to have an invalid value! This has been logged as bug #368493 with Sitecore. For more information see [this post](/post/field-containsstandardvalue-in-sitecore-is-buggy).