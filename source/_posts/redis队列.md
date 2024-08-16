---
title: redis队列
date: 2022-05-08 20:29:29
tags: java
---

> 日出之美便在于它脱胎于最深的黑暗。——辛夷坞

首先是配置类

分为`Redis`配置类和`Jackson`配置类，主要是用于收发消息时序列化

`Jackson`的

```java
package com.ruben.config;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

/**
 * @author <achao1441470436@gmail.com>
 * @since 2022/5/8 18:43
 */
@Configuration
public class JacksonConfig {

    public static final String DATE_TIME_PATTERN = "yyyy-MM-dd HH:mm:ss";
    public static final String DATE_PATTERN = "yyyy-MM-dd";


    @Bean
    public ObjectMapper objectMapper() {
        final ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);

        JavaTimeModule module = new JavaTimeModule();
        module.addSerializer(new LocalDateSerializer(DateTimeFormatter.ofPattern(DATE_PATTERN)));
        module.addSerializer(new LocalDateTimeSerializer(DateTimeFormatter.ofPattern(DATE_TIME_PATTERN)));
        module.addDeserializer(LocalDate.class, new LocalDateDeserializer(DateTimeFormatter.ofPattern(DATE_TIME_PATTERN)));
        module.addDeserializer(LocalDateTime.class, new LocalDateTimeDeserializer(DateTimeFormatter.ofPattern(DATE_TIME_PATTERN)));
        objectMapper.registerModule(module);
        objectMapper.setDateFormat(new SimpleDateFormat(DATE_TIME_PATTERN));
        return objectMapper;
    }

    @Bean
    public Jackson2JsonRedisSerializer<Object> jackson2JsonRedisSerializer(ObjectMapper objectMapper) {
        final Jackson2JsonRedisSerializer<Object> jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer<>(Object.class);
        jackson2JsonRedisSerializer.setObjectMapper(objectMapper);
        return jackson2JsonRedisSerializer;
    }
}
```

`redis`的

```java
package com.ruben.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;

import com.ruben.listener.RedisMessageListener;

/**
 * @author <achao1441470436@gmail.com>
 * @since 2022/5/8 17:31
 */
@Configuration
public class RedisConfig {

    @Bean
    public RedisMessageListenerContainer redisMessageListenerContainer(RedisMessageListener listener, RedisConnectionFactory factory, Jackson2JsonRedisSerializer<Object> serializer) {
        final RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(factory);
        final MessageListenerAdapter adapter = new MessageListenerAdapter(listener, "onMessage");
        adapter.setSerializer(serializer);
        container.addMessageListener(adapter, new ChannelTopic("topic"));
        return container;
    }

}
```

然后是消息接收的`Listener`

```java
package com.ruben.listener;

import java.util.HashMap;

import javax.annotation.Resource;

import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.SneakyThrows;

/**
 * @author <achao1441470436@gmail.com>
 * @since 2022/5/8 15:52
 */
@Component
public class RedisMessageListener implements MessageListener {

    @Resource
    private ObjectMapper objectMapper;

    /**
     * Callback for processing received objects through Redis.
     *
     * @param message message must not be {@literal null}.
     * @param pattern pattern matching the channel (if specified) - can be {@literal null}.
     */
    @Override
    @SneakyThrows
    public void onMessage(Message message, byte[] pattern) {
        System.out.println("接收到消息：" + new String(message.getBody()));
    }
}
```

最后是发消息

```java
package com.ruben;

import java.time.LocalDateTime;
import java.util.Collections;

import javax.annotation.Resource;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.StringRedisTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.SneakyThrows;

@SpringBootTest
class SimpleRedisQueueApplicationTests {

    @Resource
    private StringRedisTemplate stringRedisTemplate;

    @Resource
    private ObjectMapper objectMapper;

    @Test
    @SneakyThrows
    void contextLoads() {
        stringRedisTemplate.convertAndSend("topic", objectMapper.writeValueAsString(Collections.singletonMap("time", LocalDateTime.now())));
    }

}
```

运行：

![image-20220508203301775](/imgs/oss/picGo/image-20220508203301775.png)

完整源码：

```http
https://gitee.com/VampireAchao/simple-redis-queue.git
```

