---
title: js禁止右键点击事件
date: 2020-10-24 10:00:29
tags: 前端
---

> 勤劳一日，可得一夜安眠；勤劳一生，可得幸福长眠。——达·芬奇

`js`禁止右键点击事件触发代码

```javascript
 function click() {
     return false;
 }

 function click1() {
     if (event.button == 2) {
         return false;
     }
 }

 function CtrlKeyDown() {
     if (event.ctrlKey) {
         return false;
     }
 }
 document.onkeydown = CtrlKeyDown;
 document.onselectstart = click;
 document.onmousedown = click1;
 document.oncontextmenu = function(event) {
     if (document.all)
         window.event.returnValue = false; // for IE
     else
         event.preventDefault();
 }
```

