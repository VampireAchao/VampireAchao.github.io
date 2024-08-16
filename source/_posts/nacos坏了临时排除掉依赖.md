---
title: nacos坏了临时排除掉依赖
date: 2023-12-23 17:33:56
tags: java
---

> 冬天动一动，少闹一场病；冬天懒一懒，多喝药一碗。——佚名

可以配置文件配置

```yaml
spring:
  autoconfigure:
    exclude: org.springframework.cloud.alibaba.nacos.*
```

也可以手动注解声明

```java
NacosConfigAutoConfiguration: Nacos配置管理的自动配置。
NacosDiscoveryAutoConfiguration: Nacos服务发现的自动配置。
NacosServiceAutoConfiguration: Nacos服务相关的自动配置。
NacosConfigEndpointAutoConfiguration: Nacos配置端点的自动配置。
NacosDiscoveryEndpointAutoConfiguration: Nacos服务发现端点的自动配置。
NacosServiceRegistryAutoConfiguration: Nacos服务注册的自动配置。
NacosDiscoveryClientConfiguration: Nacos发现客户端的配置。
NacosReactiveDiscoveryClientConfiguration: Nacos响应式发现客户端的配置。

@SpringBootApplication(exclude = {XxxAutoConfiguration.class})
```
