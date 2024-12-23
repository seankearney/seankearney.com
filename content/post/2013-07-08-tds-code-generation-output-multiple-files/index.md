+++
date = 2013-07-08
slug = "tds-code-generation-output-multiple-files"
title = "TDS Code Generation Output Multiple Files"
description = ""

[taxonomies]
tags = ["Sitecore", "TDS"]
+++

A very common feature request we get for [Team Development for Sitecore](http://TeamDevelopmentForSitecore.com) at [Hedgehog](http://hhogdev.com) is that people want code generation to create a file per Sitecore template in their project. Currently, when TDS code generation runs it will create a single file with all of the code inside of it. Using partial classes it enabled developers to extend the class with their needs, in a separate file, all the while keeping the code generated part in a file that can be overwritten and updated at any time by TDS. This is very much like the way Linq-to-SQL works.

<!-- more -->

While I can't say that this feature will ever be fully implemented and supported I've decided to release an example of how you can get this functionality now. Let me stress that **this is not supported by Hedgehog Development and use at your own risk**.

The provided sample below (and [https://gist.github.com/seankearney/5957503](https://gist.github.com/seankearney/5957503)) can be added to your TDS project. When TDS generates code for the project this template will output the transformation to a file located underneath the `[TDS Project]\Code Generation Templates\MultipleOutputs` folder.

There are a few key pieces to this T4 template.

1. Line 1 - The template definition requires a 'hostSpecific="true"' attribute
2. Line 92 - There is a "SaveOutput" method that handles the creation of the directory structure and writing of the files.
3. Line 79 - Before the first "[class feature block](http://msdn.microsoft.com/en-us/library/bb126541.aspx)" we call the SaveOutput() method.
4. Line 114 - This prevents the normal TDS code gen process from rendering the transformation in the main file. Uncomment this line to generate the code in the main file and individual files.

When using this template be aware that you will likely start seeing orphaned files. Code generation will happily create the files for you, but when you delete a template from your TDS project the previously generated file will not be removed. Also remember to not modify the generated files as TDS will re-write those files and your manual changes will be lost!