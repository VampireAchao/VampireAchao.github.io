---
title: mapstruct的spring拓展
date: 2022-05-01 00:14:57
tags: java
---

> 活着不一定要鲜艳，但一定要有自己的颜色。——张曙光

首先按照惯例放官网：

https://mapstruct.org/documentation/spring-extensions/reference/html/

基本的使用方式之前博客已经写过了我们就不再细表，这里简单放上链接

https://VampireAchao.github.io/2022/03/23/mapstruct/

在此之前还要配置对应的依赖和插件

```xml
    <properties>
        <java.version>1.8</java.version>
        <!-- 编译生成代码插件版本号开始(避免mapstruct和lombok冲突，因此此处指定一个兼容的版本) -->
        <lombok.version>1.18.10</lombok.version>
        <mapstruct.version>1.3.0.Final</mapstruct.version>
        <mapstruct.spring.version>0.1.1</mapstruct.spring.version>
        <!-- 编译生成代码插件版本号结束 -->
    </properties>
	<dependencies>
        <!-- 用到的GAV -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>${lombok.version}</version>
            <scope>provided</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.mapstruct</groupId>
            <artifactId>mapstruct</artifactId>
            <version>${mapstruct.version}</version>
        </dependency>
        <dependency>
            <groupId>org.mapstruct.extensions.spring</groupId>
            <artifactId>mapstruct-spring-annotations</artifactId>
            <version>${mapstruct.spring.version}</version>
        </dependency>
    </dependencies>
	<build>
        <plugins>
            <!-- 需要配置的插件 -->
			<plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.8.1</version>
                <configuration>
                    <source>1.8</source>
                    <target>1.8</target>
                    <encoding>UTF-8</encoding>
                    <!-- lombok和mapstruct配置开始 -->
                    <annotationProcessorPaths>
                        <path>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                            <version>${lombok.version}</version>
                        </path>
                        <path>
                            <groupId>org.mapstruct</groupId>
                            <artifactId>mapstruct-processor</artifactId>
                            <version>${mapstruct.version}</version>
                        </path>
                        <path>
                            <groupId>org.mapstruct.extensions.spring</groupId>
                            <artifactId>mapstruct-spring-extensions</artifactId>
                            <version>${mapstruct.spring.version}</version>
                        </path>
                    </annotationProcessorPaths>
                    <!-- lombok和mapstruct配置结束 -->
                </configuration>
            </plugin>
        </plugins>
	</build>
```

为什么要用？

因为我们之前使用中，需要对每个`Mapper`定义方法，然后调用对应的方法

如果对于简单的转换，能有一种能统一的规范，那样就不会乱

因此我们使用`spring`的`Convert`接口

完整类名为`org.springframework.core.convert.converter.Converter`

我们写法如下：

```java
package com.ruben.simplescaffold.mapper.mapstruct;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.core.convert.converter.Converter;

import com.ruben.simplescaffold.entity.UserDetail;
import com.ruben.simplescaffold.pojo.vo.UserVO;

/**
 * 用户mapstruct转换mapper
 *
 * @author <achao1441470436@gmail.com>
 * @since 2022/3/23 19:18
 */
@Mapper(componentModel = "spring")
public interface MapUserMapper extends Converter<UserDetail, UserVO> {

    /**
     * po转vo
     *
     * @param userDetail po
     * @return vo
     */
    @Override
    @Mapping(source = "username", target = "uname")
    @Mapping(source = "password", target = "pwd")
    UserVO convert(UserDetail userDetail);

}
```

然后如果你按照官方文档接着使用：

```java
package com.ruben.simplescaffold;

import javax.annotation.Resource;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.convert.ConversionService;

import com.ruben.simplescaffold.entity.UserDetail;
import com.ruben.simplescaffold.pojo.vo.UserVO;

/**
 * @author <achao1441470436@gmail.com>
 * @since 2022/3/23 19:22
 */
@SpringBootTest
class MapUserMapperTest {

    @Resource
    private ConversionService conversionService;

    @Test
    void convertPoToVoTest() {
        UserVO userVO = conversionService.convert(UserDetail.builder().username("ruben").password("vampire").build(), UserVO.class);
        Assertions.assertEquals("ruben", userVO.getUname());
        Assertions.assertEquals("vampire", userVO.getPwd());
    }

}
```

你会发现踩坑了

报错：

```shell
org.springframework.core.convert.ConverterNotFoundException: No converter found capable of converting from type [com.ruben.simplescaffold.entity.UserDetail] to type [com.ruben.simplescaffold.pojo.vo.UserVO]
```

然后我通过`debug`发现是没有将转换器添加进`ConversionService`中

因此我们只要编写一个`Config`添加进去即可

```java
package com.ruben.simplescaffold.config;

import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.core.convert.support.GenericConversionService;

/**
 * 转换配置
 *
 * @author <achao1441470436@gmail.com>
 * @since 2022/5/1 0:44
 */
@Configuration
public class ConvertConfig {

    /**
     * 注册我们自定义的转换器
     *
     * @param converters        转换器列表
     * @param conversionService 转换服务
     * @param <T>               转换源泛型
     * @param <R>               转换目标泛型
     */
    public <T, R> ConvertConfig(List<Converter<T, R>> converters, GenericConversionService conversionService) {
        converters.forEach(conversionService::addConverter);
    }

}
```

再次使用

成功！

![image-20220501005711936](/imgs/oss/picGo/image-20220501005711936.png)
