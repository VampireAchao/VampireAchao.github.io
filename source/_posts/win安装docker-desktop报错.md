---
title: win安装docker desktop报错
date: 2023-09-27 12:19:38
tags: 软件及插件
---

> 任何装模作样的言行都是会令人厌恶的。——佚名

今天在`win`安装完`Docker Desktop`后报错：

```shell
Docker Desktop - WSL kernel version too low
```

提示`WSL kernel`版本太低

```bash
Docker Desktop requires a newer WSL kernel version.
Update the WSL kernel by running "wsl --update" or follow instructions at
https://docs.microsoft.com/windows/wsl/wsl2-kernel.
```

这里进一步提示执行`wsl --update`

执行后重启就解决了
