+++
date = 2007-02-02
slug = "servertransfer-modifying-form-action-and-mac-error"
title = "Server.Transfer, Modifying Form Action, and MAC Error"
description = ""

[taxonomies]
tags = ["ASP.NET"]
+++

I had been getting this error:

<!-- more -->

#### `Validation of viewstate MAC failed. If this application is hosted by a Web Farm or cluster, ensure that <machineKey> configuration specifies the same validationKey and validation algorithm. AutoGenerate cannot be used in a cluster.`

I scoured the net and none of the suggested resolutions (EnableViewStateMac) were working for me, so I decided to dig in a little bit.

Here is my situation:

I have a page, 'X', that does a Server.Transfer to page 'Y'. Y is a form that enters information into a database upon pressing a button. Upon pressing the button to submit the information, the error would fire off. If I ran page Y without Transferring to it, the page would work normally. As I mentioned above, no typical work around was working for me.

The reason that no typical solution was working for me is that I have a "base page" that I use for all the pages on my site. In this base page I do a couple things, one of which is that I alter the action attribute of my `<form>` tag. I do this because I have a custom UrlReWriting HttpModule and I need my actions to match the URI in the address bar of the browser, not the virtual path to the executing script.

What was happening was that Y's action was still set to X! The resolution for me was to add a property to my base page that would disable altering the form's action. The page now has page Y posting back to page Y and everybody is happy!