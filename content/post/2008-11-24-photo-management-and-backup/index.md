+++
date = 2008-11-24
slug = "photo-management-and-backup"
title = "Photo Management and Backup"
description = ""

[taxonomies]
tags = ["Personal", "Photography"]
+++

![](http://farm4.static.flickr.com/3282/3026400406_811a14876f_m.jpg)This is a follow up post to "[Photo Management](/post/photo-management)" on how I am starting to organize my digital images. After looking around at some of my options (Picasa, Adobe products, buying an iMac, …) I have decided to take the cheap way out. Here is my current workflow, which is a work in progress.  

<!-- more -->

I pull the images from my camera manually and dump them to a temp directory and rename the files from the standard IMG_9753.jpg to the date they were taken on. I then create new directories on my NAS for the Year\Month\[Event|Description] as in “H:\Media\Pictures\2008\11\Party”. I move the files to their new homes on the NAS and fire up Picasa. Once in Picasa I go and “Tag” the images with the people in the picture and any other pertanent info. My final step is to backup my media to Amazon S3.  

Maybe I am showing my age a bit, but I have a an issue venturing to far from the old 8.3 DOS file names so I chose the format of yyyy-mm-dd#hh-mm-ss.jpg. In order to do this little task I found a decent piece of software called called [AmoK Exif Sorter](http://www.amok.am/en/freeware/amok_exif_sorter/). The program worked so well I decided to go back and rename ALL my images going back to 2004, which is when I got my first digital camera that stored date/time in the Exif data.   

Overall I use Picasa at a very high level. I simply tag, view, and upload my photos using it and that is it! Picasa provides some import and file rename functions, but they weren't working they I would have liked. I am starting to see that the more work you put in the bigger the benefit you will get out of it though. I spent an hour tagging all the images taken of my son since August and the search capabilities of Picasa work great!  

I still have some pieces of the puzzle that don't fit so well, but this will be a good starting point. I am currently using a Linksys NSLU2 with a USB drive for my NAS. Ideally this will be upgraded to something else, I just can't decide what yet (ReadyNas, Windows home server, etc…). I failed to mention that I manually backup my single drive NAS to RAID 1 drives on my development server in my home, but I am going to give the [Microsoft SyncToy](http://www.microsoft.com/prophoto/downloads/synctoybeta.aspx) a try for this task. The Amazon S3 backup is extremely important! Every important file you own, not just images, should be backed up offsite! I came close to [learning the hardway](/archive/2008/01/06/for-god-sake-man-backup-everything.aspx).  

Hope this helps someone out there.

**Update 2/15/2012:**

*   I've since started using a different tool to rename files: [http://code.google.com/p/photoname2date/](http://code.google.com/p/photoname2date/)
*   I've moved away from the NSLU2 and am using a proper NAS (Synology DS1511+). The synology has built in backups to S3, plus I am doing a full manual offsite backup.