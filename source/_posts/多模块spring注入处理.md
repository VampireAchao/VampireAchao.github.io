---
title: 多模块spring注入处理
date: 2023-09-29 10:43:47
tags: java
---

> 踏破铁鞋无觅处，得来全不费功夫。——施耐庵

今天在搭建多模块项目时发现一个问题，其中一个公共依赖里需要注入的`bean`，注入不到字模块`spring`容器里去

最后在`resources/META-INF/spring`下面新建了`org.springframework.boot.autoconfigure.AutoConfiguration.imports`

内容为

```
com.xxx.GlobalExceptionHandler
com.xxx.GlobalRestResultHandler
```

手动指定要注入的`bean`搞定了

见：[2.7版本spring.factories弃用 | 阿超](https://VampireAchao.github.io/2022/06/30/2-7%E7%89%88%E6%9C%ACspring-factories%E5%BC%83%E7%94%A8/)
