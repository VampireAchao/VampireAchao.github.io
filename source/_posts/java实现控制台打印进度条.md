---
title: java实现控制台打印进度条
date: 2020-09-21 22:23:42
tags: java
---

> 

> 我们自古以来，就有埋头苦干的人，有拼命硬干的人，有为民请命的人，有舍身求法的人……这都是中国的脊梁。——鲁迅

[转载，原文](https://blog.csdn.net/qq_41426326/article/details/91541985)

```java
 public static void main(String[] args) {
        final long size = 1000L;
        for (int i = 0; i < 101; i++) {
            String tu = "▧";
            for (int j = 0; j < i / 10; j++) {
                tu += "▧";
            }
            System.out.print("\r当前进度：" + (i) + "%\t" + tu + "\t" + (i * 10) + "/" + size);
            try {
                Thread.sleep(50);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
```

