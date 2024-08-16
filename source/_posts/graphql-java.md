---
title: graphql-java
date: 2022-09-27 13:34:14
tags: java
---

> 不会哭的年轻人是野蛮人，不想笑的老年人是傻瓜——桑塔亚娜

前两天写了`graphql`的[简单介绍博客](https://VampireAchao.github.io/2022/09/25/GraphQL/)

今天来拿`java`简单入个门，首先新建一个项目，因为我这里是用我自己熟悉的方式去写，所以包含了一些看不懂的写法，过两天在写一个保姆级教程

项目地址：https://gitee.com/VampireAchao/simple-graphql

运行`springboot`主启动类，然后访问

http://localhost:8080/

可以看到这样一个页面

![image-20220927134801094](/imgs/oss/picGo/image-20220927134801094.png)

我们可以在左侧编写`graphql`的查询语句，点击运行按钮，比如分页查询用户

```graphql
{
  users(current: 1, size: 2) {
    current
    size
    total
    records {
      id
      name
      roles {
        id
        roleName
      }
    }
  }
}
```

![image-20220927134912015](/imgs/oss/picGo/image-20220927134912015.png)

这里这些字段如果不清楚，可以点右侧的`Document Explorer`，没有的话先展开

![image-20220927134957137](/imgs/oss/picGo/image-20220927134957137.png)

点击`Query`可以看到两个可以查询的，分别是`users`和`roles`

![image-20220927135027577](/imgs/oss/picGo/image-20220927135027577.png)

这里就列举出了我们查询所需参数(带感叹号的是必传项)，字段可以点击类型查看

`graphql`最大好处是指哪打哪，例如此处我不传入`records`的`roles`，则只会查询用户信息

![image-20220927135211198](/imgs/oss/picGo/image-20220927135211198.png)

我们再试试根据`roles`查询用户

```graphql
{
  roles(name: "admin") {
    id
    roleName
    users {
      id
      name
    }
  }
}
```

![image-20220927135233161](/imgs/oss/picGo/image-20220927135233161.png)

效果也是非常棒，核心逻辑在这个类里

https://gitee.com/VampireAchao/simple-graphql/blob/master/src/main/java/com/ruben/simplegraphql/provider/GraphQLProvider.java
