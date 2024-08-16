---
title: java巨大字符串截取
date: 2020-08-10 19:17:24
tags: java
---

`string`转`list`，分段截取

比如传入`rubenrubenruben`和5，得到的`list`就是`{"ruben","ruben","ruben"}`这样的

```java
/**
     * @param initial  初始字符串
     * @param interval 分段长度
     * @return
     */
    public static List<String> stringSplit(String initial, Integer interval) {
        List<String> result = new LinkedList<>();
        StringBuilder tmp = new StringBuilder(initial);
        int length = tmp.length();
        while (length > 0) {
            if (interval > length) {
                interval = length;
            }
            String tmpStr = tmp.substring(0, interval);
            result.add(tmpStr);
            tmp.replace(0, interval, "");
            length = tmp.length();
        }
        return result;
    }
```

