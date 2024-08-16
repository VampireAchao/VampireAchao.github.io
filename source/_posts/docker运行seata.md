---
title: docker运行seata
date: 2023-12-26 17:51:15
tags: java
---

> 怀疑一切与信任一切是同样的错误，能得乎其中方为正道。——乔叟

https://hub.docker.com/r/seataio/seata-server

命令：

```bash
docker run --name seata-server -p 8091:8091 -p 7091:7091 seataio/seata-server:latest
```

自定义配置文件：

```bash
docker run --name seata-server \
        -p 8091:8091 \
        -p 7091:7091 \
        -e SEATA_CONFIG_NAME=file:/root/seata-config/registry \
        -v /PATH/TO/CONFIG_FILE:/root/seata-config  \
        seataio/seata-server
```

指定`ip`

```bash
docker run --name seata-server \
        -p 8091:8091 \
        -p 7091:7091 \
        -e SEATA_IP=192.168.1.1 \
        seataio/seata-server
```

`docker-compose.yaml`

```yaml
version: "3.1"

services:

  seata-server:
    image: seataio/seata-server:latest
    hostname: seata-server
    ports:
      - 8091:8091
      - 7091:7091
    environment:
      - SEATA_PORT=8091
    expose:
      - 8091
      - 7091
```
