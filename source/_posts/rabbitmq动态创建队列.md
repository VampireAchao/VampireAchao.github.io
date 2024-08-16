---
title: rabbitmq动态创建队列
date: 2023-11-21 08:49:37
tags: java
---

> 谁都饶恕比谁都不饶恕同样残忍。——塞涅卡

分享一个动态创建`rabbitmq`队列的代码：

依赖：

```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-amqp</artifactId>
        </dependency>
```

配置：

```yaml
spring:
  rabbitmq:
    host: localhost
    port: 5672
    username: xxx
    password: xxx
```

代码：

```java
import com.alibaba.nacos.common.utils.JacksonUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.AmqpAdmin;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.rabbit.listener.SimpleMessageListenerContainer;
import org.springframework.amqp.rabbit.listener.adapter.MessageListenerAdapter;

@Slf4j
public class RabbitMQUtil {

    private static final AmqpAdmin amqpAdmin = SpringContextHolder.getBean(AmqpAdmin.class);
    private static final ConnectionFactory connectionFactory = SpringContextHolder.getBean(ConnectionFactory.class);
    private static final RabbitTemplate rabbitTemplate = SpringContextHolder.getBean(RabbitTemplate.class);

    public static void createQueue(String queueName) {
        Queue queue = new Queue(queueName, true);
        amqpAdmin.declareQueue(queue);
    }

    public static void deleteQueue(String queueName) {
        amqpAdmin.deleteQueue(queueName);
    }

    public static void subscribeQueue(String queueName, Object messageListener, String methodName) {
        log.debug("subscribeQueue: {}", queueName);
        // 创建一个消息监听适配器
        MessageListenerAdapter listenerAdapter = new MessageListenerAdapter(messageListener, methodName);
        // 创建 SimpleMessageListenerContainer
        SimpleMessageListenerContainer container = new SimpleMessageListenerContainer();
        container.setConnectionFactory(connectionFactory);
        container.setQueueNames(queueName);
        container.setMessageListener(listenerAdapter);
        // 启动容器
        container.start();
    }

    public static void sendMessage(String queueName, Object message) {
        String json = JacksonUtils.toJson(message);
        log.debug("sendMessage, queueName: {} , message: {}", queueName, json);
        rabbitTemplate.convertAndSend(queueName, json);
    }

}
```

使用起来很简单：

创建队列：

```java
RabbitMQUtil.createQueue("test");
```

订阅队列：

```java
    @Getter
    public static class MyMessageListener implements MQMessageListener {

        @Override
        public void handleMessage(String message) {
            System.out.println("Received message: " + message);
        }

    }

MyMessageListener listener = new MyMessageListener();
RabbitMQUtil.subscribeQueue("test", listener, "handleMessage");
```

然后是删除队列：

```java
RabbitMQUtil.deleteQueue("test")
```
