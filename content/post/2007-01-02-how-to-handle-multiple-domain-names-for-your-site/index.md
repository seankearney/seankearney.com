+++
date = 2007-01-02
slug = "how-to-handle-multiple-domain-names-for-your-site"
title = "How to handle multiple domain names for your site."
description = ""

[taxonomies]
tags = ["Community Server", "ASP.NET"]
+++

[Keyvan Nayyeri](http://nayyeri.net/archive/2006/12/22/remove-www-from-urls-in-asp-net.aspx) wrote up an article (and HttpModule) on how he handles removing the *www* from the URI when people visit his site. I wrote something similar to this a while back for a site I develop. This particular company has about 10 domain names that all point to the companies main web site. Back in 2000, before I started working for the company, the search engines had indexed all of the domain names. While this may be good I have always been worried about [duplicate content](http://www.google.com/search?q=site%3Awww.mattcutts.com+%22duplicate+content%22) in Google's Index.

<!-- more -->

The code below is a toned down version of the HttpModule I use.

First, I have a config file that properly configures the module.

```html
<forceDomain enabled="true" debug="false">  
   <primaryDomain>www.example.com</primaryDomain>  
   <ignoreDomains>  
       <add value="localhost" />  
       <add value="www.example2.com" />  
   </ignoreDomains>  
</forceDomain>  
```

The config file tells the module that the primary domain for the site is www.example.com. It then goes on to setup domain names that are not redirected. Naturally, we want localhost requests to not be redirected. For this example, www.example2.com is also used. (yes, I realize that www.example.com isn't a domain it is a URI, but I am too lazy to go back and change things)

Now to the code of the HttpModule.

```c#
public class ForceDomain : System.Web.IHttpModule
{
    private ForceDomainConfiguration ForceDomainConfiguration;
    
    public void Init(HttpApplication app)
    {
        app.BeginRequest += new EventHandler(this.OnBeginRequest);
    }

    public void OnBeginRequest(Object source, EventArgs e)
    {
        // grab the configuration
        ForceDomainConfiguration = ForceDomainConfiguration.GetConfig();


        // If disabled.. exit out.
        if (!ForceDomainConfiguration.ModuleEnabled)
            return;
        // get access to app and context
        HttpApplication app = (HttpApplication)source;
        HttpContext ctx = app.Context;

        // Get the PrimaryDomain the site operates with
        String DomainName = ForceDomainConfiguration.PrimaryDomain;
        if (String.IsNullOrEmpty(DomainName))
        {
            throw new System.Exception("Primary Domain not set in config file. /Config/forceDomain/primaryDomain");
        }

        DomainName = DomainName.ToLower();
        // If we are operating in the primary domain, then just get out of here.
        if (ctx.Request.Url.Host.ToLower() == DomainName)
            return;

        // loop through the ignoredDomains.

        // If we are supposed to ignore it, then break out
        foreach (String s in ForceDomainConfiguration.IgnoredDomains)
            if (ctx.Request.Url.Host.ToLower() == s.ToLower())
                return;

        // If we got this far, create the new URL and redirect
        StringBuilder sendTo = new StringBuilder();
        if (ctx.Request.IsSecureConnection)
            sendTo.Append("https://");
        else
            sendTo.Append("http://");

        sendTo.Append(DomainName);
        sendTo.Append(ctx.Request.RawUrl);

        ctx.Response.Status = "301 Moved Permanently";
        ctx.Response.AddHeader("Location", sendTo.ToString());
        ctx.Response.End();

    }

    public void Dispose()
    { 
    }
}
```

Like I said, the code  above is a toned down version of the module I use. I also make reference to `ForceDomainConfiguration.GetConfig()` which is code that I haven't showed here. If anyone wants me to package this up just drop a comment and I will see what I can do.