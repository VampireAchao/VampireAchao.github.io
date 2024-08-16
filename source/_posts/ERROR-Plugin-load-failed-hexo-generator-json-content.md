---
title: 'ERROR Plugin load failed: hexo-generator-json-content'
date: 2022-11-15 13:30:19
tags: 前端
---

> 天道之数，至则反，盛则衰。人心之变，有余则骄，骄则缓怠。——管子

发现博客里`hexo`命令突然用不了了(我重新`cnpm i`了一下导致的)

报错如下：

![image-20221115133054985](/imgs/oss/picGo/image-20221115133054985.png)

既然报错这个模块，我们进去看看

![hexo-generator-json-content-error](/imgs/oss/picGo/hexo-generator-json-content-error.png)

然后发现了端倪，这里用到的`hexo-util`选择的最新版，且下面根本没有`dist`目录，但是之前还是好的，并且我此处出现两个`hexo-util`版本。。。

![image-20221115133557121](/imgs/oss/picGo/image-20221115133557121.png)

看了下源码地址，原来四天前发版了

![image-20221115133631645](/imgs/oss/picGo/image-20221115133631645.png)

解决办法：

进入报错的`hexo`目录

```shell
cd D:\file\blog\blog\node_modules\hexo-generator-json-content
# 卸载新版本
npm uni hexo-util
# 安装 2.7版本
npm i hexo-util@2.7
```

再返回到我们博客目录

成功执行`hexo`命令

![image-20221115134000305](/imgs/oss/picGo/image-20221115134000305.png)

