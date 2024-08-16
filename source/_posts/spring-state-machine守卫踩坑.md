---
title: spring-state-machine守卫踩坑
date: 2023-11-09 08:56:21
tags: java
---

> 真正的艺术家绝不顾虑作品的前途。——罗曼·罗兰

今天发现一个问题，如果我们是动态构建状态机，在传入指定守卫为`null`时，代码不会报错，且事件不会过渡到下一个状态

解决方式：

```java
 builder.configureTransitions().withExternal()
        .name(transition.getName())
        .source(transition.getSourceState())
        .event(transition.getEvent())
        .target(transition.getTargetState())
        .action(Opp.of(transition.getAction()).orElse(SerCons.nothing()::accept))
        .guard(Opp.of(transition.getGuard()).orElseGet(() -> c -> true))
```

提供默认值

引入的是`import org.dromara.streamquery.stream.core.lambda.function.SerCons;`
