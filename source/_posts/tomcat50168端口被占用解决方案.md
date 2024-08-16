---
title: tomcat50168端口被占用解决方案
date: 2020-06-22 22:04:58
tags: 运维
---

cmd里输入这个命令，结束占用端口的进程就行了

```java
taskkill -F -IM java.exe
```