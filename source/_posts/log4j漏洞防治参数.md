---
title: log4j漏洞防治参数
date: 2021-12-13 20:06:26
tags: java
---

> 向没有开辟的领域进军，才能创造新天地。——［美］李政道

只需要在启动`jar`包时加上参数：

```shell
java -Dlog4j2.formatMsgNoLookups=true -jar myapp.jar
```

或者在配置文件中配置`log4j2.formatMsgNoLookups=True`

以及将系统环境变量 `FORMAT_MESSAGES_PATTERN_DISABLE_LOOKUPS` 设置为 `true`

或者直接升级成`Apache Log4j 2.15.0-rc1`版本