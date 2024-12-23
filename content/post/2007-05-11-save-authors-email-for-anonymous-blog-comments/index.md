+++
template = "post.html"
date = 2007-05-11
slug = "save-authors-email-for-anonymous-blog-comments"
title = "Save Author's Email for Anonymous Blog Comments"
description = ""

[taxonomies]
tags = ["Community Server", "CarKnee Bundle"]
+++

I am working on a control for Community Server where I need to capture the email address of the person making a comment. However, I don't need to store the email address if the person is already a registered member of the site since this information is stored already. What I did was utilize the [*CustomAction*](http://getben.com/archive/2007/01/16/introduction-to-chameleon-action-controls.aspx) feature for the WeblogPostCommentForm and set the "AuthorEmail" extended attribute.

<!-- more -->

Here is how you can do it.

On the /themes/blogs/[default]/Post.aspx page locate your WeblogPostCommentForm and set the following:

```
<SuccessActions>  
...  
<CSControl:CustomAction runat="server" OnCustomEvent="CommentFormSuccess" />
</SuccessActions>
```

This will wireup the call to this function that you must add to the top of the page:

```c#
protected void CommentFormSuccess(System.Web.UI.Control sender, object parameter)  
{  
    CommunityServer.Blogs.Components.WeblogPost post = parameter as CommunityServer.Blogs.Components.WeblogPost;  
    if (post == null)  
        return;  
    if (!post.User.IsAnonymous)  
        return;  
    CommunityServer.Blogs.Controls.WeblogPostCommentForm form = sender as CommunityServer.Blogs.Controls.WeblogPostCommentForm;  
    if (form == null)  
        return;  
    System.Web.UI.WebControls.TextBox email = WeblogControlUtility.Instance().FindControl(form, "tbEmail") as System.Web.UI.WebControls.TextBox;  
    if (email == null)  
        return;  
    if (String.IsNullOrEmpty(email.Text))  
        return;  
    post.SetExtendedAttribute("AuthorEmail", email.Text);  
    WeblogPosts.Update(post);  
}
```

The final step would be to add in the TextBox to prompt for the users email. What I did was wrap it up in a placeholder and only show it for non-RegisteredUsers.

```html
<CSControl:PlaceHolder runat="server">  
    <DisplayConditions Operator="Not">  
        <CSControl:UserInRoleCondition runat="server" Role="Registered Users" UseAccessingUser="true" />  
    </DisplayConditions>  
    <ContentTemplate>  
        <div class="CommonFormFieldName">  
            Email:  
            <em>(<CSControl:ResourceControl runat="server" ResourceName="Optional" />)</em>  
        </div>  
        <div class="CommonFormField">  
            <asp:TextBox id="tbEmail" runat="server" Columns="60" />  
            <asp:RequiredFieldValidator id="emailValidator" runat="server" ControlToValidate="tbEmail" Cssclass="validationWarning">*</asp:RequiredFieldValidator>  
        </div>  
    </ContentTemplate>  
</CSControl:PlaceHolder>
```

Now, when someone enters in their email address it will be stored in the ExtendedAttributes of the post.

[Read on](/post/gravatars-for-anonymous-comments) to see how I use this information.