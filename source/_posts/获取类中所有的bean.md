---
title: 获取类中所有的bean
date: 2021-09-01 20:11:38
tags: java
---

> 生命中有很多东西，能忘掉的叫过去，忘不掉的叫记忆。一个人的寂寞，有时候，很难隐藏得太久，时间太久了，人就会变得沉默，那时候，有些往日的情怀，就找不回来了。或许，当一段不知疲倦的旅途结束，只有站在终点的人，才会感觉到累。其实我一直都明白，能一直和一人做伴，实属不易。——海子

使用[`hutool`](https://www.hutool.cn/)实现

```java
package com.ruben.simplescaffold;


import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.ClassUtil;
import cn.hutool.core.util.ReflectUtil;
import cn.hutool.core.util.TypeUtil;
import com.ruben.simplescaffold.entity.UserDetail;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Type;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * 测试类
 *
 * @author <achao1441470436@gmail.com>
 * @since 2021/7/11 0011 18:09
 */
public class Tests {

    @Test
    void contextLoads() {
        final List<Class<?>> collect = getJavaBeans(UserDetail.class);
        collect.forEach(System.out::println);
    }

    private List<Class<?>> getJavaBeans(Class<?> type) {
        return Arrays.stream(ReflectUtil.getFields(type)).map(field -> {
            if (BeanUtil.isBean(field.getType())) {
                return field.getType();
            } else if (Collection.class.isAssignableFrom(field.getType())) {
                Type argument = TypeUtil.getTypeArgument(field.getGenericType());
                Class<Object> aClass = ClassUtil.loadClass(argument.getTypeName());
                if (BeanUtil.isBean(aClass)) {
                    return aClass;
                }
            }
            return null;
        }).filter(Objects::nonNull).collect(Collectors.toList());
    }


}
```

运行结果：

![image-20210901201408697](/imgs/oss/picGo/image-20210901201408697.png)

对应这两个类

![image-20210901201436416](/imgs/oss/picGo/image-20210901201436416.png)
