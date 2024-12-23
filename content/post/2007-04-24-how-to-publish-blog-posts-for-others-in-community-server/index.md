+++
template = "post.html"
date = 2007-04-24
slug = "how-to-publish-blog-posts-for-others-in-community-server"
title = "How to publish blog posts for others in Community Server"
description = ""

[taxonomies]
tags = ["Community Server"]
+++

A few members, myself included, are looking for some sort of "content manager" capability with the blog system of Community Server. By "Content Manager" I am meaning that I do not want the individual people to actually make the posts. Rather, I would like to have a "manager" that will publish the post on the authors behalf.

<!-- more -->

In order to do this with Community Server 2007 you do need to modify some core files. I will show what needs to be done ;p

`/ControlPanel/Blogs/CreateEditBlogPost.ascx` page

Around line #166 add in the following:

```html
<!-- CarKnee Author Mod-->
<asp:Panel ID="AuthorPanel" runat="server" Visible="false">
    <div class="CommonFormFieldName">
        Author:
    </div>
    <div class="CommonFormField">
        <asp:textbox id="AuthorName" cssclass="ControlPanelTextInputBig" maxlength="256" runat="server" />
    </div>
</asp:Panel>
<!-- END CarKnee -->
```

In the code behind (**/ControlPanel/Blogs/CreateEditBlogPost.ascx.cs**) modify it in the following places:

```
Line 47 Add:

protected TextBox AuthorName;
protected Panel AuthorPanel;

Around Line 176 add this in:

if (CSContext.Current.User.IsBlogAdministrator)
    AuthorPanel.Visible = true;
else
    AuthorPanel.Visible = false;

Line 277 Add:

AuthorName.Text = CommunityServer.Users.GetUser(CurrentWeblogPost.AuthorID, false).Username;
AuthorName.ReadOnly = true;

Around Line 504 look for this: postID = context.PostID; and add this right under it:

string authorname = String.IsNullOrEmpty(AuthorName.Text) ? CommunityServer.Users.GetAnonymousUser().Username : AuthorName.Text;
if (CommunityServer.Users.GetUser(authorname) == null || CommunityServer.Users.GetUser(authorname).IsAnonymous)
  authorname = context.User.Username;
CommunityServer.Components.User u = CommunityServer.Users.GetUser(authorname);

post.AuthorID = u.UserID;
post.Username = authorname;

Around Line 524 look for this:

result = WeblogPosts.Add(post, context.User, out postID);
```

and change it to this:

result = WeblogPosts.Add(post, u, out postID);

You will need to recompile the core if you make the change to the .cs file.