---
title: binlog4j
date: 2023-08-31 13:55:07
tags: java
---

> 敢同恶鬼争高下，不向霸王让寸分。――毛泽东《七律庆祝第二次核试验成功》

分享一个基 于 Java 轻 量 级 的 Mysql (Mariadb) Binlog 客 户 端

[binlog4j: 基 于 Java 轻 量 级 的 Mysql (Mariadb) Binlog 客 户 端](https://gitee.com/dromara/Binlog4j)

- 集群模式, 通过集群部署的方式，保证服务高可用。

- 宕机续读, 避免宕机期间造成数据丢失。

- 数据转换, 基于泛型封装 binlog Event 的序列化数据。

- 兼容 传统项目 与 Spring Boot / Cloud 项目。

- 兼容 Spring Boot 2.x 与 Spring Boot 3.x 版本。

### [下载安装](https://gitee.com/dromara/Binlog4j#%E4%B8%8B%E8%BD%BD%E5%AE%89%E8%A3%85)

```xml
<dependency>
   <groupId>com.gitee.Jmysy</groupId>
   <artifactId>binlog4j-core</artifactId>
   <version>latest.version</version>
</dependency>
```

简单使用

通过 BinlogClient 创建 binlog 客户端, IBinlogEventHandler 用于接受 binlog 事件通知, 该接口允许使用泛型, 数据将遵循驼峰规则进行封装。

```java
public class BootStrap {

    public static void main(String[] args) {
        
        BinlogClientConfig clientConfig = new BinlogClientConfig();
        clientConfig.setHost("127.0.0.1");
        clientConfig.setPort(3306);
        clientConfig.setUsername("root");
        clientConfig.setPassword("taoren@123");
        clientConfig.setServerId(1990);
  
        IBinlogClient binlogClient = new BinlogClient(clientConfig);

        binlogClient.registerEventHandler("database", "table", new IBinlogEventHandler() {
            
            @Override
            public void onInsert(BinlogEvent event) {
                System.out.println("插入数据:{}", event.getData());
            }

            @Override
            public void onUpdate(BinlogEvent event) {
                System.out.println("修改数据:{}", event.getData());
            }

            @Override
            public void onDelete(BinlogEvent event) {
                System.out.println("删除数据:{}", event.getData());
            }
        });

        binlogClient.connect();
    }
}
```
