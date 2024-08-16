---
title: 声网sdk检查
date: 2023-12-06 09:01:11
tags: java
---

> 权欲如同烈酒和毒药，使人丧失理智。——易卜生

踩坑了踩坑了！对接三方厂商`sdk`一定要检查版本号！

今天对接声网`sdk`发现版本低，很多功能不支持！！！升级还发现不兼容！

炸了

于是开升级版本。。。

首先是`gav`可以直接从`maven`中央仓库下载啦

```xml
<dependency>
  <groupId>io.agora</groupId>
  <artifactId>rtm-java</artifactId>
  <version>2.1.7-beta</version>
</dependency>
```

然后如果是频道消息，则不再需要创建频道了，只需要订阅即可收到对应频道的消息

获取版本号的代码：

```java
RtmClient.getInstance().getVersion()
```
