---
title: springboot-RabbitMQ发送短信
date: 2021-02-21 11:57:08
tags: java
---

> 天不为人之恶寒也辍冬，地不为人之恶辽远也辍广。——《荀子》

### 常见名词

`Virtual Hosts`——虚拟主机，一个虚拟主机下可有多个队列

`Exchange`——交换机，分发消息到队列中

### 管理界面

使用默认账户`guest`密码`guest`登录`RabbitMQ`管理界面

![image-20210217193253536](/imgs/oss/picGo/image-20210217193253536.png)

![image-20210217193507762](/imgs/oss/picGo/image-20210217193507762.png)

这里可以看到我们的端口和相关信息

`15672`——管理界面

`25672`——`RabbitMQ`集群通信端口号

`5672`——`RabbitMQ`内部通信端口号

### 快速入门

引入依赖

```xml
        <!-- https://mvnrepository.com/artifact/com.rabbitmq/amqp-client -->
        <dependency>
            <groupId>com.rabbitmq</groupId>
            <artifactId>amqp-client</artifactId>
            <version>5.10.0</version>
        </dependency>
```

#### 简单队列

![https://www.rabbitmq.com/img/tutorials/python-one.png](/imgs/oss/picGo/python-one.png)

生产者

```java
package com.ruben.mq.rabbitMQ.simple;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

import java.nio.charset.StandardCharsets;

public class Send {
    private final static String QUEUE_NAME = "hello";

    public static void main(String[] argv) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        // 创建到服务器的连接
        try (Connection connection = factory.newConnection();
             Channel channel = connection.createChannel()) {
            // 声明要发送的队列
            channel.queueDeclare(QUEUE_NAME, false, false, false, null);
            String message = "Hello World!";
            // 发送消息
            channel.basicPublish("", QUEUE_NAME, null, message.getBytes(StandardCharsets.UTF_8));
            System.out.println(" [x] Sent '" + message + "'");
        }
    }
}
```

消费者

```java
package com.ruben.mq.rabbitMQ.simple;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DeliverCallback;

public class Recv {

    private final static String QUEUE_NAME = "hello";

    public static void main(String[] argv) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();
        // 等待接收消息
        channel.queueDeclare(QUEUE_NAME, false, false, false, null);
        System.out.println(" [*] Waiting for messages.");
        // 收到消息后
        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String message = new String(delivery.getBody(), "UTF-8");
            System.out.println(" [x] Received '" + message + "'");
        };
        channel.basicConsume(QUEUE_NAME, true, deliverCallback, consumerTag -> {
        });
    }
}
```

我们可以在管理界面看到队列和消息情况

![image-20210217200241896](/imgs/oss/picGo/image-20210217200241896.png)

我们再创建一个`Virtual Host`，点击`Add virtual host`

![image-20210217200938910](/imgs/oss/picGo/image-20210217200938910.png)

我们点击这个`Virtual Host`

![image-20210217201234448](/imgs/oss/picGo/image-20210217201234448.png)

点击`Set permission`来设置权限

![image-20210217201317195](/imgs/oss/picGo/image-20210217201317195.png)

然后创建队列

![image-20210217201534126](/imgs/oss/picGo/image-20210217201534126.png)

这里`Durable`表示持久化到磁盘，`Transient`表示队列只在内存中存储

![image-20210217223730926](/imgs/oss/picGo/image-20210217223730926.png)

这样我们就可以在创建连接时指定`Virtual Host`了

### `MQ`确保消息不丢失

#### 生产者->`MQ`

`Ack`消息确认机制(`MQ`收到消息后同步或异步的方式通知生产者)

```java
    /**
     * @MethodName: ACKConfirmDemo
     * @Description: acknowledge Confirm Demo [同步等待RabbitMQ确认回调]
     * @Date: 2021/2/18 0018 19:46
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: []
     * @returnValue: void
     */
    private static void ACKConfirmDemo() throws Exception {
        try (Connection connection = RabbitMQConnection.getConnection();
             // 设置channel
             Channel channel = connection.createChannel()) {
            // 消息
            String msg = "Hino Supa";
            // 选择ack确认模式
            channel.confirmSelect();
            // 发送消息
            channel.basicPublish("", QUEUE_NAME, null, msg.getBytes(StandardCharsets.UTF_8));
            System.out.println("消息投递成功");
            // 同步等待回调
            boolean result = channel.waitForConfirms();
            if (result) {
                System.out.println("消息投递成功");
            } else {
                System.out.println("消息投递失败");
            }
        }
    }
```

事务形式

```java
    /**
     * @MethodName: transactionDemo
     * @Description: transaction Demo [事务模式，成功调用提交事务，失败（遇到异常）回滚]
     * @Date: 2021/2/18 0018 19:47
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: []
     * @returnValue: void
     */
    private static void transactionDemo() throws Exception {
        try (Connection connection = RabbitMQConnection.getConnection();
             //2.设置channel
             Channel channel = connection.createChannel()) {
            try {
                // 消息
                String msg = "Hino Supa";
                // 选择事务模式
                channel.txSelect();
                // 发送消息
                channel.basicPublish("", QUEUE_NAME, null, msg.getBytes(StandardCharsets.UTF_8));
                // 提交事务
                channel.txCommit();
                System.out.println("消息投递成功");
            } catch (IOException e) {
                // 回滚
                channel.txRollback();
                e.printStackTrace();
            }
        }
    }
```

#### `MQ`->消费

`RabbitMQ`必须要将消息消费成功后才会从`mq`服务端中移除

`Kafka`不管是消费成功还是失败，都不会立即从`mq`服务端中移除，使用`offset`记录消息消费情况

### 工作队列

![work](/imgs/oss/picGo/python-two.png)

我们的消费者可根据自身能力调整消费消息数，如果有多个消费者，则每次消费完成都去告诉`RabbitMQ`，从而获取下一条/多条消息

```java
        // 1.创建连接
        Connection connection = RabbitMQConnection.getConnection();
        // 2.设置通道
        Channel channel = connection.createChannel();
        // 3.设置每次获取消息数量
        channel.basicQos(2);
        DefaultConsumer defaultConsumer = new DefaultConsumer(channel) {
            @Override
            public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
                String msg = new String(body, StandardCharsets.UTF_8);
                System.out.println("消费者获取消息:" + msg);
                // 消费者完成 消费者通知给mq服务器端删除该消息
                channel.basicAck(envelope.getDeliveryTag(), false);
            }
        };
        // 3.监听队列
        channel.basicConsume(QUEUE_NAME, false, defaultConsumer);
```

### 发布订阅

![https://www.rabbitmq.com/img/tutorials/python-three.png](/imgs/oss/picGo/python-three.png)

`Exchange`——交换机，分发消息到队列中

有以下几种交换机`direct`，`topic`，`headers`和`fanout`。

#### `Fanout Exchange`：扇形交换机——我们每个消费者都能收到消息

![2](/imgs/oss/picGo/bindings.png)

生产者代码

```java
package com.ruben.mq.rabbitMQ.subcrible;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.ruben.mq.rabbitMQ.connection.RabbitMQConnection;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

public class ProducerFanout {

    /**
     * 定义交换机的名称
     */
    private static final String EXCHANGE_NAME = "fanout_exchange";

    public static void main(String[] args) throws IOException, TimeoutException {
        //  创建Connection
        try (Connection connection = RabbitMQConnection.getConnection();
             // 创建Channel
             Channel channel = connection.createChannel();) {
            // 通道关联交换机(新版[5.10.0]自动创建交换机)
            channel.exchangeDeclare(EXCHANGE_NAME, "fanout", true);
            String msg = "ruben";
            // 发消息
            channel.basicPublish(EXCHANGE_NAME, "", null, msg.getBytes());
        }
    }

}
```

消费者1

```java
package com.ruben.mq.rabbitMQ.subcrible;

import com.rabbitmq.client.*;
import com.ruben.mq.rabbitMQ.connection.RabbitMQConnection;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.TimeoutException;

public class MailConsumer {
    /**
     * 定义邮件队列
     */
    private static final String QUEUE_NAME = "fanout_email_queue";
    /**
     * 定义交换机的名称
     */
    private static final String EXCHANGE_NAME = "fanout_exchange";

    public static void main(String[] args) throws IOException, TimeoutException {
        System.out.println("邮件消费者...");
        // 创建我们的连接
        Connection connection = RabbitMQConnection.getConnection();
        // 创建我们通道
        Channel channel = connection.createChannel();
        // 关联队列消费者关联队列
        channel.queueBind(QUEUE_NAME, EXCHANGE_NAME, "");
        DefaultConsumer defaultConsumer = new DefaultConsumer(channel) {
            @Override
            public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
                String msg = new String(body, StandardCharsets.UTF_8);
                System.out.println("邮件消费者获取消息:" + msg);
            }
        };
        // 开始监听消息 自动签收
        channel.basicConsume(QUEUE_NAME, true, defaultConsumer);

    }
}
```

消费者2

```java
package com.ruben.mq.rabbitMQ.subcrible;

import com.rabbitmq.client.*;
import com.ruben.mq.rabbitMQ.connection.RabbitMQConnection;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.TimeoutException;

public class SmsConsumer {
    /**
     * 定义短信队列
     */
    private static final String QUEUE_NAME = "fanout_email_sms";
    /**
     * 定义交换机的名称
     */
    private static final String EXCHANGE_NAME = "fanout_exchange";

    public static void main(String[] args) throws IOException, TimeoutException {
        System.out.println("短信消费者...");
        // 创建我们的连接
        Connection connection = RabbitMQConnection.getConnection();
        // 创建我们通道
        final Channel channel = connection.createChannel();
        // 关联队列消费者关联队列
        channel.queueBind(QUEUE_NAME, EXCHANGE_NAME, "");
        DefaultConsumer defaultConsumer = new DefaultConsumer(channel) {
            @Override
            public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
                String msg = new String(body, StandardCharsets.UTF_8);
                System.out.println("短信消费者获取消息:" + msg);
            }
        };
        // 开始监听消息 自动签收
        channel.basicConsume(QUEUE_NAME, true, defaultConsumer);

    }
}
```

#### `Direct`：直连交换机——按照指定的`routingKey`去分发消息

生产者

```java
package com.ruben.mq.rabbitMQ.subcrible.direct;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.ruben.mq.rabbitMQ.connection.RabbitMQConnection;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

public class ProducerDirect {

    /**
     * 定义交换机的名称
     */
    private static final String EXCHANGE_NAME = "direct_exchange";

    public static void main(String[] args) throws IOException, TimeoutException {
        //  创建Connection
        try (Connection connection = RabbitMQConnection.getConnection();
             // 创建Channel
             Channel channel = connection.createChannel()) {
            // 通道关联交换机
            channel.exchangeDeclare(EXCHANGE_NAME, "direct", true);
            String msg = "ruben";
            channel.basicPublish(EXCHANGE_NAME, "sms", null, msg.getBytes());
        }
    }

}
```

消费者`email`

```java
package com.ruben.mq.rabbitMQ.subcrible.direct;

import com.rabbitmq.client.*;
import com.ruben.mq.rabbitMQ.connection.RabbitMQConnection;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.TimeoutException;

public class MailConsumer {
    /**
     * 定义邮件队列
     */
    private static final String QUEUE_NAME = "direct_email_queue";
    /**
     * 定义交换机的名称
     */
    private static final String EXCHANGE_NAME = "direct_exchange";

    public static void main(String[] args) throws IOException, TimeoutException {
        System.out.println("邮件消费者...");
        // 创建我们的连接
        Connection connection = RabbitMQConnection.getConnection();
        // 创建我们通道
        final Channel channel = connection.createChannel();
        // 关联队列消费者关联队列
        channel.queueBind(QUEUE_NAME, EXCHANGE_NAME, "email");
        DefaultConsumer defaultConsumer = new DefaultConsumer(channel) {
            @Override
            public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
                String msg = new String(body, StandardCharsets.UTF_8);
                System.out.println("邮件消费者获取消息:" + msg);
            }
        };
        // 开始监听消息 自动签收
        channel.basicConsume(QUEUE_NAME, true, defaultConsumer);

    }
}
```

消费者`sms`

```java
package com.ruben.mq.rabbitMQ.subcrible.direct;

import com.rabbitmq.client.*;
import com.ruben.mq.rabbitMQ.connection.RabbitMQConnection;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.TimeoutException;

public class SmsConsumer {
    /**
     * 定义短信队列
     */
    private static final String QUEUE_NAME = "direct_sms_queue";
    /**
     * 定义交换机的名称
     */
    private static final String EXCHANGE_NAME = "direct_exchange";

    public static void main(String[] args) throws IOException, TimeoutException {
        System.out.println("短信消费者...");
        // 创建我们的连接
        Connection connection = RabbitMQConnection.getConnection();
        // 创建我们通道
        final Channel channel = connection.createChannel();
        // 关联队列消费者关联队列
        channel.queueBind(QUEUE_NAME, EXCHANGE_NAME, "sms");
        DefaultConsumer defaultConsumer = new DefaultConsumer(channel) {
            @Override
            public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
                String msg = new String(body, StandardCharsets.UTF_8);
                System.out.println("短信消费者获取消息:" + msg);
            }
        };
        // 开始监听消息 自动签收
        channel.basicConsume(QUEUE_NAME, true, defaultConsumer);

    }
}
```

#### `Topic`：主题交换机——消费者的`routingKey`使用`[主题].*`去匹配生产者发送的`routingKey`为`[主题].xxx`的消息

![3](/imgs/oss/picGo/python-three-overall.png)

生产者，发送`routingKey`为`supa.sms`的消息

```java
package com.ruben.mq.rabbitMQ.subcrible.topic;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.ruben.mq.rabbitMQ.connection.RabbitMQConnection;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

public class ProducerTopic {

    /**
     * 定义交换机的名称
     */
    private static final String EXCHANGE_NAME = "topic_exchange";

    public static void main(String[] args) throws IOException, TimeoutException {
        //  创建Connection
        try (Connection connection = RabbitMQConnection.getConnection();
             // 创建Channel
             Channel channel = connection.createChannel();) {
            // 通道关联交换机
            channel.exchangeDeclare(EXCHANGE_NAME, "topic", true);
            String msg = "ruben";
            channel.basicPublish(EXCHANGE_NAME, "supa.sms", null, msg.getBytes());
        }
    }

}
```

消费者，指定`routingKey`为`ruben.*`

```java
package com.ruben.mq.rabbitMQ.subcrible.topic;

import com.rabbitmq.client.*;
import com.ruben.mq.rabbitMQ.connection.RabbitMQConnection;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.TimeoutException;

public class MailConsumer {
    /**
     * 定义邮件队列
     */
    private static final String QUEUE_NAME = "topic_email_queue";
    /**
     * 定义交换机的名称
     */
    private static final String EXCHANGE_NAME = "topic_exchange";

    public static void main(String[] args) throws IOException, TimeoutException {
        System.out.println("邮件消费者...");
        // 创建我们的连接
        Connection connection = RabbitMQConnection.getConnection();
        // 创建我们通道
        Channel channel = connection.createChannel();
        // 关联队列消费者关联队列
        channel.queueBind(QUEUE_NAME, EXCHANGE_NAME, "ruben.*");
        DefaultConsumer defaultConsumer = new DefaultConsumer(channel) {
            @Override
            public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
                String msg = new String(body, StandardCharsets.UTF_8);
                System.out.println("邮件消费者获取消息:" + msg);
            }
        };
        // 开始监听消息 自动签收
        channel.basicConsume(QUEUE_NAME, true, defaultConsumer);

    }
}
```

消费者，指定`routingKey`为`supa.*`

```java
package com.ruben.mq.rabbitMQ.subcrible.topic;

import com.rabbitmq.client.*;
import com.ruben.mq.rabbitMQ.connection.RabbitMQConnection;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.TimeoutException;

public class SmsConsumer {
    /**
     * 定义短信队列
     */
    private static final String QUEUE_NAME = "topic_sms_queue";
    /**
     * 定义交换机的名称
     */
    private static final String EXCHANGE_NAME = "topic_exchange";

    public static void main(String[] args) throws IOException, TimeoutException {
        System.out.println("短信消费者...");
        // 创建我们的连接
        Connection connection = RabbitMQConnection.getConnection();
        // 创建我们通道
        Channel channel = connection.createChannel();
        // 关联队列消费者关联队列
        channel.queueBind(QUEUE_NAME, EXCHANGE_NAME, "supa.*");
        DefaultConsumer defaultConsumer = new DefaultConsumer(channel) {
            @Override
            public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
                String msg = new String(body, StandardCharsets.UTF_8);
                System.out.println("短信消费者获取消息:" + msg);
            }
        };
        // 开始监听消息 自动签收
        channel.basicConsume(QUEUE_NAME, true, defaultConsumer);

    }
}
```

### `springboot`整合`RabbitMQ`

`GAV`

```xml
        <!-- https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-amqp -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-amqp</artifactId>
            <version>2.4.2</version>
        </dependency>
```

然后是配置文件和配置类

```yaml
spring: 
  rabbitmq:
    addresses: localhost
    port: 5672
    username: guest
    password: guest
    virtual-host: /ruben
```



```java
package com.ruben.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.FanoutExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @ClassName: RabbitmqConfig
 * @Description: 我还没有写描述
 * @Date: 2021/2/19 0019 21:53
 * *
 * @author: <achao1441470436@gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
@Configuration
public class RabbitmqConfig {
    /**
     * 短信队列名称
     */
    public static final String QUEUE_RUBEN_SMS = "queue_ruben_sms";
    /**
     * 交换机名称
     */
    public static final String EXCHANGE_RUBEN = "exchange_ruben";
    /**
     * 路由key
     */
    public static final String ROUTING_KEY_RUBEN = "ruben.sms";

    @Bean
    public Queue smsQueue() {
        return new Queue(QUEUE_RUBEN_SMS);
    }

    @Bean
    public FanoutExchange fanoutExchange() {
        return new FanoutExchange(EXCHANGE_RUBEN);
    }

    @Bean
    public Binding bindingSmsFanoutExchange(Queue smsQueue, FanoutExchange fanoutExchange) {
        return BindingBuilder.bind(smsQueue).to(fanoutExchange);
    }

}
```

最后是发消息

```java
    @Resource
    private AmqpTemplate amqpTemplate;

    @GetMapping("sendSms/{number}")
    public AjaxJson sendSms(@PathVariable String number) {
        // 获取code
        String code = new Random().ints(100000, 999999).boxed().findAny().map(String::valueOf).orElseThrow(RuntimeException::new);
        // 往数据库存number
        stringRedisTemplate.opsForValue().set(number, code, 5, TimeUnit.MINUTES);
        // 发消息到RabbitMQ
        amqpTemplate.send(RabbitmqConfig.EXCHANGE_RUBEN, RabbitmqConfig.ROUTING_KEY_RUBEN, MessageBuilder.withBody(JSON.toJSONString(SmsTO.builder().number(number).code(code).build()).getBytes(StandardCharsets.UTF_8)).build());
        return AjaxJson.success("发送成功！");
    }
```

然后是消费者这边

先配置上面同样的配置类，然后

```java
package com.ruben.rubenproducerdemo.consumer;

import com.alibaba.fastjson.JSON;
import com.ruben.rubenproducerdemo.config.RabbitmqConfig;
import com.ruben.rubenproducerdemo.pojo.to.SmsTO;
import com.ruben.rubenproducerdemo.utils.SmsUtil;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.*;
import org.springframework.stereotype.Component;

/**
 * @ClassName: SmsConsumer
 * @Description: 我还没有写描述
 * @Date: 2021/2/20 0020 21:28
 * *
 * @author: <achao1441470436@gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
@Component
public class SmsConsumer {

    @RabbitHandler
    @RabbitListener(bindings = @QueueBinding(value = @Queue(value = RabbitmqConfig.QUEUE_RUBEN_SMS), exchange = @Exchange(value = RabbitmqConfig.EXCHANGE_RUBEN, type = "fanout"), key = RabbitmqConfig.ROUTING_KEY_RUBEN))
    public void consume(Message message) {
        SmsTO smsTO = JSON.parseObject(message.getBody(), SmsTO.class);
        SmsUtil.SendSms(smsTO.getNumber(), "SMS_189521312", smsTO.getCode());
    }

}
```

然后是发短信的代码，在我[之前写过的一篇博客](https://VampireAchao.github.io/2020/06/06/%E9%98%BF%E9%87%8C%E4%BA%91sms%E5%8F%91%E9%80%81%E7%9F%AD%E4%BF%A1/)中有

这样就实现了同步返回结果并存入数据库，异步发送验证码短信的业务啦~

### 死信队列

消息中间件拒收该消息后转移到死信队列中存放，死信队列也可以有交换机、路由`key`等

产生原因

1.消息以及过期了都还没被消费

2.队列容量满了

3.消费者多次消费失败

这里我们进行配置

```java
package com.ruben.rubenproducerdemo.config;

import org.springframework.amqp.core.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


/**
 * @ClassName: RabbitmqConfig
 * @Description: 我还没有写描述
 * @Date: 2021/2/19 0019 21:53
 * *
 * @author: <achao1441470436@gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
@Configuration
public class RabbitmqConfig {
    /**
     * 短信队列名称
     */
    public static final String QUEUE_RUBEN_SMS = "queue_ruben_sms";
    /**
     * 死信队列名称
     */
    public static final String QUEUE_DEAD_RUBEN_SMS = "queue_dead_ruben_sms";
    /**
     * 交换机名称
     */
    public static final String EXCHANGE_RUBEN = "exchange_ruben";
    /**
     * 死信交换机
     */
    public static final String EXCHANGE_DEAD_RUBEN = "exchange_dead_ruben";
    /**
     * 路由key
     */
    public static final String ROUTING_KEY_RUBEN = "ruben.sms";

    /**
     * 创建队列
     *
     * @return
     */
    @Bean
    public Queue smsQueue() {
        return QueueBuilder
                // 持久化队列
                .durable(QUEUE_RUBEN_SMS)
                // 消息默认存活10秒
                .ttl(10000)
                // 绑定我们的死信交换机
                .deadLetterExchange(EXCHANGE_DEAD_RUBEN)
                // 死信路由key
                .deadLetterRoutingKey(ROUTING_KEY_RUBEN)
                .build();
    }

    /**
     * 交换机
     *
     * @return
     */
    @Bean
    public FanoutExchange fanoutExchange() {
        return ExchangeBuilder.fanoutExchange(EXCHANGE_RUBEN).build();
    }

    /**
     * 绑定交换机和队列
     *
     * @param smsQueue
     * @param fanoutExchange
     * @return
     */
    @Bean
    public Binding bindingSmsFanoutExchange(Queue smsQueue, FanoutExchange fanoutExchange) {
        return BindingBuilder.bind(smsQueue).to(fanoutExchange);
    }

}
```

然后是死信消费者

```java
package com.ruben.rubenproducerdemo.consumer;

import com.alibaba.fastjson.JSON;
import com.rabbitmq.client.AMQP;
import com.rabbitmq.client.Channel;
import com.ruben.rubenproducerdemo.config.RabbitmqConfig;
import com.ruben.rubenproducerdemo.pojo.to.SmsTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.*;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.io.IOException;

/**
 * @ClassName: DeadLetterConsumer
 * @Description: 我还没有写描述
 * @Date: 2021/2/21 0021 20:41
 * *
 * @author: <achao1441470436@gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
@Slf4j
@Component
public class DeadLetterConsumer {

    @RabbitHandler
    @RabbitListener(bindings = @QueueBinding(value = @Queue(value = RabbitmqConfig.QUEUE_DEAD_RUBEN_SMS), exchange = @Exchange(value = RabbitmqConfig.EXCHANGE_DEAD_RUBEN, type = "fanout"), key = RabbitmqConfig.ROUTING_KEY_RUBEN))
    public void deadLetterConsume(Message message, Channel channel) throws IOException {
        SmsTO smsTO = JSON.parseObject(message.getBody(), SmsTO.class);
        channel.basicAck(message.getMessageProperties().getDeliveryTag(), true);
        log.info("死信队列收到" + smsTO);
    }
}
```

### 配置重试

```java
spring: 
  rabbitmq:
    addresses: localhost
    port: 5672
    username: guest
    password: guest
    virtual-host: /ruben
    listener:
      simple:
        retry:
          enabled: true
          # 最大重试次数
          max-attempts: 5
          # 重试间隔毫秒
          initial-interval: 3000
          # 手动ack模式
        acknowledge-mode: manual
```

