---
title: openfeign远程调用
date: 2021-03-09 20:52:53
tags: java
---

> 不患人之不己知，患不知人也。——孔子《论语》

书接[上文](https://VampireAchao.github.io/2021/03/08/nacos%E6%9C%8D%E5%8A%A1%E6%B3%A8%E5%86%8C%E4%B8%8E%E5%8F%91%E7%8E%B0/)，我们配置了`nacos`,实现了服务注册与发现

我们再配置一台

```yml
spring:
  cloud:
    nacos:
      config:
        server-addr: 127.0.0.1:8848
  application:
    name: ruben-consumer
server:
  port: 8081
```

在配好的这台`ruben-consumer`中随便写个接口

```java
package com.ruben.rubenproducerdemo.controller;

import com.ruben.rubenproducerdemo.pojo.dto.PageDTO;
import com.ruben.rubenproducerdemo.utils.AjaxJson;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("study")
public class StudyController {

    @GetMapping("list")
    public AjaxJson list(@RequestBody PageDTO pageDTO) {
        return AjaxJson.success().put("data", pageDTO);
    }

}
```

然后在第一台引入`Feign`的依赖

```xml
		<!--    openfeign 远程调用    -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
            <version>2.2.0.RELEASE</version>
        </dependency>
```

在主启动类上方加上`@EnableFeignClients`注解

```java
package com.ruben;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@EnableFeignClients("com.ruben.feign")
@EnableDiscoveryClient
@SpringBootApplication
@MapperScan({"com.ruben.dao.xml"})
public class SimpleSpringbootApplication {

    public static void main(String[] args) {
        SpringApplication.run(SimpleSpringbootApplication.class, args);
    }

}
```

然后我们在调用方`ruben-provider`写个接口

```java
package com.ruben.feign;

import com.ruben.pojo.dto.PageDTO;
import com.ruben.utils.AjaxJson;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient("ruben-consumer")
public interface StudyFeignService {
    @GetMapping("study/list")
    AjaxJson list(@RequestBody PageDTO pageDTO);
}
```

再调用`ruben-consumer`

```java
package com.ruben.controller;

import com.ruben.feign.StudyFeignService;
import com.ruben.pojo.dto.PageDTO;
import com.ruben.utils.AjaxJson;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * @ClassName: StudyController
 * @Description: 我还没有写描述
 * @Date: 2021/3/4 0004 21:49
 * *
 * @author: <achao1441470436@gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
@RestController
@RequestMapping("study")
public class StudyController {
    @Resource
    private StudyFeignService studyFeignService;

    @PostMapping("list")
    public AjaxJson list(@RequestBody PageDTO pageDTO) {
        return studyFeignService.list(pageDTO);
    }

}
```

最后实现远程调用服务

可以看到我们调用`ruben-provider`的接口，实际返回了`ruben-consumer`接口的结果
