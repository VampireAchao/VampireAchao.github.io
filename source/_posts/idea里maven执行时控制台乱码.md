---
title: idea里maven执行时控制台乱码
date: 2023-02-19 20:04:03
tags: 软件及插件
---

> 1

设置编码格式为`GBK`即可

```shell
-Dfile.encoding=GBK
```

![image-20230219200927358](/imgs/oss/blog/vampireachao/image-20230219200927358.png)

设置前：

![image-20230219200955556](/imgs/oss/blog/vampireachao/image-20230219200955556.png)

设置后：

![image-20230219201032268](/imgs/oss/blog/vampireachao/image-20230219201032268.png)