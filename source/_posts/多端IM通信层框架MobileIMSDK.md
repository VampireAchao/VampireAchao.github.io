---
title: 多端IM通信层框架MobileIMSDK
date: 2023-10-25 19:40:45
tags: java
---

> 对可耻行为的追悔是对生命的拯救。——德谟克里特

今天看了这篇文章：

[万字长文：手把手教你实现一套高效的IM长连接自适应心跳保活机制](https://zhuanlan.zhihu.com/p/516209139)

其中理论对应实践的开源项目：

https://github.com/JackJiang2011/MobileIMSDK

> **MobileIMSDK是一套专为移动端开发的原创IM通信层框架：**
> 
> - 历经10年、久经考验；
> - 超轻量级、高度提炼，lib包50KB以内；
> - 精心封装，一套API优雅支持**UDP** 、**TCP** 、**WebSocket** 三种协议（可能是全网唯一开源的）；
> - 客户端支持iOS、Android、标准Java、H5([暂未开源](http://www.52im.net/thread-3682-1-1.html))、小程序([暂未开源](http://www.52im.net/thread-4169-1-1.html))、Uniapp([暂未开源](http://www.52im.net/thread-4225-1-1.html))；
> - 服务端基于Netty，性能卓越、易于扩展；👈
> - 可与姊妹工程 [MobileIMSDK-Web](http://www.52im.net/thread-959-1-1.html) 无缝互通实现网页端聊天或推送等；👈
> - 可应用于跨设备、跨网络的聊天APP、企业OA、消息推送等各种场景。
> 
> > MobileIMSDK工程自2013年10月起持续升级至今（当前最新版是v6.4，[版本更新日志点此查看](http://www.52im.net/thread-1270-1-1.html) ），历经10年，起初用作某自用产品的即时通讯底层，完全从零开发。  
> > 2023年5月10日，最新[Uniapp端](http://www.52im.net/thread-4225-1-1.html)已开发完成，希望对需要的人有所启发和帮助。
> 
> 👉 您可能需要：[查看更多关于MobileIMSDK的疑问及解答](http://www.52im.net/thread-60-1-1.html)。
> 
> 👉 另一姊妹工程：[轻量级Web端即时通讯框架：MobileIMSDK-Web](http://www.52im.net/thread-959-1-1.html) 也在持续更新中，专用于手机或PC端的网页聊天和消息推送等。
