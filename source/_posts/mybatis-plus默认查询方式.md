---
title: mybatis-plus默认查询方式
date: 2021-03-25 22:07:11
tags: java
---

> 从善如登，从恶如崩。一一《国语》

我们在使用`mybatis-plus`条件构造器默认查询的时候

如果给的实体有值，则会根据实体内的值用对应字段去`=`查询

就像这样

```java
mpUserService.list(Wrappers.lambdaQuery(UserPO.builder().username("hino").build()));
mpUserMapper.selectList(Wrappers.lambdaQuery(UserPO.builder().username("ruben").build()));
```

如果我们想要指定默认查询为`LIKE`

则可以在对应属性上加上注解`@TableField`并指定`condition = SqlCondition.LIKE`，就像这样

```java
package com.ruben.pojo.po;

import com.baomidou.mybatisplus.annotation.*;
import com.ruben.pojo.BaseEntity;
import com.ruben.pojo.UserInfo;
import lombok.*;

import java.io.Serializable;

/**
 * @ClassName: UserPO
 * @Description: 我还没有写描述
 * @Date: 2020/11/21 0021 15:55
 * *
 * @author: <achao1441470436@gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
@Data
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@TableName("user")
public class UserPO{

    @TableField(condition = SqlCondition.LIKE)
    private String username;

}
```

指定后我们的查询就变成了`LIKE`

![image-20210325222140229](/imgs/oss/picGo/image-20210325222140229.png)

当然，这里`SqlCondition`是个枚举

目前支持

```java
/*
 * Copyright (c) 2011-2021, baomidou (jobob@qq.com).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.baomidou.mybatisplus.annotation;

/**
 * SQL 比较条件常量定义类
 *
 * @author hubin
 * @since 2018-01-05
 */
public class SqlCondition {
    /**
     * 等于
     */
    public static final String EQUAL = "%s=#{%s}";
    /**
     * 不等于
     */
    public static final String NOT_EQUAL = "%s&lt;&gt;#{%s}";
    /**
     * % 两边 %
     */
    public static final String LIKE = "%s LIKE CONCAT('%%',#{%s},'%%')";
    /**
     * % 左
     */
    public static final String LIKE_LEFT = "%s LIKE CONCAT('%%',#{%s})";
    /**
     * 右 %
     */
    public static final String LIKE_RIGHT = "%s LIKE CONCAT(#{%s},'%%')";
}
```

以上就是今天博客内容啦~

