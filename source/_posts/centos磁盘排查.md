---
title: centos磁盘排查
date: 2023-02-10 21:44:15
tags: 运维
---

> 不怕人家说说有缺点，才会不断进步——丁玲

今天发现服务器磁盘满了，使用`du`命令排查，首先找到根目录

```shell
du -h --max-depth=1 /
```

然后发现`/usr`下面最大，接着找`/usr`目录下

```shell
du -h --max-depth=1 /usr
```

发现`/usr/local`目录最大，我们挨个排查下去，发现是`jpom`的历史构建产物占用空间太多，去`Jpom`里删除就好了

![image-20230210214943732](/imgs/oss/blog/vampireachao/image-20230210214943732.png)

![image-20230210215005659](/imgs/oss/blog/vampireachao/image-20230210215005659.png)