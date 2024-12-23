+++
date = 2007-03-29
slug = "aspnet-confirmation-controls"
title = "ASP.NET Confirmation Controls"
description = ""

[taxonomies]
tags = ["ASP.NET", "Front End"]
+++

I have been (slowly) working on the [Web Based FileZilla Administration](/tags/filezilla) project. One of the issues that I could predict happening would be the creation of a user/group/setting and then the end user would leave the page without saving their changes. There are many ways to handle this type of issue, but I wanted a fairly simple implementation.

<!-- more -->

What I did was inherit a few of the base controls (TextBox, CheckBox, Button) and added an *onchange *attribute to them. The onchange attribute works with a client script that gets injected into the page.

Here is the code for the TextBox (CheckBox is almost identical):

```c#
public class TextBox : System.Web.UI.WebControls.TextBox
{
   protected override void OnLoad(EventArgs e)
   {
      // load the javascript
      if (!Page.ClientScript.IsClientScriptBlockRegistered(typeof(ConfirmChangeScript), "PageScript"))
         Page.ClientScript.RegisterClientScriptBlock(typeof(ConfirmChangeScript), "PageScript", ConfirmChangeScript.PageScript, true);
      base.OnLoad(e);
   }
   protected override void Render(HtmlTextWriter writer)
   {
      base.Attributes.Add("onchange", ConfirmChangeScript.OnChange);
      base.Render(writer);
   }
}
```

Here is the ConfirmChangeScript:

```c#
public class ConfirmChangeScript : System.Web.UI.Control
{
    public  static string PageScript
    {
        get
        {
            System.Text.StringBuilder script = new System.Text.StringBuilder();
            script.AppendFormat(@"      var isDirty = false; ");
            script.AppendFormat(@"      var showConfirm = true; ");
            script.AppendFormat(@"      window.onbeforeunload = confirmExit;");
            script.AppendFormat(@"      function confirmExit()");
            script.AppendFormat(@"      {{");
            script.AppendFormat(@"        if (!showConfirm) return; ");
            script.AppendFormat(@"        if (isDirty) ");
            script.AppendFormat(@"            return ""You have attempted to leave this page.  If you have made any changes to the ");
            script.AppendFormat(@"fields without clicking the Save button, your changes will be lost.  Are you sure you want to exit ");
            script.AppendFormat(@"this page?"";");
            script.AppendFormat(@"      }}");
            return script.ToString();
        }
    }
    public static string OnChange
    {
        get
        {
            return "isDirty=true";
        }
    }
}
```

And finally, here is the Button. There is an additional attribute for the button to suppress the confirmation. This would be used in the event that you want to show the confirmation upon clicking the button.

```c#
public class Button : System.Web.UI.WebControls.Button
{
    #region EnableShowConfirm property
    private bool _SupressConfirm = true;
    public bool SupressConfirm
    {
        get { return _SupressConfirm; }// get
        set { _SupressConfirm = value; }// set
    }// property
    #endregion
    protected override void OnLoad(EventArgs e)
    {
        if (!Page.ClientScript.IsClientScriptBlockRegistered(typeof(ConfirmChangeScript), "PageScript"))
            Page.ClientScript.RegisterClientScriptBlock(typeof(ConfirmChangeScript), "PageScript", ConfirmChangeScript.PageScript, true);
        base.OnLoad(e);
    }
    protected override void Render(HtmlTextWriter writer)
    {
        if (SupressConfirm)
            base.Attributes.Add("onclick", "showConfirm=false;");
        base.Render(writer);
    }
}
```

Just add the reference in your .aspx page and drop in a TextBox and Button control. If you edit the contents of the textbox and then try to leave the page it will prompt you to confirm.

You can download the source [here](/blogs/files/ConfirmChangeControls.zip). 

These controls, and code, are very simple and have at least one known bug. For a more advanced approach try looking at [Scott Michell's method](http://www.4guysfromrolla.com/webtech/100604-1.shtml).