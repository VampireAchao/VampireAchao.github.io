---
title: css画一个圈带一条线
date: 2023-09-11 18:06:40
tags: 前端
---

> 深窥自己的心，而后发觉一切的奇迹在你自己。——培根

用到的是`css`的`background`属性和`radial-gradient`

```css
          /** 淡蓝渲染到20px
           * 白色渲染到20px（分割线
           * 白色渲染到21px（分割线
           * 淡蓝渲染到21px
           * 淡蓝渲染到40px
           * 后续白色打底
           */
          background: radial-gradient(
            circle at center,
            #f6faff 20px,
            #fff 20px,
            #fff 21px,
            #f6faff 21px,
            #f6faff 40px,
            #fff 0
          );
```

效果：

<div class="ruben"></div>

<style>
.ruben{
    background: radial-gradient(
            circle at center,
            #f6faff 20px,
            #fff 20px,
            #fff 21px,
            #f6faff 21px,
            #f6faff 40px,
            #fff 0
          );
    width: 100px;
    height: 100px;
}
</style>
