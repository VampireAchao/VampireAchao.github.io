---
title: 通过Function获取属性对应字段
date: 2021-06-29 22:03:35
tags: java
---

> 只有绝望的赌鬼才肯把全部所有作孤注的一掷。一个商人如果把他的全部财产装在一只船上，人家就管他叫冒失鬼——席勒

我写了个函数

```java
    /**
     * 获取表内字段
     *
     * @param function 字段
     * @return java.lang.String
     * @author <achao1441470436@gmail.com>
     * @since 2021/6/29 16:51
     */
    public static <R, T> String getColumn(SFunction<T, R> function) {
        SerializedLambda lambda = LambdaUtils.resolve(function);
        TableInfo tableInfo = TableInfoHelper.getTableInfo(lambda.getImplClass());
        return tableInfo.getFieldList()
                .parallelStream()
                .filter(filed -> PropertyNamer.methodToProperty(lambda.getImplMethodName()).equals(filed.getProperty()))
                .findFirst()
                .map(TableFieldInfo::getColumn)
                .orElseThrow(() -> new MybatisPlusException("未找到该字段"));
    }
```

依赖`mybatis-plus`

能通过`Function`获取属性对应字段

注意需要有`BaseMapper`

```java
package com.ruben.simpleideaspringboot.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.ruben.simpleideaspringboot.pojo.po.User;
import org.apache.ibatis.annotations.Mapper;

/**
 * @author <achao1441470436@gmail.com>
 * @since 2021/5/15 0015 22:40
 */
@Mapper
public interface UserMapper extends BaseMapper<User> {
}
```

演示如下

```java
    @Test
    void testGetColumn() {
        System.out.println(getColumn(User::getUsername));
    }
```

![image-20210629220827638](/imgs/oss/picGo/image-20210629220827638.png)

支持`@TableField`注解，也支持自定义的转换规则

默认是驼峰转下划线

效果如下

![image-20210629220800888](/imgs/oss/picGo/image-20210629220800888.png)
