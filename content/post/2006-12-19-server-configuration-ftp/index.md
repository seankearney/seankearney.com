+++
date = 2006-12-19
slug = "server-configuration-ftp"
title = "Server Configuration: FTP"
description = ""

[taxonomies]
tags = ["Web Server", "Configuration"]
+++

In the spirit of trying to keep writing, I figured I would write about by new found love of FTP. Well that is a bit of an exaggeration, but on my previous box I used the FTP service built into IIS 5. What a nightmare! Don't get me wrong, the service worked fine and it was stable. The problem came out only when I needed to give someone else access. You need to create an account on the computer, deal with permissions, blah blah blah. I felt it was overly complicated.

<!-- more -->

In walks in [FileZilla FTP Server](http://filezilla.sourceforge.net/). The thing is great. Installation and set it up are a breeze. The real advantage comes into play when you need to add users and groups! You set directory alias' easily and things are great. It has all the bells and whistles such as Logging, IP blocking, passive/active, etc... You can even go so far as creating a web front end to manage users; how simple is that?

I highly suggest you check the program out if you are running a single server with no active directory to manage your users.