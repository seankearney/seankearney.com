+++
date = 2007-01-02
slug = "flash-file-loader-control"
title = "Flash File (.swf) Loader Control"
description = ""

[taxonomies]
tags = ["ASP.NET", "Front End"]
+++

All web developers and designers should know by now that you should not use the traditional `<object><embed>`... method for placing Flash content on your site. [Macromedia (Adobe) recommends](http://www.adobe.com/devnet/activecontent/) using javascript to load the Flash content and it works just fine. However, if you are a .NET programmer and have a lot of flash content it is fairly easy to create a Control that handles the repetitive tasks.

<!-- more -->

First we need to create a little javascript file. I place my javascript in a /Utility/ directory (a la [CommunityServer](http://communityserver.org)) and here it is:

```js
/Utility/LoadFlash.js  

function loadFlashDoc(fPath, fWidth, fHeight){  
  document.write('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="[http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0"](http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0") ');  
  document.write(' width="' + fWidth + '" height="' + fHeight + '"> ');  
  document.write(' <param name="movie" value="' + fPath + '"> ');  
  document.write(' <param name="quality" value="high"> ');  
  document.write(' <param name="wmode" value="transparent" /> ');  
  document.write(' <embed wmode="transparent" quality="high" pluginspage="[http://www.macromedia.com/go/getflashplayer"](http://www.macromedia.com/go/getflashplayer") type="application/x-shockwave-flash" ');  
  document.write(' src="' + fPath + '" ');  
  document.write(' width="' + fWidth + '" ');  
  document.write(' height="' + fHeight + '"></embed> ');  
  document.write('</object>');  
}
```
Nothing to complex here. Just write out the object & embed lines used to show the flash file specified as fPath with the fWidth and fHeight.

Now for the ASP.NET Control.

```c#
public class FlashLoader : System.Web.UI.Control  
{  
        #region FlashFile property  
        private String _FlashFile;  
        public String FlashFile  
        {  
                get { return _FlashFile; }// get  
                set { _FlashFile = value; }// set  
        }// property  

        #endregion  

        #region Width property  
        private int _Width;  

        public int Width  
        {  
                get { return _Width; }// get  
                set { _Width = value; }// set  
        }// property  

        #endregion  

        #region Height property  
        private int _Height;  

        public int Height  
        {  
                get { return _Height; }// get  
                set { _Height = value; }// set  
        }// property  

        #endregion  

        #region Title property  
        private String _Title = String.Empty;  
        /// <summary>  
        /// A Title for the Flash File  
        /// </summary>  
        public String Title  
        {  
                get { return _Title; }// get  
                set { _Title = value; }// set  
        }// property  

        #endregion  

        protected override void OnLoad(EventArgs e)  
        {  
                if (String.IsNullOrEmpty(FlashFile))  
                        return;  

                if (!Page.ClientScript.IsClientScriptIncludeRegistered(typeof(FlashLoader), "flashLoader"))  
                        Page.ClientScript.RegisterClientScriptInclude(typeof(FlashLoader), "flashLoader", "/Utility/loadFlash.js");  
        }  

        protected override void Render(HtmlTextWriter writer)  
        {  
                if (String.IsNullOrEmpty(FlashFile))  
                        return;  

                writer.WriteLine(String.Format(@"<script type=""text/javascript"">loadFlashDoc('{0}', '{1}', '{2}');</script>", FlashFile, Width, Height));  
                writer.WriteLine("<noscript>");  
                writer.Write("\t<object classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0\"");  
                writer.WriteLine(String.Format(@"width=""{0}"" height=""{1}"" id=""zoom_map"" align=""top"">", Width, Height));  
                writer.Write("\t\t");  
                writer.WriteLine(String.Format(@"<param name=""movie"" value=""{0}"" />", FlashFile));  
                writer.WriteLine("\t\t<param name=\"wmode\" value=\"transparent\" />");  
                writer.WriteLine("\t\t<param name=\"quality\" value=\"high\" />");  
                writer.WriteLine("\t\t<param name=\"bgcolor\" value=\"#FFFFFF\" />");  
                writer.Write("\t\t");  
                writer.WriteLine(String.Format(@"<embed src=""{0}"" quality=""high"" bgcolor=""#FFFFFF"" width=""{1}"" height=""{2}"" name=""{3}"" align=""top"" wmode=""transparent"" type=""application/x-shockwave-flash"" pluginspage=""http://www.macromedia.com/go/getflashplayer""></embed>", FlashFile, Width, Height, Title));  
                writer.WriteLine("\t</object>");  
                writer.WriteLine("</noscript>");  
        }  
}
```

To use this control you would just register your control and add the tag as such:

```html
<FLASH:FlashLoader id="Flash" runat="server" FlashFile="/path/to/file.swf" Width="475" Height="275" Title="Flash File" />  
```

And you will get output as follows:

```html
<<span class="start-tag">script</span><span class="attribute-name"> src</span>=<span class="attribute-value">"/Utility/loadFlash.js" </span><span class="attribute-name">type</span>=<span class="attribute-value">"text/javascript"</span>></<span class="end-tag">script</span>>  
...  
<<span class="start-tag">script</span><span class="attribute-name"> type</span>=<span class="attribute-value">"text/javascript"</span>>loadFlashDoc('/path/to/file.swf', '475', '275');</<span class="end-tag">script</span>>  
<<span class="start-tag">noscript</span>>  
    <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0"width="475" height="275" id="zoom_map" align="top">  
        <param name="movie" value="/path/to/file.swf" />  
        <param name="wmode" value="transparent" />  
        <param name="quality" value="high" />  
        <param name="bgcolor" value="#FFFFFF" />  
        <embed src="/path/to/file.swf" quality="high" bgcolor="#FFFFFF" width="475" height="275" name="Flash File" align="top" wmode="transparent" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"></embed>  
    </object>  
</<span class="end-tag">noscript</span>>
```