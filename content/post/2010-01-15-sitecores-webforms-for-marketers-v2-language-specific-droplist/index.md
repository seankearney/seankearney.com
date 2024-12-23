+++
template = "post.html"
date = 2010-01-15
slug = "sitecores-webforms-for-marketers-v2-language-specific-droplist"
title = "Sitecore's Webforms for Marketers (v2) Language Specific DropList"
description = ""

aliases = ["/archive/2010/01/15/sitecore-webforms-language-specific-droplist.aspx"]

[taxonomies]
tags = ["Sitecore"]
+++

Sitecore's Webforms for Marketers (v2) module is pretty impressive out of the gate. There was an issue, however, with a recent project that had a few different languages. We needed a Droplist in the form that showed a list of items from Sitecore and while the module does this out of the box it has a [gotcha](/archive/2010/01/15/sitecore-webforms-gotchas.aspx) to it; it won't remove items from the drop list that do not have a version in the context language.

<!-- more -->

I didn't want to entirely reinvent the wheel for this and it seemed I should be able do something quick, but it wasn't that easy. Ideally I could have simply overridden the implicit operator on the ListItemCollection and changed the default behavior of how it got the values. However the ListItemCollection class is sealed and left me little choice that to duplicate some code. What I came up with isn't too pretty, but it works. ;) Essentially, inherit from the standard DropList and add in some code to filter out items that do not have a version.

Here is some code for a language specific DropList.

```c#
public class LanguageSpecificDropList : DropList  
{  
    [PersistenceMode(PersistenceMode.InnerProperty), VisualProperty("Items:", 100), Browsable(false), VisualFieldType(typeof(ListField)), TypeConverter(typeof(ListItemCollectionConverter)), VisualCategory("List"), Description("Collection of items."), DesignerSerializationVisibility(DesignerSerializationVisibility.Content)]  
    new public string Items { get; set; }  

    protected override void InitItems(ListItemCollection items)  
    {  
        items = GetListItemCollection(Items);  
        base.InitItems(items);  
    }  

    private static ListItemCollection GetListItemCollection(string values)  
    {  
        IEnumerable<string> itemsName;  
        ListItemCollection items = new ListItemCollection();  

        if (string.IsNullOrEmpty(values))  
        {  
            return items;  
        }  

        if (values.StartsWith(StaticSettings.SourceMarker))  
        {  
            itemsName = GetItemsName(values.Substring(StaticSettings.SourceMarker.Length));  
        }  
        else  
        {  
            itemsName = ParametersUtil.XmlToStringArray(values);  
        }  
        foreach (string str in itemsName)  
        {  
            System.Web.UI.WebControls.ListItem item = new System.Web.UI.WebControls.ListItem(str, str);  
            items.Add(item);  
        }  
        return items;  
    }  

    private static IEnumerable<string> GetItemsName(string source)  
    {  
        if (source == string.Empty)  
        {  
            yield return ItemIDs.RootID.ToString();  
        }  

        Item item = StaticSettings.ContextDatabase.SelectSingleItem(source);  

        if (item == null)  
        {  
            yield return string.Format("Item not found at '{0}'", source);  
        }  

        foreach (Item child in item.Children)  
        {  
            if (child.Versions.Count > 0)  
                yield return child.Name;  
        }  
    }  
}
```

Worth pointing out is that if you want to show a specific field value in the drop down then all you need to do is change line 55!