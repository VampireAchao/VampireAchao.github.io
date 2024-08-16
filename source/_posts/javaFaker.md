---
title: javaFaker
date: 2021-03-06 16:28:38
tags: java
---

> 得之，我幸；不得，我命。——徐志摩

如果我们需要造一些假数据，例如随机姓名之类的，可以使用`javaFaker`

首先是`GAV`

```xml
        <!--    javaFaker    -->
        <dependency>
            <groupId>com.github.javafaker</groupId>
            <artifactId>javafaker</artifactId>
            <version>1.0.2</version>
        </dependency>
```

然后我们可以往数据库放入`200`条数据，这里用我们的`Faker.instance(Locale.ENGLISH).name().lastName()`生成用户名

```java
    @Resource
    private MpUserService mpUserService;

    @Test
    public void insert() {
        AtomicInteger index = new AtomicInteger(5);
        List<UserPO> userList = Stream.generate(() -> UserPO.builder().id(index.getAndIncrement()).username(Faker.instance(Locale.ENGLISH).name().lastName()).password(new BCryptPasswordEncoder().encode("123456")).build()).limit(200).collect(Collectors.toList());
        mpUserService.saveBatch(userList);
    }
```

可以看到都是一些假数据

![image-20210306172356597](/imgs/oss/picGo/image-20210306172356597.png)