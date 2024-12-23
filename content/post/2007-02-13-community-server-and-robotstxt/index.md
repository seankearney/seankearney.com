+++
date = 2007-02-13
slug = "community-server-and-robotstxt"
title = "Community Server and robots.txt"
description = ""

[taxonomies]
tags = ["Community Server"]
+++

A couple or members lately have had issues ([#1](http://communityserver.org/forums/566086/ShowThread.aspx) + [#2](http://communityserver.org/forums/567914/ShowThread.aspx)) with the way search engines have been indexing their sites.

<!-- more -->

There are few ways to optimize a Community Server installation for search engines.

1.  Make sure that your Site Name and Description are set properly in the Control Panel.
2.  You may want to [edit the resources.xml](http://communityserver.org/forums/548805/ShowThread.aspx) file to adjust the way your title tag is handled.
3.  Something that I don't think that has been mentioned before is to create a `robots.txt` file

There are more than a few pages that exist in a Community Server installation that really don't need to be indexed by a search engine robot. A robots.txt file will keep the spiders off of the pages we don't want them to get.

Here is a starting point for a Community Server `robots.txt` file. If you have any files you think should be blocked from search engines just drop a comment and I will update the post.

Just copy and paste this text into a /robots.txt file:

```txt
#
#
#  robots.txt file for a Community Server based site.
#  Created by Sean Kearney http://www.carknee.com
#
#  

User-agent: *

###########################
# Pages with no real value
Disallow: /error.htm
Disallow: /login.aspx
Disallow: /logout.aspx

###########################
# Directories 
Disallow: /controlpanel/
Disallow: /msgs/
# We want them to get to user profiles, so comment below out
#Disallow: /user/ 

Disallow: /user/CreateUser.aspx
Disallow: /user/EmailForgottenPassword.aspx
Disallow: /user/EditProfile.aspx

# non-essential content (FAQ)
Disallow: /languages/
```