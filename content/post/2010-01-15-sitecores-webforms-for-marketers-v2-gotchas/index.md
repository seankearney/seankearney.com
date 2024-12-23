+++
template = "post.html"
date = 2010-01-15
slug = "sitecores-webforms-for-marketers-v2-gotchas"
title = "Sitecore's Webforms for Marketers (v2) Gotchas"
description = ""

aliases = ["/archive/2010/01/15/sitecore-webforms-gotchas.aspx"]

[taxonomies]
tags = ["Sitecore"]
+++

I've recently been doing some work with the Web Forms for Marketers (2.0) module and I must say I was presently surprised! The first version of this module was a rather good first pass, but it typically came up short when we wanted to use it. Version 2 is a big step forward and we are just about to launch a site using it. While it is a great package, and I recommend everyone check it out, it does have some "gotchas."

<!-- more -->

1.  Don't have your designer/front-end-guy cut up their design just yet. The markup that the tool generates is rather complex and it would be easier for you (the developer) to quickly configure the form, preview it, and give that to the front-end-guy as a starting point.
2.  File uploads are placed in the 'master' database. Not appropriate for all production environments where the front end servers do not have access to that database. 
3.  CreateItem save action is also created in the 'master' database.
4.  A DropList that is populated from a Sitecore tree will show values even though they don't have a version in the context language. ([workaround](/post/sitecore-webforms-language-specific-droplist.aspx))

A little UI 'hack' I can pass on is if you need to add some simple formatting in between 'fieldsets' try massaging the actual items of the form. For instance, manually add in a "Form Section" to the form. Give it a special CssClass in the Parameters field and style that as needed.

While I am sure there are more gotchas then what I listed here, these are the ones that stick out in my mind.