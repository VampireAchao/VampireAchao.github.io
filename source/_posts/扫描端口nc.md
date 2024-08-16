---
title: 扫描端口nc
date: 2024-03-12 12:09:37
tags: 运维
---

> 不要把自己的信念悬挂在墙壁上。——巴尔扎克

分享一个端口扫描的小技巧

```bash
nc -z -v 127.0.0.1 8000-9000 2>&1 | grep succeeded
```

例如这里扫描到本机`8000`到`9000`的端口中哪些成功扫到

```bash
GithubIireAchao:blog achao$ nc -z -v 127.0.0.1 8000-9000 2>&1 | grep succeeded
Connection to 127.0.0.1 port 8000 [tcp/irdmi] succeeded!
Connection to 127.0.0.1 port 8001 [tcp/vcom-tunnel] succeeded!
Connection to 127.0.0.1 port 8002 [tcp/teradataordbms] succeeded!
Connection to 127.0.0.1 port 8003 [tcp/*] succeeded!
Connection to 127.0.0.1 port 8004 [tcp/*] succeeded!
Connection to 127.0.0.1 port 8005 [tcp/*] succeeded!
Connection to 127.0.0.1 port 8006 [tcp/*] succeeded!
Connection to 127.0.0.1 port 8021 [tcp/intu-ec-client] succeeded!
Connection to 127.0.0.1 port 8023 [tcp/*] succeeded!
Connection to 127.0.0.1 port 8055 [tcp/senomix04] succeeded!
Connection to 127.0.0.1 port 8686 [tcp/sun-as-jmxrmi] succeeded!
Connection to 127.0.0.1 port 8719 [tcp/*] succeeded!
Connection to 127.0.0.1 port 8766 [tcp/*] succeeded!
```

这里`nc`代表`netcat`

`-z`表示扫描模式不发送数据只检查链接

`-v`表示列出详情

`127.0.0.1`不谈

`8000-9000`是端口范围

`2>&1`也是在`nohup`老命令，表示将标准错误（2）输出到标准输出（1）

`| grep succeeded`筛选出成功连接的端口
