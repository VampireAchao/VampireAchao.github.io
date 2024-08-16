---
title: xxx.app已损坏，无法打开。你应该将它移到废纸篓
date: 2023-10-22 08:56:54
tags: 软件及插件
---

> 真正的友谊总是预见对方的需要，而不是宣布自己需要什么。——莫洛亚

`mac`经常会遇到

![](/imgs/oss/blog-img/2023-10-22-09-00-17-image.png)

基本都可以使用下面的命令解决：

```bash
xattr -cr /Applications/xxx.app
```

文中提到需要签名

https://developer.apple.com/documentation/macos-release-notes/macos-big-sur-11_0_1-universal-apps-release-notes

这个签名需要苹果的开发者账户，费用约为99$/年

执行命令后就可以打开了

![](/imgs/oss/blog-img/2023-10-22-09-24-14-image.png)
