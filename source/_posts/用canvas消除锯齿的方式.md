---
title: 用canvas消除锯齿的方式
date: 2024-02-21 20:03:15
tags: 前端
---

> 不和不可以接物，不严不可以驭下。——林逋

分享几种`canvas`消除锯齿的方式

### 1. 线条坐标增加0.5

```html
<canvas id="canvas1" width="200" height="200"></canvas>
<script>
  var canvas = document.getElementById('canvas1');
  var ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.moveTo(0, 0.5); // 使用0.5增量对齐像素
  ctx.lineTo(200, 0.5); // 绘制一条边缘清晰的直线
  ctx.stroke();
</script>
```

### 2. 使用高清画布

```html
<canvas id="canvas2" style="width:200px; height:200px;"></canvas>
<script>
  var canvas = document.getElementById('canvas2');
  var ctx = canvas.getContext('2d');
  var dpr = window.devicePixelRatio || 1;
  var rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  // 绘制图形...
</script>
```

### 3. 缩放画布进行图像修正

```html
<canvas id="canvas3" width="200" height="200"></canvas>
<script>
  var canvas = document.getElementById('canvas3');
  var ctx = canvas.getContext('2d');
  var scale = window.devicePixelRatio; // 获取设备像素比
  canvas.width *= scale;
  canvas.height *= scale;
  ctx.scale(scale, scale);
  // 绘制图形...
  // 绘制完成后，如果需要，可以通过CSS缩放画布回原始尺寸
</script>
```

### 4. 配置图像平滑属性

```html
<canvas id="canvas4" width="200" height="200"></canvas>
<script>
  var canvas = document.getElementById('canvas4');
  var ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = true; // 开启图像平滑
  // 绘制图形...
</script>
```

### 5. 使用 `hidpi-canvas` 库

这个需要在您的项目中包含`hidpi-canvas`库，示例假定您已经引入了该库。

```html
<canvas id="canvas5" width="200" height="200"></canvas>
<script>
  var canvas = document.getElementById('canvas5');
  // 使用hidpi-canvas库自动处理画布
  // 参照库的文档进行初始化和使用
</script>
```

### 6. Bicubic Interpolation的插值算法

这通常在图像处理库中实现，Canvas本身不直接支持，但可以通过引入外部库如`fabric.js`或自定义函数实现。

### 7. ctx.translate(0.5, 0.5)

```html
<canvas id="canvas7" width="200" height="200"></canvas>
<script>
  var canvas = document.getElementById('canvas7');
  var ctx = canvas.getContext('2d');
  ctx.translate(0.5, 0.5); // 对所有绘制的对象进行微调
  // 绘制图形...
</script>
```
