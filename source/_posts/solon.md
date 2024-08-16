---
title: solon
date: 2022-05-11 13:33:48
tags: java
---

> 人若是看透了自己，便不会再小看别人。——老舍《骆驼祥子》

分享一个很赞的`web`框架

> Solon 是一个微型的 Java 开发框架。项目从 2018 年启动以来，参考过大量前人作品；历时两年，4000 多次的 commit；内核保持 0.1m 的身材，超高的跑分，良好的使用体验。支持：RPC、REST API、MVC、WebSocket、Socket 等多种开发模式。
>
> Solon 强调：克制 + 简洁 + 开放的原则；力求：更小、更快、更自由的体验。

官网地址：https://solon.noear.org/

gitee：https://gitee.com/noear/solon

> ## Solon 家簇成员图谱
>
> ![img](/imgs/oss/picGo/up-814f2ffe65de398e1f5f97414f6ae4b1b87.png)

上代码感受一下：

> Hello World:
>
> ```java
> //Handler 模式：
> public class App{
>     public static void main(String[] args){
>         SolonApp app = Solon.start(App.class,args);
>         
>         app.get("/",(c)->c.output("Hello world!"));
>     }
> }
> 
> //Controller 模式：(mvc or rest-api)
> @Controller
> public class App{
>     public static void main(String[] args){
>         Solon.start(App.class,args);
>     }
>   
>     //限定 put 方法类型
>     @Put
>     @Mapping("/")
>     public String hello(String name){
>         return "Hello " + name;
>     }
> }
> 
> //Remoting 模式：(rpc)
> @Mapping("/")
> @Remoting
> public class App implements HelloService{
>     public static void main(String[] args){
>         Solon.start(App.class,args);
>     }
> 
>     @Override
>     public String hello(){
>         return "Hello world!";
>     }
> }
> ```

特点：

> 更现代感的应用开发框架。**更快、更小、更少、更自由！**
>
> 支持jdk8+；主框架0.1mb；组合不同的插件应对不同需求；方便定制；快速开发。
>
> - 克制、简洁、开放、生态
> - Http、WebSocket、Socket 三种信号统一的开发体验（俗称：三源合一）
> - 支持注解与手动两种模式，按需自由操控
> - Not Servlet，可以适配任何基础通讯框架（所以：最小0.2m运行rpc架构）
> - 自建 IOC & AOP容器，支持 Web、Data、Job、Remoting、Cloud 等任何开发场景
> - 集合 Handler + Context 和 Listener + Message 两种架构模式；强调插件式扩展；适应不同的应用场景
> - 插件可扩展可切换：启动插件，扩展插件，序列化插件，数据插件，会话状态插件，视图插件(可共存) 等...
> - 支持 GrallVm Native 打包
> - 体验与 Spring Boot 相近，迁移成本低： [《Solon 特性简集，相较于 Springboot 有什么区别？》](https://gitee.com/link?target=https%3A%2F%2Fmy.oschina.net%2Fnoear%2Fblog%2F4863844)