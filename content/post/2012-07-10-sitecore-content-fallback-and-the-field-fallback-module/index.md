+++
date = 2012-07-10
slug = "sitecore-content-fallback-and-the-field-fallback-module"
title = "Sitecore - Content Fallback and the Field Fallback Module"
description = ""

[taxonomies]
tags = ["Sitecore", "Shared Source", "Field Fallback"]
+++

A common practice in all of my Sitecore sites is to have some sort of *content fallback*. What this means is that a field's value can come from somewhere other than the field itself, the source item (if it is a clone), or its standard values.

Content fallback is an excellent way to increase editor productivity and reduce content redundancy! Here are the three most common scenarios I run into with every project.

<!-- more -->

**Ancestor Inheritance**

One of the more common scenarios for ancestor inheritance is for things like the text that is to show up in the `<title>` tag of the HTML document. It is SEO best practice to have a unique title for every page. However, in some sites where there are thousands of pages, having an editor give each page a title may be unrealistic. The general practice we take with the sites we do is that if the "Title" field in null then we should use the value of the nearest set ancestor. This allows an editor to set the title at the 'home' node and guarantee that every page in the site will at least have something set for the `<title>` tag. This concept can be used for many different scenarios in almost any site!

**Lateral Fallback**

This is a fairly common technique where you may want a "MenuTitle" field to specify the text used in an `<a>` tag when a link to the item is being generated in a menu. However, in the event there is no "MenuTitle" then we should expect to see the value of the "Title" field.

**Default Fallback**

This type of fallback I typically use with Lateral Fallback. Furthering our Lateral Fallback example, lets suppose that we don't have a value for "MenuTitle" or the "Title" fields. In this case we simply want to have a value with the name of the item. In the event the item is renamed we should show the current name, not the name used at create time.

There are typically two places where this content fallback logic would live. If the site is using some sort of 'content model' framework such as [Custom Item Generator](http://trac.sitecore.net/CustomItemGenerator), [CorePoint.DomainObjects](trac.sitecore.net/DomainObjects) or [Glass Mapper](http://glass.lu) then it would make sense to put the logic there. However, without such a framework the logic would be forced to live in the presentation layer. There are a few problems with these approaches.

1.  The fallback value isn't obvious to the editors. It doesn't show up in the content editor and they must know there is magic at hand at render time.
2.  Using the Page Editor can become (more) cumbersome.
3.  The fallback value is not readily available via standard API calls. The biggest issue is typically that the value isn't indexed for searching.
4.  Low level caching of the values doesn't happen. Caching is only available at the HTML level.


When Alex Shyba released his [language fallback module](http://sitecoreblog.alexshyba.com/2010/11/approaching-language-fallback-with.html) I immediately envisioned a similar paradigm used for my content fallback scenarios! In my (not so) free time I was able to come up with the newly released [Field Fallback Shared Source Module](http://trac.sitecore.net/FieldFallback)! This approach had one huge benefit and that is the editorial team would be able to see the 'fallback value' right there in the content editor! Furthering this it also had the fallback value in a cache thereby eliminating the need to calculate the fallback value multiple times.

The Field Fallback module will handle the three scenarios above and also provides for a fully pluggable architecture (pipeline based) to handle any other fallback scenarios you may need. This include language fallback! Part of the release includes a port of Alex Shyba's language fallback logic!

You can grab it from the Shared Source repository here - [https://github.com/HedgehogDevelopment/sitecore-field-fallback](https://github.com/HedgehogDevelopment/sitecore-field-fallback)

I am scheduled to present this topic and demonstrate the module in an upcoming [Sitecore Users Virtual Group](http://sitecoreug.com/events/Field-Fallback). Video - [https://www.youtube.com/watch?v=P5q0xOrvCDM](https://www.youtube.com/watch?v=P5q0xOrvCDM)

 <iframe
    src="https://www.youtube.com/embed/P5q0xOrvCDM"
    webkitallowfullscreen
    mozallowfullscreen
    allowfullscreen>
</iframe>