---
title: redis修改密码
date: 2021-05-10 13:21:23
tags: redis
---

> 人最出色的工作往往是处于逆境的情况下造就出来的。思想上的压力肉 体上的痛苦都能成为精神上的兴奋剂。——英国剑桥大学教授科学家贝费

找到`redis`路径

![image-20210510132213341](/imgs/oss/picGo/image-20210510132213341.png)

找到`redis.windows.conf`

设置密码

![image-20210510132331396](/imgs/oss/picGo/image-20210510132331396.png)

然后启动时指定该配置文件

```shell
redis-server redis.windows.conf
```

即可完成`windows`下的`redis`修改密码