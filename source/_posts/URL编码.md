---
title: URL编码
date: 2021-04-24 15:24:40
tags: java
---

> 人需要真理，就像瞎子需要明快的引路人一样。──高尔基

```java
        // URL编码
        String encode = URLEncoder.encode("你好，世界", Encoder.UTF_8);
        System.out.println(encode);
        // URL解码
        String decode = URLDecoder.decode(encode, Encoder.UTF_8);
        System.out.println(decode);
```

运行结果

![image-20210424152740490](/imgs/oss/picGo/image-20210424152740490.png)