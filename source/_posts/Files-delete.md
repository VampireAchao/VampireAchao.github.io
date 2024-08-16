---
title: Files.delete
date: 2022-02-26 23:04:09
tags: java
---

> 终点线只是一个记号而已，其实并没有什么意义，关键是这一路你是如何走的。——村上春树

在`java`中我们除了用这种方式删除文件：

```java
        File file = new File("D:\\file\\projects\\img-comparison-demo\\target\\generated-sources");
        if (file.exists()) {
            try {
                boolean delete = file.delete();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
```

还可以使用`Files`工具类：

```java
        try {
            boolean delete = Files.deleteIfExists(Paths.get("D:\\file\\projects\\img-comparison-demo\\target\\generated-sources"));
        } catch (IOException e) {
            e.printStackTrace();
        }
```

`Files`还提供了很多的`api`就不一一列举了，大家自行探索吧

![image-20220226231035230](/imgs/oss/picGo/image-20220226231035230.png)