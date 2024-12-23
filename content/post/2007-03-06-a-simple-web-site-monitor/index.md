+++
template = "post.html"
date = 2007-03-06
slug = "a-simple-web-site-monitor"
title = "A Simple Web Site Monitor"
description = ""

[taxonomies]
tags = ["Web Server"]
+++

One of my web servers had been having all sorts of problems over the last few months. It turned out to be the RAID controller, but that is another post. Because of the problems we were having I wanted a simple way to get a notification of when the site we were hosting went down. I didn't want anything fancy, just a simple email when the sites stopped responding. Here is what I found...

<!-- more -->

First, I downloaded [SystemMonitor from MSDN's Coding4Fun.](http://msdn.microsoft.com/coding4fun/windows/utility/article.aspx?articleid=912382) This is an extensible application that can be run in your system tray and notifies you of events. I then wrote up a quick "Monitor" to send a request to the sites. The monitor makes an HttpWebRequest to a site looking for a specific file. Any errors returned (404/500/etc...) will fire off a notification from the SystemMonitor. If a status code of 200 is returned, the monitor will check for "site running" in the content of the page. If "site running" is not found then a notification will be sent.

The advantage with this method is that you can specify the URI of the page you want to test. This page can be .txt, .htm, .asp, .aspx, .whatever. So, if your web server is ok, bu[tags:Web Server, Programming]t your database server has a habit of going down then you can point the SystemMonitor to test for a  page that will test your DB connection. As long as the response status code 200 and the page returned "site running" in the content of the page it will not fire off a notification.

To install the Site Monitor you need to download the SystemMonitor from Coding4Fun. Once downloaded, add my SiteMonitor (and any needed references) to the project and recompile. Once recompiled you just need to add the settings to the App.config file. The config section, as shown below, is pretty self explanatory. The one setting that may be a little abstract is the localIP variable. The machine I installed this on has multiple IP addresses assigned to the NIC. One has access to the Internet and the other doesn't. By setting the localIP variable you can control what IP the monitor will bind to when trying to make a request.

```xml
<monitor runFrequency="00:10"  type="SystemMonitor.Monitors.SiteMonitor,SystemMonitor">
    <settings>
        <setting name="url" value="http://www.example.com/Utility/uptime.aspx" />
        <setting name="localIP" value="" />
        <setting name="proxy.enable" value="false" />
        <setting name="proxy.ip" value="192.168.0.1" />
        <setting name="proxy.port" value="8080" />
    </settings>
    <notifiers>
        <notifier type="SystemMonitor.Notifiers.MessageBoxNotifier,SystemMonitor" />
    </notifiers>
</monitor>
```

The Code for the Site Monitor is show below, and available for download [here](http://www.carknee.com/files/folders/code/entry352.aspx).

```c#
class SiteMonitor : MonitorBase
{
    string _url;
    string _localIP;
    bool _enableProxy = false;
    string _proxyIP;
    int _proxyPort = -1;

    #region Binding the WebRequest to a Local IP with a Delegate
    public delegate IPEndPoint BindIPEndPoint(ServicePoint servicePoint, IPEndPoint remoteEndPoint, int retryCount);
    private IPEndPoint BindIPEndPointCallback(ServicePoint servicePoint, IPEndPoint remoteEndPoint, int retryCount)
    {
        if (retryCount < 3)
            return new IPEndPoint(IPAddress.Parse(_localIP), 0);
        else
            return new IPEndPoint(IPAddress.Any, 0);
    }
    #endregion

    public override void Execute()
    {
        HttpWebRequest request;
        HttpWebResponse response;

        string errTitle = String.Empty, errMessage = String.Empty;
        
        try
        {
            request = (HttpWebRequest)WebRequest.Create(_url);
            request.Timeout = 1000;
            
            // bind to a specific local ip
            if (!String.IsNullOrEmpty(_localIP))
                request.ServicePoint.BindIPEndPointDelegate = new System.Net.BindIPEndPoint(BindIPEndPointCallback);

            if (_enableProxy && !String.IsNullOrEmpty(_proxyIP) && _proxyPort >= 0)
                request.Proxy = new System.Net.WebProxy(_proxyIP, _proxyPort);

            response = (HttpWebResponse)request.GetResponse();
            HttpStatusCode status = response.StatusCode;

            if (status != HttpStatusCode.OK)
            {
                errTitle = "Failed Contacting Web Server";
                errMessage = String.Format("{0} Returned Http Status Code: {1}, {2}", _url, (int)status, status.ToString());
            }
            else
            {

                StreamReader reader = new StreamReader(response.GetResponseStream());
                string content = reader.ReadToEnd();

                // LOOK FOR [SITE RUNNING]
                if (content.ToLower().IndexOf("site running") < 0)
                {
                    errTitle = "Web Server Returned Invalid Response";
                    errMessage = String.Format("{0} Returned Invalid Response", _url);
                }
                reader.Close(); reader.Dispose(); reader = null;
            }

        }
        catch (WebException ex) // this will catch 404's
        {
            errTitle = "Failed Contacting Web Server";
            if (ex.Response != null)
            {
                HttpWebResponse r = (HttpWebResponse)ex.Response;
                errMessage = String.Format("{0} Returned {1}, {2}", _url, (int)r.StatusCode, r.StatusDescription);
            }
            else
                errMessage = ex.Message;

        }
        catch (Exception ex)
        {
            errTitle = "Failed Monitoring Site";
            errMessage = string.Format("'{0}' failed with an exception: {1}", _url, ex.Message);
        }
        finally
        {
            response = null;
            request = null;
        }

        // fire off the Notifier
        if (!String.IsNullOrEmpty(errTitle))
            Notify(errTitle, errMessage);
    }

    protected override void Initialize(Dictionary<string, string> settings)
    {
        _url = settings["url"];
        _localIP = settings["localIP"];

        _proxyIP = settings["proxy.ip"];
        try{_enableProxy = bool.Parse(settings["proxy.enable"]);}
        catch { _enableProxy = false; }

        try { _proxyPort = int.Parse(settings["proxy.port"]); }
        catch { _proxyPort = -1; }

    }

    public override string Description
    {
        get { return string.Format("Testing '{0}'.", _url); }
    }

    public override MonitorType MonitorType
    {
        get { return MonitorType.Scheduled; }
    }

    public override Icon Icon
    {
        get { return Properties.Resources.PingIcon; }
    }
}
```