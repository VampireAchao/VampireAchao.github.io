---
title: psd的js脚本
date: 2023-07-24 20:43:56
tags: 前端
---

> 我们可以随自己的高兴来认识这个世界，然而世界总少不了光明面和阴暗面。——歌德

今天研究了下`psd`的脚本

[Photoshop 中的脚本](https://helpx.adobe.com/cn/photoshop/using/scripting.html)

https://github.com/Adobe-CEP/CEP-Resources/tree/master/Documentation/Product%20specific%20Documentation/Photoshop%20Scripting

然后下载了脚本监视器插件，可以让我们在使用`psd`时生成对应的脚本

[Downloadable plug-ins and content in Photoshop](https://helpx.adobe.com/photoshop/kb/downloadable-plugins-and-content.html)

![](/imgs/oss/picGo/20230724210005.png)

然后解压，复制`Scripting Utilties`

![](/imgs/oss/picGo/20230724210048.png)

粘贴到`PS`的路径下面的`Plug-ins`下面

![](/imgs/oss/picGo/20230724210826.png)

重启`ps`即可，之后执行操作则会在桌面生成脚本文件

![](/imgs/oss/picGo/20230724211055.png)

![](/imgs/oss/picGo/20230724211123.png)

脚本内容：

```javascript
// Copyright 2002-2007.  Adobe Systems, Incorporated.  All rights reserved.
// Create a new art layer and convert it to a text layer.
// Set its contents, size and color.

// enable double clicking from the Macintosh Finder or the Windows Explorer
#target photoshop

// in case we double clicked the file
app.bringToFront();

// debug level: 0-2 (0:disable, 1:break on error, 2:break at beginning)
// $.level = 0;
// debugger; // launch debugger on next line

var strtRulerUnits = app.preferences.rulerUnits;
var strtTypeUnits = app.preferences.typeUnits;
app.preferences.rulerUnits = Units.INCHES;
app.preferences.typeUnits = TypeUnits.POINTS;

var docRef = app.documents.add(7, 5, 72);

// suppress all dialogs
app.displayDialogs = DialogModes.NO;

var textColor = new SolidColor;
textColor.rgb.red = 255;
textColor.rgb.green = 0;
textColor.rgb.blue = 0;

var newTextLayer = docRef.artLayers.add();
newTextLayer.kind = LayerKind.TEXT;
newTextLayer.textItem.contents = "Hello, World!";
newTextLayer.textItem.position = Array(0.75, 0.75);
newTextLayer.textItem.size = 36;
newTextLayer.textItem.color = textColor;

app.preferences.rulerUnits = strtRulerUnits;
app.preferences.typeUnits = strtTypeUnits;
docRef = null;
textColor = null;
newTextLayer = null;
```

执行结果

![](/imgs/oss/picGo/20230724211202.png)
