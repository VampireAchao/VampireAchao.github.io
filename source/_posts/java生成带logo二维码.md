---
title: java生成带logo二维码
date: 2022-01-05 19:44:32
tags: java
---

> 人生如路。须在荒凉中走出繁华的风景来。——七堇年

代码很简单，需要用到[`hutool`](https://www.hutool.cn/)

我这边`logo`是网络地址，实际开发中可以使用本地地址

```java
QrCodeUtil.generatePng("二维码实际的值", QrConfig.create().setImg(ImgUtil.getImage(URLUtil.url(/imgs/oss/2020-06-01/head.jpg))))
```

然后这里的返回值就是`byte[]`我们可以返回给前端

当然，也推荐使用客户端生成二维码，这样避免了网络传输带来的损耗

简单场景和安卓等`java`客户端应用可以用这个方法