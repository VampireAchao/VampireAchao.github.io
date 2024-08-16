---
title: file获取路径区别
date: 2023-12-30 17:27:15
tags: java
---

> 男人勤劳家才富，女人节俭纱成布——佚名

这里

```java
import java.io.File;

class Scratch {
    public static void main(String[] args) throws Exception {
        File file = new File("../scratch.java");
        String path = file.getPath();
        String absolutePath = file.getAbsolutePath();
        String canonicalPath = file.getCanonicalPath();
        System.out.println("path:" + path);
        System.out.println("absolutePath:" + absolutePath);
        System.out.println("canonicalPath:" + canonicalPath);
    }
}
```

三种获取路径

`getPath`是获取构造`File`传入的路径

输出为：

```bash
path:../scratch.java
```

`getAbsolutePath`是获取绝对路径

```bash
absolutePath:/Users/achao/IdeaProjects/stream-query/../scratch.java
```

还有一个`getCanonicalPath`是返回相对路径

```bash

```
