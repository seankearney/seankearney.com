+++
date = 2007-05-11
slug = "extendedattribute-condition-control"
title = "ExtendedAttribute Condition Control"
description = ""

[taxonomies]
tags = ["Community Server", "CarKnee Bundle"]
+++

I was working a new control for the [bundle](/tags/carknee-bundle/) and was in need of a [condition control](http://getben.com/archive/2007/01/15/introduction-to-chameleon-condition-controls.aspx) within Community Server that didn't appear to exist. What I needed was a condition control that checked against a WeblogPost's ExtendedAttributes. What I came up with was the "*PostExtendedAttributeComparison.*"

<!-- more -->

I use this comparison as follows:

```html
<CSControl:ConditionalContent runat="server">
    <ContentConditions>
        <SK:PostExtendedAttributeComparison runat="server" ExtendedAttribute="AuthorEmail" Operator="IsSetOrTrue" />                                        
    </ContentConditions>
    <TrueContentTemplate>
        <SK:PostGravatar runat="server" Rating="R" ExtendedAttribute="AuthorEmail" Width="80" BorderWidth="1" />
    </TrueContentTemplate>
    <FalseContentTemplate>
       <SK:Identicon ID="Identicon1" runat="server" width="80" BorderWidth="1" Text="identicon"  />                                      
    </FalseContentTemplate>
</CSControl:ConditionalContent>
```

This checks to see if the extended attribute "AuthorEmail" is set in the blog comment. If it is set, then we will show the person's Gravatar, otherwise we will show the Identicon.

The WeblogPostFeedbackExtendedAttributeComparison control can be found in the [bundle](/tags/carknee-bundle/). Remember to register the control as:

`<%@ Register TagPrefix="SKB" Namespace="CarKnee.CS.Bundle.Blogs.Controls" Assembly="CarKnee.CS.Bundle" %>`

Related Articles:

*   [How to set the AuthorEmail extended attribute for a blog comments](/post/save-authors-email-for-anonymous-blog-comments)
*   [How to show Gravatars for blog post comments](/post/gravatars-for-anonymous-comments)