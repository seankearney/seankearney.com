+++
template = "post.html"
date = 2016-04-01
slug = "is-your-sitecore-module-development-and-build-process-ideal"
title = "Is your Sitecore module development and build process ideal?"
description = ""

[taxonomies]
tags = ["Sitecore"]
+++

I maintain a fairly well used "[Field Fallback Module](https://marketplace.sitecore.net/en/Modules/Field_Fallback.aspx)", which was released in June 2012. The code for this module is [available on GitHub](https://github.com/HedgehogDevelopment/sitecore-field-fallback) and it has been setup with a very simple build process that has remain unchanged since day one. The module isn't under heavy development, but there have been a couple bugs reported lately. I took this opportunity to revisit the build and deploy process and see if we couldn't modernize it a bit.

<!-- more -->

Currently. the steps required to update the module are:

1. Clone repo
2. Ensure we have Sitecore assemblies as required by readme
3. `branch` Develop and Test
4. Update the various AssemblyInfo.cs files and TDS projects with the new version number
5. Switch VS into the 'Release' configuration
6. Build the solution in Visual Studio
    - The process takes all 'artifacts' and copies them to the `/release` folder
7. Commit locally [merge to master]
8. Add a Tag to the repo
9. Push to GitHub

While this process works just fine I am not happy with the manual steps in 2, 4, 5 and 6. Furthermore, the actual releases are stored in source control, which is not ideal.

Ideally, I want my process to be this:

1. Clone repo
2. `branch` Develop and Test
3. Commit `merge`
4. Tag the repo
5. Push to GitHub
6. Automatic build with artifact hosting

So, how can we achieve this? The following posts will outline the steps to get a proper build process around your Sitecore module.

1.  [Private NuGet feed of Sitecore assemblies](/post/Working-around-the-missing-Sitecore-NuGet-feed)
2.  Configuring TDS for hosted builds
3.  AppVeyor builds with automated versioning and publishing releases to GitHub