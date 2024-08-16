---
title: SHA1加密
date: 2021-05-07 08:56:05
tags: java
---

> 谎言说得越来越真诚，最终连她自己也从中得到了安慰。——《百年孤独》

方式很简单，无需引入外部依赖

```java
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

class Scratch {
    public static void main(String[] args) {
        System.out.println(getSha1("我的世界"));
    }

    public static String getSha1(String input) {
        MessageDigest mDigest = null;
        try {
            mDigest = MessageDigest.getInstance("SHA1");
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        byte[] result = mDigest.digest(input.getBytes(StandardCharsets.UTF_8));
        StringBuilder sb = new StringBuilder();
        for (int b : result) {
            sb.append(Integer.toString((b & 0xff) + 0x100, 16).substring(1));
        }
        return sb.toString();
    }
}
```

得到的结果

![image-20210508085933913](/imgs/oss/picGo/image-20210508085933913.png)