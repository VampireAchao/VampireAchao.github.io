---
title: android去掉标题栏
date: 2020-09-11 21:36:33
tags: android
---

> 自由不是让你想做什么就做什么，自由是教你不想做什么，就可以不做什么。——康德

在`Activity`里加上

```java
        //去掉标题栏
        getSupportActionBar().hide();
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
```

![image-20200911214511139](/imgs/oss/picGo/image-20200911214511139.png)

注意位置是在`setContentView`前