+++
template = "post.html"
date = 2007-01-30
slug = "embed-an-mp3-player-in-community-server-posts"
title = "Embed an MP3 Player in Community Server Posts"
description = ""

[taxonomies]
tags = ["Community Server", "CarKnee Bundle"]
+++

A member on the Community Server forums asked about [embedding an MP3](http://communityserver.org/forums/565695/ShowThread.aspx) player in his blog posts and I thought this would be a great addition to the bundle!

<!-- more -->

To implement this we are going to create a basic CSModule that works off of the PreRenderPost event. In our module we will try to match text that looks like this 

`[mp3]*Some Uri*[/mp3]`

and turn it into a Flash MP3 Player pointing to the specified Uri.

Our code is very simple and looks like this:

```c#
Post post = content as Post;  
if ((post != null) && (e.Target == PostTarget.Web))  
{  
  Match Mp3Match = Regex.Match(post.FormattedBody, @"\[mp3\](.*?)\[/mp3\]", RegexOptions.IgnoreCase);  

  if (Mp3Match.Success)  
  {  
    string uri  = Mp3Match.Value;  
    uri = uri.Substring(5, uri.Length - 11);  
    post.FormattedBody = Regex.Replace(post.FormattedBody, @"\[mp3\](.*?)\[/mp3\]", CreatePlayerCode(uri), RegexOptions.IgnoreCase);  
  }                  
}
```

The MP3 Player I decided to use for this can be found [here](http://www.jeroenwijering.com/?item=Flash_MP3_Player). 

To use this module all you need to do is insert the following code into your post:

`[mp3]http://www.example.com/File.mp3[/mp3]`

It will automatically turn your link into a flash based MP3 player as shown here:

`[mp3 width=300 height=78]/blogs/files/test.mp3[/mp3]`

There is an issue with cross site loading of MP3 files though. If you are linking to a file that resides outside of your domain you will need to have a [crossdomain.xml](http://www.crossdomainxml.org/) file on the domain you are linking to. This is a security feature built into the Flash Player.

To install this, download the [bundle] and follow the directions in the readme.txt file.

The [cs] module used to show this player has been updated. Please read this post for the [updated version](/post/carknee-bundle-for-community-server-2007). 