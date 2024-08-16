---
title: ios禁用夜间模式
date: 2024-02-05 12:17:19
tags: ios
---

> 家庭应该尽各种方法，鼓励儿童对运动的兴趣。不过应当注意，不要让这种兴趣成为旁观者的兴趣。——马卡连柯

`iOS 13`以上禁用夜间模式这里设置

![](/Users/achao/Documents/blog/themes/gal/source/imgs/oss/blog-img/2024-02-05-12-17-41-image.png)

然后在`AppDelegate`里加上这行代码：

```objectivec
self.window.overrideUserInterfaceStyle = UIUserInterfaceStyleLight;
```

即可
