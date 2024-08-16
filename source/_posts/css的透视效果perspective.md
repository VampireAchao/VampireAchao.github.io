---
title: css的透视效果perspective
date: 2024-07-07 21:58:58
tags: 前端
---

> 有两件事我最憎恶：没有信仰的博才多学和充满信仰的愚昧无知。——爱默生

我们知道`css`中我们的`transform`可以调整`z`轴，这说明`css`是有`3d`能力的

但是我们通常看一个`3d`的物体，是近的地方大，远的地方小甚至被遮挡，要实现这样的透视效果其实只需要一个`css`属性即可

https://developer.mozilla.org/zh-CN/docs/Web/CSS/perspective

就比如这个正方体：

<style>
.face {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: absolute;
    backface-visibility: inherit;
    font-size: 60px;
    color: #fff
}

.front {
    background: rgba(90,90,90,.7);
    transform: translateZ(50px)
}

.back {
    background: rgba(0,210,0,.7);
    transform: rotateY(180deg) translateZ(50px)
}

.right {
    background: rgba(210,0,0,.7);
    transform: rotateY(90deg) translateZ(50px)
}

.left {
    background: rgba(0,0,210,.7);
    transform: rotateY(-90deg) translateZ(50px)
}

.top {
    background: rgba(210,210,0,.7);
    transform: rotateX(90deg) translateZ(50px)
}

.bottom {
    background: rgba(210,0,210,.7);
    transform: rotateX(-90deg) translateZ(50px)
}

#example-element {
    height: 100px;
    width: 100px;
}

</style>

代码

```html
<div id="example-element" class="transition-all" style="perspective: 800px;" data-immersive-translate-walked="0feca0b2-b725-4a5c-91aa-4690c29a453c">
      <div class="face front" data-immersive-translate-walked="0feca0b2-b725-4a5c-91aa-4690c29a453c">1</div>
      <div class="face back" data-immersive-translate-walked="0feca0b2-b725-4a5c-91aa-4690c29a453c">2</div>
      <div class="face right" data-immersive-translate-walked="0feca0b2-b725-4a5c-91aa-4690c29a453c">3</div>
      <div class="face left" data-immersive-translate-walked="0feca0b2-b725-4a5c-91aa-4690c29a453c">4</div>
      <div class="face top" data-immersive-translate-walked="0feca0b2-b725-4a5c-91aa-4690c29a453c">5</div>
      <div class="face bottom" data-immersive-translate-walked="0feca0b2-b725-4a5c-91aa-4690c29a453c">6</div>
    </div>
```

效果


<div id="example-element" class="transition-all" style="perspective: 800px;" data-immersive-translate-walked="0feca0b2-b725-4a5c-91aa-4690c29a453c">
      <div class="face front" data-immersive-translate-walked="0feca0b2-b725-4a5c-91aa-4690c29a453c">1</div>
      <div class="face back" data-immersive-translate-walked="0feca0b2-b725-4a5c-91aa-4690c29a453c">2</div>
      <div class="face right" data-immersive-translate-walked="0feca0b2-b725-4a5c-91aa-4690c29a453c">3</div>
      <div class="face left" data-immersive-translate-walked="0feca0b2-b725-4a5c-91aa-4690c29a453c">4</div>
      <div class="face top" data-immersive-translate-walked="0feca0b2-b725-4a5c-91aa-4690c29a453c">5</div>
      <div class="face bottom" data-immersive-translate-walked="0feca0b2-b725-4a5c-91aa-4690c29a453c">6</div>
    </div>

如果我们设置`perspective: 800px;`

代码

```html
<div id="example-element" class="transition-all" style="perspective: 800px;" data-immersive-translate-walked="b1d212a5-696e-42f8-b9b3-e677dce0025c">
      <div class="face front" data-immersive-translate-walked="b1d212a5-696e-42f8-b9b3-e677dce0025c">1</div>
      <div class="face back" data-immersive-translate-walked="b1d212a5-696e-42f8-b9b3-e677dce0025c">2</div>
      <div class="face right" data-immersive-translate-walked="b1d212a5-696e-42f8-b9b3-e677dce0025c">3</div>
      <div class="face left" data-immersive-translate-walked="b1d212a5-696e-42f8-b9b3-e677dce0025c">4</div>
      <div class="face top" data-immersive-translate-walked="b1d212a5-696e-42f8-b9b3-e677dce0025c">5</div>
      <div class="face bottom" data-immersive-translate-walked="b1d212a5-696e-42f8-b9b3-e677dce0025c">6</div>
    </div>
```

效果

<div id="example-element" class="transition-all" style="perspective: 800px;" data-immersive-translate-walked="b1d212a5-696e-42f8-b9b3-e677dce0025c">
      <div class="face front" data-immersive-translate-walked="b1d212a5-696e-42f8-b9b3-e677dce0025c">1</div>
      <div class="face back" data-immersive-translate-walked="b1d212a5-696e-42f8-b9b3-e677dce0025c">2</div>
      <div class="face right" data-immersive-translate-walked="b1d212a5-696e-42f8-b9b3-e677dce0025c">3</div>
      <div class="face left" data-immersive-translate-walked="b1d212a5-696e-42f8-b9b3-e677dce0025c">4</div>
      <div class="face top" data-immersive-translate-walked="b1d212a5-696e-42f8-b9b3-e677dce0025c">5</div>
      <div class="face bottom" data-immersive-translate-walked="b1d212a5-696e-42f8-b9b3-e677dce0025c">6</div>
    </div>

可以看到前面的面变大，后面的变小，侧面的做了拉伸

这个数值越大，看起来就离得越远，等于是设置了摄像机与元素的距离
