---
title: docusaurus国际化坑
date: 2023-09-24 13:53:55
tags: 前端
---

> 你不教训儿子，生活就一定会来教训他。——佚名

今天做`apache-streampark`文档国际化时踩到一个坑，其使用的框架`docusaurus`它支持多版本的管理，所以需要套一层`current`目录标识版本号

对应的`pr`：

https://github.com/apache/incubator-streampark-website/pull/256

就是将`i18n/zh-CN/docusaurus-plugin-content-docs-community/`移动到

`i18n/zh-CN/docusaurus-plugin-content-docs-community/current/`

加了一层`current`目录即可正确匹配上了

之前的效果：

![](/imgs/oss/picGo/20230924140331.png)

现在：

![](/imgs/oss/picGo/20230924140357.png)
