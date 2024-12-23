+++
date = 2008-03-18
slug = "community-server-enterprise-search-syntax"
title = "Community Server Enterprise Search Syntax"
description = ""

[taxonomies]
tags = ["Community Server", "Search", "Lucene"]
+++

Everyone (?) knows that Community Server uses Lucene for its Enterprise Search. The one problem I found is that I couldn't find any search syntax documentation in the CS Docs. Here is a list of all index fields that CS uses:

<!-- more -->

app: (forums|photos|files|weblogs)  
applicationkey: The application key the post is in  
applicationtype: (Forum|Gallery|FileGallery|Weblog)  
attachementname: Any attachement name  
date: The date the post was made  

user: The username of the poster  
userid: The userid of the poster  

settingsid: The settings id the post was made in  
groupid: The group id the post was made in  
sectionid: The section the post was made  
threadid: The thread id of the post  
parentid: The parent post if  
postid: The post id  

name: The name of the post  
title: The Title of the post  
body: The Body of the post (stripped of HTML)  
rawbody: The Body of the post  
tag: The tags on the post  
tagkeyword: the lowercase version of the tags  
url: The relative URL to the post  

role:  
exact: ?  
link: ?  

To search on these fields, just user something like "user:CarKnee" to see all carknee's posts.