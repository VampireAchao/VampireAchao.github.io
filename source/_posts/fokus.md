---
title: fokus
date: 2022-06-25 11:20:41
tags: 前端
---

> 死亡，就是你加上这个世界，再减去你。——卡尔维诺

分享一个好玩的开源项目，演示地址：

https://lab.hakim.se/fokus/

代码仓库：https://github.com/hakimel/Fokus

演示效果：

![fokus](/imgs/oss/picGo/fokus.gif)

当我们在页面上框选时，会在页面上加个蒙版，高亮框选区域

使用方式，首先下载`fokus.min.js`

[官方链接](https://github.com/hakimel/Fokus/blob/master/js/fokus.min.js)

[备用链接](/imgs/oss/picGo/fokus.min.js)

然后引用

```html
<script src="/js/fokus.min.js"></script>
```

最后编写代码(随便写点)

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="/js/fokus.min.js"></script>
</head>

<body>
    <div>
        　　开源的发生，到底需要如何做到，不开源的发生，又会如何产生。 从这个角度来看， 左拉曾经说过，生活的道路一旦选定，就要勇敢地走到底，决不回头。这启发了我， 一般来说， 一般来讲，我们都必须务必慎重的考虑考虑。
        我们不得不面对一个非常尴尬的事实，那就是， 我们都知道，只要有意义，那么就必须慎重考虑。 我们都知道，只要有意义，那么就必须慎重考虑。 既然如此， 问题的关键究竟为何？
        培根曾经说过，深窥自己的心，而后发觉一切的奇迹在你自己。我希望诸位也能好好地体会这句话。
    </div>
    <div>
        <div>
            　　开源，到底应该如何实现。
            所谓开源，关键是开源需要如何写。
        </div>
        <div>
            韩非曾经提到过，内外相应，言行相称。
            这启发了我， 开源，发生了会如何，不发生又会如何。
        </div>
        <div>
            在这种困难的抉择下，本人思来想去，寝食难安。
            可是，即使是这样，开源的出现仍然代表了一定的意义。
        </div>
        <div>
            左拉曾经提到过，生活的道路一旦选定，就要勇敢地走到底，
            决不回头。这似乎解答了我的疑惑。
        </div>
        <div>
            既然如何，生活中，若开源出现了，我们就不得不考虑它出现了的事实。
        </div>
    </div>
</body>

</html>
```

就能达成效果：

![image-20220625122405273](/imgs/oss/picGo/image-20220625122405273.png)