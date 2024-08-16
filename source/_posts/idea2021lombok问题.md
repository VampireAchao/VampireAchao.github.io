---
title: idea2021lombok问题
date: 2021-05-11 13:09:09
tags: 软件及插件
---

> 自我控制是最强者本能。——萧伯纳



`idea2021`内置了`lombok`

![image-20210511101441595](/imgs/oss/picGo/image-20210511101441595.png)

我断电后突然用不了，后来好不容易解决了。。。

![image-20210511100900031](/imgs/oss/picGo/image-20210511100900031.png)

解决办法是在`idea`配置中`Appearance & Behavior->Build,Execution,Deployment->Compiler`里

![image-20210511101116150](/imgs/oss/picGo/image-20210511101116150.png)

主要是在`User-local build process VM options(overrides Shared options):`这里配置如下这段

```shell
-Djps.track.ap.dependencies=false
```

然后再次构建，即可成功运行

![img](/imgs/oss/picGo/FUJ@%5DYN9TCP1%5BKG9UGXH4YO.png)