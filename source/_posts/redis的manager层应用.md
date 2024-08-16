---
title: redis的manager层应用
date: 2021-06-11 22:15:23
tags: java
---

> 一身报国有万死，双鬓向人无再青。 —— 陆游

封装了一个操作`redis`的管理层，简单处理了缓存穿透、击穿、雪崩问题

`Manager`

```java
package com.ruben.manager;

import com.alibaba.fastjson.TypeReference;

import java.util.function.Supplier;

/**
 * redis管理层
 *
 * @author <achao1441470436@gmail.com>
 * @since 2021/6/11 0011 21:55
 */
public interface RedisManager {

    /**
     * 从缓存中获取否则从mysql中查询
     *
     * @param key           缓存中的key
     * @param mysqlSupplier 查询mysql操作
     * @param typeReference 返回的类型
     * @param <T>           数据类型
     * @return 数据
     */
    <T> T getFromRedisOrPutIntoMysql(String key, Supplier<T> mysqlSupplier, TypeReference<T> typeReference);
}
```

实现类

```java
package com.ruben.manager;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;
import com.baomidou.mybatisplus.core.exceptions.MybatisPlusException;
import com.ruben.utils.Opt;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.security.SecureRandom;
import java.util.Objects;
import java.util.concurrent.TimeUnit;
import java.util.function.Supplier;

/**
 * redis管理层实现类
 *
 * @author <achao1441470436@gmail.com>
 * @since 2021/6/11 0011 21:55
 */
@Service
public class RedisManagerImpl implements RedisManager {

    public static final SecureRandom SECURE_RANDOM = new SecureRandom();
    /**
     * 过期时间
     */
    public static final int EXPIRE_SECONDS = 5 * 60 * 1000;

    @Resource
    private StringRedisTemplate stringRedisTemplate;


    /**
     * 从缓存中获取否则从mysql中查询
     *
     * @param key           缓存中的key
     * @param mysqlSupplier 查询mysql操作
     * @param typeReference 返回的类型
     * @param <T>           数据类型
     * @return 数据
     */
    @Override
    @Transactional(readOnly = true, propagation = Propagation.NOT_SUPPORTED, isolation = Isolation.READ_UNCOMMITTED)
    public <T> T getFromRedisOrPutIntoMysql(String key, Supplier<T> mysqlSupplier, TypeReference<T> typeReference) {
        // 判断传入key是否为空
        Opt.ofNullable(key).filter(StringUtils::isNotEmpty)
                .orElseThrow(() -> new MybatisPlusException("key不能为空"));
        // 如果redis中存在，直接返回
        String value = stringRedisTemplate.opsForValue().get(key);
        if (Objects.nonNull(value)) {
            return JSON.parseObject(value, typeReference);
        }
        // 查数据库并放入缓存这个操作加锁【缓存击穿】
        synchronized (this) {
            // 否则从数据库中取出
            return Opt.ofNullable(mysqlSupplier).map(Supplier::get)
                    // 如果有值则放入缓存，随机时间【缓存雪崩】
                    .peek(v -> stringRedisTemplate.opsForValue()
                            .set(key, JSON.toJSONString(v), SECURE_RANDOM.nextInt(EXPIRE_SECONDS), TimeUnit.SECONDS))
                    // 没值则放入空对象"{}"【缓存穿透】并返回null
                    .orElseGet(() -> {
                        stringRedisTemplate.opsForValue()
                                .set(key, "{}", SECURE_RANDOM.nextInt(EXPIRE_SECONDS), TimeUnit.SECONDS);
                        return null;
                    });
        }
    }

}
```

使用方式

```java
    @Resource
    private RedisManager redisManager;

    @Test
    public void managerTest() {
        List<String> userIds = redisManager.getFromRedisOrPutIntoMysql("userIds", () -> {
            // 从数据库中查询...
            return Arrays.asList("1", "2", "3");
        }, new TypeReference<List<String>>() {
        });
        System.out.println(userIds);
    }
```

目前自己开发中用着感觉还不错的，大伙​可以拿去自定义

![image-20210611221533945](/imgs/oss/picGo/image-20210611221533945.png)
