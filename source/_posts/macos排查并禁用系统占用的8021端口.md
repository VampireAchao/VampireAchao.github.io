---
title: macos排查并禁用系统占用的8021端口
date: 2024-03-11 12:19:40
tags: 运维
---

> 不要为了尖锐的批评而生气，真理总是不合口味的。——高尔基

本地启动服务一直报错

```bash
Description:

Web server failed to start. Port 8021 was already in use.

Action:

Identify and stop the process that's listening on port 8021 or configure this application to listen on another port.
```

然后一查

```bash
# 扫描端口占用
GithubIireAchao:blog achao$ sudo lsof -i :8021
Password:
COMMAND PID USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
launchd   1 root   40u  IPv4 0xe1fc8d3044233469      0t0  TCP localhost:intu-ec-client (LISTEN)
launchd   1 root   41u  IPv6 0xe1fc8d26b1acd419      0t0  TCP localhost:intu-ec-client (LISTEN)
launchd   1 root   42u  IPv4 0xe1fc8d3044233469      0t0  TCP localhost:intu-ec-client (LISTEN)
launchd   1 root   43u  IPv6 0xe1fc8d26b1acd419      0t0  TCP localhost:intu-ec-client (LISTEN)
```

发现占用的`PID`是`1`，即系统的 `launchd` 进程

因为`launchd` 进程会根据所在的 `/Library/LaunchDaemons` 和 `/Library/LaunchAgents `目录中的配置文件来管理各个服务或应用，扫描文件找到服务，当然这个目录也可能是`/System/Library/LaunchAgents`和`/System/Library/LaunchDaemons`

```bash
GithubIireAchao:LaunchAgents achao$ grep -rl "intu" /Library/LaunchAgents
GithubIireAchao:LaunchAgents achao$ grep -rl "intu" /Library/LaunchDaemons
GithubIireAchao:LaunchDaemons achao$ grep -rl "8021" /System/Library/LaunchAgents
# 找到了包含8021的服务列表
GithubIireAchao:LaunchDaemons achao$ grep -rl "8021" /System/Library/LaunchDaemons
/System/Library/LaunchDaemons/com.apple.airportd.plist
/System/Library/LaunchDaemons/com.apple.eapolcfg_auth.plist
/System/Library/LaunchDaemons/com.apple.ftp-proxy.plist
```

可以挨个查看，也可以再次筛选，例如使用`">8021<"`等来筛选

```bash
GithubIireAchao:LaunchDaemons achao$ grep -rl "<string>8021</string>" /System/Library/LaunchDaemons
/System/Library/LaunchDaemons/com.apple.ftp-proxy.plist
```

卸载这个服务，`-w`表示写入配置，这里整体是禁止下次启动

```bash
GithubIireAchao:LaunchDaemons achao$ sudo launchctl unload -w /System/Library/LaunchDaemons/com.apple.ftp-proxy.plist
```

再次查看端口

```bash
GithubIireAchao:LaunchDaemons achao$ sudo lsof -i :8021
GithubIireAchao:LaunchDaemons achao$ 
```
