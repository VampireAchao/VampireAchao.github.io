---
title: RabbitMQ安装
date: 2021-02-18 19:29:11
tags: java
---

> 万物各得其和以生,各得其养以成。一一《荀子》

### 介绍

使用异步多线程方案会导致`CPU`竞争强烈，故使用`MQ`

使用`MQ`能够大大降低项目耦合

名词：

`Producer`：生产者，发消息的

`Consumer`：消费者，收消息干活的

`Broker`：`MQ`本体

`Topic`：主题

`Queue`：消息队列，先进先出

`Message`：消息报文(内容，一般为`json`)



单机版本`MQ`原理

```java
package com.ruben.mq;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.LinkedBlockingDeque;

/**
 * @ClassName: RubenThreadMQ
 * @Description: 我还没有写描述
 * @Date: 2021/2/17 0017 14:52
 * *
 * @author: <achao1441470436@gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
public class RubenThreadMQ {
    private static LinkedBlockingDeque<JSONObject> msgs = new LinkedBlockingDeque<>();

    public static void main(String[] args) {
        Thread producerThread = new Thread(() -> {
            try {
                while (true) {
                    Thread.sleep(1000);
                    msgs.offer(JSON.parseObject("{\"userId\":\"" + UUID.randomUUID() + "\"}"));
                }
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }, "producer");
        producerThread.start();
        Thread consumerThread = new Thread(() -> {
            while (true) {
                Optional.ofNullable(msgs.poll())
                        .ifPresent(data -> System.out.println(Thread.currentThread().getName() + "," + data.getString("userId")));
            }

        }, "consumer");
        consumerThread.start();
    }
}
```

> 宕机如何保证`MQ`消息不丢失

主流`MQ`都自带持久化策略，不用担心消息丢失

> 消费者不在，消息是否会丢失

不会，因为存在消息确认机制，必须要消费者消费该消息成功之后，再通知`mq`删除

`MQ`服务器端将消息推送给消费者：消费者已经和`MQ`保持了长连接

消费者主动拉取消息：消费者首次启动

抗高并发：消费者根据自身能力情况拉取`MQ`消息消费，默认情况取出一条

提高速率：消费者实现集群；批量获取消息消费

### 安装

#### 首先安装`Erlang`语言，[官网下载](https://www.erlang.org/downloads)

![image-20210217183947459](/imgs/oss/picGo/image-20210217183947459.png)

我这里选了个[19.1版本](https://www.erlang.org/downloads/19.1)

然后安装

![image-20210217184210116](/imgs/oss/picGo/image-20210217184210116.png)

一直下一步就行

然后配置环境变量

![image-20210217184629696](/imgs/oss/picGo/image-20210217184629696.png)

![image-20210217184650180](/imgs/oss/picGo/image-20210217184650180.png)

然后把`%ERLANG_HOME%\bin;`添加到`Path`末尾

![image-20210217184742685](/imgs/oss/picGo/image-20210217184742685.png)

然后确定

打开控制台，输入`erl -version`查看版本

如果成功提示版本则表明环境变量生效

![image-20210217184900667](/imgs/oss/picGo/image-20210217184900667.png)

#### 然后下载安装`RabbitMQ`，[官网下载](https://github.com/rabbitmq/rabbitmq-server/releases/download/v3.8.12/rabbitmq-server-3.8.12.exe)

我这里用的`3.6.9`版本，因为提前下好了

![image-20210217190408633](/imgs/oss/picGo/image-20210217190408633.png)

一直下一步就可以了

找到安装目录，我这里是`C:\Program Files\RabbitMQ Server\rabbitmq_server-3.6.9\sbin`

执行

```shell
// 安装管理界面插件
rabbitmq-plugins.bat enable rabbitmq_management
// 启动服务
rabbitmqctl.bat start_app
// 启动mq
rabbitmq-server.bat start
```

![image-20210217191707856](/imgs/oss/picGo/image-20210217191707856.png)

然后我们访问`http://127.0.0.1:15672/`即可进入

![image-20210217191639746](/imgs/oss/picGo/image-20210217191639746.png)