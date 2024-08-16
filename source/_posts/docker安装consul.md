---
title: docker安装consul
date: 2020-10-29 20:34:59
tags: 运维
---

> 忘记了它而微笑，远胜于记住它而愁苦。——罗西塔

```shell
docker pull consul
docker run --name consul -d -p 8500:8500 consul
```

