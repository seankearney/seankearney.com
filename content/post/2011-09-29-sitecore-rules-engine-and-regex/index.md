+++
template = "post.html"
date = 2011-09-29
slug = "sitecore-rules-engine-and-regex"
title = "Sitecore Rules Engine and RegEx"
description = ""

[taxonomies]
tags = ["Sitecore", "Bug", "Rules Engine"]
+++

I was having some fun with the Sitecore (6.5.0.110818) rules engine over the last couple days. Specifically, I was trying to show content editor warnings as well as control icons for templates based on the name of the item. However the Item name comparison, when using a regular expression, was never evaluating to true.

<!-- more -->

Upon inspection of

`Sitecore.Rules.Conditions.StringOperatorCondition<T>`

I noticed that the RegEx call has the parameters flip-flopped! This means that any condition that uses the RegEx String Operator to compare will fail (assuming your regular express isn't exacly the string you are matching). The list of problem conditions is:

*   Item Id
*   Item Name
*   Item Path
*   Language
*   Parent Name
*   Domain Name
*   User Name
*   User Profile
*   Database Name
*   Device Name
*   Website Name
*   When Field

Being I was only working with the Item Name condition I re-wrote it as such:

```c#
public class MyItemNameCondition<T> : Sitecore.Rules.Conditions.ItemConditions.ItemNameCondition<T> where T : RuleContext
{
    protected override bool Execute(T ruleContext)
    {
        Assert.ArgumentNotNull(ruleContext, "ruleContext");
        Item item = ruleContext.Item;
        if (item == null)
        {
            return false;
        }
            
        // Sitecore flipped the params in Sitecore.Rules.Conditions.StringOperatorCondition<T>
        // when using regex compare here we switch them back
        if (GetOperator() == StringConditionOperator.MatchesRegularExpression)
        {
            return base.Compare(this.Value ?? string.Empty, item.Name);
        }
        else
        {
            return base.Execute(ruleContext);
        }
    }       
}
```

This works for me, but if I need to use any of those other conditions I would hope to get a hotfix from Sitecore. I did log this bug (DefectId 352659) and hopefully it is addressed soon.