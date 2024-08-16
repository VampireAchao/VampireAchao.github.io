---
title: CamanJS
date: 2023-06-18 22:13:29
tags: 前端
---

> 过分宽大的法律，不易使人服从；太严厉的法律，则绝少被遵守。——富兰克林

分享一个前端基于`canvas`的图片`js`库

http://camanjs.com/

https://github.com/meltingice/CamanJS

安装

```shell
npm install caman
```

用法：

```javascript
 Caman('#my-image', function () {
    this.brightness(10);
    this.contrast(30);
    this.sepia(60);
    this.saturation(-30);
    this.render();
  });
```

`html`

```html
<img 
    data-caman="brightness(10) contrast(30) sepia(60) saturation(-30)"
    data-caman-hidpi="/path/to/image@2x.jpg"
    src="path/to/image.jpg"
  >
```

![image-20230618223055026](/imgs/oss/blog/vampireachao/image-20230618223055026.png)

