---
title: aizuda
date: 2021-11-24 20:27:28
tags: java
---

> 自觉心是进步之母，自贱心是堕落之源，故自觉心不可无，自贱心不可有。——邹韬奋

最近参与的开源项目：

[爱组搭](https://gitee.com/aizuda/aizuda-components)

这个开源项目刚起步，我是很看好它的

目前有三个模块，一个限流、一个安全模块、以及一个机器人模块

限流模块就不用多说了，安全模块也就是用来加密，机器人模块，就是把你的异常捕获，并推送到 企业微信 飞书 钉钉 等平台

[示例项目](https://gitee.com/aizuda/aizuda-components-examples)

建议`fork`下来示例项目跑一跑玩一玩

官方介绍：

># aizuda-components
>
>![logo](https://portrait.gitee.com/uploads/avatars/namespace/2879/8637007_aizuda_1636162864.png!avatar100)
>
>- 爱组搭 ~ 低代码组件化开发平台之组件库
>- 愿景：每个人都是架构师
>
>[爱组搭 ~ 组件源码示例演示](https://gitee.com/aizuda/aizuda-components-examples)
>
># 公共模块
>
>- aizuda-common 主要内容 工具类 等。
>
># 限流模块
>
>- aizuda-limiter 主要内容 api 限流，短信，邮件 发送限流、控制恶意利用验证码功能 等。
>
>```
><dependency>
>  <groupId>com.aizuda</groupId>
>  <artifactId>aizuda-limiter</artifactId>
>  <version>1.0.0</version>
></dependency>
>```
>
># 机器人模块
>
>- aizuda-robot 主要内容 bug 异常 推送到 企业微信 飞书 钉钉 等平台。
>
>[企业微信机器人申请](https://work.weixin.qq.com/api/doc/90000/90136/91770)
>
>[钉钉机器人申请](https://developers.dingtalk.com/document/robots/use-group-robots)
>
>[飞书机器人申请](https://open.feishu.cn/document/ukTMukTMukTM/ucTM5YjL3ETO24yNxkjN)
>
>```
><dependency>
>  <groupId>com.aizuda</groupId>
>  <artifactId>aizuda-robot</artifactId>
>  <version>0.0.1</version>
></dependency>
>```
>
># 安全模块
>
>- aizuda-security 主要内容 api 请求解密，响应加密，单点登录 等。
>
>```
><dependency>
>  <groupId>com.aizuda</groupId>
>  <artifactId>aizuda-security</artifactId>
>  <version>0.0.1</version>
></dependency>
>```
