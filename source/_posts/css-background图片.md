---
title: css background图片
date: 2022-08-06 19:59:11
tags: 前端
---

> 只有用水将心上的雾气淘洗干净，荣光才会照亮最初的梦想。——『百年孤独』

`MDN`：https://developer.mozilla.org/zh-CN/docs/Web/CSS/background

首先我们可以使用

```css
background: url(/imgs/oss/2020-06-01/head.jpg);
```

来指定背景图片

![image-20220806200328207](/imgs/oss/picGo/image-20220806200328207.png)

如果我们需要修改透明度，则可以使用其可以叠加的特性

```css
background: linear-gradient(rgba(0,0,0,80%),rgba(0,0,0,80%)),url(/imgs/oss/2020-06-01/head.jpg)
```

![image-20220806201328127](/imgs/oss/picGo/image-20220806201328127.png)

其次，我们可以设置拉伸效果和位置：

- 包含（表示不进行任何裁剪，多余的部分会空出，center是表示位置处于正中央）

  ```css
      background: linear-gradient(rgba(0,0,0,80%),rgba(0,0,0,80%)),url(/imgs/oss/2020-06-01/head.jpg) center/contain no-repeat;
  ```

  ![image-20220806202025427](/imgs/oss/picGo/image-20220806202025427.png)

- 封面(以图片的短边铺满，会进行裁剪)

  ```css
  background: linear-gradient(rgba(0,0,0,80%),rgba(0,0,0,80%)),url(/imgs/oss/2020-06-01/head.jpg) center/cover no-repeat
  ```

  ![image-20220806202931601](/imgs/oss/picGo/image-20220806202931601.png)

剩下的拉伸、重复等就不多多赘述了，看`MDN`吧