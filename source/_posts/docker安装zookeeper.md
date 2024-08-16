---
title: docker安装zookeeper
date: 2020-10-28 20:21:43
tags: 运维
---

> 人之气质，由于天生，本难改变，惟读书可变化气质。一一曾国藩
1. 

```shell
docker pull zookeeper
```

2. 单机版

 ```shell
docker run -d -p 2181:2181 --name some-zookeeper --restart always zookeeper
 ```

3. 查看注册的服务

```shell
docker exec -it d5c6f857cd88 bash
```

```shell
./bin/zkCli.sh
ls /services
```

## 