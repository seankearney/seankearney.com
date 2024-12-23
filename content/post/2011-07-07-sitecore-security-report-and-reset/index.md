+++
template = "post.html"
date = 2011-07-07
slug = "sitecore-security-report-and-reset"
title = "Sitecore Security Report and Reset"
description = ""

[taxonomies]
tags = ["Sitecore", "Security"]
+++

I have a nice assortment of little scripts that I've written over the years to perform various tasks within Sitecore. Based on [this Stack Overflow question](http://stackoverflow.com/questions/6614776/viewing-and-clearing-all-user-specific-permissions-in-sitecore) I figured I would release one.

<!-- more -->

This script will show, and allow you to reset, the `__security` field on all items in a subtree. The code wasn't written to be pretty; it was written quickly to perform a very specific task.

To use this, simply drop this aspx file into your webroot and browse to it. Delete when done.

```html
<%@ Page Language="C#" AutoEventWireup="true" Debug="true" %>

<%@ Import Namespace="System.Linq" %>
<%-- 
#############################################################
Author: Sean Kearney
Date: 10/04/09
Description: View security set on items
Overview:

#############################################################
--%>

<script runat="server">
    protected string StartingPath
    {
        get
        {
            return txtStartPath.Text;
        }
    }

    protected void Page_Load(object sender, EventArgs e)
    {
    }
    protected void btnReport_Click(object sender, EventArgs e)
    {
        Execute(false);
    }

    protected void btnDelete_Click(object sender, EventArgs e)
    {
        Execute(true);
    }

    protected void Execute(bool delete)
    {
        if (string.IsNullOrEmpty(StartingPath))
            throw new Exception("Starting Path Not Set");

        Sitecore.Data.Database master = Sitecore.Configuration.Factory.GetDatabase("master");
        Response.Write("<html><head><style type='text/css'>*{font-family:monospace;font-size:10pt;}</style></head><body><table border=1>");

        using (new Sitecore.SecurityModel.SecurityDisabler())
        {
            Recurse(master.GetItem(StartingPath), delete);
        }

        Response.Write("</table></body></html>");
    }

    private void Recurse(Sitecore.Data.Items.Item item, bool reset)
    {
        foreach (Sitecore.Data.Items.Item child in item.Children)
        {
            if (!string.IsNullOrEmpty(child["__security"]))
            {
                Response.Write("<tr><td nowrap='nowrap'>" + child.Paths.ContentPath + "</td><td>" + child["__security"] + "</td></tr>");

                if (reset)
                {
                    using (new Sitecore.Data.Items.EditContext(child))
                    {
                        child.Fields["__security"].Reset();
                    }
                }
            }

            // don't dive too deep
            if (item.Paths.ContentPath.Split("/".ToCharArray()).Length <= 5)
                Recurse(child, reset);
        }
    }
    
</script>

<html>
<body>
    <form id="form1" runat="server">
    <fieldset>
        Starting Path
        <asp:TextBox ID="txtStartPath" runat="server" Text="/sitecore/content/home"></asp:TextBox>
        <asp:Button ID="btnReport" runat="server" OnClick="btnReport_Click" Text="Run Report" />
        <asp:Button ID="btnDelete" runat="server" Text="Reset '__security' to standard values" OnClick="btnDelete_Click" />
    </fieldset>
    </form>
</body>
</html>
```