---
title: gradle修改jdk版本
date: 2024-05-10 21:30:57
tags: android
---

> 读书是最好的学习，追随伟大人物的思想，是最富有趣味的一门科学。——普希金

今天拉一个项目报错

```bash
Unable to start the daemon process.

The project uses Gradle 3.5 which is incompatible with Java 11 or newer.

Possible solution:
 - Upgrade Gradle wrapper to 7.2 version and re-import the project
```

找了半天没找到修改`jdk`的入口

![](/imgs/oss/blog-img/2024-05-09-21-33-21-image.png)

最后还是双击`shift`，搜`Change Gradle JDK Location`

![](/imgs/oss/blog-img/2024-05-09-21-35-14-image.png)

这才找到：

![](/imgs/oss/blog-img/2024-05-09-21-35-36-image.png)
