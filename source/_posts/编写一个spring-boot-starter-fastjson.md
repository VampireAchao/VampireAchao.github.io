---
title: 编写一个spring-boot-starter-fastjson
date: 2022-03-22 18:29:30
tags: java
---

> 酷烈之祸，多起于玩忽之人；盛满之功，常败于细微之事。——《菜根谭》

这个`starter`是自己写的，主要就是注入了个`FastJsonConfig`

写法如下：首先引入`gav`，完整`pom.xml`如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xmlns="http://maven.apache.org/POM/4.0.0"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.ruben</groupId>
    <artifactId>spring-boot-starter-fastjson</artifactId>
    <version>1.0</version>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
        <spring-boot.version>2.3.7.RELEASE</spring-boot.version>
        <fastjson-version>1.2.79</fastjson-version>
        <lombok-version>1.18.22</lombok-version>
        <hutool-version>5.7.22</hutool-version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>fastjson</artifactId>
        </dependency>
        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-core</artifactId>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>
    </dependencies>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.projectlombok</groupId>
                <artifactId>lombok</artifactId>
                <version>${lombok-version}</version>
            </dependency>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter</artifactId>
                <version>${spring-boot.version}</version>
            </dependency>
            <dependency>
                <groupId>com.alibaba</groupId>
                <artifactId>fastjson</artifactId>
                <version>${fastjson-version}</version>
            </dependency>
            <dependency>
                <groupId>cn.hutool</groupId>
                <artifactId>hutool-bom</artifactId>
                <version>${hutool-version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

</project>
```

然后是编写`Configuration`和`Properties`

```java
package com.ruben.config;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;

import com.alibaba.fastjson.parser.ParserConfig;
import com.alibaba.fastjson.serializer.SerializeConfig;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.alibaba.fastjson.support.config.FastJsonConfig;

import cn.hutool.core.date.LocalDateTimeUtil;
import cn.hutool.core.lang.Opt;

/**
 * FastJson配置
 *
 * @author <achao1441470436@gmail.com>
 * @since 2021/10/9 12:42
 */
@EnableConfigurationProperties(FastJsonProperties.class)
public class FastJsonAutoConfiguration {

    @Bean
    @ConditionalOnMissingBean
    public FastJsonConfig fastJsonConfig(FastJsonProperties fastJsonProperties) {
        FastJsonConfig fastJsonConfig = new FastJsonConfig();
        // 配置序列化策略
        // ID_WORKER 生成主键太长导致 js 精度丢失
        // JavaScript 无法处理 Java 的长整型 Long 导致精度丢失，具体表现为主键最后两位永远为 0，解决思路： Long 转为 String 返回
        fastJsonConfig.setSerializerFeatures(SerializerFeature.BrowserCompatible,
                // 处理序列化后出现$ref的坑
                SerializerFeature.DisableCircularReferenceDetect,
                // 列化枚举值为数据库存储值
                SerializerFeature.WriteEnumUsingToString);
        SerializeConfig serializeConfig = SerializeConfig.globalInstance;
        // 设置全局LocalDateTime转换
        fastJsonConfig.setDateFormat(fastJsonProperties.getDatePattern());
        serializeConfig.put(LocalDateTime.class, (serializer, object, fieldName, fieldType, features) ->
                Opt.ofNullable(object).ifPresentOrElse(obj ->
                                serializer.out.writeString(
                                        LocalDateTimeUtil.format((LocalDateTime) obj, fastJsonProperties.getLocalDateTimePattern())
                                ),
                        serializer.out::writeNull));
        serializeConfig.put(LocalDate.class, (serializer, object, fieldName, fieldType, features) ->
                Opt.ofNullable(object).ifPresentOrElse(obj -> serializer.out.writeString(
                                LocalDateTimeUtil.format((LocalDate) obj, fastJsonProperties.getLocalDatePattern())
                        ),
                        serializer.out::writeNull));
        fastJsonConfig.setSerializeConfig(serializeConfig);
        ParserConfig parserConfig = ParserConfig.getGlobalInstance();
        fastJsonConfig.setParserConfig(parserConfig);
        return fastJsonConfig;
    }


}
```

`Properties`这里简单用于设定时间日期格式化的表达式

```java
package com.ruben.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import cn.hutool.core.date.DatePattern;
import lombok.Data;

/**
 * 配置文件
 *
 * @author <achao1441470436@gmail.com>
 * @since 2022/3/20 18:10
 */
@Data
@ConfigurationProperties(FastJsonProperties.PREFIX)
public class FastJsonProperties {

    public static final String PREFIX = "fastjson";

    private String datePattern = DatePattern.NORM_DATETIME_PATTERN;
    private String localDateTimePattern = DatePattern.NORM_DATETIME_PATTERN;
    private String localDatePattern = DatePattern.NORM_DATE_PATTERN;

}
```

然后别忘了在`resources`下配置

目录结构如下：

```dir
src
 └	main
 	 └	 java
 	 └	 resources
 	 	  └ META-INF
 	 	   	 └ spring.factories
```

目录对了一般会有图标提示

`spring.factories`里面指定我们的配置类

```factories
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
com.ruben.config.FastJsonAutoConfiguration
```

我们可以尝试使用一下，首先用`maven`进行`install`

![image-20220322184002930](/imgs/oss/picGo/image-20220322184002930.png)

![image-20220322184021994](/imgs/oss/picGo/image-20220322184021994.png)

然后到另一个项目中使用

引入`GAV`

```xml
		<dependency>
			<groupId>com.ruben</groupId>
			<artifactId>spring-boot-starter-fastjson</artifactId>
			<version>1.0</version>
		</dependency>
```

配置文件这边其实已经可以看到提示了

![image-20220322190036281](/imgs/oss/picGo/image-20220322190036281.png)

我们配置其中一个

```yaml
fastjson:
  date-pattern: yyyy年MM月dd日
```

测试一下：

```java
package com.ruben.simplescaffold;

import javax.annotation.Resource;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.alibaba.fastjson.support.config.FastJsonConfig;

/**
 * Springboot测试类
 *
 * @author <achao1441470436@gmail.com>
 * @since 2021/7/11 0011 18:11
 */
@SpringBootTest
class SimpleScaffoldApplicationTests {

    @Resource
    private FastJsonConfig fastJsonConfig;

    @Test
    void testFastJsonConfig() {
        Assertions.assertEquals(fastJsonConfig.getDateFormat(), "yyyy年MM月dd日");
    }


}
```

成功~

![image-20220322190343065](/imgs/oss/picGo/image-20220322190343065.png)

`starter`的完整代码我放到了这里：https://gitee.com/VampireAchao/spring-boot-starter-fastjson.git