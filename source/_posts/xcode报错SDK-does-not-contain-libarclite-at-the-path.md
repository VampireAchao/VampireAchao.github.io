---
title: xcode报错SDK does not contain 'libarclite' at the path
date: 2024-03-01 22:34:36
tags: java
---

> 希望是附丽于存在的，有存在，便有希望，有希望，便是光明。 —— 鲁迅

今天报错：

```bash
SDK does not contain 'libarclite' at the path 
'/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/
lib/arc/libarclite_iphonesimulator.a'; try increasing the minimum deployment target
```

解决方式，下载：

https://github.com/kamyarelyasi/Libarclite-Files/blob/main/libarclite_iphoneos.a

放到

```bash
/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/lib/arc
```

即可
