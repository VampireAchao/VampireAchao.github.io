---
title: 自定义scroll滑块样式
date: 2022-03-16 18:49:31
tags: 前端
---

> 这个天地，我来过，我奋战过，我深爱过，我不在乎结局。——今何在 《悟空传》

代码如下：

```css
/* 滚动条整体部分 */
::-webkit-scrollbar {
  width: 12px;
}
/* 滚动条两端的按钮 */
::-webkit-scrollbar-button {
}
/* 外层轨道 */
::-webkit-scrollbar-track {
  background: #eee;
  border-radius: 18px;
}
/* 内层滚动槽 */
::-webkit-scrollbar-track-piece {
  
}
/* 滚动的滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 18px;
  background: #bbb;
}
/* 边角 */
::-webkit-scrollbar-corner {
  
}
/* 定义右下角拖动块的样式 */
::-webkit-resizer {
}
```

效果如下：

![image-20220316185037674](/imgs/oss/picGo/image-20220316185037674.png)