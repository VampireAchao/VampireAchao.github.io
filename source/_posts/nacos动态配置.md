---
title: nacos动态配置
date: 2021-03-10 20:53:12
tags: java
---

> 十年树木，百年树人。——《管子》

昨天说了[`openfeign`实现远程调用](https://VampireAchao.github.io/2021/03/09/openfeign%E8%BF%9C%E7%A8%8B%E8%B0%83%E7%94%A8/)，今天继续

用`nacos`作为配置中心实现动态配置

依赖上面已经引入了，直接把官方的`demo`拿来

不过要注意，我们如果是`yml`配置的话千万别忘了指定`file-extension`

```yaml
spring:
  cloud:
    nacos:
      config:
        server-addr: 127.0.0.1:8848
        file-extension: yml
  application:
    name: ruben-provider
```

然后是`controller`，这里是需要加上`@RefreshScope`注解实现动态更新配置

```java
package com.ruben.controller;

import com.ruben.enumeration.GenderEnum;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/config")
@RefreshScope
public class ConfigController {

    @Value("${ruben.gender}")
    private GenderEnum gender;

    @RequestMapping("/get")
    public GenderEnum get() {
        return gender;
    }
}
```

`GenderEnum`

```java
package com.ruben.enumeration;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * @ClassName: GenderEnum
 * @Description:
 * @Date: 2020/8/18 19:03
 * *
 * @author: achao<achao1441470436 @ gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
@Getter
@AllArgsConstructor
public enum GenderEnum {

    FEMALE("女", 0),
    MALE("男", 1);

    private final String name;
    private final Integer code;

}
```

然后我们在`nacos`中新建一个配置

![image-20210306175800994](/imgs/oss/picGo/image-20210306175800994.png)

> 在 Nacos Spring Cloud 中，`dataId` 的完整格式如下：
>
> ```plain
> ${prefix}-${spring.profiles.active}.${file-extension}
> ```
>
> - `prefix` 默认为 `spring.application.name` 的值，也可以通过配置项 `spring.cloud.nacos.config.prefix`来配置。
> - `spring.profiles.active` 即为当前环境对应的 profile，详情可以参考 [Spring Boot文档](https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-profiles.html#boot-features-profiles)。 **注意：当 `spring.profiles.active` 为空时，对应的连接符 `-` 也将不存在，dataId 的拼接格式变成 `${prefix}.${file-extension}`**
> - `file-exetension` 为配置内容的数据格式，可以通过配置项 `spring.cloud.nacos.config.file-extension` 来配置。目前只支持 `properties` 和 `yaml` 类型。

然后我们加上我们的配置

点击发布

![image-20210306175943919](/imgs/oss/picGo/image-20210306175943919.png)

访问`http://localhost:8080/config/get`接口发现配置已更改

![image-20210306180017670](/imgs/oss/picGo/image-20210306180017670.png)

我们再编辑

![image-20210306180054070](/imgs/oss/picGo/image-20210306180054070.png)

然后再次请求发现配置已更新

![image-20210306180118535](/imgs/oss/picGo/image-20210306180118535.png)

我们可以新建命名空间来实现配置隔离

![image-20210306182846789](/imgs/oss/picGo/image-20210306182846789.png)

然后我们克隆一个到`dev`去

![image-20210306182945905](/imgs/oss/picGo/image-20210306182945905.png)

然后配置到项目中去

```yml
spring:
  cloud:
    nacos:
      config:
        server-addr: 127.0.0.1:8848
        namespace: ruben-dev
        file-extension: yml
  application:
    name: ruben-consumer
server:
  port: 8081
```

![image-20210306183133629](/imgs/oss/picGo/image-20210306183133629.png)

我们可以切换到对应的命名空间，去配置命名空间下的配置

![image-20210306183335429](/imgs/oss/picGo/image-20210306183335429.png)

当然除了命名空间，还有组`group`

```yaml
spring:
  cloud:
    nacos:
      config:
        server-addr: 127.0.0.1:8848
        file-extension: yml
        namespace: ruben-dev
        group: ruben
  application:
    name: ruben-provider
```

我们在新建配置的时候选择`group`

![image-20210306183600160](/imgs/oss/picGo/image-20210306183600160.png)

如果我们需要同时加载多个配置，例如我这里把数据源和`redis`都给注释，放到配置中心去了

```yaml
spring:
  cloud:
    nacos:
      config:
        server-addr: 127.0.0.1:8848
        file-extension: yml
        namespace: ruben-dev
        group: ruben
        extension-configs: [{dataId: "datasource.yml",group: "ruben",refresh: "true"},{dataId: "redis.yml",group: "ruben",refresh: "true"}]
  application:
    name: ruben-provider
```

