---
title: ClassPathResource踩坑
date: 2024-01-11 21:05:56
tags: java
---

> 不要对一切人都以不信任的眼光看待，但要谨慎而坚定。——德谟克里特

今天看到一个问题

```java
    static {
        try {
            ClassPathResource resource = new ClassPathResource("ip2region.xdb");
            //获取真实文件路径
            String path = resource.getURL().getPath();
            byte[] cBuff = Searcher.loadContentFromFile(path);
            SEARCHER = Searcher.newWithBuffer(cBuff);
            log.info("加载了ip2region.xdb文件,Searcher初始化完成!");
        } catch (Exception e) {
            log.error("初始化ip2region.xdb文件失败,报错信息:[{}]", e.getMessage(), e);
            throw new RuntimeException("系统异常!");
        }
    }
```

报错：

```bash
/User/achao/IdeaProjects/achao/target/achao-0.0.1-SNAPSHOT.jar/!BOOT-INF/classes/!/ip2region.xdb (No such file or directory)
```

这里发现多了`!`这个目录

改成直接读取`inputStream`解决

```java
ClassPathResource resource = new ClassPathResource("ip2region.xdb");
InputStream inputStream = resource.getInputStream();
// 然后使用inputStream来读取数据
```
