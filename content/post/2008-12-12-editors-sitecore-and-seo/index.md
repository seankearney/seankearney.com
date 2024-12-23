+++
date = 2008-12-12
slug = "editors-sitecore-and-seo"
title = "Editors, Sitecore, and SEO"
description = ""

[taxonomies]
tags = ["Sitecore", "SEO"]
+++

Editors (and some sysadmins) that have been around IIS web sites for a few years seem to have a little trouble grasping what Sitecore can do for them. More specifically, they have trouble grasping what it is **they** don't need to do anymore!  

<!-- more -->

In the purest sense, file based web sites running on IIS serve up the HTML from... you guessed it. Files. These files are typically (and hopefully) organized in folders and there is usually a "default document" whether it be default.htm, index.asp, home.aspx, etc... With Sitecore the concept of folders and default documents goes right out the window. Every item in the site tree can be a page including the "folders!" This can make for a very search engine friendly site.  

With traditional web sites there can be many urls to get to the same content. For instance. http://example.com/Products/Default.aspx and http://example.com/Products are the same to us programmers, but to a search engine they are different! IIS is configured so that if a request comes in to http://example.com/Products/ it will look at the file system try to find a preconfigured default document. In this case, it locates the default.aspx file and serves up the content.   

If we were implementing this system in Sitecore we would configure the system such that "Products" isn't a plain 'ole folder; we make"Products" a page, which can have child pages! This will result in urls like:  
http://example.com/Products.aspx   
http://example.com/Products/Widget.aspx  

Taking this one step further... Sitecore 6 + IIS7 support turning off the .aspx extension in its urls! This would generate urls that look like:  
http://example.com/Products  
http://example.com/Products/Widget  

In order to disable .aspx extensions for Sitecore 6 sites running in IIS7:  
1. Search for "addAspxExtension" in the web.config and set it to false.  
2. Search for "<System.WebServer>/<Modules>" node in web.config and add an attribute runAllManagedModulesForAllRequests="true"