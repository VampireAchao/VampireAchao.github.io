---
title: cim
date: 2023-09-25 21:00:54
tags: 软件及插件
---

> 你属于你的祖国，正如你属于你的母亲。——黑尔

分享一个开源项目

https://github.com/crossoverJie/cim

https://crossoverjie.top/categories/Netty/

📲cim(cross IM) 适用于开发者的分布式即时通讯系统

![](/imgs/oss/picGo/20230925210211.png)

算是比较老的开源项目了

![](/imgs/oss/picGo/20230925210252.png)

- 客户端向 `route` 发起登录。
- 登录成功从 `Zookeeper` 中选择可用 `IM-server` 返回给客户端，并保存登录、路由信息到 `Redis`。
- 客户端向 `IM-server` 发起长连接，成功后保持心跳。
- 客户端下线时通过 `route` 清除状态信息。
