---
title: docker安装redis
date: 2020-10-26 20:04:40
tags: 运维
---

> 后来许多人问我一个人夜晚踟蹰路上的心情，我想起的却不是孤单和路长，而是波澜壮阔的海和天空中闪耀的星光。——张小砚

```shell
docker pull redis 

docker run -d --name myredis -p 16379:6379 redis --requirepass "123456" #设置密码为123456 
```