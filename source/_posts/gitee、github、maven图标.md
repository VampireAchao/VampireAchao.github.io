---
title: gitee、github、maven图标
date: 2022-07-02 19:32:36
tags: 小技巧
---

> 人生碌碌，竞短论长，却不道荣枯有数，得失难量。——《浮生六记》

朋友问我`stream-query`官网这个图标怎么搞：

![image-20220702193621879](/imgs/oss/picGo/image-20220702193621879.png)

实际上是这样一个网站生成的：https://shields.io/

比如我这里搜`maven`：

![image-20220702193914154](/imgs/oss/picGo/image-20220702193914154.png)

可以看到下方的示例，我们点击下面的图标，弹出一个框

填好配置即可

![image-20220702194237870](/imgs/oss/picGo/image-20220702194237870.png)

点击`Copy Badge URL`就可以使用啦！

```http
https://img.shields.io/maven-central/v/io.github.vampireachao/stream-query?color=%23ff&label=maven%E4%B8%AD%E5%A4%AE%E4%BB%93%E5%BA%93
```

![哇哦](https://img.shields.io/maven-central/v/io.github.vampireachao/stream-query?color=%23ff&label=maven%E4%B8%AD%E5%A4%AE%E4%BB%93%E5%BA%93)