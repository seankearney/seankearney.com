+++
template = "post.html"
date = 2009-07-07
slug = "harvesting-data-from-a-coveo-index"
title = "Harvesting data from a Coveo index"
description = ""

[taxonomies]
tags = ["Search", "Coveo"]
+++

I've been working peripherally with [Coveo](http://www.coveo.com) for the past couple years now. It hasn't been until recently that I've actually needed to start diving into the “API” to try and harvest the data. This, however, proved to be more difficult than one would expect from a Search product!

<!-- more -->

You see, Coveo wrote a lot of fancy controls (complete with AJAXy functions) that work intimately with their index. They have an “interface editor” that is supposed to help you customize the way these controls function and look. In a perfect world you will tailor your interface using this editor, drop a single user control on your page and you are up and running. However, there are times when these stock controls just don't cut it; you will either want to change the look, or function, to drastically to be handled with the interface editor. I found myself in such a position.

Coveo lists a few APIs in its online help section ([Search Interface API](http://www.coveo.com/en/support/online-help#-7b0HYBxJliUmL23Ke39K9UrX4HShCIBgEyTYkEAQ7MGIzeaS7B1pRyMpqyqBymVWZV1mFkDM7Z28995777333nvvvfe6O51OJ%2Fff%2Fz9cZmQBbPbOStrJniGAqsgfP358Hz8ifvzHd3%2FXL5dlscy%2FnZer3%2FXHf3zv9%2F1dd%2Fc%2F3d17eO%2Fh%2Fu%2F7u%2F6%2Bvyv9vfP7%2Fq7be%2Fv07%2B7vSw12f9%2Ff9%2Ff9Xdtqih9oLg810l9Olxdl0cz3T3ZOzEev86yeztOzZZvX59k0T49fnpnv7P8NaPcB9fi7TttyZ%2F93q343%2FNzlf3d%2Bt7rhtvi%2B%2Fz9653f9fwA%3D), Converter API, Connector API, and Security API), but none of them tell you how to get access to the raw data!

Before Coveo I was using [Lucene](http://lucene.apache.org/) for various projects and it had a decent API that you can use to get access to your search results. You were then responsible for rendering these results. This is what I would have expected in terms of an API from Coveo. The Coveo Search Interface API is nothing more than a collection of the aforementioned ASP.NET controls that you can try to use in your Interface. I wasn't able to find any samples about how to get my data with some API calls, there was however, some MSDN style [class documentation](http://www.coveo.com/en/support/online-help#-7b0HYBxJliUmL23Ke39K9UrX4HShCIBgEyTYkEAQ7MGIzeaS7B1pRyMpqyqBymVWZV1mFkDM7Z28995777333nvvvfe6O51OJ%2Fff%2Fz9cZmQBbPbOStrJniGAqsgfP358Hz8ifvzHd3%2FXL5dlscy%2FnZer3%2FXHf3zv9%2F1dd%2Fc%2F3d17eO%2Fh%2Fu%2F7u%2F6%2Bv%2BuD3%2Fd33fl9f9ftvX36d%2Ff3pQa7v%2B%2Fv%2B%2Fv%2Brm01xQ80l4ca6S%2Bny4uyaOb7Jzsn5qPXeVZP5%2BnZss3r82yap8cvz8x39v8GtPuAevxdp225s%2F%2B7Vb8bfu7yvzu%2FW91wW3zf%2F9%2FBw72dA7y%2FLdB%2B19%2F1d%2F1%2FAA%3D%3D).

After some playing around I was able to perform a search using the following code. You need to specify the Collection ID you want to search on as well as the Query to perform. The results will then be populated into the resultArray object. There are many parameters you can set on the [SearchBuilder](http://www.coveo.com/en/support/online-help#-7b0HYBxJliUmL23Ke39K9UrX4HShCIBgEyTYkEAQ7MGIzeaS7B1pRyMpqyqBymVWZV1mFkDM7Z28995777333nvvvfe6O51OJ%2Fff%2Fz9cZmQBbPbOStrJniGAqsgfP358Hz8ifvzHd3%2FXL5dlscy%2FnZer3%2FXHf3zv9%2F1dd%2Fc%2F3d17eO%2Fh%2Fu%2F7u%2F6%2Bv%2BuD3%2Fd33fl9f9ftvX36d%2Ff3pQa7v%2B%2Fv%2B%2Fv%2Brm01xQ80l4ca6S%2Bny4uyaOb7Jzsn5qPXeVZP5%2BnZss3r82yap8cvz8x39v8GtPuAevxdp225s%2F%2B7Vb8bfu7yvzu%2FW91wW3zf%2F9%2FBw72dA7y%2FLdB%2B19%2F1d%2F1%2FAA%3D%3D) object, which you can read about in the doc. This code will be used in an upcoming post about how to write an autocomplete text box with jQuery and Coveo.

```c#
using Coveo.CES.Web.Search;  
using Coveo.CES.Web.Search.Controls;  
using Coveo.CES.Web.Search.Providers;  

// ....  

ICESSearchProvider provider = SearchUtilities.CreateDefaultSearchProvider();  
SearchBuilder builder = new SearchBuilder();  
builder.AddCollection(1234); // add your collection id here  
builder.Provider = provider;  
builder.ExpandQuery = true;  
builder.RetrieveFirstSentences = false;  
builder.ExcerptSize = 0;  
builder.FilterDuplicates = true;  
builder.AddBasicEx pres sion("Search for Me");  

if (builder.ExecuteQuery)  
{  
    QueryWrapper newQueryWrapper = QueryWrapperFactory.GetNewQueryWrapper(builder);  

    int totalResults = newQueryWrapper.TotalCount;  
    ICESResult[] resultArray = newQueryWrapper.GetResults(0, 100);  
}
```