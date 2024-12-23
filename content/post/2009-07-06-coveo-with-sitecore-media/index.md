+++
template = "post.html"
date = 2009-07-06
slug = "coveo-with-sitecore-media"
title = "Coveo with Sitecore Media"
description = ""

[taxonomies]
tags = ["Search", "Coveo", "Sitecore"]
+++

Out of the box, Coveo does a pretty good job of crawling your website and providing search capabilities. In this particular installation we aren't using the "Sitecore connector" we are simply letting coveo do its thing walking the site. We encountered an issue where Sitecore media library items, mainly PDF files, were not making it into the index. We figured it must be a filter of some sort blocking access to it and this proved to be the case.

<!-- more -->

Sitecore media (by default) serves media library items with a generic handler extension of '.ashx' and Coveo is configured to ignore all unknown filetypes. What you need to do is go to the "Document Types" tab of your index and add a type for .ashx files. I simply called it "Media Library" and entered in the extension of '.ashx' and left all options as the default. I rebuilt the index and we were all set.

![](/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/carknee/Coveo_5F00_doctypes.JPG)