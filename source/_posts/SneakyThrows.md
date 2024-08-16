---
title: '@SneakyThrows'
date: 2021-04-27 11:40:35
tags: java
---

> 好的木材并不在顺境中生长；风越强，树越壮。——（英）马里欧特

我们有时候会把一些受检异常`try` `catch`掉

例如

![image-20210430114232739](/imgs/oss/picGo/image-20210430114232739.png)

![image-20210430114243391](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210430114243391.png)

但我们每次都这么写

```java
        try {
            String encode = URLEncoder.encode("阿巴阿巴阿巴阿巴", "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
```

会导致代码很臃肿

如果我们使用了`lombok`

可以直接在方法上加个`@SneakyThrows`注解

![image-20210430114359042](/imgs/oss/picGo/image-20210430114359042.png)

简洁多了