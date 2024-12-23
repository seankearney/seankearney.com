+++
date = 2007-07-16
slug = "sitecore-renderings-when-item-is-no-longer-published"
title = "Sitecore Renderings when item is no longer published"
description = ""

[taxonomies]
tags = ["Sitecore"]
+++

This is more of a note to self post...

I was creating a Sitecore (5.3.1) XSL rendering and I was looping over items. I noticed, however, that when one of those items is no longer published it was still looping through it! What you need to do it change your if statement from:<xsl:if test="$itm_id"> to: <xsl:if test="sc:item($itm_id,.)">