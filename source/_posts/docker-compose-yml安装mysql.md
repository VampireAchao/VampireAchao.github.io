---
title: docker-compose.yml安装mysql
date: 2023-07-10 20:07:00
tags: 运维
---

> 给自己一点时间，别害怕重新开始。——威尔·鲍温

我们参考

https://github.com/docker-library/docs/tree/master/mysql

编写一个`docker-compose.yml`来安装`mysql`

```yml
# Use root/example as user/password credentials
version: '3.1'

services:

  db:
    image: mysql
    # NOTE: use of "mysql_native_password" is not recommended: https://dev.mysql.com/doc/refman/8.0/en/upgrading-from-previous-series.html#upgrade-caching-sha2-password
    # (this is just an example, not intended to be a production configuration)
    command: --default-authentication-plugin=mysql_native_password
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root
    ports:
      - 3306:3306
```

然后运行

```bash
achaodeMacBook-Pro:DockerCompose achao$ cd /Library/DockerCompose/
achaodeMacBook-Pro:DockerCompose achao$ docker-compose -f mysql-compose.yml up -d
[+] Running 12/12
 ✔ db 11 layers [⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿]      0B/0B      Pulled                      34.7s 
   ✔ 29e800056b7e Pull complete                                           11.7s 
   ✔ 69da292eb326 Pull complete                                           11.7s 
   ✔ 8850ef02dd58 Pull complete                                           11.7s 
   ✔ 86a76caa9e20 Pull complete                                           11.8s 
   ✔ 881324b10832 Pull complete                                           11.8s 
   ✔ 1f5d1a8fa489 Pull complete                                           11.8s 
   ✔ 5efbe9eacf59 Pull complete                                           25.7s 
   ✔ 80db22f26c0f Pull complete                                           25.7s 
   ✔ e5595b935c31 Pull complete                                           30.0s 
   ✔ c391d4efe159 Pull complete                                           30.0s 
   ✔ e5527cf2eb5f Pull complete                                           30.0s 
[+] Running 2/2
 ✔ Network dockercompose_default  Creat...                                 0.0s 
 ✔ Container dockercompose-db-1   Starte...                                0.6s
```

然后使用`idea`进行连接

![](/imgs/oss/picGo/20230710200219.png)

成功！
