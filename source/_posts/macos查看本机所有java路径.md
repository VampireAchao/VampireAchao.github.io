---
title: macos查看本机所有java路径
date: 2023-11-02 08:44:41
tags: 小技巧
---

> 勤劳乃成功之母，——小林多喜二

学到个命令：

```bash
Github-Id-VampireAchao:~ achao$ /usr/libexec/java_home -V
Matching Java Virtual Machines (5):
    21.0.1 (arm64) "Oracle Corporation" - "OpenJDK 21.0.1" /Users/achao/Library/Java/JavaVirtualMachines/openjdk-21.0.1/Contents/Home
    20.0.2 (arm64) "Oracle Corporation" - "OpenJDK 20.0.2" /Users/achao/Library/Java/JavaVirtualMachines/openjdk-20.0.2/Contents/Home
    17.0.8.1 (arm64) "Azul Systems, Inc." - "Zulu 17.44.53" /Users/achao/Library/Java/JavaVirtualMachines/azul-17.0.8.1/Contents/Home
    11.0.20.1 (arm64) "Azul Systems, Inc." - "Zulu 11.66.19" /Users/achao/Library/Java/JavaVirtualMachines/azul-11.0.20.1/Contents/Home
    1.8.0_372 (arm64) "Azul Systems, Inc." - "Zulu 8.70.0.23" /Users/achao/Library/Java/JavaVirtualMachines/azul-1.8.0_372/Contents/Home
/Users/achao/Library/Java/JavaVirtualMachines/openjdk-21.0.1/Contents/Home
```

还可以指定版本号：

```bash
Github-Id-VampireAchao:~ achao$ /usr/libexec/java_home -v 1.8
/Users/achao/Library/Java/JavaVirtualMachines/azul-1.8.0_372/Contents/Home
Github-Id-VampireAchao:~ achao$ /usr/libexec/java_home -v 20
/Users/achao/Library/Java/JavaVirtualMachines/openjdk-20.0.2/Contents/Home
```

非常好用
