---
title: 发布jar到maven中央仓库的项目配置
date: 2023-09-09 18:31:46
tags: 软件及插件
---

> 不要找人错处，应找出补救的方法。怨言是人人都会说的。——福特

项目的`pom.xml`

这里举几个例子：

1. 给`stream-query`配置的，基于`jdk8`，所以多配置了个`maven`插件，可以跳过去网页管理后台进行手动发布，达成自动`release`
   
   [pom.xml · dromara/stream-query - Gitee.com](https://gitee.com/dromara/stream-query/blob/main/pom.xml)

2. 给`mybatis-jpa-extra`这个项目配置的，项目高于`jdk8`，所以需要手动release
   
   [[release] 变更groupId为org.dromara.mybatis-jpa-extra，发布3.0.1版本到maven中央仓库 · Pull Request !2 · dromara/mybatis-jpa-extra - Gitee.com](https://gitee.com/dromara/mybatis-jpa-extra/pulls/2)

其中包含了`licenses`/`scm`/`distributionManagement`等等一系列标签，大部分标签都是需要的，建议全部写上避免麻烦
