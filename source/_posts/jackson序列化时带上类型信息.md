---
title: jackson序列化时带上类型信息
date: 2024-05-11 22:01:00
tags: java
---

> 独学而无友，则孤陋而寡闻。——刘向

首先这么配置即可：

```java
objectMapper.activateDefaultTyping(
LaissezFaireSubTypeValidator.instance,
ObjectMapper.DefaultTyping.NON_FINAL,
 JsonTypeInfo.As.PROPERTY);
```

假设我们有两个类 `Foo` 和 `Bar`，其中 `Bar` 是 `Foo` 的子类。未配置 `activateDefaultTyping` 之前和配置之后，序列化这些对象的 JSON 表示会有所不同。

类定义

```java
public class Foo {
    public String value = "A Foo";
}

public class Bar extends Foo {
    public String barValue = "A Bar";
}
```

配置前

在不使用 `activateDefaultTyping` 的情况下，序列化 `Foo` 类型和 `Bar` 类型的对象，输出的 JSON 将不包含类型信息，如下：

```java
ObjectMapper mapper = new ObjectMapper();

Foo foo = new Foo();
Bar bar = new Bar();

String jsonFoo = mapper.writeValueAsString(foo);
String jsonBar = mapper.writeValueAsString(bar);

System.out.println(jsonFoo);  // 输出：{"value":"A Foo"}
System.out.println(jsonBar);  // 输出：{"value":"A Foo", "barValue":"A Bar"}
```

配置后

启用 `activateDefaultTyping` 后，序列化相同的对象会在 JSON 中包含类型信息，如下：

```java
ObjectMapper mapper = new ObjectMapper();
mapper.activateDefaultTyping(LaissezFaireSubTypeValidator.instance,
                ObjectMapper.DefaultTyping.NON_FINAL, JsonTypeInfo.As.PROPERTY);

Foo foo = new Foo();
Bar bar = new Bar();

String jsonFoo = mapper.writeValueAsString(foo);
String jsonBar = mapper.writeValueAsString(bar);

System.out.println(jsonFoo);  // 输出：{"@class":"path.to.Foo", "value":"A Foo"}
System.out.println(jsonBar);  // 输出：{"@class":"path.to.Bar", "value":"A Foo", "barValue":"A Bar"}
```

在这个配置后的示例中，JSON 数据包含了 `@class` 属性，这个属性指明了每个对象的具体类，从而使得反序列化时能够重建正确的对象类型。这在处理涉及继承的复杂对象结构时特别有用，确保每个对象都能被准确地还原。

然后对于数组情况，我们需要额外处理，因为这里类型信息也会存在数组里

```java
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.jsontype.BasicPolymorphicTypeValidator;

import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        // 添加默认的类型信息
        mapper.activateDefaultTyping(
            BasicPolymorphicTypeValidator.builder()
                .allowIfBaseType(Object.class)
                .build(),
            ObjectMapper.DefaultTyping.NON_FINAL,
            JsonTypeInfo.As.PROPERTY
        );
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        String json = mapper.writeValueAsString(numbers);
        System.out.println(json);  // 输出可能类似于：["java.util.Arrays$ArrayList",[1,2,3,4,5]]
    }
}
```

因此这里单独配置忽略

```java
package com.namaste.util;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.cfg.MapperConfig;
import com.fasterxml.jackson.databind.jsontype.BasicPolymorphicTypeValidator;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;

public class Main {
    public static void main(String[] args) throws Exception {
        ObjectMapper mapper = new ObjectMapper();

        // 自定义验证器，明确指定何时添加类型信息
        BasicPolymorphicTypeValidator ptv = BasicPolymorphicTypeValidator.builder()
                .allowIfBaseType(new BasicPolymorphicTypeValidator.TypeMatcher() {
                    @Override
                    public boolean match(MapperConfig<?> config, Class<?> clazz) {
                        // 排除所有集合和数组类型
                        return !Collection.class.isAssignableFrom(clazz) && !clazz.isArray();
                    }
                })
                .build();

        // 激活默认的类型信息，但通过自定义验证器排除数组和集合
        mapper.activateDefaultTyping(ptv, ObjectMapper.DefaultTyping.OBJECT_AND_NON_CONCRETE, JsonTypeInfo.As.PROPERTY);

        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        String json = mapper.writeValueAsString(numbers);
        System.out.println(json);  // 预期输出：[1,2,3,4,5]，不应包含类型信息
    }
}
```
