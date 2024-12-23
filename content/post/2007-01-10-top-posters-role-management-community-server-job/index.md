+++
template = "post.html"
date = 2007-01-10
slug = "top-posters-role-management-community-server-job"
title = "Top Posters Role Management Community Server Job"
description = ""

[taxonomies]
tags = ["Community Server", "CarKnee Bundle"]
+++

"Rocket City Web" of the Community Server forums [asked](http://communityserver.org/forums/thread/563175.aspx) if it is possible to limit top posting members to a certain forum. At first, I had though the member points system would be perfect for this. However, Member Points is an add-on and not available for the "Personal Edition" of Community Server. Dave Burke mentioned that you should just add top posting users to a specific Role and grant that Role access. I thought this would be perfect for a CSJob!

<!-- more -->

This was created in all of 15 minutes and it is all packaged up nicely for you [here](/files/folders/cs/entry82.aspx).

Here's the code:

```c#
public class AddPostersToRoleJob : IJob  
{  
    private int minPosts = -1;  
    private string roleName = String.Empty;  

    public AddPostersToRoleJob() { }  

    public void Execute(XmlNode node)  
    {  
        try { minPosts = int.Parse(node.Attributes[<span class="str">"minPosts"].Value); }  
        catch { }  

        try { roleName = node.Attributes[<span class="str">"roleName"].Value; }  
        catch { }  

        // It is required that the job be setup properly  
        if (minPosts <= 0 || String.IsNullOrEmpty(roleName))  
            return;  

        SiteSettingsManager.IterateSiteSettings(new SiteSettingsListIterator(AddPosters));  
    }  

    private void AddPosters(int settingsid)  
    {  
        CSContext.Create(settingsid);  

        // get the users.  
        UserQuery q = new UserQuery();  
        q.PageSize = int.MaxValue;  
        UserSet users = Users.GetUsers(q, false);  

        // If there are no users, get out.  
        if (!users.HasResults)  
            return;  

        // Loop Through the users  
        foreach (User u in users.Users)  
        {  
            // if the posts are above the specified min  
            if (u.TotalPosts >= minPosts)  
            {  
                // and they are not already in the role  
                if (!u.IsInRoles(new string[] { roleName }))  
                {  
                    // add them to the role  
                    Roles.AddUserToRole(u.Username, roleName);  
                }  
            }  
        }  

    }  
}
```

The routine is fairly straight forward. When the job executes it gets the specified minimum posts and role name from the communityserver.config file. The one part that could have some [discussion](http://joeriksson.com/archive/2006/10/18/Getting-into-Context-with-your-CSJobs.aspx) is the SiteSettingsManager.IterateSiteSetting method. I like to programatically loop through all sites in my CS installation, but you could hard code the default SettingsID of 1000 if performance is an issue.

Let me know how it works out for you if you use it!