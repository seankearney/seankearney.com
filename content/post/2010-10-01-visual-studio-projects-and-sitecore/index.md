+++
template = "post.html"
date = 2010-10-01
slug = "visual-studio-projects-and-sitecore"
title = "Visual Studio Projects and Sitecore"
description = ""

aliases = ["/post/Visual-Studio-Projects-and-Sitecore.aspx"]

[taxonomies]
tags = ["Sitecore", "Basics"]
+++

This is a topic that I've been meaning to cover for some time now, but it is [this post](http://www.sitecore.net/en/Community/Technical-Blogs/John-West-Sitecore-Blog/Posts/2010/09/Create-a-Visual-Studio-2010-Project-for-a-Sitecore-Solution.aspx) by [John West](http://twitter.com/sitecorejohn) that pushed me to do it sooner rather than later.

<!-- more -->

There are basically two ways of working with Sitecore.

1.  Your solution, and code, is fully immersed in the Sitecore web site.
2.  Your solution, and code, is outside of Sitecore's web site and you use some post build process to deploy.

John's post, and Sitecore documents, suggests that you go with option 1. I, however, do not agree that this is the right way to go. I feel that my code should not be mixed in with over 6,000 of Sitecore's files. Here are some reasons:

1.  The most important advantage is a clear understanding of the ownership of files in the solution. Everything checked into source control is explicitly owned by the solution being developed. All other files are owned by Sitecore or a third party package installed in Sitecore.
2.  I want to be able to distinguish my files from Sitecore's just by looking on the file system.
3.  If I need to ship the code to my client I simply want to zip up my 'workspace' and not have to wade through out-of-the box Sitecore files.
4.  I want my development environment to be as close as possible to a production environment. This means no .cs files in my web root

I've been working outside of the web root for three years now and wouldn't consider it being any other way. In fact, I am always wondering why you would want to work out of the web root as Sitecore suggests. I spoke to a client recently, while proving support for [Team Development for Sitecore](http://TeamDevelopmentForSitecore), and their answer was simply, "we didn't know better." That isn't acceptable.

Here is the way I work and highly suggest you work as well.

1.  Use IIS and configure Sitecore somewhere other than C:\[Workspace]\[Client]\trunk\. For example, C:\Sitecore\[Client]\Website
2.  Create your Visual Studio solution (and projects) outside of the web root. i.e. C:\[Workspace]\[Client]\trunk\ClientWebsite.sln
3.  Add references to any Sitecore assemblies as needed. Make sure to set "Copy Local" to false as John West suggests.
4.  Use a post build step to copy the output of your compiled Web Application project to the location specified in step 1. Or, better yet, use Team Development for Sitecore to handle the deployment for you.
5.  To debug, you will need to make a change to the Web Application project. On the 'Web' tab of the properties for your Web Application project you should choose the "Use Custom Web Server" option and enter in your development Sitecore URL. Once this setting has been specified you can now press F5 to build your project and debug normally. This may require some IIS components to be enabled, depending on your system. This will also work for IIS running on a remote machine (and virtual machines) as long as remote debugging components are installed on the remote machine.

Taking this one step further, you NEED to be using source control and automated builds in your development. [Continuous Integration](http://martinfowler.com/articles/continuousIntegration.html) is also a good practice and possible using Team Development for Sitecore! Cost shouldn't be an excuse either as there are [free](http://subversion.apache.org/) [tools](http://www.jetbrains.com/teamcity/) out there to help you with this!  
We, at [Hedgehog Development](http://www.hhogdev.com), have done a good number of Sitecore [site](http://www.sitecore.net/en/News/Press-releases/2009/Site-of-the-Year-NA-2009.aspx)s this way and we do consider this a best practice. We are able to bring new developers onto a project in minutes and can roll out builds effortlessly.

I would love to get some feedback on this. Please let me know if you love working out of the web root as Sitecore suggests.

**Update 2/2013:** John West has seen the light and now agrees that this approach is sound. [http://www.sitecore.net/en/Community/Technical-Blogs/John-West-Sitecore-Blog/Posts/2010/09/Create-a-Visual-Studio-2010-Project-for-a-Sitecore-Solution.aspx#communitycontent_2_CommentsList_CommentItem_14](http://www.sitecore.net/en/Community/Technical-Blogs/John-West-Sitecore-Blog/Posts/2010/09/Create-a-Visual-Studio-2010-Project-for-a-Sitecore-Solution.aspx#communitycontent_2_CommentsList_CommentItem_14)