+++
template = "post.html"
date = 2007-01-23
slug = "identicons-for-community-server"
title = "Identicons for Community Server"
description = ""

[taxonomies]
tags = ["Community Server", "CarKnee Bundle"]
+++

Jeff Atwood posted up a [C# implementation of Identicons](http://www.codinghorror.com/blog/archives/000774.html) the other day. While I do not see them being all that useful, they are pretty neat. I whipped up a little Community Server Add-on that can display an Identicon.

<!-- more -->

The code is more or less right from Jeff; I modified image caching to use Community Server caching rather than the straight up HttpRuntime Cache. 

I currently use this as a replacement link for the comments permalink in my blog (it used to use '#'). To see an example of these in action, just make a comment on this blog post. Once your comment appears you should have your unique Identicon!

This Community Server Add-On is packaged up into the [CarKnee Bundle](/tags/carknee-bundle/).