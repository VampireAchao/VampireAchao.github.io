---
title: springboot动态配置
date: 2022-09-28 12:41:07
tags: java
---

> 耐心和持久胜过激烈和狂热——拉封丹

分享一个`springboot`动态配置框架：https://github.com/Code2Life/spring-boot-dynamic-config

![68747470733a2f2f66696c6563646e2e636f6465326c6966652e746f702f737072696e67626f6f742d636f6e6669672d64656d6f2e676966](/imgs/oss/picGo/68747470733a2f2f66696c6563646e2e636f6465326c6966652e746f702f737072696e67626f6f742d636f6e6669672d64656d6f2e676966.gif)

在一些场景下可以用到热更新配置

轻量方便，简单好用

`GAV`

```xml
<dependency>
    <groupId>top.code2life</groupId>
   <artifactId>spring-boot-dynamic-config</artifactId>
   <version>1.0.9</version>
</dependency>
```

添加注解：`@DynamicConfig `以及`@Value`

```java
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import top.code2life.config.DynamicConfig;

import java.util.Set;

@Data
@Component
@DynamicConfig // add annotation here !
public class DynamicFeatures {

    @Value("${dynamic-test-plain:default}")
    private String plainValue;

    @Value("#{@featureGate.convert('${dynamic-feature-conf}')}")
    private Set<String> someBetaFeatureConfig;

    // @DynamicConfig // adding annotation here also works!
    @Value("#{@testComponent.transform(${dynamic.transform-a:20}, ${dynamic.transform-b:10})} ")
    private double transformBySpEL;


    public double transform(double t1, double t2) {
        return t1 / t2;
    }
}

// file: application-profile.yml
// ============================
// dynamic-test-plain: someVal # kebab-case is recommended
// dynamicFeatureConf: a,b,c  # camelCase compatible
// dynamic:
//   transform-a: 100
//   transform-b: 10
```

在配置`pojo`上加上注解`@ConfigurationProperties`

```java
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import top.code2life.config.DynamicConfig;

import java.util.Map;

@Data
@DynamicConfig  // add annotation here !
@Configuration
@ConfigurationProperties(prefix = "my-prop")
public class TestConfigurationProperties {

    private String str;

    private Double doubleVal;

    private Map<String, Object> mapVal;
}

// file: application-another-profile.yml
// ============================
// my-prop:  # or myProp, relax binding supported 
//   str: someVal
//   double-val: 100.0
//   mapVal:
//     k: v
```

启动项目

```shell
java -jar your-spring-boot-app.jar --spring.config.location=/path/to/config
```

