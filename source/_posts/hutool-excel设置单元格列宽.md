---
title: hutool-excel设置单元格列宽
date: 2023-05-04 21:17:02
tags: java
---

> 保持沉默，别人将以为你是一位哲学家。——佚名

`hutool`里`excel`可以如下使用，设置自动列宽：

```java
	val writer = ExcelUtil.getWriter()
	writer.autoSizeColumnAll()
```

但也可以单独设置：

```java
	writer.getSheet().setColumnWidth(1, 5000)
```

这里的`1`是列下标，`5000`是宽度

还可以设置冻结首行

```java
	writer.setFreezePane(1)
```

