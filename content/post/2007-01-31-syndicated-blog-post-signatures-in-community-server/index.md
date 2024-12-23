+++
date = 2007-01-31
slug = "syndicated-blog-post-signatures-in-community-server"
title = "Syndicated Blog Post Signatures in Community Server"
description = ""

[taxonomies]
tags = ["Community Server", "CarKnee Bundle"]
+++

Another day, another Community Server add-on!

<!-- more -->

A member in the Community Server forums needs a way to [add a statement to every blog post](http://communityserver.org/forums/thread/565540.aspx) that is syndicated in order to prevent scrapers from "using" their content with no mention of the rightful owner. This seems like a real good idea for anyone, including me, who syndicates their content. [Jose Lema](http://www.tankete.com/core/blogs/jose_lema/default.aspx) came through with the basic idea of how to handle this situation so I figured I would run with it.

The code, as Jose provided, is real simple however I wanted to make it easy to change the "RSS Signature." I figured we could store the signature text in an ExtendedAttribute rather than a config file so here is what I have:

```c#
public void Init(CSApplication csa, XmlNode node)
{
  csa.PreRenderPost += new CSPostEventHandler(csa_PreRenderPost);
}

void csa_PreRenderPost(IContent content, CSPostEventArgs e)
{
  WeblogPost post = content as WeblogPost;
if (post == null)
    return;
  if (e.ApplicationType == ApplicationType.Weblog && e.Target == PostTarget.Syndication)
  {
    string sig = post.Section.GetExtendedAttribute("BlogRssSignature");
    if (String.IsNullOrEmpty(sig))
      return;
    post.FormattedBody = String.Concat(post.FormattedBody, sig);
  }
}
```

Now for the Control Panel Administration of the signature. I do not like modifying the core code for Community Server; it makes it a pain to handle updates. So what I did was create a new page to handle the setting of the extended attribute, with the codebehind residing in my [bundle](/tags/carknee-bundle/). The result is a simple page to create/edit the signature text used for your blog. I should also mention that I dislike having to edit language xml files for basic text. Again, this is just a pain for installing quick modules, but if you are using any language other than English you will have to manually edit the aspx file.

Create your signature:

[![](http://www.carknee.com/photos/blogpics/images/164/secondarythumb.aspx)](http://www.carknee.com/photos/blogpics/images/164/original.aspx)

And here it is:

[![](http://www.carknee.com/photos/blogpics/images/165/457x169.aspx)](http://www.carknee.com/photos/blogpics/images/165/original.aspx)

To install this, download the [bundle](/tags/carknee-bundle/) and follow the instructions in the readme.txt file.