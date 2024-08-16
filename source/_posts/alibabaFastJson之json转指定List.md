---
title: alibabaFastJson之json转指定List
date: 2020-09-16 20:42:25
tags: java
---

> 有一种健忘是高贵的，就是不记旧恶。——赛蒙兹

之前写了篇[`fastjson`](https://VampireAchao.github.io/2020/08/13/fastjson%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8/)基本使用，这两天遇到一个意料之外的

需要把一个`json`的数组对象，转换成指定的`List<User>`

转换方式很简单

> {"code":200,"userList":[{"password":"achao","username":"ruben"}],"data":"操作成功！","list":["你好","加油"],"success":true}

```java
        JSONObject jsonObject = JSON.parseObject(jsonString);
        String userListString = jsonObject.getString("userList");
        List<User> userList = JSON.parseArray(userListString, User.class);
        userList.forEach(System.out::println);
```

打印结果

![image-20200916205837526](/imgs/oss/picGo/image-20200916205837526.png)
