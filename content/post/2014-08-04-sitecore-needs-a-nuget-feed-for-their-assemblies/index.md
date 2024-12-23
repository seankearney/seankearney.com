+++
template = "post.html"
date = 2014-08-04
slug = "sitecore-needs-a-nuget-feed-for-their-assemblies"
title = "Sitecore needs a NuGet feed for their assemblies"
description = ""

[taxonomies]
tags = ["Sitecore"]
+++

![](call-to-action.jpg)This is a call to action for Sitecore to start hosting a NuGet feed of all common Sitecore assemblies. However, lets take a look at how the Sitecore development process has changed over the years.

<!-- more -->

Historically, Sitecore [told](http://sdn.sitecore.net/Articles/API/Using%20Visual%20Studio%20,-d-,Net.aspx) developers to [work in the 'web root'](http://www.sitecore.net/learn/blogs/technical-blogs/john-west-sitecore-blog/posts/2010/09/create-a-visual-studio-2010-project-for-a-sitecore-solution.aspx). This meant that you had direct access to the Sitecore assemblies as they were already in your bin directory. Some developers would even go so far as to check the entire Sitecore application, along with their code, into source control (yuck!). Some more advanced shops had very complex processes in place to 'stand up' up a Sitecore instance (think Sitecore SIM) before deploying custom code. Builds and deployments of Sitecore sites were typically very haphazard consisting of developers building locally, xcopy code deployments, and manual Sitecore package creation and installation. There weren't many developers writing 'shared source modules' back then either. Developers who were doing it were working in a Sitecore provided SVN system. They built their module, created a Sitecore package and checked it in to SVN.

So what has changed over the last five years?

1.  [Team Development for Sitecore](http://teamdevelopmentforsitecore.com) (TDS) (Sitecore serialization and other ways to source control your Sitecore items)
2.  While Sitecore hasn't officially changed their stance about '[working outside of the web root](/post/Visual-Studio-Projects-and-Sitecore)', [John West](http://www.sitecore.net/learn/blogs/technical-blogs/john-west-sitecore-blog/posts/2010/09/create-a-visual-studio-2010-project-for-a-sitecore-solution.aspx#content_0_row2_0_communitycontent_2_CommentsList_CommentItem_14) and a majority of the community has accepted it as best practice.
3.  There are A LOT more Sitecore developers creating modules these days.
4.  Git[Hub] has become the De facto standard for open source projects.
5.  Sitecore has gotten out of the SVN hosting business; they created the Marketplace to aggregate modules.
6.  Visual Studio changes (extensions such as Sitecore Rocks, Package web, Slow Cheetah, etc...)
7.  Web Deploy technologies
8.  Build (and deploy) server availability and adoption
9.  NuGet

Let us consider the current process of developing an open source Sitecore Module.

The general approach, for me, would be to create a VS solution with a Web App project and a TDS project. I'd grab Sitecore DLLs from somewhere else on my system, copy them to my code workspace and put them in a 'lib' folder. I'd make the appropriate references to these libraries and begin coding. When I was all done, and ready to put the code in the public domain I'd have to remember to not commit the Sitecore DLLs and add a ReadMe telling other developers to add them. In fact, GitHub is filled with [ReadMe files saying “grab the sitecore.kernel.dll from your Sitecore installation”](https://github.com/search?q=sitecore.kernel.dll&type=Code). This is sooo 2009.

Now, once the code is up on GitHub, I would ideally have some automated build process that will build each commit that happens and make the module available to everyone. There are plenty of build server options out there these days (hosted TeamCity, Jenkins, VS Online, AppVeyor, etc...) and there really is no reason to not have this in place – except for the little problem of the build server not having easy access to the required Sitecore DLLs! Obviously, the thing that is building your code requires the dependencies; however, if we can't put the Sitecore DLLs in the source control repo, what are we to do?

Sitecore has the ability to fix that problem by 'simply' providing a NuGet feed of their assemblies! NuGet isn't going anywhere. In fact ASP.NET VNext (which is currently in CTP 2) is basically all package based. Rather than having a ReadMe file that tells the developer to go fetch the assemblies manually, the project should simply have a reference to a specific Sitecore NuGet package. 

I understand that Sitecore may not want to make their assemblies publicly available on the main NuGet feed, so why not have a private feed? Hosting a NuGet feed is trivial or there are third party providers (as they know, since Sitecore Rocks is using one). 

I've tweeted in the past asking for this, but a tweet has a short life. It is time to throw this out there to the community. Will, what I am proposing, make developing/building/distributing Sitecore sites and modules easier?

So what, you may ask, is the reason I bring this up again now? I'm glad you asked! There will be some upcoming blog posts outlining how I am revamping the build process for a Sitecore open source module.