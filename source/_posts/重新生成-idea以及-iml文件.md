---
title: 重新生成.idea以及.iml文件
date: 2020-12-08 22:32:02
tags: 软件及插件
---

> 心地才是最远的荒地，很少有人一辈子种好它。――刘亮程

`idea`中重新生成`.iml`可以输入命令

```shell
mvn idea:module
```

重新生成`.idea`则可以输入命令

```shell
 mvn -U idea:idea
```

模块、依赖找不到的话不妨试试

还可以尝试点击`idea`中的作废缓存

![image-20201208223527040](/imgs/oss/picGo/image-20201208223527040.png)

以及`mvn clean`和刷新

![image-20201208223609160](/imgs/oss/picGo/image-20201208223609160.png)