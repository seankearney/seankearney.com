+++
date = 2008-12-22
slug = "sitecore-fieldrenderer-control-and-overridefieldvalue"
title = "Sitecore FieldRenderer Control and OverrideFieldValue"
description = ""

[taxonomies]
tags = ["Sitecore", "Bug"]
+++

The FieldRenderer Control (`Sitecore.Web.UI.WebControls.FieldRenderer`) has a method called *OverrideFieldValue* that takes a string and is supposed to be shown instead of the real fields value, but it doesn't work.

<!-- more -->

It seems a fix would be to add in a new pipline that accounts for this preset value.

Here's the code:

```c#
public class GetOverriddenFieldValue  
{  
    // Methods  
    public void Process(RenderFieldArgs args)  
    {  
        Assert.ArgumentNotNull(args, "args");  

        if (!string.IsNullOrEmpty(args.FieldValue))  
            args.Result.FirstPart = args.FieldValue;  
        else  
            args.Result.FirstPart = args.Item[args.FieldName];  
    }  
}
```

You then need to drop this in the Pipline in the web.config file so that we can modify the value on the way out.

Look for the following node:

`<processor type="Sitecore.Pipelines.RenderField.AddBeforeAndAfterValues, Sitecore.Kernel" />`

Now add the following above that:

`<processor type="Your.Namespace.GetOverriddenFieldValue, Your.Assembly" />`

The bug has been logged with Sitecore so hopefully they release an official patch.