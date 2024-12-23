+++
date = 2006-12-19
slug = "server-configuration-directories"
title = "Server Configuration: Directories"
description = ""

[taxonomies]
tags = ["Web Server", "Configuration"]
+++

I have been running my own web server for a few years now and like everyone who does this I have my own ways to do things. One of the things I wanted to revisit, before setting the new machine out into the wild, was my typical directory structure. While this may seem like a trivial concept to many, things can get out of control quikly when you start throwing in many domains, sub domains, Log files, databases, etc...

<!-- more -->

Here is my current directory structure.

```
X:\Websites\
  |--domain.com
    |--subDomain
      |--Logs
      |--Web
      |--Any Other Directory Needed (client files, a private directory (data), etc...)
    |--subDomain2
      |--[see above]
```
So far I am liking this setup! I could have taken it up a level and gone so far as:

```
X:\Websites\
  |--com
    |--domain
      |--subDomain
        |--[see above]
```

I felt that for the most part any domain where I am running the .com, the .net will be the same content. My chosen setup would probably not work for everyone, and the second method may be how Community Server runs things since their CommunityServer.com and CommunityServer.org are two separate sites.

I don't know how web hosts setup their servers, but their requirements would be MUCH different than mine. The other thing I do like about my new setup is how I can configure FTP to give access to the website and logs easily! I will get into FTP setup in another post.

![](DirectoryStructure.gif)

