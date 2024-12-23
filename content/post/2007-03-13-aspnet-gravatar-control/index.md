+++
template = "post.html"
date = 2007-03-13
slug = "aspnet-gravatar-control"
title = "ASP.NET Gravatar Control"
description = ""

[taxonomies]
tags = ["ASP.NET", "Gravatar"]
+++

[Gravatar 2.0](http://site.gravatar.com/) has been out for a few weeks now and I didn't see any ASP.NET implementation [listed](http://site.gravatar.com/site/implement) on their site so I figured I would wip one up.

<!-- more -->

It is pretty simple to implement a Gravatar. All you need to do is set the *src* attribute of an *img* tag to a location on Gravatar's domain. The *src* attribute has a few parameters, but the only "tricky" one is an MD5 hash of the users email address.

Here is the code:

```c#
public class Gravatar : System.Web.UI.WebControls.Image
{
    #region Rating property
    public enum GravatarRating { G, PG, R, X }
    private GravatarRating _Rating = GravatarRating.G;
    public GravatarRating Rating
    {
        get { return _Rating; }// get
        set { _Rating = value; }// set
    }// property

    #endregion

    #region Size property
    private int _Size = 80;
    /// 
    /// An optional "size" parameter may follow that specifies the desired width and height of the gravatar. Valid values are from 1 to 80 inclusive. Any size other than 80 will cause the original gravatar image to be downsampled using bicubic resampling before output.
    /// 
    public int Size
    {
        get
        {
            if (_Size <= 0)
                return 80;
            if (_Size > 80)
                return 80;
            return _Size;
        }
        set
        {
            _Size = value;
            base.Width = value;
            base.Height = value;
        }// set
    }// property
    #endregion

    #region Email property
    private string _Email;
    public string Email
    {
        get { return _Email; }// get
        set { _Email = value; }// set
    }// property

    #endregion

    #region DefaultImageUrl property
    private string _DefaultImageUrl;

    public string DefaultImageUrl
    {
        get { return _DefaultImageUrl; }// get
        set { _DefaultImageUrl = value; }// set
    }// property

    #endregion

    #region Hide some members
    new private string ImageUrl { get { return String.Empty; } }
    /// Gravatar only supports a size property
    new private int Width { get { return Size; } }
    new private int Height { get { return Size; } }
    #endregion

    protected override void Render(System.Web.UI.HtmlTextWriter writer)
    {
        System.Text.StringBuilder image = new System.Text.StringBuilder();
        image.Append("http://www.gravatar.com/avatar.php?");
        image.Append("gravatar_id=");
        image.Append(MD5HashMe(Email));
        image.Append("&rating=");
        image.Append(Rating.ToString());
        image.Append("&size=");
        image.Append(Size.ToString());

        if (!String.IsNullOrEmpty(DefaultImageUrl))
        {
            image.Append("&default=");
            image.Append(System.Web.HttpUtility.UrlEncode(DefaultImageUrl));
        }

        base.ImageUrl = image.ToString();
        base.Render(writer);
    }

    private string MD5HashMe(string email)
    {
        System.Text.Encoder enc = System.Text.Encoding.Unicode.GetEncoder();
        byte[] unicodeText = new byte[email.Length * 2];
        enc.GetBytes(email.ToCharArray(), 0, email.Length, unicodeText, 0, true);

        System.Security.Cryptography.MD5 md5 = new System.Security.Cryptography.MD5CryptoServiceProvider();
        byte[] result = md5.ComputeHash(unicodeText);

        System.Text.StringBuilder sb = new System.Text.StringBuilder();
        for (int i = 0; i < result.Length; i++)
            sb.Append(result[i].ToString("X2"));

        return sb.ToString();
    }
}
```

To use this control all you need to do is add the following to your *.aspx* page:

```
<%@ Register TagPrefix="CC" Assembly="CarKnee.Controls" Namespace="CarKnee.Controls" %>
```