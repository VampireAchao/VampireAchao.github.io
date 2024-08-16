---
title: SQLite入门のjava创建库表
date: 2020-10-11 15:13:23
tags: java
---

>人们因为能忘却，所以自己能渐渐的脱离了受过的苦痛，也因为能忘却，所以照样得再犯前人的错误。——鲁迅

关于`SQLite`

> SQLite是一个C语言库，它实现了一个小型、快速、自包含、高可靠性、全功能的SQL数据库引擎。SQLite是世界上使用最多的数据库引擎。SQLite内置于所有的移动电话和大多数计算机中，并捆绑在人们每天使用的无数其他应用程序中。

首先引入依赖

```java
        <!-- sqlite驱动 -->
        <!-- https://mvnrepository.com/artifact/org.xerial/sqlite-jdbc -->
        <dependency>
            <groupId>org.xerial</groupId>
            <artifactId>sqlite-jdbc</artifactId>
            <version>3.32.3.2</version>
        </dependency>
```

然后`java`代码

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

/**
 * @ClassName: SQLiteDemo
 * @Date: 2020/10/11 0011 15:16
 * @Description:
 */
public class SQLiteDemo {
    public static void main(String[] args) {
        Connection connection = null;
        Statement connectionStatement = null;
        try {
            Class.forName("org.sqlite.JDBC");
            connection = DriverManager.getConnection("jdbc:sqlite:data.db");
            connectionStatement = connection.createStatement();
            String sql = "CREATE TABLE IF NOT EXISTS `user` (" +
                    "`id` INTEGER PRIMARY KEY AUTOINCREMENT," +
                    "`username` text NOT NULL," +
                    "`password` text NOT NULL" +
                    ");";
            connectionStatement.executeUpdate(sql);
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } finally {
            try {
                if (connectionStatement != null) {
                    connectionStatement.close();
                }
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
```

一般用于项目初始化场景，上文中`data.db`可以更换指定路径，我这里放在了项目根目录，执行后会自动创建`data.db`文件

![image-20201011152115497](/imgs/oss/picGo/image-20201011152115497.png)

类比`MySQL`来说，`SQLite`太轻量了，你甚至能在创建表时自动创建库...在小型项目例如`Minecraft`插件中、小型安卓应用中都可以使用`SQLite`作为数据库