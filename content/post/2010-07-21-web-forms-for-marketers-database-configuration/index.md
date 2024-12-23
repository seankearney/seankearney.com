+++
template = "post.html"
date = 2010-07-21
slug = "web-forms-for-marketers-database-configuration"
title = "Web Forms for Marketers - Database Configuration"
description = ""

[taxonomies]
tags = ["Sitecore"]
+++

This is more of a 'note to self' type post, but I am sure some may find it helpful...

<!-- more -->

When you install "[Web Forms for Marketers v2](http://sdn.sitecore.net/Products/Web%20Forms%20for%20Marketers/Web%20Forms%20for%20Marketers%202,-d-,1.aspx)" it configures itself to use SQLLite. It provides a sample configuration on how to use SQL server, but it always annoyed me that I had to have a connection string in the /App_Config/Include/forms.config file; Why should I have a connection string outside of the ConnectionStrings.config file, right? Right.

Upon looking in reflector I noticed that it will look for a "wfm" connection string!

So, rather than:

```
<formsDataProvider type="Sitecore.Forms.Data.DataProviders.WFMDataProvider,Sitecore.Forms.Core">  
    <param desc="connection string">Database=(database);Data Source=(server);user id=(user);password=(password);Connect Timeout=30</param>  
</formsDataProvider>
```

Use this, but make sure you have a 'wfm' connection string defined:

```
<formsDataProvider   
type="Sitecore.Forms.Data.DataProviders.WFMDataProvider,Sitecore.Forms.Core" />
```

If this is documented somewhere I apologize, but I never read about it.
