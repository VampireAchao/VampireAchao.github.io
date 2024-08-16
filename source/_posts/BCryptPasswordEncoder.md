---
title: BCryptPasswordEncoder
date: 2021-01-11 21:01:50
tags: java
---

> 今眼前的迷雾已然消散，自由、祖国，唯有你们才是我的信念。——雨果

在`web`开发中我们可以使用`org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder`来进行密码加密

这里写一个`Demo`说明一下基本姿势

```java
package com.ruben;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * @ClassName: BCryptPasswordEncoderDemo
 * @Description: 我还没有写描述
 * @Date: 2021/1/11 0011 20:55
 * *
 * @author: <achao1441470436@gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
public class BCryptPasswordEncoderDemo {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        // 调用encode()函数对 ruben 进行加密，取10次结果结果放入List里
        List<String> pwdList = Stream.generate(() -> encoder.encode("ruben")).limit(10).collect(Collectors.toList());
        for (int i = 4; i > 0; i--) {
            // 打乱顺序并随机取出一个密文，避免数据量过小，每次取出来的密文都一样
            Collections.shuffle(pwdList);
            String pwd = pwdList.stream().findAny().orElseThrow(() -> new RuntimeException("It can not happen!"));
            System.out.println(pwd);
            // 拿明文和密文进行比对
            System.out.println(encoder.matches("ruben", pwd));
        }
    }
}
```

最后打印结果

![image-20210111210650689](/imgs/oss/picGo/image-20210111210650689.png)