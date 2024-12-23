+++
template = "post.html"
date = 2010-04-27
slug = "my-sitecore-development-environment"
title = "My Sitecore Development Environment"
description = ""

[taxonomies]
tags = ["Sitecore", "Basics"]
+++

This post if mainly in response to a question that was asked, and subsequent [tweet](http://twitter.com/techphoria414/statuses/12657227972), during my session at Dreamcore 2010.

<!-- more -->

The shortened version of the question was essentially: How do I debug?

The answer I gave was that I "Attach to the W3WP Process." However, I feel that this answer was a little out of context so I will try to clarify.

I prefer to keep my code and my Sitecore web root separate. I feel that having a bunch of .csproj and .sln files under the Sitecore web root is cluttered and messy. Furthermore, I do not want to be able to mistakenly add Sitecore files to my source code repository; do you really want the /sitecore/shell directory in source control? Being that I am a big proponent of the [Team Development for Sitecore](http://www.hhogdev.com/products/team-development-for-sitecore.aspx) product I am easily able keep my code separate from Sitecore's code because TDS handles the code deploying for us; when I build it will push my code to my web root.

To expand upon this further, the way I choose to work for my day-to-day development is that I have Visual Studio, and my code workspace, on my local machine. My Sitecore website, however, is running inside a virtual machine! There are two main reasons I choose to keep Sitecore off of my local machine:

1.  It is a throwback to my days working on an XP workstation. You were only allowed a single IIS website (yes, I know there were 'hacks' to allow for more)
2.  Some sites that I develop have dependencies on 3rd party applications; Coveo search being a popular one. I want Coveo running on my local machine almost as much as a virus so I setup a VM for Sitecore and Coveo.

So, being that I have my code local and Sitecore on a VM I need to remote debug by attaching to the process on my VM. This is why my quick answer to the question was that "I attach to the W3WP process."

I want to stress that this is by no means how I am telling you to work, but it is what works best for me.

*   In the event you choose to keep your code underneath the Sitecore web root on a local machine, then you should be able to use the 'Cassini' web server. 
*   If you prefer to keep your code separate from your web root, but on the same machine, then (either with TDS or modifying the build output path) you would be able to configure the ASP.NET Web Application project to use a "Custom Web Server" and simply press F5.