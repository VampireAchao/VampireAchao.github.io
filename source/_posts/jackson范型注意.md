---
title: jackson范型注意
date: 2024-05-15 21:00:14
tags: java
---

> 放弃不难，但坚持一定很酷。——《解忧杂货店》

今天使用 `Jackson` 有个疑问，就是带范型的对象，`Jackson` 序列化后，范型会怎样处理：

就比如说`{"data":{"data":1}}`，以及下面这个类：

```java
    @Data
    public static class Foo<T> {
        private T data;
    }
```

这个外层的 `data` 会反序列化出来什么类型呢？

实际上反序列化出来 `LinkedHashMap`

```java
        var obj = mapper.readValue("""
                {"data":{"data":1}}
                """, Foo.class);
        Assertions.assertEquals(LinkedHashMap.class, obj.getData().getClass());
```

如果我们需要继续解析成具体的类型，则可以使用 `convertValue` 简洁调用



```java
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.Data;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.LinkedHashMap;

/**
 * JsonUtilsTest
 *
 * @author achao@apache.org
 */
class JsonUtilsTest {

    ObjectMapper mapper = new ObjectMapper();

    @Test
    void testGenericType() throws JsonProcessingException {
        var obj = mapper.readValue("""
                {"data":{"data":1}}
                """, Foo.class);
        Assertions.assertEquals(LinkedHashMap.class, obj.getData().getClass());
        var foo = mapper.convertValue(obj.getData(), Foo.class);
        Assertions.assertEquals(1, foo.getData());
    }

    @Data
    public static class Foo<T> {
        private T data;
    }

}

```
