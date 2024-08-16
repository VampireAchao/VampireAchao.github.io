---
title: docker-compose安装mysql坑
date: 2023-08-30 19:47:28
tags: 运维
---

> 人生中有些事是不得不做的，于不得不做中勉强去做，是毁灭；于不得不做中做的好，是勇敢。——叶弥《成长如蜕》

今天按照我我这篇博客# [docker-compose安装mysql并指定忽略表名大小写以及挂载配置文件](https://VampireAchao.github.io/2023/07/16/docker-compose%E5%AE%89%E8%A3%85mysql%E5%B9%B6%E6%8C%87%E5%AE%9A%E5%BF%BD%E7%95%A5%E8%A1%A8%E5%90%8D%E5%A4%A7%E5%B0%8F%E5%86%99%E4%BB%A5%E5%8F%8A%E6%8C%82%E8%BD%BD%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6/)踩坑了

发现报错

```shell
2023-08-30 19:42:34 2023-08-30T11:42:34.815640Z 0 [ERROR] [MY-010119] [Server] Aborting
2023-08-30 19:42:36 2023-08-30 11:42:36+00:00 [ERROR] [Entrypoint]: mysqld failed while attempting to check config
2023-08-30 19:42:36     command was: mysqld --default-authentication-plugin=mysql_native_password --lower_case_table_names=1 --verbose --help --log-bin-index=/tmp/tmp.0M9uzTlVJk
2023-08-30 19:42:36     2023-08-30T11:42:36.592544Z 0 [Warning] [MY-011068] [Server] The syntax '--skip-host-cache' is deprecated and will be removed in a future release. Please use SET GLOBAL host_cache_size=0 instead.
2023-08-30 19:42:36 2023-08-30T11:42:36.592567Z 0 [ERROR] [MY-000077] [Server] /usr/sbin/mysqld: Error while setting value 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' to 'sql_mode'.
2023-08-30 19:42:36 2023-08-30T11:42:36.593741Z 0 [ERROR] [MY-010119] [Server] Aborting
2023-08-30 19:42:39 2023-08-30 11:42:39+00:00 [ERROR] [Entrypoint]: mysqld failed while attempting to check config
2023-08-30 19:42:39     command was: mysqld --default-authentication-plugin=mysql_native_password --lower_case_table_names=1 --verbose --help --log-bin-index=/tmp/tmp.TTCHBVqF9r
2023-08-30 19:42:39     2023-08-30T11:42:39.955222Z 0 [Warning] [MY-011068] [Server] The syntax '--skip-host-cache' is deprecated and will be removed in a future release. Please use SET GLOBAL host_cache_size=0 instead.
2023-08-30 19:42:39 2023-08-30T11:42:39.955244Z 0 [ERROR] [MY-000077] [Server] /usr/sbin/mysqld: Error while setting value 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' to 'sql_mode'.
2023-08-30 19:42:39 2023-08-30T11:42:39.956426Z 0 [ERROR] [MY-010119] [Server] Aborting
```

原来是有个值出问题了，我们改一下`my.cnf`

```properties
[mysqld]
sql_mode=STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION
character_set_server=utf8mb4
```

去掉了`NO_AUTO_CREATE_USER`就好了
