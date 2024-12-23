+++
template = "post.html"
date = 2011-01-11
slug = "sitecore-item-and-version-design-flaw"
title = "Sitecore item and version design flaw"
description = ""

[taxonomies]
tags = ["Sitecore", "Bug"]
+++

I have a multi-lingual Sitecore (6.2) site that has been having **many** issues with item versions showing up in their site myseteriously. The client has over 12 languages in their site and certain items shouldn't be accessible to certain languages. Now, Sitecore says simply don't create a version of the item and it won't appear in the site for the language. Perfect? Nope.

<!-- more -->

There are dozens of pages scattered in the Sitecore tree that shouldn't exist in the English site. However, on any given day one of these pages starts showing up in the English site. There isn't an English site author creating a version and, to make it even more frustrating, there is no audit trail of them being created! I've logged about 10 'bugs' with Sitecore on ways to have these versions magically appear in the tree (and there are more that I haven't reported). Most of them have been addressed with hot-fixes, but I think it boils down to one fundamental issue with Sitecore...

**A Sitecore item NEEDS at least one version. **Shared fields are the reason we need a version. A "shared field" is a field whos value has no boundaries. The value is available to all versions in any language. Things like workflow, security, display name, sort order, etc... are stored in a shared field **on a version of an item**. If you have an item with no version than it has no security, display name, or sort order.

This leads me to one of my bugs. As an example, try this.

Create a little subtree of five items names 1, 2, 3, 4 and 5. Now:

1.  Remove all versions from this item
2.  Sort item '5' using the 'First' sorting button
3.  Sort item '5' moving it 'Down' below item '1'

You should now observe that there is a version for every item in our subtree. We only worked on item '5' yet all items have a version. This shouldn't happen; I never told it to create a version!

Once you introduce multiple languages into the equation it gets better! Say you have this same sub-tree and they all have a version in English. Now, change the language you are working on within Sitecore to Danish and resort the tree. You will notice that Sitecore went ahead and created Danish versions of all the items. Worth noting is that the version that was created would have bypassed any language security too. Why couldn't Sitecore just save the sort field on the English version (it is a shared field)?

I will admit that my example is a bit contrived. It probably would never exist as is, but we do have a client that has items scattered in their tree that do not have any versions. I will also admit that this could be a training issue, but I still feel it raises a fundamental flaw in the system.

I think the first step in fixing the problem is that there NEEDS to be at least one version of an item. The "Remove Version" button should check to see that it isn't the last version of all languages. If it is the last version then it can't be deleted.  

I would love to hear your thoughts.

P.s. I haven't seen Sitecore 7.0, but I can imagine that the fundamental architecture changes with it will (hopefully) address this.