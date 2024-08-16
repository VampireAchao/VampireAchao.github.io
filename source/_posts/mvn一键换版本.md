---
title: mvn一键换版本
date: 2022-05-28 18:06:55
tags: java
---

> 一条路并不因为它路边长满荆棘而丧失其美丽，旅行者照旧向前进。——罗曼·罗兰

命令：

```shell
mvn versions:set -DnewVersion=[版本号]
```

例如

```shell
mvn versions:set -DnewVersion=0.0.1
```

即可