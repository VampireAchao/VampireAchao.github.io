---
title: 解除端口占用bat
date: 2020-07-06 20:31:18
tags: 小技巧
---

直接修改 括号内的端口 (8080,1,8080) 

把8080换成你要解除占用的端口号

复制到新建txt文本文档

```shell
@echo off
for /l %%n in (8080,1,8080) do (
@echo find the process which use port [%%n]
for /f "tokens=1-5" %%i in ('netstat -ano^|findstr ":%%n"') do (
tasklist /FI "PID eq %%m"|find /i "PID" && (
echo PID:%%m 运行中,kill the process [%%m] who use the port [%%n]
taskkill /F /pid %%m
) || echo PID:%%m 未运行
)
)
```

然后保存为 xx.bat 双击执行即可解除端口占用