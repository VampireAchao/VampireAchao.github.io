---
title: 避免git产生Merge branch 'foo' into 'bar'提交
date: 2024-02-08 13:52:05
tags: 小技巧
---

> 权利和财富不会促进，反而会损害道德和自由的事业。——雪莱

`git`多人协同开发老是遇到这种提交，看起来很不舒服

![](/imgs/oss/blog-img/2024-02-08-14-01-08-image.png)

这里有几种去掉的方式

例如可以正则过滤

```regex
^(?!Merge).*
```

![](/imgs/oss/blog-img/2024-02-08-18-08-47-image.png)

然后还可以避免，因为这个消息是对于未拉代码就`commit`，结果`pull`下来发现远端有更新，本地也有更新，所以会多一个`Commit`，`message`就为

```bash
Merge remote-tracking branch 'foo' into bar
```

我们只需要在`commit`之前先`pull`即可避免，也可以在`PR`里使用`Squash and Merge`压缩合并
