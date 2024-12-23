+++
date = 2012-07-12
slug = "field-containsstandardvalue-in-sitecore-is-buggy"
title = "Field.ContainsStandardValue in Sitecore is Buggy"
description = ""

[taxonomies]
tags = ["Sitecore", "Tips", "Bug"]
+++

I had discovered a little bug revolving around the `Sitecore.Data.Fields.Field.ContainsStandardValue` property in Sitecore (at least 6.4.1.101221 through current). You cannot trust the value returned by `Field.ContainsStandardValue` if you have made any of the following calls:

<!-- more -->

*   `Field.HasValue`
*   `Field.GetValue(false)`
*   `Field.GetValue(false, false)`
*   `Field.GetValue(false, true)`

A way to get around the bug would be to immediately call `field.GetValue(true, false)` if you have made any of the previously listed calls. 

For example:

```c#
// does the field have a value?
bool hasValue = field.HasValue;

// fix bug 368493. 
field.GetValue(true, false);
```

This bug has been acknowledged by Sitecore and logged as #368493.