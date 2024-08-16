---
title: aizuda-limiter
date: 2022-08-15 13:10:32
tags: java
---

> 我只担心一件事，我怕我配不上自己所受的苦难。──俄国小说家陀思妥耶夫斯基

有人问我限流怎么做，单独抽出来说一下：

这里使用`aizuda-limiter`，文档：http://doc.aizuda.com/pages/9xd009/

`example`仓库：https://gitee.com/aizuda/aizuda-components-examples/blob/master/aizuda-limiter-example

首先引入：

```xml
<dependency>
  <groupId>com.aizuda</groupId>
  <artifactId>aizuda-limiter</artifactId>
  <version>1.0.0</version>
</dependency>
```

然后进行配置限流策略：

```java
package com.aizuda.limiter.example;

import com.aizuda.limiter.metadata.MethodMetadata;
import com.aizuda.limiter.strategy.IKeyGenerateStrategy;
import org.springframework.stereotype.Component;

@Component
public class UserRateLimitStrategy implements IKeyGenerateStrategy {
    public final static String TYPE = "user";


    @Override
    public String getType() {
        // 请保证唯一性
        return TYPE;
    }

    @Override
    public String getKey(MethodMetadata methodMetadata, String parseKey) {
        return "admin";
    }
}
```

`Controller`上加上注解

```java
package com.aizuda.limiter.example;

import com.aizuda.limiter.annotation.RateLimit;
import com.aizuda.limiter.strategy.IpKeyGenerateStrategy;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    /**
     * 限流
     * <p>
     * 测试多次访问观察浏览器及控制台输出日志
     * <p>
     * http://localhost:8080/test?name=abc
     */
    @GetMapping("/test")
    @RateLimit(
            // 唯一标示，支持SpEL表达式（可无），#name 为获取当前访问参数 name 内容
            key = "#name",
            // 限定阈值，时间间隔 interval 范围内超过该数量会触发锁
            count = 2,
            // 限制间隔时长（可无，默认 3 分钟）例如 5s 五秒，6m 六分钟，7h 七小时，8d 八天
            interval = "100s",
            // 策略（可无） ip 为获取当前访问IP地址（内置策略），自定义策略 user 为获取当前用户
            strategy = {IpKeyGenerateStrategy.TYPE, UserRateLimitStrategy.TYPE},
            // 提示消息（可无）
            message = "请勿频繁操作"
    )
    public String test(String name) {
        return "test" + name;
    }

}
```

完

