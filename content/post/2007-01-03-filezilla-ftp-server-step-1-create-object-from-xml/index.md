+++
template = "post.html"
date = 2007-01-03
slug = "filezilla-ftp-server-step-1-create-object-from-xml"
title = "FileZilla FTP Server Step 1: Create Object From XML"
description = ""

[taxonomies]
tags = ["FileZilla"]
+++

The first step in administering the users of FileZilla FTP Server with an ASP.NET front end is to get the XML Schema for the config file. 

<!-- more -->

The config file, `FileZilla Server.xml`, is located in the default FileZilla FTP Server installation directory. Before we create an object representing this xml doc we need to make sure that the config file has all available options entered. All I did was go into the FTP Server administration tool and added multiple groups (and users) with a variety of options. I also created multiple ip restrictions, speed limits, etc... Once I have my bogus config file created I did the following:

1.  Open the xml file with Visual Studio 2005.
2.  XML Menu -> Create Schema
3.  Save the Schema as FileZilla Server.xsd
4.  From a command prompt execute `xsd FileZilla Server.xsd /c /n:FileZilla.Components`
5.  This should now have generated a `FileZilla.Components.FileZillaServer` Class the represents the configuration. 

Now that we have a class object representation of the FileZilla Server.xml file we can deserialize our configuration and modify it as needed. Once we are done modifying the object we can serialize it back to FileZilla Server.xml and restart the FTP server. We will look at that in the next step.