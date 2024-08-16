---
title: GraphQL
date: 2022-09-25 15:08:09
tags: 数据库
---

> 可怕的不是外貌的丑陋，而是无法与人亲近的内心空虚——科恩

官网：https://graphql.org/

`graphql`是一个`API`的查询语言，可以理解为一个规范

正如它官方文档宣传的那样：

定义你的数据规范(数据类型)

### Describe your data

```graphql
type Project {
  name: String
  tagline: String
  contributors: [User]
}
```

描述你想干什么(查询)

### Ask for what you want

```graphql
{
  project(name: "GraphQL") {
    tagline
  }
}
```

获得预期结果(只获得你需要的结果)

### Get predictable results

```json
{
  "project": {
    "tagline": "A query language for APIs"
  }
}
```

它有多种语言的库：

https://graphql.org/code/

![image-20220925151136670](/imgs/oss/blog/image-20220925151136670.png)

