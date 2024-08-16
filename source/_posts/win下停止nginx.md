---
title: win下停止nginx
date: 2022-03-13 16:41:42
tags: 小技巧
---

> 每一个看似简单的社会现象其实都只露出了冰山一角。——林达

输入命令

```shell
taskkill /f /t /im nginx.exe
```

即可停止`nginx`

这里顺带把指定配置文件启动命令也放一下

```shell
nginx.exe -c ./conf/nginx.conf
```

