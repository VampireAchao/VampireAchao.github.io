---
title: docker运行nacos
date: 2023-11-30 22:04:52
tags: 运维
---

> 当华美的叶片落尽，生命的脉络才历历可见。——聂鲁达

命令：

```bash
docker pull nacos/nacos-server
```

运行：

```bash
docker run -d --name nacos -p 8848:8848 nacos/nacos-server
```

如果需要连接自定义`mysql`可以

```bash
docker run -d --name nacos -e SPRING_DATASOURCE_PLATFORM=mysql -e MYSQL_SERVICE_HOST=127.0.0.1 -e MYSQL_SERVICE_DB_NAME=nacos -e MYSQL_SERVICE_PORT=3306 -e MYSQL_SERVICE_USER=nacos -e MYSQL_SERVICE_PASSWORD=nacos -p 8848:8848 nacos/nacos-server
```

也可以挂载配置文件：

```bash
docker run -d --name nacos -p 8848:8848 -v /path/to/your/application.properties:/home/nacos/conf/application.properties nacos/nacos-server
```
