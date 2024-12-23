+++
date = 2008-01-19
slug = "sitecore-rest-api-service"
title = "Sitecore REST API Service"
description = ""

[taxonomies]
tags = ["Sitecore", "Bug"]
+++

If you are a Sitecore developer, go search the Sitecore Developer Network (SDN) for "REST" and tell me what you find. Nothing. Anyone who develops with Sitecore knows that documentation is lacking, but shouldn't this be something worth mentioning on your site? I digress.

<!-- more -->

I was looking at the defaul 404 page for Sitecore (/sitecore/notfound.aspx) and I happen to notice the "rest.aspx" file. Interesting. So, I start digging through the SitecoreClient.dll and [yada yada yada](http://en.wikipedia.org/wiki/Seinfeld) here are my findings... You can access the REST API from */sitecore/rest.aspx* it expects two Querystring parameters, itemPath and _method.

For instance, */sitecore/rest.aspx?itemPath=/sitecore/content/Home/Articles/link-to-us&_method=GetItemData*

The other method supported is **GetChildInfo** as in */sitecore/rest.aspx?itemPath=/sitecore/content/Home/Articles/link-to-us&_method=GetChildInfo*

Check out the **Sitecore.Rest **namespace in **Sitecore.Kernel.dll** and the **Sitecore.Services** namespace in the **Sitecore.Client.dll**