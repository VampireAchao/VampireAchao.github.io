---
title: htmlToCanvas
date: 2022-06-22 13:17:45
tags: 前端
---

> 利用时间是一个极其高级的规律。——恩格斯
>

今天分享一个`html`转`canvas`的插件：

http://html2canvas.hertzen.com/

使用方式特别简单：

引入：

```shell
pnpm install --save html2canvas
# import html2canvas from 'html2canvas';
```

或者直接上`link`

```html
<script src="http://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
```

需要转换的`html`节点

```html
<div id="capture" style="padding: 10px; background: #f5da55">
    <h4 style="color: #000; ">Hello world!</h4>
</div>
```

使用：

```javascript
html2canvas(document.querySelector("#capture")).then(canvas => {
    document.body.appendChild(canvas)
});
```

效果：

<script src="http://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>

<div id="capture"></div>

<button onclick="btnclick()">点我，然后往下翻</button>

<script>
   function btnclick(){
       html2canvas(document.querySelector("body")).then(canvas => {
    document.querySelector("body").appendChild(canvas)
});
   } 
</script>

