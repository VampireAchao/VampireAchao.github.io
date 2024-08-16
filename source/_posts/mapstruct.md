---
title: mapstruct
date: 2022-03-23 19:06:41
tags: java
---

> 你泛起山川，碧波里的人不是我。——《慕容雪》
>

首先按照[官方文档](https://mapstruct.org/documentation/installation/)引入`GAV`，但要注意和`lombok`有版本冲突问题，因此我选择这个版本：

这里放上主要配置

```xml
<properties>
    <java.version>1.8</java.version>
    <lombok.version>1.18.10</lombok.version>
    <mapstruct.version>1.3.0.Final</mapstruct.version>
</properties>

<dependencies>
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
</dependencies>

<plugins>
    <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
        <version>3.8.1</version>
        <configuration>
            <source>1.8</source>
            <target>1.8</target>
            <encoding>UTF-8</encoding>
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
            </annotationProcessorPaths>
        </configuration>
    </plugin>
</plugins>
```

然后我准备两个实体类进行转换

```java
package com.ruben.simplescaffold.entity;

import lombok.*;
import lombok.experimental.Accessors;

/**
 * 用户
 *
 * @author <achao1441470436@gmail.com>
 * @since 2021/7/30 10:22
 */
@Data
@ToString
@Builder
@Accessors(chain = true)
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class UserDetail extends BaseEntity<UserDetail> {

    private static final long serialVersionUID = 1L;

    /**
     * 用户名
     */
    private String username;

    /**
     * 密码
     */
    private String password;

}
```

以及

```java
package com.ruben.simplescaffold.pojo.vo;

import java.io.Serializable;

import lombok.Data;

/**
 * 用户VO
 *
 * @author <achao1441470436@gmail.com>
 * @since 2022/3/23 19:20
 */
@Data
public class UserVO implements Serializable {

    private static final long serialVersionUID = -6541515410807361292L;

    private String uname;

    private String pwd;

}
```

开始编写`Mapper`，注意此处注解导入的依赖为`mapStruct`的

```java
package com.ruben.simplescaffold.mapper.mapstruct;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.ruben.simplescaffold.entity.UserDetail;
import com.ruben.simplescaffold.pojo.vo.UserVO;

/**
 * 用户mapstruct转换mapper
 *
 * @author <achao1441470436@gmail.com>
 * @since 2022/3/23 19:18
 */
@Mapper
public interface MapUserMapper {

    MapUserMapper INSTANCE = Mappers.getMapper(MapUserMapper.class);

    @Mapping(source = "username", target = "uname")
    @Mapping(source = "password", target = "pwd")
    UserVO convertPoToVo(UserDetail userDetail);

}
```

当然如果你想注入到`spring`容器中，可以指定`@Mapper(componentModel = "spring")`

然后编写测试类测试一下

```java
package com.ruben.simplescaffold;

import org.junit.Test;
import org.junit.jupiter.api.Assertions;

import com.ruben.simplescaffold.entity.UserDetail;
import com.ruben.simplescaffold.mapper.mapstruct.MapUserMapper;
import com.ruben.simplescaffold.pojo.vo.UserVO;

/**
 * @author <achao1441470436@gmail.com>
 * @since 2022/3/23 19:22
 */
public class MapUserMapperTest {

    @Test
    public void convertPoToVoTest() {
        UserVO userVO = MapUserMapper.INSTANCE.convertPoToVo(UserDetail.builder().username("ruben").password("vampire").build());
        Assertions.assertEquals("ruben", userVO.getUname());
        Assertions.assertEquals("vampire", userVO.getPwd());
    }

}
```

测试通过

![image-20220323193135201](/imgs/oss/picGo/image-20220323193135201.png)

并且可以在这里看到我们生成的代码

![image-20220323193207699](/imgs/oss/picGo/image-20220323193207699.png)

我们还可以下载`idea`插件

![image-20220323193243790](/imgs/oss/picGo/image-20220323193243790.png)

下载了，我们就可以按住`ctrl`鼠标移动到`@Mapping`注解的`source`和`target`上，还能点进去

![image-20220323193356676](/imgs/oss/picGo/image-20220323193356676.png)