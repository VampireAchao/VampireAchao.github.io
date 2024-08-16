---
title: docker制作springboot容器镜像
date: 2020-10-27 22:31:33
tags: 运维
---

>  石可破也，而不可夺坚;丹可磨也，而不可夺赤。——《吕氏春秋·诚廉》

新建`docker`配置目录

```shell
mkdir -p /server/docker
```

上传`jar`到`/server/docker`目录下

编写`Dockerfile`

```shell
# 编辑Dockerfile
vim /server/docker/Dockerfile
```

```Dockerfile
# 基础镜像使用java
FROM java:8
# 作者
MAINTAINER VampireAchao<achao1441470436@gmail.com>
# VOLUME 指定了临时文件目录为/tmp。
# 其效果是在主机 /var/lib/docker 目录下创建了一个临时文件，并链接到容器的/tmp
VOLUME /tmp
# 将jar包添加到容器中并更名为app.jar
ADD springboot/ruben-0.0.1-SNAPSHOT.jar app.jar
# 运行jar包
RUN bash -c 'touch /app.jar'
ENTRYPOINT ["java","-jar","/app.jar","--server.port=8080"]
```

进入目录

```shell
cd /server/docker/
# 构建容器
docker build -t ruben-docker-image .
# 选择 docker.io/library/java:8
# 运行 ruben-docker-image
docker run --name ruben -p 8081:8080 -d -v /upload/img:/src/main/resources/static/upload/img ruben-docker-image
# 查看容器列表
docker ps
# 查看日志
docker logs -f --tail=200 [容器id]
# 进入容器
docker exec -it ruben bash
# 删除容器
docker ps -a | grep localhost | awk '{print $1}' | xargs docker rm
```

防火墙开放端口
