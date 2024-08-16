---
title: macos升级14.4后idea运行java程序崩溃
date: 2024-03-20 21:28:44
tags: java
---

> 不去读书就没有真正的教养，同时也不可能有什么鉴别力。——赫尔芩

对应网址

https://bugs.java.com/bugdatabase/view_bug?bug_id=8327860

加点`jvm`参数试试能不能解决

开下日志

```bash
-XX:+UnlockDiagnosticVMOptions -XX:+LogVMOutput -XX:LogFile=jvm.log
```

禁用`JIT`编译器

```bash
-Djava.compiler=NONE
```

换个`GC`器试试

```bash
-XX:+UseG1GC
```
