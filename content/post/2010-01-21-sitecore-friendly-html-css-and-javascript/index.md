+++
template = "post.html"
date = 2010-01-21
slug = "sitecore-friendly-html-css-and-javascript"
title = "Sitecore friendly html, css and javascript"
description = ""

[taxonomies]
tags = ["Sitecore", "Front End"]
+++

*Disclaimer: While some of these guidelines may be applied to other Content Management Systems, or .net web forms in general, this is based on my experience with Sitecore.*

<!-- more -->

A common approach of having a CMS based web site implemented usually goes as follows:

1.  Company X (aka 'The Client') approaches a design firm.
2.  Said design firm paints a lot of pretty pictures (also known as wire-frames, mock-ups, etc..), which the client gets sold on
3.  The design firm (or a subcontractor) will cut up those pretty pictures into HTML/CSS/JS files.
4.  That design firm chooses a [Sitecore partner](http://www.hhogdev.com/ "Sitecore Partner") to do the implementation of their super clean front-end work.

While I am greatly generalizing, this is a common approach. The point I am hoping to address is that design firms (who aren't familiar with .net or Sitecore) are very likely to make things difficult for the implementation team. Here are a few issues I have seen over the last few projects.

**ID attribute on html elements**

This is another broad statement, but take it at face-value to avoid problems. Front end developers will reference an element via the *id* attribute for css styling as well as [jQuery](http://jquery.com) (or any other client side framework) manipulations. While this sounds like a very normal approach it can lead to issues when that element gets converted into a .NET Server control and this tag:

`<input name="q" id="q" type="text" />`

is now this tag:

`<input name="ctl00_Main_q" id="ctl00_Main_q" type="text" />`

This annoying rewrite of the *id *attribute will break all pre-written css and javascript written for that *id*. As back-end developers we know that only id's of server controls (or regular tags with runat="server") will be rewritten, but is easier to have front-end dev's avoid referencing elements by *id* them all together.

**HTML Patterns**

In general, repeating patterns are very easy to program. Avoid throwing unnecessary id's and classes on elements. A perfect example would be for navigation elements; a side menu should be a simple nested unordered list with no extra classes. Having classes that change based on content, depth in site, etc... it will require logic, which takes time to implement.

Do this:

```
<h1>Nav Header</h1>  
    <ul>  
        <li><a href="#">Level 1a</a>  
            <ul>  
                <li><a href="#">Level 2a</a></li>  
                <li><a href="#">Level 2b</a></li>  
                <li><a href="#">Level 2c</a></li>  
            </ul>  
        </li>  
         <li><a href="#">Level 2a</a>  
            <ul>  
                <li><a href="#">Level 2a</a></li>  
                <li><a href="#" class="selected">Level 2b</a></li>  
                <li><a href="#">Level 2c</a></li>  
            </ul>  
        </li>  
    </ul>
```

Not this:

```
<h1>Nav Header</h1>  
    <ul class="mainNav">  
        <li class="first"><a href="#">Level 1a</a>  
            <ul class="subnav">  
                <li class="first"><a href="#">Level 2a</a></li>  
                <li><a href="#">Level 2b</a></li>  
                <li class="last"><a href="#">Level 2c</a></li>  
            </ul>  
        </li>  
         <li class="last"><a href="#">Level 2a</a>  
            <ul class="subnav">  
                <li class="first"><a href="#">Level 2a</a></li>  
                <li><a href="#" class="selected">Level 2b</a></li>  
                <li class="last"><a href="#">Level 2c</a></li>  
            </ul>  
        </li>  
    </ul>
```

Obviously this is an overly simplistic menu system that cannot always be accomplished. My main point here is to avoid classes on elements that aren't absolutely necessary. We can use basic css selectors to get at elements without having to provide more classes to denote first and subnav.

**Modularity**

If you have ever seen a Sitecore sales demo you have undoubtedly seen the presenter effortlessly change the layout of the page. Possibly adding some 'widgets' to the side or changing the entire layout from two to three columns? Sitecore allows renderings and sublayouts to be placed within placeholders. This introduces a lot of flexibility for the design of site, however, it does require a lot of forethought to make sublayouts look nice in multiple locations.

In order to make your sublayouts (or any other custom 'widgeting' system) work and look great you should follow a couple guidelines.

1.  Keep your html super lean and clean.
2.  [Object Oriented Css](http://www.stubbornella.org/content/2009/02/28/object-oriented-css-grids-on-github/)

**Design Images**

This is just my preference on how to organize the file system of a Sitecore site and you may have your own system and that is fine. Whatever system you choose, just be consistent as sites can grow big quickly and managing these little files can become daunting.

*   Images referenced from css files should go in an "images" directory underneath the css directory. Furthermore, keep image paths relative to the css file.
*   Any leftover images required for the design should go in a /images directory.
*   Placeholder images should be prefixed with "fpo_" which makes it easy to identify these images as being good candidates to be moved into Sitecore media library.

**Multi-Lingual Considerations**

Manipulating the DOM with Javascript is trivial with the introduction of client libraries such as jQuery. A potential issue will arise when a developer hard codes in a language specific string (such as 'open,' 'close,' etc...) in a javascript function. In order to avoid this pitfall have the translatable text reside in a hidden span on the page, not in the javascript code.