---
title: git本地关联远端分支
date: 2022-10-23 20:19:18
tags: 小技巧
---

> 受惠的人，必须把那恩惠藏在心底，但是施恩的人则不可记住它。——西塞罗

命令如下：

```shell
git branch --set-upstream-to=origin/master master
```

如果本地新建的分支不关联，则会无法直接使用`git push`推送，当然也可以推送时指定

```shell
git push origin master
```

