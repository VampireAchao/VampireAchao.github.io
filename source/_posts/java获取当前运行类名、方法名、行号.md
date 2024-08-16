---
title: java获取当前运行类名、方法名、行号
date: 2020-09-14 20:21:00
tags: java
---

> 使人疲惫的不是远方的高山，而是鞋子里的一粒沙子。——伏尔泰

[转载，原文戳我](https://www.cnblogs.com/carina-jiang/p/7485741.html)

码住，这个确实感觉不错

```
//获取方法名：
public static String getCurrentMethodName() {
    int level = 1;
    StackTraceElement[] stacks = new Throwable().getStackTrace();
    String methodName = stacks[level].getMethodName();
    return methodName;
}
//获取类名：
public static String getCurrentClassName() {
    int level = 1;
    StackTraceElement[] stacks = new Throwable().getStackTrace();
    String className = stacks[level].getClassName();
    return className;
}

//获取行号：
public static int getLineNumber() {
    int level = 1;
    StackTraceElement[] stacks = new Throwable().getStackTrace();
    int lineNumber = stacks[level].getLineNumber();
    return lineNumber;
}
```