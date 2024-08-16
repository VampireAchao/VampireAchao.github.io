---
title: stream-query多数据库进行CI测试
date: 2024-03-15 12:49:48
tags: java
---

> 把时间花费在阅读他人的著述吧，你可借他人辛苦的东西，轻易改善自己。——苏格拉底

最近针对`stream-query`，使用[github action | 阿超](https://VampireAchao.github.io/2024/03/10/github-action/)

主要是针对`h2`、`mysql`、`postgresql`各跑一遍对应的脚本和单元测试

配置脚本为：

```yml
name: E2E Tests

on:
  push:
    branches:
      - e2e
  pull_request:
    branches:
      - e2e

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      mysql:
        image: mysql:8.0
        env:
          MYSQL_ROOT_PASSWORD: stream-query
          MYSQL_DATABASE: stream-query
        ports:
          - 3306:3306
        options: >-
          --health-cmd="mysqladmin ping -u stream-query --password=stream-query --silent"
          --health-interval=10s
          --health-timeout=5s
          --health-retries=5

      postgres:
        image: postgres
        env:
          POSTGRES_DB: stream-query
          POSTGRES_USER: stream-query
          POSTGRES_PASSWORD: stream-query
        ports:
          - 5432:5432
        options: >-
          --health-cmd="pg_isready -U stream-query"
          --health-interval=10s
          --health-timeout=5s
          --health-retries=5

    steps:
      - uses: actions/checkout@v2

      - name: Set up JDK 8
        uses: actions/setup-java@v2
        with:
          java-version: '8'
          distribution: 'temurin'

      - name: Cache Maven packages
        uses: actions/cache@v2
        with:
          path: ~/.m2
          key: ${{ runner.os }}-m2-${{ hashFiles('**/pom.xml') }}
          restore-keys: |
            ${{ runner.os }}-m2-

      - name: Build with Maven
        run: mvn -B -X package --file pom.xml

      - name: Run H2 Tests (Default)
        run: mvn -B -X test

      - name: Execute MySQL schema and data scripts
        run: |
          mysql -h 127.0.0.1 -P 3306 -u root --password=stream-query stream-query < ./stream-plugin/stream-plugin-mybatis-plus/src/test/resources/sql/mysql/schema.sql
          mysql -h 127.0.0.1 -P 3306 -u root --password=stream-query stream-query < ./stream-plugin/stream-plugin-mybatis-plus/src/test/resources/sql/mysql/data.sql
        if: success()

      - name: Run MySQL Tests
        run: mvn -B -X test -Dspring.profiles.active=mysql

      - name: Execute PostgreSQL schema and data scripts
        run: |
          PGPASSWORD=stream-query psql -h localhost -U stream-query -d stream-query -p 5432 -a -f ./stream-plugin/stream-plugin-mybatis-plus/src/test/resources/sql/pgsql/schema.sql
          PGPASSWORD=stream-query psql -h localhost -U stream-query -d stream-query -p 5432 -a -f ./stream-plugin/stream-plugin-mybatis-plus/src/test/resources/sql/pgsql/data.sql
        if: success()

      - name: Run PostgreSQL Tests
        run: mvn -B -X test -Dspring.profiles.active=pgsql
```

脚本源码：

https://github.com/dromara/stream-query/blob/main/.github/workflows/maven-publish.yml

除了`ci`脚本，还需要配置代码，这里是分别的`dsl`和`ddl`以及配置文件

![](/Users/achao/Documents/blog/themes/gal/source/imgs/oss/blog-img/2024-03-15-13-38-24-image.png)

执行效果：

[[ci] fix pgsql dsl and ddl · dromara/stream-query@6ae46c5 · GitHub](https://github.com/dromara/stream-query/actions/runs/8222231931)
