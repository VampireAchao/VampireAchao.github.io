---
title: 高版本node运行低版本项目
date: 2023-05-18 21:11:21
tags: 前端
---

> 三思而后行——《论语》

这里是运行`apache-shenyu`的前端项目报错，因为我的`node`版本过高

https://github.com/apache/shenyu

![image-20230518211532135](/imgs/oss/blog/vampireachao/image-20230518211532135.png)

前端仓库：https://github.com/apache/shenyu-dashboard

除了使用[node版本管理工具nvm](https://VampireAchao.github.io/2022/05/31/node版本管理工具nvm/)、或者直接降级`node`版本以外，还可以配置环境变量

```shell
$env:NODE_OPTIONS="--openssl-legacy-provider"
```

来让其兼容
