# seankearney.com

My personal blog! Since 2006, I've been sharing my insights and experiences on software development and technology.

## Technology Stack

- **Static Site Generator**: [Zola](https://www.getzola.org/)
- **Theme**: codinfox-zola [Modified](https://github.com/seankearney/codinfox-zola)
- **Hosting**: GitHub Pages
- **Content Format:** Markdown with TOML front matter

## Features
- Blog posts organized by date and tags
- Archives section for historical content
- Comments preserved from previous blog platforms
- RSS feed
- Responsive design
- Code syntax highlighting
- Asset colocation for images and other resources

## Local Development
To run the site locally:

```
# Install Zola (see https://www.getzola.org/documentation/getting-started/installation/)
zola serve
```

## Content Structure

```
content/
  _index.md          # Home page
  about.md           # About page
  archive.md         # Archives page
  post/             # Blog posts
    _index.md
    [year-month-day-slug]/
      index.md      # Post content
      images        # Post images
      *.yml         # Comments
```

## License
- Content: Copyright © Sean Kearney
- Code: MIT License