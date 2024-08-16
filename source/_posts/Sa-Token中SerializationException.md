---
title: Sa-Token中SerializationException
date: 2021-10-09 18:54:00
tags: java
---

> 有两件事我最憎恶：没有信仰的博才多学和充满信仰的愚昧无知。——爱默生

今天把[`Sa-Token`](https://VampireAchao.github.io/2021/10/05/Sa-Token/)中的用户状态进行[持久层扩展](https://sa-token.dev33.cn/doc/index.html#/plugin/dao-extend?id=持久层扩展)

使用了`jdk`默认序列化方式后报错，清除缓存后又换成了`jackson`序列化方式

结果还是报错`SerializationException`，提示我`LocalDateTime`没有默认构造器

既然我项目中`mvc`使用的`fastJson`配置过`LocalDateTime`的转换，那我就继续用`fastJson`进行拓展吧：

首先是配置`FastJson`

```java
package com.ruben.xchat.config;

import com.alibaba.fastjson.parser.ParserConfig;
import com.alibaba.fastjson.serializer.SerializeConfig;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.alibaba.fastjson.support.config.FastJsonConfig;
import com.ruben.xchat.handler.GlobalTimeResolver;
import com.ruben.xchat.utils.Opt;

import java.time.LocalDateTime;

/**
 * FastJson配置
 *
 * @author <achao1441470436@gmail.com>
 * @since 2021/10/9 12:42
 */
public class FastJsonConfigHandler {

    /**
     * 配置
     */
    private static final FastJsonConfig FAST_JSON_CONFIG;

    static {
        FAST_JSON_CONFIG = new FastJsonConfig();
        // 配置序列化策略
        // ID_WORKER 生成主键太长导致 js 精度丢失
        // JavaScript 无法处理 Java 的长整型 Long 导致精度丢失，具体表现为主键最后两位永远为 0，解决思路： Long 转为 String 返回
        FAST_JSON_CONFIG.setSerializerFeatures(SerializerFeature.BrowserCompatible,
                // 处理序列化后出现$ref的坑
                SerializerFeature.DisableCircularReferenceDetect,
                // 列化枚举值为数据库存储值
                SerializerFeature.WriteEnumUsingToString);
        SerializeConfig serializeConfig = SerializeConfig.globalInstance;
        // 设置全局LocalDateTime转换
        serializeConfig.put(LocalDateTime.class, (serializer, object, fieldName, fieldType, features) -> Opt.ofNullable(object).ifPresentOrElse(obj -> serializer.out.writeString(((LocalDateTime) obj).format(GlobalTimeResolver.DATE_TIME_FORMATTER)), serializer.out::writeNull));
        FAST_JSON_CONFIG.setSerializeConfig(serializeConfig);
        ParserConfig parserConfig = ParserConfig.getGlobalInstance();
        FAST_JSON_CONFIG.setParserConfig(parserConfig);
    }

    private FastJsonConfigHandler() {
    }

    /**
     * 获取配置
     *
     * @return com.alibaba.fastjson.support.config.FastJsonConfig
     * @author <achao1441470436@gmail.com>
     * @since 2021/10/9 12:46
     */
    public static FastJsonConfig getConfig() {
        return FAST_JSON_CONFIG;
    }

}
```

然后是注入`SaTokenDao`的实现：

```java
package com.ruben.xchat.manager;

import cn.dev33.satoken.dao.SaTokenDao;
import cn.dev33.satoken.session.SaSession;
import cn.dev33.satoken.util.SaFoxUtil;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.support.spring.FastJsonRedisSerializer;
import com.ruben.xchat.config.FastJsonConfigHandler;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.TimeUnit;

/**
 * Sa-Token持久层接口 [Redis版] (使用 fastJson 序列化方式)
 *
 * @author VampireAchao
 */
@Component
public class SaTokenDaoRedisFastJson implements SaTokenDao {

    /**
     * key序列化
     */
    public static final StringRedisSerializer KEY_SERIALIZER;

    /**
     * value序列化
     */
    public static final FastJsonRedisSerializer<Object> VALUE_SERIALIZER;

    /**
     * String专用
     */
    public StringRedisTemplate stringRedisTemplate;

    /**
     * Object专用
     */
    public RedisTemplate<String, Object> objectRedisTemplate;

    /**
     * 标记：是否已初始化成功
     */
    public boolean isInit;

    static {
        // 指定相应的序列化方案
        KEY_SERIALIZER = new StringRedisSerializer();
        VALUE_SERIALIZER = new FastJsonRedisSerializer<>(Object.class);
        VALUE_SERIALIZER.setFastJsonConfig(FastJsonConfigHandler.getConfig());
    }

    @Resource
    public void init(RedisConnectionFactory connectionFactory) {
        // 构建StringRedisTemplate
        StringRedisTemplate stringTemplate = new StringRedisTemplate();
        stringTemplate.setConnectionFactory(connectionFactory);
        stringTemplate.afterPropertiesSet();
        // 构建RedisTemplate
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(connectionFactory);
        template.setKeySerializer(KEY_SERIALIZER);
        template.setHashKeySerializer(KEY_SERIALIZER);
        template.setValueSerializer(VALUE_SERIALIZER);
        template.setHashValueSerializer(VALUE_SERIALIZER);
        template.afterPropertiesSet();

        // 开始初始化相关组件
        if (!this.isInit) {
            this.stringRedisTemplate = stringTemplate;
            this.objectRedisTemplate = template;
            this.isInit = true;
        }
    }


    /**
     * 获取Value，如无返空
     */
    @Override
    public String get(String key) {
        return stringRedisTemplate.opsForValue().get(key);
    }

    /**
     * 写入Value，并设定存活时间 (单位: 秒)
     */
    @Override
    public void set(String key, String value, long timeout) {
        if (timeout == 0 || timeout <= SaTokenDao.NOT_VALUE_EXPIRE) {
            return;
        }
        // 判断是否为永不过期
        if (timeout == SaTokenDao.NEVER_EXPIRE) {
            stringRedisTemplate.opsForValue().set(key, value);
        } else {
            stringRedisTemplate.opsForValue().set(key, value, timeout, TimeUnit.SECONDS);
        }
    }

    /**
     * 修修改指定key-value键值对 (过期时间不变)
     */
    @Override
    public void update(String key, String value) {
        long expire = getTimeout(key);
        // -2 = 无此键
        if (expire == SaTokenDao.NOT_VALUE_EXPIRE) {
            return;
        }
        this.set(key, value, expire);
    }

    /**
     * 删除Value
     */
    @Override
    public void delete(String key) {
        stringRedisTemplate.delete(key);
    }

    /**
     * 获取Value的剩余存活时间 (单位: 秒)
     */
    @Override
    public long getTimeout(String key) {
        return Optional.ofNullable(stringRedisTemplate).map(t -> t.getExpire(key)).orElseThrow(IllegalStateException::new);
    }

    /**
     * 修改Value的剩余存活时间 (单位: 秒)
     */
    @Override
    public void updateTimeout(String key, long timeout) {
        // 判断是否想要设置为永久
        if (timeout == SaTokenDao.NEVER_EXPIRE) {
            long expire = getTimeout(key);
            if (expire == SaTokenDao.NEVER_EXPIRE) {
                // 如果其已经被设置为永久，则不作任何处理
                return;
            }
            // 如果尚未被设置为永久，那么再次set一次
            this.set(key, this.get(key), timeout);
            return;
        }
        stringRedisTemplate.expire(key, timeout, TimeUnit.SECONDS);
    }


    /**
     * 获取Object，如无返空
     */
    @Override
    public Object getObject(String key) {
        return objectRedisTemplate.opsForValue().get(key);
    }

    /**
     * 写入Object，并设定存活时间 (单位: 秒)
     */
    @Override
    public void setObject(String key, Object object, long timeout) {
        if (timeout == 0 || timeout <= SaTokenDao.NOT_VALUE_EXPIRE) {
            return;
        }
        // 判断是否为永不过期
        if (timeout == SaTokenDao.NEVER_EXPIRE) {
            objectRedisTemplate.opsForValue().set(key, object);
        } else {
            objectRedisTemplate.opsForValue().set(key, object, timeout, TimeUnit.SECONDS);
        }
    }

    /**
     * 更新Object (过期时间不变)
     */
    @Override
    public void updateObject(String key, Object object) {
        long expire = getObjectTimeout(key);
        // -2 = 无此键
        if (expire == SaTokenDao.NOT_VALUE_EXPIRE) {
            return;
        }
        this.setObject(key, object, expire);
    }

    /**
     * 删除Object
     */
    @Override
    public void deleteObject(String key) {
        objectRedisTemplate.delete(key);
    }

    /**
     * 获取Object的剩余存活时间 (单位: 秒)
     */
    @Override
    public long getObjectTimeout(String key) {
        return Optional.ofNullable(objectRedisTemplate).map(t -> t.getExpire(key)).orElseThrow(IllegalStateException::new);
    }

    /**
     * 修改Object的剩余存活时间 (单位: 秒)
     */
    @Override
    public void updateObjectTimeout(String key, long timeout) {
        // 判断是否想要设置为永久
        if (timeout == SaTokenDao.NEVER_EXPIRE) {
            long expire = getObjectTimeout(key);
            if (expire == SaTokenDao.NEVER_EXPIRE) {
                // 如果其已经被设置为永久，则不作任何处理
                return;
            }
            // 如果尚未被设置为永久，那么再次set一次
            this.setObject(key, this.getObject(key), timeout);
            return;
        }
        objectRedisTemplate.expire(key, timeout, TimeUnit.SECONDS);
    }

    /**
     * 获取Session，如无返空
     *
     * @param sessionId sessionId
     * @return SaSession
     */
    @Override
    public SaSession getSession(String sessionId) {
        return Optional.ofNullable(getObject(sessionId)).map(o -> ((JSONObject) o).toJavaObject(SaSession.class)).orElse(null);
    }

    /**
     * 搜索数据
     */
    @Override
    public List<String> searchData(String prefix, String keyword, int start, int size) {
        Set<String> keys = stringRedisTemplate.keys(prefix + "*" + keyword + "*");
        return Optional.ofNullable(keys).map(ArrayList::new).map(list -> SaFoxUtil.searchList(list, start, size)).orElseGet(ArrayList::new);
    }

}
```

最后成功实现
