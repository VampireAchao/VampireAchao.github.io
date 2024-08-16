---
title: 云原生代理traefik
date: 2024-08-09 13:17:19
tags: 软件及插件
---

> 如同明日将死那样生活，如同永远不死那样求知。——甘地

`traefik` 是一款开源的反向代理与负载均衡工具，它监听后端的变化并自动更新服务配置

它与传统反向代理最大的区别，是支持声明式的动态路由规则，大大简化网关规则的配置。而且还有诸多实用特性，例如：健康检查、多实例负载均衡、能够实现 Let's Encrypt 证书的自动签发、验证与续期等等

官方文档：

https://doc.traefik.io/traefik/

github：

https://github.com/traefik/traefik/

这个框架可以简易配置`https`证书，结合`halo`使用

https://docs.halo.run/getting-started/install/other/traefik/#%E9%85%8D%E7%BD%AE-halo-%E7%9A%84%E5%8F%8D%E5%90%91%E4%BB%A3%E7%90%86
