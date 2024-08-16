---
title: json-server
date: 2023-05-26 23:18:06
tags: 前端
---

> 错误同真理的关系，就像睡梦中同清醒的关系一样。一个人从促物中醒来，就会以新的力量走向其真理。——歌德

在前端与后端开发的时候，偶尔会有在后端接口没有开发完毕时进行一些接口的`mock`，这里有一款开源框架做了类似的事情，让你可以“不到30秒得到一个零编码的假REST API”

https://github.com/typicode/json-server

![image-20230526232454322](/imgs/oss/picGo/image-20230526232454322.png)

我们只需要安装：

```shell
npm install -g json-server
```

然后配置数据格式：`db.json`

```json
{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}
```

最后启动服务器

```shell
json-server --watch db.json
```

接下来访问：

 http://localhost:3000/posts/1

就能得到响应：

```json
{ "id": 1, "title": "json-server", "author": "typicode" }
```

非常地方便好用，更多自定义可以看github上项目的介绍