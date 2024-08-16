---
title: gifsicle
date: 2023-09-15 15:46:30
tags: 软件及插件
---

> 非但不能强制自然，还要顺从自然。——埃斯库罗斯

[GitHub - kohler/gifsicle: Create, manipulate, and optimize GIF images and animations](https://github.com/kohler/gifsicle)

[Gifsicle: Command-Line Animated GIFs](http://www.lcdf.org/gifsicle/)

Gifsicle 是一个命令行工具，用于创建、编辑和获取有关 GIF 图像和动画的信息。使用 gifsicle 制作 GIF 动画很容易：

```bash
gifsicle --delay=10 --loop *.gif > anim.gif
```

截帧也很容易

```bash
gifsicle anim.gif '#0' > firstframe.gif
```

您还可以通过替换、删除或插入帧来编辑动画：

```bash
gifsicle -b anim.gif --replace '#0' new.gif
```
