---
title: '@PostConstruct使用'
date: 2020-12-03 21:26:23
tags: java
---

> 

> 

在项目中我们可以使用`@PostConstruct`去初始化一些操作

例如

```java
package com.ruben;

import com.ruben.dao.MpUserMapper;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;

@SpringBootTest
class SimpleSpringbootApplicationTests {

    private String name;

    @PostConstruct
    public void init() {
        name = "ruben";

    }

    @Test
    void test() {
        System.out.println(name);
    }

}
```

被`@PostConstruct`注解的方法，只会在服务器初始化的时候执行一次，也可以用于把`spring`容器中的`bean`置换出来成静态变量

```java
package com.ruben;

import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.ruben.dao.MpUserMapper;
import com.ruben.pojo.dataObject.UserDataObject;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import java.util.List;

@SpringBootTest
class SimpleSpringbootApplicationTests {

    private String name;

    @Resource
    private MpUserMapper mpUserMapper;

    private static MpUserMapper staticMpUserMapper;

    @PostConstruct
    public void init() {
        name = "achao";
        staticMpUserMapper = mpUserMapper;
    }

    @Test
    void test() {
        System.out.println(name);
        List<UserDataObject> users = selectList(name);
        users.forEach(System.out::println);
    }

    public static List<UserDataObject> selectList(String name) {
        return staticMpUserMapper.selectList(Wrappers.lambdaQuery(UserDataObject.builder().build()).eq(UserDataObject::getUsername, name));
    }

}
```

打印结果

![image-20201203214134024](/imgs/oss/picGo/image-20201203214134024.png)