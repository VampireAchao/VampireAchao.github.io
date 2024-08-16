---
title: android毛玻璃效果
date: 2023-12-25 20:42:06
tags: android
---

> 恭维不会使女人飘然，却往往使男人丧志。——王尔德

安卓实现一个毛玻璃效果可以使用`Blurry`

https://github.com/wasabeef/Blurry

代码：

```java
// 覆盖，父级必须是 ViewGroup
Blurry.with(context).radius(25).sampling(2).onto(rootView)
// 添加
// from View
Blurry.with(context).capture(view).into(imageView)
// from Bitmap 
Blurry.with(context).from(bitmap).into(imageView)
```



**Blur Options 模糊选项**

- Radius 半径
- Down Sampling 下采样
- Color Filter 彩色滤光片
- Asynchronous Support 异步支持
- Animation (Overlay Only)  
  动画（仅限叠加）

```java
Blurry.with(context)
  .radius(10)
  .sampling(8)
  .color(Color.argb(66, 255, 255, 0))
  .async()
  .animate(500)
  .onto(rootView);
```

**Get a bitmap directly 直接获取位图**

```kotlin
// Sync
val bitmap = Blurry.with(this)
  .radius(10)
  .sampling(8)
  .capture(findViewById(R.id.right_bottom)).get()imageView.setImageDrawable(BitmapDrawable(resources, bitmap))

// Async
Blurry.with(this)
  .radius(25)
  .sampling(4)
  .color(Color.argb(66, 255, 255, 0))
  .capture(findViewById(R.id.left_bottom))
  .getAsync {    imageView.setImageDrawable(BitmapDrawable(resources, it))  }
```
