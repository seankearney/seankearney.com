+++
template = "post.html"
date = 2016-04-02
slug = "working-around-the-missing-sitecore-nuget-feed"
title = "Working around the missing Sitecore NuGet feed"
description = ""

[taxonomies]
tags = ["Sitecore"]
+++

This is my second post in the [series around Sitecore module development](/post/is-your-sitecore-module-development-and-build-process-ideal) as well as a follow up post to [Sitecore needs a NuGet feed for their assemblies](/post/sitecore-needs-a-nuget-feed-for-their-assemblies).

<!-- more -->

As of this post Sitecore has yet to release NuGet packages of their assemblies on any feed (public or private). Alen Pelin, of Sitecore, did release a tool in 2014 that can [generate Sitecore NuGet packages](http://www.alen.me.uk/2014/10/internal-sitecore-nuget-server.html)([code](https://bitbucket.org/sitecoresupport/sitecore-nuget-packages-generator/wiki/Home)) and we've been using that at Hedgehog Development since day 1.

Based on a Twitter 'conversation' that Alen and I had, the original idea with this tool was that all Sitecore developers could create, and host, their own Sitecore NuGet packages. As long as everyone generated the same NuGet packages then the developers could share solutions and the packages would magically be found in the private feed.

Over time Alen has changed the package names and nuspecs. For teams purely doing internal development this isn't much of a problem. They can decide what version of the package generator to use and ensure all developers in the company have access to all required packages. For open source development, however, it does introduce some pain. It is likely that an open source developer will need to have a feed with all variants of the NuGet packages that Alen's tool generates.

Hedgehog, as of this writing, continues to use packages generated from version `1.0.0.0`. We have a private feed running on-prem and use NuGet to bring in references to required Sitecore assemblies.

In the next blog post in [this series](/post/Is-your-Sitecore-module-development-and-build-process-ideal) we will discuss