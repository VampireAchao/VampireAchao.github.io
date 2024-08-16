---
title: officegen
date: 2023-05-22 21:21:55
tags: 前端
---

> 以权利合者，权利尽而交疏。——《史记》

如果我们需要使用`js`来编辑`word`、`excel`、`powerpoint`

可以使用这个开源项目：https://github.com/Ziv-Barber/officegen

![image-20230522212408914](/imgs/oss/blog/vampireachao/image-20230522212408914.png)

可以让我们在`html`中进行编辑

安装使用：

```shell
$ npm install officegen
```

`ppt`例子：

```javascript
const officegen = require('officegen')
const fs = require('fs')

// Create an empty PowerPoint object:
let pptx = officegen('pptx')

// Let's add a title slide:

let slide = pptx.makeTitleSlide('Officegen', 'Example to a PowerPoint document')

// Pie chart slide example:

slide = pptx.makeNewSlide()
slide.name = 'Pie Chart slide'
slide.back = 'ffff00'
slide.addChart(
  {
    title: 'My production',
    renderType: 'pie',
    data:
	[
      {
        name: 'Oil',
        labels: ['Czech Republic', 'Ireland', 'Germany', 'Australia', 'Austria', 'UK', 'Belgium'],
        values: [301, 201, 165, 139, 128,  99, 60],
        colors: ['ff0000', '00ff00', '0000ff', 'ffff00', 'ff00ff', '00ffff', '000000']
      }
    ]
  }
)

// Let's generate the PowerPoint document into a file:

return new Promise((resolve, reject) => {
  let out = fs.createWriteStream('example.pptx')

  // This one catch only the officegen errors:
  pptx.on('error', function(err) {
    reject(err)
  })

  // Catch fs errors:
  out.on('error', function(err) {
    reject(err)
  })

  // End event after creating the PowerPoint file:
  out.on('close', function() {
    resolve()
  })

  // This async method is working like a pipe - it'll generate the pptx data and put it into the output stream:
  pptx.generate(out)
})
```

非常地好用