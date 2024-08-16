---
title: xnio坑
date: 2022-08-28 14:33:33
tags: java
---

> 恶名不治，恶伤可治——佚名

今天拉取[`StreamPark`](https://github.com/streamxhub/streampark)发现其引用了`xnio`

并且项目运行时抛出了`nvalid file path`的异常提示

发现源码部分：

![image-20220828143558515](/imgs/oss/blog/image-20220828143558515.png)

其去寻找了`NUL:`这个路径

```java
new FileOutputStream("NUL:")
```

解决方式：

启动参数带上`-Djdk.io.File.enableADS=true`：

```shell
-Djdk.io.File.enableADS=true -Dapp.home=streamx-console/streamx-console-service/target/streamx-console-service-1.2.4
```

![image-20220828143737653](/imgs/oss/blog/image-20220828143737653.png)

如果没有这一栏，可以在右侧蓝字`Modify options`开启

![image-20220828143843077](/imgs/oss/blog/image-20220828143843077.png)