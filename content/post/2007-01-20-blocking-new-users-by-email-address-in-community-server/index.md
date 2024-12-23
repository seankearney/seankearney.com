+++
template = "post.html"
date = 2007-01-20
slug = "blocking-new-users-by-email-address-in-community-server"
title = "Blocking new users by email address in Community Server"
description = ""

[taxonomies]
tags = ["Community Server", "CarKnee Bundle"]
+++

A couple of members on the [Community Server](http://communityserver.org/) forums wanted a way to [block new members](http://communityserver.org/forums/thread/561844.aspx) based on known SPAM domains. This sounded like a great idea for a CSModule. I looked at the list of events and saw that there is an event fired off before and after a user is created! Great! The PostUserUpdate event fires off after the user has been added to the database. This seems like the perfect place to change their account status, or moderation level, based on their email address.

<!-- more -->

The `PostUserUpdate` event allows me to modify the user before or after they are created, but it will not allow me to stop the registration process. While I could have just destroyed the user in the module, this would throw a nasty little error. Furthermore, if the person was legit you would need to disable the module to register them. With auto-banning them you can change them from banned to not-banned (or moderated to not moderated) in the control panel. The other possibility, which I hadn't tried, was that I could modify the user and set their email address to the anonymous user's email (anonymous@localhost.com) and this would throw a duplicate email address error. This module will **not prevent** a user from registering based on email.

This CSModule runs off of the PostUserUpdate event. If the user's email address matches a regular expression then we modify their account as either **Banned** or **Moderated**. We configure the module in the CommunityServer.config file as follows:

```xml
<add name = "NewMemberModerationModule" type = "CarKnee.CS.Bundle.NewMemberModerationModule, CarKnee.CS.Bundle">  
  <add domain="mailinator\.com$" action="ban" />  
  <add domain="(.+)freemail(.+)" action="moderate" />  
</add>
```

We set the domain we want to match and the action we want to take (ban or moderate). It is that simple!

If a user is banned, they will not be able to make a post at all. They will get a message saying that their account has been banned for spamming. 

![](http://www.carknee.com/photos/blogpics/images/99/original.aspx)

If a user is Moderated, they will get a message saying that their post needs to be approved. Note that this will only work if a forum is configured to moderate posts!

![](http://www.carknee.com/photos/blogpics/images/100/original.aspx)  

I toyed around with other options such as setting their account status to "Pending," but Community Server auto-logs in the user after registration (if the site is setup for automatic approval) even though their status is set to Pending. I do believe this is a bug! I think line 436 of [CreateUser.cs](http://code.communityserver.org/?path=CS+Tree%5cCS+2.1%5cControls%5cUser%5cCreateUser.cs) should look something like:

`if (csContext.SiteSettings.AllowLogin && user.AccountStatus != UserAccountStatus.ApprovalPending)`

If the site didn't log them in automatically, they would be presented the following message upon login:

 ![](http://www.carknee.com/photos/blogpics/images/101/original.aspx)

Since ApprovalPending didn't work I limited this Module to either a Ban or Moderate setting.

The code for the module is also pretty simple, but it is a bit long to post here.

This CSModule along with the "[Top Poster Role Management Job](http://www.carknee.com/archive/2007/01/10/top-posters-role-management-community-server-job.aspx)" are packaged together into the "[CarKnee Bundle](/files/folders/cs/entry82.aspx)"

Download Here: [http://www.carknee.com/files/folders/cs/entry82.aspx](/files/folders/cs/entry82.aspx) 