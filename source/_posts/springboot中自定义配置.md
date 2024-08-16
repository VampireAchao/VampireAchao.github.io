---
title: springboot中自定义配置
date: 2021-02-16 12:28:38
tags: java
---

> 我们不快乐的原因之一，是不知道如何安静地待在房间里，心平气和地与自己相处。——亦舒

例如我们需要进行一些自定义配置写到配置文件中

可以使用`@ConfigurationProperties`注解

```java
package com.ruben.pojo;

import com.ruben.enumeration.GenderEnum;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * @ClassName: RubenProperties
 * @Description: ruben配置类
 * @Date: 2021/2/16 0016 11:40
 * *
 * @author: <achao1441470436@gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
@Data
@Component
@ConfigurationProperties(prefix = "ruben")
public class RubenProperties {
    private Integer number;
    private String avatar;
    private GenderEnum gender;
    private List<String> hobby;
    private Map<String, Object> introduce;
}
```

这里枚举`GenderEnum`

```java
@Getter
@AllArgsConstructor
public enum GenderEnum {

    FEMALE("女", 0),
    MALE("男", 1);

    private final String name;
    private final Integer code;

}
```

然后`yml`中对应配置写法

```yaml
ruben:
  number: 4444
  avatar: /imgs/oss/2020-06-01/head.jpg
  gender: male
  hobby: ["游戏","动漫","编程"]
  introduce: {"food": "blood","programLanguage": "java"}
```

我们编写一个测试类测试

```java
package com.ruben;

import com.ruben.pojo.RubenProperties;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;
import java.util.Map;

/**
 * @ClassName: PropertiesDemo
 * @Description: 我还没有写描述
 * @Date: 2021/2/16 0016 11:29
 * *
 * @author: <achao1441470436@gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
@Slf4j
@SpringBootTest
public class PropertiesDemo {

    @Resource
    private RubenProperties rubenProperties;

    @Test
    public void test() {
        log.info(rubenProperties.toString());
    }

}
```

运行结果

![image-20210216123101192](/imgs/oss/picGo/image-20210216123101192.png)