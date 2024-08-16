---
title: 集成wangEditor
date: 2021-06-19 00:03:17
tags: 前端
---

> 

> 寿命的缩短与思想的虚耗成正比。——达尔文

[官方文档](https://www.wangeditor.com/)

> wangEditor：Typescript 开发的 Web 富文本编辑器， 轻量、简洁、易用、开源免费

`html`里集成`wangEditor`非常简单

```html
<div id="div1"></div>
<script src="https://unpkg.com/wangeditor/dist/wangEditor.min.js"></script>
<script>
	var E = window.wangEditor;
	var editor = new E("#div1");
	editor.create();
</script>
```

只需要上方几行代码即可完成

![image-20210620002024775](/imgs/oss/picGo/image-20210620002024775.png)

如果我们需要获取富文本中的内容

使用`editor.txt.html()`即可

