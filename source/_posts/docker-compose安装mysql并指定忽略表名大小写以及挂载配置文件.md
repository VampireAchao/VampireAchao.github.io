---
title: docker-compose安装mysql并指定忽略表名大小写以及挂载配置文件
date: 2023-07-16 16:47:39
tags: 运维
---

> 人要有出世的精神才可以做入世的事业。——朱光潜

之前写了[docker-compose.yml安装mysql](https://VampireAchao.github.io/2023/07/10/docker-compose-yml%E5%AE%89%E8%A3%85mysql/)

但是发现其表名大小写敏感，也没指定配置文件，参考我之前写的：

[mysql大小写踩坑](https://VampireAchao.github.io/2022/04/12/mysql%E5%A4%A7%E5%B0%8F%E5%86%99%E8%B8%A9%E5%9D%91/)

[mysql8卸载重新安装并配置lower_case_table_names=1](https://VampireAchao.github.io/2022/12/01/mysql8%E5%8D%B8%E8%BD%BD%E9%87%8D%E6%96%B0%E5%AE%89%E8%A3%85%E5%B9%B6%E9%85%8D%E7%BD%AElower-case-table-names-1/)

[mysql having报错this is incompatible with sql_mode=only_full_group_by](https://VampireAchao.github.io/2023/02/16/mysql-having%E6%8A%A5%E9%94%99this-is-incompatible-with-sql-mode-only-full-group-by/)

于是重新编写`docker-compose.yml`

```yml
# Use root/example as user/password credentials
version: '3.1'

services:

  db:
    image: mysql
    # NOTE: use of "mysql_native_password" is not recommended: https://dev.mysql.com/doc/refman/8.0/en/upgrading-from-previous-series.html#upgrade-caching-sha2-password
    # (this is just an example, not intended to be a production configuration)
    command: --default-authentication-plugin=mysql_native_password --lower_case_table_names=1
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root
    ports:
      - 3306:3306
    volumes:
      - ./my.cnf:/etc/mysql/my.cnf
```

对应的`my.cnf`

```
[mysqld]
SQL_MODE=STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
CHARACTER_SET_SERVER=utf8mb4
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
 ✔ Container dockercompose-db-1   Starte...  achaodeMacBook-Pro:DockerCompose achao$ docker-compose -f mysql-compose.yml up -d
[+] Running 12/12
 ✔ db 11 layers [⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿]      0B/0B      Pulled                      37.6s 
   ✔ 29e800056b7e Pull complete                                            9.7s 
   ✔ 69da292eb326 Pull complete                                            9.8s 
   ✔ 8850ef02dd58 Pull complete                                            9.8s 
   ✔ 86a76caa9e20 Pull complete                                            9.9s 
   ✔ 881324b10832 Pull complete                                            9.9s 
   ✔ 1f5d1a8fa489 Pull complete                                            9.9s 
   ✔ 5efbe9eacf59 Pull complete                                           19.8s 
   ✔ 80db22f26c0f Pull complete                                           19.8s 
   ✔ e5595b935c31 Pull complete                                           32.8s 
   ✔ c391d4efe159 Pull complete                                           32.8s 
   ✔ e5527cf2eb5f Pull complete                                           32.8s 
[+] Running 0/1
 ⠿ Container dockercompose-db-1  Startin...                                0.4s 
Error response from daemon: Mounts denied: 
The path /Library/DockerCompose/my.cnf is not shared from the host and is not known to Docker.
You can configure shared paths from Docker -> Preferences... -> Resources -> File Sharing.
See https://docs.docker.com/desktop/mac for more info.                              0.6s
```

发现这里提示`is not shared from the host and is not known to Docker.`

我们配置一下，删除容器和镜像，重新运行

![](/imgs/oss/picGo/20230715162347.png)

```bash
achaodeMacBook-Pro:DockerCompose achao$ docker ps -a
CONTAINER ID   IMAGE     COMMAND                   CREATED         STATUS                    PORTS                    NAMES
8ab032076233   mysql     "docker-entrypoint.s…"   4 minutes ago   Created                                            dockercompose-db-1
671e95fa6e2e   redis     "docker-entrypoint.s…"   31 hours ago    Exited (0) 26 hours ago   0.0.0.0:6379->6379/tcp   some-redis
achaodeMacBook-Pro:DockerCompose achao$ docker rm 8ab032076233
8ab032076233
achaodeMacBook-Pro:DockerCompose achao$ docker rmi mysql
Untagged: mysql:latest
Untagged: mysql@sha256:232936eb036d444045da2b87a90d48241c60b68b376caf509051cb6cffea6fdc
Deleted: sha256:772571a08c67835aed7436d84973e885cc439b6cdd4dd1cc661a907d8acd3591
Deleted: sha256:433770b08a2dd41a86a333367033160b17606e5ebb2b92631ec78b4271fc6960
Deleted: sha256:b29b12491e1e17258cf08faba990bf68796bc64cbecfaaefb7589c51728dfe0b
Deleted: sha256:686d2473026cd05e2b4c65f8d4d65323c20c41a1cf1f7335a0aea3470d2377fc
Deleted: sha256:95835cb02d6b78021bcec36d9c34e336c9c66520d6c429d71c03091c87fb17aa
Deleted: sha256:fb6fd46d33af700630b4d596a8daebc559e9af5b03050929d121b2ae96e076fc
Deleted: sha256:d6f1d939e095f4854e964197f993d5827c89ad6d397cf08813e09b57be77c1cc
Deleted: sha256:241384476c4f937e16d507a015ca4c2e73e50a33fd09671b00fcbc348c3d1de3
Deleted: sha256:0722bbaa4d8469983c449492605faa50beacecaae2b7543b97796b40d2fe8574
Deleted: sha256:a78744b20069e25e25a35cf6b52d1307577c35123960c8b7a91725ddd824f1bc
Deleted: sha256:ad2eba511a7c8004e9b643b46974b6a9d28ba1039b8c27f6900638f260b5bd18
Deleted: sha256:901c6235ed257542c09d413355d472fcc809db93f6dbe91ddc6790a53d698d2c
achaodeMacBook-Pro:DockerCompose achao$ docker-compose -f mysql-compose.yml up -d
[+] Running 12/12
 ✔ db 11 layers [⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿]      0B/0B      Pulled                      34.5s 
   ✔ 29e800056b7e Pull complete                                            9.4s 
   ✔ 69da292eb326 Pull complete                                            9.4s 
   ✔ 8850ef02dd58 Pull complete                                            9.4s 
   ✔ 86a76caa9e20 Pull complete                                           12.4s 
   ✔ 881324b10832 Pull complete                                           12.4s 
   ✔ 1f5d1a8fa489 Pull complete                                           12.4s 
   ✔ 5efbe9eacf59 Pull complete                                           19.8s 
   ✔ 80db22f26c0f Pull complete                                           19.8s 
   ✔ e5595b935c31 Pull complete                                           29.7s 
   ✔ c391d4efe159 Pull complete                                           29.7s 
   ✔ e5527cf2eb5f Pull complete                                           29.8s 
[+] Running 1/1
 ✔ Container dockercompose-db-1  Started                                   0.4s
```

然后查询测试

```sql
show global variables like '%lower_case%';
```

![](/imgs/oss/picGo/20230715165458.png)
