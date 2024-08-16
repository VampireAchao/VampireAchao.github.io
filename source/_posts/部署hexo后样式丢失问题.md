---
title: 部署hexo后样式丢失问题
date: 2020-12-09 22:37:14
tags: 小技巧
---

> 无息乌乎生，无绝乌乎续，无无乌乎有？ ——明·宋应星《谈天·日说三》

如果遇到`hexo`部署到`gitee`后样式丢失，并且控制台没有报错的话，可以修改`hexo`配置文件

![image-20201209224132183](/imgs/oss/picGo/image-20201209224132183.png)

检查`url`和`root`这两项

![image-20201209224244412](/imgs/oss/picGo/image-20201209224244412.png)

还有一个注意点是，如果我们新建仓库的时候，尽量让仓库名、以及路径和`gitee`的登录名保持一致

![image-20201209224449877](/imgs/oss/picGo/image-20201209224449877.png)

这样的话我们部署好的博客的路径就可以省略掉子路径

> 仓库名和登录名不一致访问url:https://VampireAchao.github.io/blog

> 仓库名和登录名一致访问url:https://VampireAchao.github.io/
