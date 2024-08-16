---
title: homebrew
date: 2023-06-26 20:47:55
tags: 软件及插件
---

> 适当的发挥自己的长处，具体地纠正自己的短处。——周恩来

https://brew.sh/index_zh-cn

![image-20230625133409710](/imgs/oss/picGo/image-20230625133409710.png)

我们复制中间的命令，执行安装

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

提示

```bash
curl: (7) Failed to connect to raw.githubusercontent.com port 443 after 18 ms: Couldn't connect to server
```

配置终端使用代理：

```bash
# 配置代理
export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 sockets_proxy=socks5://127.0.0.1:7890
# 重启或执行命令取消配置
unset https_proxy http_proxy sockets_proxy
```

没有代理的去这个网站看国内源安装教程

https://brew.idayer.com

或者直接执行另一个脚本

```shell
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
```

安装完毕后查看版本

```bash
achao@achaodeMacBook-Pro ~ % brew -v          
zsh: command not found: brew
```

这是因为没有配置环境变量

```bash
achaodeMacBook-Pro:~ achao$ sudo vim /etc/paths
# 按下 shift+] 切换到末尾，按 i 添加 /opt/homebrew/bin
# 按 esc和: 输入wq保存退出，然后command+q退出终端
achaodeMacBook-Pro:~ achao$ brew -v
Homebrew 4.0.24
```
