---
title: input+type=file同时支持文件和文件夹
date: 2023-06-02 21:33:49
tags: 前端
---

> 1没有知识的旅游者是一只没有翅膀的鸟。——萨阿迪

使用的`dropzone`库，你可以将任意类型的文件拖拽进去上传，如果是目录，则会获取目录内的文件

https://github.com/dropzone/dropzone

代码如下：

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/dropzone@5/dist/min/dropzone.min.css"
  type="text/css"
/>

<script src="https://unpkg.com/dropzone@5/dist/min/dropzone.min.js"></script>

<div class="my-dropzone dz-clickable" style="
    display: block;
    width: 100px;
    height: 100px;
    background: greenyellow;
"></div>

<script>
  // Dropzone has been added as a global variable.
  const dropzone = new Dropzone("div.my-dropzone", { url: "/file/post" });
   console.log({dropzone})
</script>
```

效果：

<link
  rel="stylesheet"
  href="https://unpkg.com/dropzone@5/dist/min/dropzone.min.css"
  type="text/css"
/>

<script src="https://unpkg.com/dropzone@5/dist/min/dropzone.min.js"></script>

<div class="my-dropzone dz-clickable" style="
    display: block;
    width: 100px;
    height: 100px;
    background: greenyellow;
"></div>

<script>
  // Dropzone has been added as a global variable.
  const dropzone = new Dropzone("div.my-dropzone", { url: "/file/post" });
   console.log({dropzone})
</script>

