---
title: Jinx
date: 2023-05-27 12:56:44
tags: 软件及插件
---

> 得到人处且饶人。——佚名

分享一个框架

Spring-boot框架采用netty取代tomcat 来做http服务

> Spring-boot框架采用netty取代tomcat 来做http服务
>
> #### Spring-boot用户
>
> - 首先引起jar包
>
> ```xml
> <dependency>
>     <groupId>com.happylife.netty</groupId>
>      <artifactId>happylife-netty</artifactId>
>       <version>1.0-SNAPSHOT</version>
> </dependency>
> ```
>
> - 在spring-boot的Application类中加上如下代码：
>
> ```java
> @Bean
> public EmbeddedServletContainerFactory servletContainer(){
>   NettyContainerConfig nettyContainerConfig = new NettyContainerConfig();
>   NettyEmbeddedServletContainerFactory factory = new NettyEmbeddedServletContainerFactory(nettyContainerConfig);
>   return factory;
> }
> ```

![image-20230528125936659](/imgs/oss/picGo/image-20230528125936659.png)