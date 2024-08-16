---
title: MybatisPlus通用枚举
date: 2021-08-08 17:56:08
tags: java
---

> 胡马依北风,越鸟巢南枝。一一《古诗十九首》

在项目开发中，经常数据库中的一个字段对应一个枚举

对于这些枚举，我们要使用数据库将他们的值映射起来

`MybatisPlus`为我们提供了优雅的解决方案

只需要配置中添加枚举处理器，开启通用枚举支持

![image-20210808175924074](/imgs/oss/picGo/image-20210808175924074.png)

```yaml
mybatis-plus:
  #指定Mybatis的Mapper文件
  mapper-locations: classpath:mappers/*xml
  #指定Mybatis的实体目录
  type-aliases-package: com.ruben.pojo.po
  configuration:
    # 开启mybatis日志
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
    # 开启通用枚举支持，默认使用ordinalType
    default-enum-type-handler: org.apache.ibatis.type.EnumOrdinalTypeHandler
```

然后如果是对于一些简单的枚举，例如使用`ordinal`和数据库的值映射的枚举，我们可以直接使用

比如此处`UserDetail`中使用`GenderEnum`

![image-20210808180139829](/imgs/oss/picGo/image-20210808180139829.png)

在数据库中：`0`对应女，`1`对应男

```java
package com.ruben.simplescaffold.enumration;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 性别枚举
 *
 * @author <achao1441470436@gmail.com>
 * @since 2021/8/5 15:35
 */
@Getter
@AllArgsConstructor
public enum GenderEnum {
    /**
     * Cheating the compiler.
     */
    WOMAN("女"),
    MAN("男");

    private final String desc;
}
```

我们直接执行查询，可以看到是能成功映射上

```java
package com.ruben.simplescaffold;

import com.ruben.simplescaffold.service.IUserDetailService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

/**
 * Springboot测试类
 *
 * @author <achao1441470436@gmail.com>
 * @since 2021/7/11 0011 18:11
 */
@SpringBootTest
class SimpleScaffoldApplicationTests {

    @Resource
    private IUserDetailService userDetailService;

    @Test
    void contextLoads() {
        System.out.println(userDetailService.list());
    }

}

```

![image-20210808180301245](/imgs/oss/picGo/image-20210808180301245.png)

但如果我们需要使用其他的值，我们也可以使用如下方式：

1.注解方式

```java
package com.ruben.simplescaffold.enumration;

import com.baomidou.mybatisplus.annotation.EnumValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 性别枚举
 *
 * @author <achao1441470436@gmail.com>
 * @since 2021/8/5 15:35
 */
@Getter
@AllArgsConstructor
public enum GenderEnum {
    /**
     * Cheating the compiler.
     */
    MALE("男", 1),
    FEMALE("女", 0);


    private final String desc;
    @EnumValue
    private final Integer value;
}
```

注意此处对应数据库字段的长度为`tinyint`不指定长度，如果指定长度为`1`,则默认会失效

![image-20210808183452635](/imgs/oss/picGo/image-20210808183452635.png)

2.以及实现`com.baomidou.mybatisplus.annotation.IEnum`接口

```java
package com.ruben.simplescaffold.enumration;

import com.baomidou.mybatisplus.annotation.IEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 性别枚举
 *
 * @author <achao1441470436@gmail.com>
 * @since 2021/8/5 15:35
 */
@Getter
@AllArgsConstructor
public enum GenderEnum implements IEnum<Integer> {
    /**
     * Cheating the compiler.
     */
    MALE("男", 1),
    FEMALE("女", 0);


    private final String desc;
    private final Integer value;
}
```

注意这里需要实现`getValue`方法，我使用了`@Getter`注解所以没有写

同样可以看到我们的`gender`数据库中存储的值为`1`

映射成为了我们的`MALE`

![image-20210808183751651](/imgs/oss/picGo/image-20210808183751651.png)
