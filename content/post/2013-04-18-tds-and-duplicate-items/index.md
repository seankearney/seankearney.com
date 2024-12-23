+++
template = "post.html"
date = 2013-04-18
slug = "tds-and-duplicate-items"
title = "TDS And Duplicate Items"
description = ""

[taxonomies]
tags = ["Sitecore", "TDS"]
+++

From time to time we get feature requests for [Team Development for Sitecore](http://teamdevelopmentforsitecore.com) to support multiple sub-items with the same name as shown below.

<!-- more -->

```
- sitecore
  - content
    - home
      - article-1
      - article-1
      - article-2
```

This topic has been discussed internally at [Hedgehog](http://www.hhogdev.com) for the last few years and unfortunately it is a feature that we don't plan on supporting. The reality is that we can't find a good reason to ever have items at the same level with the same name. Examples would be:

- Fields of a template with the same name: the field wouldn't be accessible by its name since there are multiple
- Templates with the same name: Again, using the Sitecore API you wouldn't know which one you are getting
- Content with the same name: There would be a single URL addressing two pieces of content. You wouldn't know which one is served up.

There are a couple of cases where we hear requests for duplicate item support.

1. The 'Divider' items in the 'core' database
2. When there are issues with the actual items. An example of this would be somehow a template has multiple `__standard values` items and the customer reports the problem. However, the problem in this case is actually in their Sitecore database and the extra item should be removed. Therefore, having lack of support for duplicate item names actually helped find a problem for them!

For times when people request support for duplicate item names in order to handle the 'Divider' issue we tell them to rename the dividers in the core database. The name of the 'Divider' item is irrelevant and if you rename them to Divider-1, Divider-2, etc… it will work as expected and TDS will not complain.

We have also worked with Sitecore about the 'Divider' issue and they said they will try to make the renames as part of a future release.

If you, or your colleagues, can come up with a good business reason to have duplicate item names in a Sitecore installation please let us know!

**Update 12/3/2013**  
As of Sitecore 7.1, the dividers in the core database have been renamed so that they have unique names! [http://sdn.sitecore.net/products/sitecore%20v5/sitecore%20cms%207/releasenotes/changelog/release%20history%20sc71.aspx](http://sdn.sitecore.net/products/sitecore%20v5/sitecore%20cms%207/releasenotes/changelog/release%20history%20sc71.aspx) See 381310