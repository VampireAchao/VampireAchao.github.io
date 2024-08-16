---
title: springSession
date: 2021-03-11 23:04:14
tags: java
---

> 慎易以避难，敬细以远大。一一韩非子

依赖管理器

```xml
<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>org.springframework.session</groupId>
      <artifactId>spring-session-bom</artifactId>
      <version>Corn-SR2</version>
      <type>pom</type>
      <scope>import</scope>
    </dependency>
  </dependencies>
</dependencyManagement>
```

依赖

```xml
<dependencies>
  <dependency>
    <groupId>org.springframework.session</groupId>
    <artifactId>spring-session-data-redis</artifactId>
  </dependency>
</dependencies>
```

然后是配置

```yaml
spring: 
  session:
    store-type: redis
    timeout: 30m
```

之后使用`session`时就自动使用`redis`替换啦

```java
package com.ruben.controller;

import com.ruben.enumeration.GenderEnum;
import com.ruben.pojo.po.UserPO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/config")
@RefreshScope
public class ConfigController {

    @Resource
    private HttpServletRequest httpServletRequest;

    @RequestMapping("session")
    public String session() {
        httpServletRequest.getSession().setAttribute("sessionTest", UserPO.builder().id(1).build());
        return "ok";
    }


}

```

![image-20210310213022890](/imgs/oss/picGo/image-20210310213022890.png)

然后如果我们需要配置子域`session`共享或者更改`session`名字

可以写一个配置类

```java
package com.ruben.config;

import com.alibaba.fastjson.support.spring.FastJsonRedisSerializer;
import com.alibaba.fastjson.support.spring.GenericFastJsonRedisSerializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.session.web.http.CookieSerializer;
import org.springframework.session.web.http.DefaultCookieSerializer;

/**
 * @ClassName: SessionConfig
 * @Description: 我还没有写描述
 * @Date: 2021/3/10 0010 21:33
 * *
 * @author: <achao1441470436@gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
@Configuration
public class SessionConfig {

    @Bean
    public CookieSerializer cookieSerializer() {
        DefaultCookieSerializer serializer = new DefaultCookieSerializer();
        serializer.setDomainName("utools.club");
        serializer.setCookieName("RUBEN_SESSION");
        return serializer;
    }

    @Bean
    public RedisSerializer<Object> springSessionDefaultRedisSerializer() {
        return new GenericFastJsonRedisSerializer();
    }
}

```

然后我们访问即可看到成功更改

![image-20210310215848052](/imgs/oss/picGo/image-20210310215848052.png)

