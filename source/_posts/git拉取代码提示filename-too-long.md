---
title: git拉取代码提示filename too long
date: 2022-11-26 14:55:55
tags: 小技巧
---

> 原因晚于结果——博尔赫斯。

加参数`-c core.longpaths=true`即可

```sh
git clone -c core.longpaths=true https://github.com/VampireAchao/incubator-streampark.git
```

