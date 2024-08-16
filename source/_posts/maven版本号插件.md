---
title: maven版本号插件
date: 2022-09-04 14:40:20
tags: java
---

> 莫等闲，白了少年头，空悲切——岳飞

我们`maven`项目除了使用[这种方式](https://VampireAchao.github.io/2022/05/28/mvn%E4%B8%80%E9%94%AE%E6%8D%A2%E7%89%88%E6%9C%AC/)修改版本号，还有一种统一管理版本号的方式：

项目地址：https://github.com/mojohaus/flatten-maven-plugin

官方文档：http://www.mojohaus.org/flatten-maven-plugin/

引入：

```xml
  <build>
    <plugins>
      <plugin>
        <groupId>org.codehaus.mojo</groupId>
        <artifactId>flatten-maven-plugin</artifactId>
        <!--<version>INSERT LATEST VERSION HERE</version>-->
        <executions>
          <execution>
            <goals>
              <goal>flatten</goal>
            </goals>
          </execution>
        </executions>
        <configuration>
          <!-- See usage on maven site from link above for details -->
        </configuration>
      </plugin>
    </plugins>
  </build>
```

使用时将版本号改为`${revision}`即可，记得不要改别的名字

父模块

```xml
    <groupId>io.github.vampireachao</groupId>
    <artifactId>stream-query</artifactId>
    <packaging>pom</packaging>
    <version>${revision}</version>
    <modules>
        <module>stream-core</module>
        <module>stream-plugin</module>
    </modules>


    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
        <revision>1.1.6</revision>
        ...
    </properties>
```

子模块

```xml
    <parent>
        <artifactId>stream-query</artifactId>
        <groupId>io.github.vampireachao</groupId>
        <version>${revision}</version>
        <relativePath>../pom.xml</relativePath>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>stream-core</artifactId>
```



示例项目的`pom`：https://gitee.com/VampireAchao/stream-query/blob/master/pom.xml
