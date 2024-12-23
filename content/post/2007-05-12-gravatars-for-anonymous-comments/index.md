+++
template = "post.html"
date = 2007-05-12
slug = "gravatars-for-anonymous-comments"
title = "Gravatars for Anonymous Comments"
description = ""

[taxonomies]
tags = ["Community Server", "CarKnee Bundle"]
+++

With Community Server, when a registered user makes a blog comment it is very common to show their avatar next to their comment. If the person making the comment is not a registered user, then typically the "anonymous avatar" would be shown. I had gone and implemented an [Identicon](/post/identicons-for-community-server) control for anonymous comments and now I am going another step and implementing a [Gravatar](http://www.gravatar.com/).

<!-- more -->

The *PostGravatar* control (in the [bundle](/tags/carknee-bundle/)) can be used within a WeblogFeedbackList to show the Gravatar of the person who commented.

The last three blogs posts I made have all the pieces of the puzzle, now lets put them together!

1.  We need to store the persons email address if they are an anonymos user.   
See here:
2.  We need to show different items based on some criteria   
See here:
3.  *   If registered --> Show Avatar
    *   If not registered and specified email address --> Use PostGravatar control
    *   If not registered and didn't specify an email --> Use Identicon control

I attached the code for a /themes/blogs/default/post.aspx page. If you are using a different theme you will need to modify it as needed.