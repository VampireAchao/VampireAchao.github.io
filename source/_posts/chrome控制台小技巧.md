---
title: chrome控制台小技巧
date: 2023-04-17 00:05:13
tags: 小技巧
---

> 跟孩子的一颗真挚的心接触，使它暂时忘掉了生活中难以摆脱的困境。——泰戈尔

我们打开`chrome`控制台检查元素（快捷键`ctrl+shift+c`）

当我们选中一个元素的时候，此处显示`== $0`

![image-20230418001533703](/imgs/oss/blog/vampireachao/image-20230418001533703.png)

我们点击控制台，输入`$0`回车

发现`$0`就是我们刚刚选中的这个元素

![image-20230418001626614](/imgs/oss/blog/vampireachao/image-20230418001626614.png)

例如此处我需要`dromara`的这个表格里的项目清单转换为`vdoing`的卡片格式，选到对应的`tbody`标签，执行：

```javascript
let list = []
$0.childNodes.forEach(i=>i.children?.[0] && list.push(
   [["- name: " + i.children?.[0]?.children?.[0].innerText],
    ["  desc: " + i.children?.[3]?.innerText]],
   ["  link: " + decodeURIComponent(i.children?.[0]?.children?.[0].href.replace("https://gitee.com/link?target=",""))]
))
list.map(i=>i.join("\n")).join("\n")
```

![image-20230418001710397](/imgs/oss/blog/vampireachao/image-20230418001710397.png)

我们复制下面的输出结果

```yaml
- name: stream-query
  desc: 允许完全摆脱Mapper的mybatis-plus体验！
  link: https://dromara.gitee.io/stream-query/
- name: J2EEFAST
  desc: J2eeFAST 是一个 Java EE 企业级快速开发平台。
  link: https://www.j2eefast.com/
- name: data-compare
  desc: 数据库比对工具: hive 表数据比对，mysql、Doris 数据比对。
  link: https://github.com/dromara/dataCompare
- name: payment-spring-boot
  desc: 最全最好用的微信支付V3 Spring Boot 组件。
  link: https://felord.gitee.io/payment-spring-boot/
- name: zyplayer-doc
  desc: 一款适合团队和个人私有化部署使用的知识库、笔记、WIKI文档管理工具。
  link: http://doc.zyplayer.com/
- name: ChatGPT
  desc: 支持ChatGPT在JetBrains系列IDE上运行的一款插件。
  link: https://chatgpt.cn.obiscr.com/
- name: Neutrino-Proxy
  desc: 一个基于netty的、开源的java内网穿透项目。
  link: https://gitee.com/dromara/neutrino-proxy
- name: EasyTrans
  desc: 一个注解搞定数据翻译,减少30%SQL代码量。
  link: http://easy-trans.fhs-opensource.top/
- name: open-capacity-platform
  desc: 基于Spring Cloud的企业级微服务框架。
  link: https://dromara.org
- name: electron-egg
  desc: 一个入门简单、跨平台、企业级桌面软件开发框架。
  link: https://www.yuque.com/u34495/mivcfg
- name: RedisFront
  desc: 一款开源免费的跨平台 Redis 桌面客户端工具
  link: https://www.redisfront.com/
- name: lamp-cloud
  desc: 基于Jdk11 + SpringCloud + SpringBoot 的微服务快速开发平台，其中的可配置的SaaS功能尤其闪耀
  link: https://tangyh.top
- name: go-view
  desc: GoView 是一个高效的拖拽式低代码数据可视化开发平台。
  link: https://www.mtruning.club/#/
- name: dante-cloud
  desc: 企业级技术中台微服务架构与服务能力开发平台
  link: https://www.herodotus.cn
- name: x-easypdf
  desc: 一个用搭积木的方式构建pdf的框架（基于pdfbox）
  link: http://www.x-easypdf.cn/
- name: gobrs-async
  desc: 一款功能强大、配置灵活、带有全链路异常回调、内存优化、异常状态管理于一身的高性能异步编排框架
  link: https://async.sizegang.cn
- name: mendmix
  desc: java企业级应用开发套件，定位是一站式分布式开发架构开源解决方案及云原生架构技术底座
  link: https://www.jeesuite.com
- name: dynamic-tp
  desc: 轻量级，基于配置中心实现对运行中线程池参数的动态修改，以及实时监控线程池
  link: https://dynamictp.cn
- name: easy-es
  desc: 一款简化ElasticSearch搜索引擎操作的开源框架,简化CRUD操作,可以更好的帮助开发者减轻开发负担。
  link: https://easy-es.cn
- name: hertzbeat
  desc: 一个拥有强大自定义监控能力，无需Agent的实时监控系统。
  link: https://hertzbeat.com
- name: open-giteye-api
  desc: 专为开源作者设计的数据图表服务工具类站点，提供了包括Star趋势图、贡献者列表、Gitee指数等数据图表服务。
  link: https://giteye.net
- name: fast-request
  desc: IDEA httpClient插件。
  link: https://dromara.gitee.io/fast-request
- name: northstar
  desc: 可替代付费商业软件的一站式量化交易平台。
  link: https://www.quantit.tech
- name: image-combiner
  desc: 专门用于图片合成的工具。
  link: https://dromara.org
```

