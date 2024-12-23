+++
template = "post.html"
date = 2007-05-09
slug = "carknee-bundle-for-community-server-2007"
title = "CarKnee Bundle for Community Server 2007"
description = ""

aliases = ["/archive/2007/05/09/carknee-bundle-for-community-server-2007.aspx"]

[taxonomies]
tags = ["Community Server", "CarKnee Bundle"]
+++

Now that Community Server 2007 has been out for a while I figured it was time to update the [bundle](/tags/carknee-bundle/)! The Jobs have become Tasks, the Identicon control now has implicit databinding and the CSModules have some little upgrades ;p The new version is now 3.0 to keep in step with the official version of CS2007 3.0

<!-- more -->

Some new features worth noting are:

1. The BlogRssSignature CSModule now supports the use of a “global” signature as well as the previously available per-blog basis signatures. This will allow the main site to also tag their blogs content. For instance, say Billy Bob is a blogger on blogs.acme.com and has added his own signature via the Control Panel to say “Written by Billy Bob.” Now, the Administrator of blogs.acme.com can set the master signature (in the communityserver.config file) to say “Copyright ACME.”
2. The Identicon Control can now bind to the containing Chameleon control. You would typically want to use the Identicon handler in a “Feedback List” (WeblogFeedbackList, GalleryPostFeedbackList, or EntryCommentList) to be used in place of an anonymous avatar. For example, edit your /themes/blogs/[default]/post.aspx where you would normally have the commenters avatar and change it to this: (This is how this site operates... make a comment to see your Identicon)

```html
<CSControl:ConditionalContent runat="server">  
   <ContentConditions>  
     <CSControl:UserPropertyComparison ComparisonProperty1="HasAvatar" Operator="IsSetOrTrue" runat="server" />  
   </ContentConditions>  
   <TrueContentTemplate>  
    <CSControl:UserAvatar runat="server" BorderWidth="1" />&nbsp;   
   </TrueContentTemplate>  
   <FalseContentTemplate>  
    <SK:Identicon runat="server" width="80" BorderWidth="1" Text="identicon"  />   
   </FalseContentTemplate>  
</CSControl:ConditionalContent>
```

Remember to register the tag as follows:

`<%@ Register TagPrefix="SK" Namespace="CarKnee.CS.Bundle.Controls" Assembly="CarKnee.CS.Bundle" %>`

You can also override the implicit binding and manually specify an IP to use as follows:

`<SK:Identicon runat="server" width="80" IP="255.255.255.255" BorderWidth="1" />`

Finally, you have the option to use the IP address of the person viewing the page as follows:

`<SK:Identicon runat="server" width="80" UseAccessingIP="true" BorderWidth="1" />`

3. The flash MP3Player used in the module has been upgraded from 2.1 to 3.7! With this upgrade I have passed down a lot more flexibility to the site owner and blog poster! You can now specify default values in the communityserver.config file and the blog poster can manually specify width and height in their post! To embed an MP3 player you can add it using the content part notation as follows:  
`[mp3 width=300 height=78]/some/path/file.mp3[/mp3]`

Feel free to download the updated [bundle](/tags/carknee-bundle/) and let me know what you think!