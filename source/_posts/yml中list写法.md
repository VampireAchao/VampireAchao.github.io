---
title: yml中list写法
date: 2021-03-13 21:34:30
tags: java
---

> 三更灯火五更鸡，正是男儿读书时。黑发不知勤学早，白首方悔读书迟。——颜真卿

之前写过一个[`springboot`自定义配置](https://VampireAchao.github.io/2021/02/16/springboot%E4%B8%AD%E8%87%AA%E5%AE%9A%E4%B9%89%E9%85%8D%E7%BD%AE/)

当时配置`map`使用的是这种方式

```yaml
ruben:
  number: 4444
  avatar: /imgs/oss/2020-06-01/head.jpg
  gender: male
  hobby: ["游戏","动漫","编程"]
  introduce: {"food": "blood","programLanguage": "java"}
```

这里`hobby`是一个`List<String>`，`introduce`是一个`Map<String,String>`，实际上我们可以使用如下写法

```yaml
ruben:
  number: 4444
  avatar: /imgs/oss/2020-06-01/head.jpg
  gender: male
  hobby:
    - "游戏"
    - "动漫"
    - "编程"
  introduce:
    food: "blood"
    programLanguage: "java"
```

这种写法比较推荐，因为是可以让我们的配置不至于挤在一行
