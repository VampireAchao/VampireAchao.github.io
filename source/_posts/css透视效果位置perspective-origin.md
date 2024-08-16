---
title: css透视效果位置perspective-origin
date: 2024-07-09 19:41:30
tags: 前端
---

> 真理是时间的孩子，不是权威的孩子。——伽利略

正如我们在前一篇文章中提到的，CSS具备处理3D变换的能力。继续这一话题，本文将重点介绍`perspective-origin`属性，这个属性允许我们调整透视效果的原点，影响3D变换的视觉输出。

详细信息可以参考这个链接：[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/perspective-origin)

让我们通过一个例子来看看`perspective-origin`的实际效果：

<style>
.cube {
    width: 100px;
    height: 100px;
    position: relative;
    transform-style: preserve-3d;
    transform: rotateX(45deg) rotateY(45deg);
}

.face {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 165, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: white;
}

.front  { transform: translateZ(50px); }
.back   { transform: rotateY(180deg) translateZ(50px); }
.right  { transform: rotateY(90deg) translateZ(50px); }
.left   { transform: rotateY(-90deg) translateZ(50px); }
.top    { transform: rotateX(90deg) translateZ(50px); }
.bottom { transform: rotateX(-90deg) translateZ(50px); }
</style>

```html
<div class="container" style="perspective: 500px;perspective-origin: 50% 50%;">
    <div class="cube">
        <div class="face front">前</div>
        <div class="face back">后</div>
        <div class="face right">右</div>
        <div class="face left">左</div>
        <div class="face top">顶</div>
        <div class="face bottom">底</div>
    </div>
</div>
```

<div class="container" style="perspective: 500px;perspective-origin: 50% 50%;">
    <div class="cube">
        <div class="face front">前</div>
        <div class="face back">后</div>
        <div class="face right">右</div>
        <div class="face left">左</div>
        <div class="face top">顶</div>
        <div class="face bottom">底</div>
    </div>
</div>

在这个示例中，我们设置了`perspective: 500px`和默认的`perspective-origin: 50% 50%`。这意味着透视点位于容器的中心。通过改变`perspective-origin`的值，你可以观察到立方体如何根据视点的变化而变化，这为创建更加动态和吸引人的3D效果提供了更多控制。

接下来，让我们将`perspective-origin`的概念与摄像机的视角进行类比。调整`perspective-origin`就像是移动摄像机的位置来改变观察立方体的角度。这样的操作可以让我们从不同的视角观察到3D对象的不同面。

例如，如果我们将`perspective-origin`设置在容器的左上角（比如`0% 0%`），那么立方体将会看起来是从左上方被观察。这种变化会给观看者一种全新的视觉体验，就像他们从一个不同的角度进入了一个三维空间。

让我们通过修改上一个例子中的代码来看看这种效果：

```html
<div class="container" style="perspective: 500px;perspective-origin: 0% 0%;">
    <div class="cube">
        <div class="face front">前</div>
        <div class="face back">后</div>
        <div class="face right">右</div>
        <div class="face left">左</div>
        <div class="face top">顶</div>
        <div class="face bottom">底</div>
    </div>
</div>
```

<div class="container" style="perspective: 500px;perspective-origin: 0% 0%;">
    <div class="cube">
        <div class="face front">前</div>
        <div class="face back">后</div>
        <div class="face right">右</div>
        <div class="face left">左</div>
        <div class="face top">顶</div>
        <div class="face bottom">底</div>
    </div>
</div>

在这个例子中，将`perspective-origin`设置为`0% 0%`意味着视点现在位于容器的左上角。你会看到前面和右面的透视效果更加明显，而其他面则会相对减少这种效果。这种视觉差异使得3D效果更加强烈和真实。

综合来看，`perspective`和`perspective-origin`的联合使用为开发者提供了强大的工具，以创造引人入胜的3D视觉效果。通过精细调整这两个属性，你可以为用户创造出几乎无限种视觉体验，增强你的网站或应用的吸引力和互动性。
