+++
date = 2012-05-03
slug = "team-development-for-sitecore-and-configuration-management"
title = "Team Development for Sitecore and Configuration Management"
description = ""

[taxonomies]
tags = ["Sitecore", "TDS", "Configuration"]
+++

![](pain.jpg)One of the major pain points when deploying [Sitecore](http://www.sitecore.net) based web sites has always been configuration management. Sitecore has thousands of lines of configuration scattered across more than a dozen files. 

<!-- more -->

With Sitecore 6 we were given the ability to use 'patch' or 'include' files that greatly helped us manage changes in the Sitecore configuration section. While this was a huge step forward there was still a major problem with this. That problem being, we aren't able to patch, or transform, any configuration outside of the Sitecore section. 

One of the main goals of [Team Development for Sitecore](http://teamdevelopmentforsitecore.com) has always been to ease the deployment of your Sitecore based sites. When we shipped the first version of TDS for Visual Studio 2008 we provided a "File Replacements" feature. This feature let you manage files that may be specific to an environment. This feature worked well in that you were able to deploy environment specific configuration files automatically as part of your build process. The down side to using File Replacements for configuration files is that you needed to manage the entire file for each environment, but there were no alternatives at the time.

When Visual Studio 2010 was released we were given [config transformations](http://msdn.microsoft.com/en-us/library/dd465326.aspx), but this feature has its flaws especially for Sitecore developers. The first major issue is that Visual Studio only supported adding a transform file to the web.config file. Second, in order to transform a file you needed to run it via web deploy (or packaging within Visual Studio). And, finally, many Sitecore developers still work in the web root and transforming a file "in place" would be a bad thing.

As a Sitecore developer using TDS we are able to use Sitecore include files to patch the Sitecore configs and we can leverage TDS file replacements to manage environment specific versions. If we wanted to use a config transform on the web.config file than we would have to use web deploy for our files as opposed to using TDS. It never felt right.

![](pills.jpg)I'm very excited to say that with Version 4 of Team Development for Sitecore we are supporting config transformations as part of the build process! This means that you can use out of the box Visual Studio tooling to add a transform to your web.config file and when TDS builds your solution it will transform the web.config file and deploy or package the transformed file. The really exciting part is that you are able to leverage a Visual Studio add-in such as [SlowCheetah](http://visualstudiogallery.msdn.microsoft.com/69023d00-a4f9-4a34-a6cd-7e854ba318b5) to add transforms to all config files and TDS will transform them too!

Note:

We aren't reliant on SlowCheetah to do the transformation at all. We would recommend that you use it in order to get the ability to add a transform to any config file and to preview the transformed file.