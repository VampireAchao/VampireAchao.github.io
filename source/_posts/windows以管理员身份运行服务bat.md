---
title: windows以管理员身份运行服务bat
date: 2022-05-22 10:33:34
tags: 小技巧
---

> 历史是一堆灰烬，但灰烬深处有余温。——黑格尔

此处是关闭再运行打印机相关服务

```bat
%1 start "" mshta vbscript:CreateObject("Shell.Application").ShellExecute("cmd.exe","/c ""%~s0"" ::","","runas",1)(window.close)&&exit

net stop Spooler
net start Spooler
net stop PrintNotify
net start PrintNotify
```

保存为`bat`即可执行

我们还可以将`bat`放入

```shell
C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Startup
```

之后就可以开机自启