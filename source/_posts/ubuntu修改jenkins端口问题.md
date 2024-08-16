---
title: ubuntu修改jenkins端口问题
date: 2022-04-18 12:34:00
tags: 运维
---

> 昨日种种，皆成今我，切莫思量，更莫哀，从今往后，怎么收获，怎么栽。——胡适

改`jenkins`端口不生效

首先我去修改了`/etc/init.d/jenkins`

还有`/etc/default/jenkins`

将默认`8080`改成了我的端口

发现不生效，启动时提示启动失败，使用

```shell
systemctl status jenkins.service
```

查看服务详细状态

查看发现，启动命令仍然是带了`--httpPort=8080`参数

但是在头两行看到一个

```shell
 jenkins.service - Jenkins Continuous Integration Server
   Loaded: loaded (/lib/systemd/system/jenkins.service; enabled; vendor preset: enabled)
```

于是编辑

```shell
vim /lib/systemd/system/jenkins.service
```

发现其中确实有端口`8080`，改为我的端口后使用

```shell
systemctl daemon-reload
```

重新加载服务启动命令

再次启动`jenkins`

```shell
systemctl restart jenkins
```

即可成功修改端口号

