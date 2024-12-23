+++
date = 2011-06-01
slug = "dmitry-vasilinenko-continuous-integration-for-sitecore-projects"
title = "Re: Continuous Integration for Sitecore Projects"
description = ""

[taxonomies]
tags = ["Sitecore", "Continuous Integration"]
+++

![](confused.jpg)

<!-- more -->

This post is in response to another [blog post by Dmitry Vasilinenko](http://vasilinenko.blogspot.com/2011/05/coninuous-integration-for-sitecore.html). I posted this up as a comment, but it was quickly taken down for some reason.

* * *

Dmitry,  
Continuous Integration (CI), for Sitecore based web sites, has been gaining traction over the past few years particularly amongst solution partners (i.e. [Hedgehog Development](http://www.hhogdev.com), Pentia, Inmento, etc...) and I am glad Sitecore is starting to take an interest in it.  

Part of my responsibilities here, at Hedgehog Development, has been to help other Sitecore partners create a proper build/deployment processes including the use of CI for their team. The major hurdle I've seen is the amount of understanding and time required to get a proper process in place.   

You've identified some fundamental concepts of Continuous Integration for any software development project. I also strongly agree that your project and the underlying CMS should be separate! This is [something I've been pushing](/post/Visual-Studio-Projects-and-Sitecore) for some time now, and I believe is finally gaining support.  

The one aspect of CI with Sitecore that appears to be glossed over though is the Sitecore templates, or Sitecore items in general, and how they are handled. In my opinion, the Sitecore templates (and items) that are created specific for the solution at hand should be treated as code. The C# code you write would be worthless without the items then require. We, at Hedgehog Development, had created the [Team Development for Sitecore](http://TeamDevelopmentForSitecore.com) (TDS) product to close this gap. TDS addresses many of the points you raise as well as the ability to deploy your sitecore items as code to a different Sitecore installation.   

As for your recommend free tools, and this is just my own opinion, I don't particularly care for them. I would suggest that the readers take a look at TeamCity by JetBrains, rather than cc.net + nAnt. TeamCity is also free and is a bit easier, IMHO, to work with. Personally, I am very happy with using Microsoft Team Foundation Server. The integration with Visual Studio is 2nd to none and the build and testing functionality is great. I do understand that this software isn't free, which is why you mentioned SVN, cc.net and nAnt.  

Sean Kearney  
Sitecore MVP

References:  
Sitecore and Visual Studio: [http://seankearney.com/post/visual-studio-projects-and-sitecore](/post/visual-studio-projects-and-sitecore)  
Hedgehog: [http://TeamDevelopmentForSitecore.com](http://TeamDevelopmentForSitecore.com)  
Pentia: [http://mcore.wordpress.com/2008/02/29/continous-integration-and-sitecore/](http://mcore.wordpress.com/2008/02/29/continous-integration-and-sitecore/)  
Oshyn: [http://oshyn.com/_blog/Web_Content_Management/post/Enterprise-Sitecore-Continuous-Integration-Configuration-Management/](http://oshyn.com/_blog/Web_Content_Management/post/Enterprise-Sitecore-Continuous-Integration-Configuration-Management/)