+++
date = 2024-12-19
slug = "migrating-from-blogengine-to-zola"
title = "A New Chapter for My Blog with Zola"
description = "Discover the journey of transitioning from BlogEngine.net to Zola and GitHub Pages for a simpler, more efficient blogging experience. Learn how to migrate your blog, maintain essential features, and enjoy the benefits of static site generation with minimal maintenance. Perfect for developers seeking a hassle-free, Markdown-based blogging platform."

[taxonomies]
tags = ["Personal", "Zola"]
+++

This website has had quite the journey, moving through different domain names, frameworks, and applications over the years. It all started with static HTML and table-based layouts, then Community Server, Sitecore, and finally [BlogEngine.net](https://blogengine.io/), where it’s been parked for over a decade. I haven't blogged at all since moving on from Hedgehog/Sitecore, but it's high time I get back to it. 

<!-- more -->

When a developer decides to blog, the first course of action is always figuring out the blog platform and process. In my case, BlogEngine.net is so outdated that migrating away just made sense.

I don't want to maintain an application, a database, or anything that goes along with it. No WYSIWYG editors for me. The goal is simplicity. Requirements always start simple, but can I keep them that way?

This blog is fairly modest. Most of the features and functionality can go, but here’s what’s required:

- **Dead simple hosting option.** _Bonus if it's free._
- Ability to create pages outside of the blog, as needed.
- Currently less than 100 posts, and I’d like to keep the URLs.
- Show posts by tag or category.
- Show posts by date.
- RSS feed.
- Commenting on blog posts.
- All posts/pages should be written in Markdown.

All signs point to static site generation **except** for the comments, but we'll solve that later. For the initial migration, I’d like to keep showing the existing comments and add support for new comments in the future.

I looked at the usual suspects (and I've done this a few times over the years) like [Jekyll with GitHub Pages](https://jekyllrb.com/docs/github-pages/). There was always _something_ that stopped me from moving forward with this solution.

I ultimately landed on [Zola](https://www.getzola.org/) and GitHub Pages. The main reason I liked Zola over Jekyll is the ease of use. It’s a pre-built binary that works on Windows, Linux, and macOS, so it _should_ work wherever I need it. Sure, I could get Jekyll to work on Windows, but Zola has less friction. And GitHub Pages? Dead simple. The site's content/code will be in a GitHub repository, and pushing to GitHub Pages is extremely straightforward. Custom domain support? Check!

The migration path wasn't terribly difficult:

1. Export existing blog posts from BlogEngine to BlogML.
2. Use a [pre-existing utility](https://github.com/pcibraro/BlogMLToMarkdown), with modifications, to:
   1. Convert the blog posts into Markdown with "[front matter](https://www.getzola.org/documentation/content/page/#front-matter)".
   2. Migrate any images so they are "[co-located](https://www.getzola.org/documentation/content/overview/#asset-colocation)" with the blog post.
   3. Migrate comments as `.yml` files "co-located" with the blog post.
3. Clean up the taxonomies, fix links, and general housekeeping.
4. Push the content – We have our [first PR](https://github.com/seankearney/seankearney.com/pull/1).
5. Find a theme and get the site to render!

The theme/templates gallery for Zola is admittedly a bit light on options. I did find that [codingfox-zola](https://github.com/seankearney/codinfox-zola) appealed to me, but it required some changes. I ultimately made some [sweeping changes](https://github.com/seankearney/codinfox-zola/commits/seankearney.com/) to make it passable for my initial migration. We’ll work on the theme as time permits.

Overall, I’m happy I can now blog with Markdown out of a Git repo where hosting is free. If my blogging cadence picks up, I’ll also work on the commenting system.
