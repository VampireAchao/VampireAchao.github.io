---
title: QLExpress
date: 2023-09-17 02:09:51
tags: java
---

> 方向是比速度更重要的追求。——白岩松

QLExpress是一种强大，轻量级，动态的Java平台语言，旨在提高开发人员在不同业务场景中的生产力。

https://github.com/alibaba/QLExpress

安装

```xml
<dependency>
  <groupId>com.alibaba</groupId>
  <artifactId>QLExpress</artifactId>
  <version>3.3.2</version>
</dependency>
```

代码：

```java
ExpressRunner runner = new ExpressRunner();
DefaultContext<String, Object> context = new DefaultContext<String, Object>();
context.put("a", 1);
context.put("b", 2);
context.put("c", 3);
String express = "a + b * c";
Object r = runner.execute(express, context, null, true, false);
System.out.println(r);
```

> 由阿里的电商业务规则、表达式（布尔组合）、特殊数学公式计算（高精度）、语法分析、脚本二次定制等强需求而设计的一门动态脚本引擎解析工具。 在阿里集团有很强的影响力，同时为了自身不断优化、发扬开源贡献精神，于2012年开源。
> 
> QLExpress脚本引擎被广泛应用在阿里的电商业务场景，具有以下的一些特性:
> 
> - 1、线程安全，引擎运算过程中的产生的临时变量都是threadlocal类型。
> - 2、高效执行，比较耗时的脚本编译过程可以缓存在本地机器，运行时的临时变量创建采用了缓冲池的技术，和groovy性能相当。
> - 3、弱类型脚本语言，和groovy，javascript语法类似，虽然比强类型脚本语言要慢一些，但是使业务的灵活度大大增强。
> - 4、安全控制,可以通过设置相关运行参数，预防死循环、高危系统api调用等情况。
> - 5、代码精简，依赖最小，250k的jar包适合所有java的运行环境，在android系统的低端pos机也得到广泛运用。
