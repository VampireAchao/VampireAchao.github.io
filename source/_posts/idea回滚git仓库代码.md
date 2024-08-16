---
title: idea回滚git仓库代码
date: 2020-10-22 22:00:58
tags: 小技巧
---

> 当众人都哭时，应该允许有的人不哭。当哭成为一种表演时，更应该允许有的人不哭。——莫言

如果我们不小心把错误代码`push`上去了

可以打开`idea`的`Version Control`回滚

![image-20201022220515763](/imgs/oss/picGo/image-20201022220515763.png)

如果要直接回退这里可以直接选`hard`，直接回滚到当时的版本

![image-20201022220559104](/imgs/oss/picGo/image-20201022220559104.png)

当我们回滚成功后

![image-20201022220632550](/imgs/oss/picGo/image-20201022220632550.png)

再输入`git push -f`强制推送就可以了，顺嘴一提这只是其中一种常用的方法

![image-20201022220714943](/imgs/oss/picGo/image-20201022220714943.png)