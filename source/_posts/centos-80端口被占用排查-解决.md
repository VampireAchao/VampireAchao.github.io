---
title: centos 80端口被占用排查+解决
date: 2021-05-25 19:27:25
tags: 运维
---

> 青春是一个普通的名称，它是幸福美好的，但它也是充满着艰苦的磨炼。——高尔基

当我们遇到`80`端口被占用时

首先可以使用如下命令查看占用端口的进程

```shell
# 显示网络状态 (-l：表示显示监控中的服务器的Socket，-n：直接使用IP地址，而不通过域名服务器，-p 显示正在使用Socket的程序识别码和程序名称)
# grep 以一定的规则匹配
# | 将“|”后面运算得到的结果作为左边函数的入参，例如这里就是 对“80”进行匹配查询
netstat -lnp|grep 80
```

当我们执行完毕后会显示如下结果

```shell
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      1587/nginx: master
```

我们可以看到最后一列

这里`/`左边的是进程号

我们可以使用`kill`命令去终止

```shell
# -9表示强制终止
kill -9 1587
```

然后再次查看

```shell
> netstat -lnp|grep 80
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      1589/nginx: worker 
```

发现我们的`nginx`换了个进程号继续存在着

那这里我们去查看一下`nginx`服务状态

```shell
# 系统服务 状态 [服务名]
> systemctl status nginx
● nginx.service - LSB: starts the nginx web server
   Loaded: loaded (/etc/rc.d/init.d/nginx; bad; vendor preset: disabled)
   Active: active (running) since 一 2021-05-24 15:47:57 CST; 9min ago
     Docs: man:systemd-sysv-generator(8)
  Process: 1006 ExecStart=/etc/rc.d/init.d/nginx start (code=exited, status=0/SUCCESS)
   CGroup: /system.slice/nginx.service
           ├─1589 nginx: worker process
           ├─1590 nginx: worker process
           └─1591 nginx: cache manager process

```

可以看到当前的`Active`状态是`active(running)`表示存活

那我们关掉该服务

```shell
# 系统服务 关闭 [服务名]
> systemctl stop nginx
```

再次查看占用端口的进程，找到进程号并杀掉

```shell
> netstat -lnp|grep 80
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      1589/nginx: worker 
> kill -9 1589
> netstat -lnp|grep 80
```

发现已经解除了占用
