---
title: Spring的LambdaSafe
date: 2024-06-02 17:19:16
tags: java
---

> 对未来来说孩子的教育比成人更为重要。——贝多芬

今天看了下`Spring`的`LambdaSafe`类，它提供了一种安全的方式调用`Lambda`，例如不使用`LambdaSafe`时的问题

```java
package org.dromara.streamquery.stream.plugin.mybatisplus;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Tests
 * <p>
 * author achao@apache.org
 */
class TestsWithoutLambdaSafe {

    @Test
    void testWithoutLambdaSafe() {
        List<Consumer<Object>> listeners = new ArrayList<>();
        StringBuilder output = new StringBuilder();

        listeners.add(message -> output.append((String) message).append(" additional"));
        // 导致 ClassCastException
        listeners.add(message -> output.append((Integer) message + 1));

        Object foo = "foo";

        for (Consumer<Object> listener : listeners) {
            try {
                listener.accept(foo);
            } catch (ClassCastException e) {
                output.append(" error: ").append(e.getMessage());
            }
        }

        assertEquals("foo additional error: java.lang.String cannot be cast to java.lang.Integer", output.toString());
    }
}

```

可以看到这里类型转换异常

但是使用`LambdaSafe`

```java
package org.dromara.streamquery.stream.plugin.mybatisplus;

import org.junit.jupiter.api.Test;
import org.springframework.boot.util.LambdaSafe;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Tests
 * <p>
 * author achao@apache.org
 */
class TestsWithLambdaSafe {

    @Test
    void testWithLambdaSafe() {
        List<Consumer<Object>> listeners = new ArrayList<>();
        StringBuilder output = new StringBuilder();

        listeners.add(message -> output.append((String) message).append(" additional"));
        listeners.add(message -> output.append((Integer) message + 1)); // This will be safely ignored by LambdaSafe

        Object foo = "foo";

        LambdaSafe.callbacks(Consumer.class, listeners, foo)
                .invoke(listener -> listener.accept(foo));

        assertEquals("foo additional", output.toString());
    }
}

```

可以看到虽然抛了异常，但是在类型不匹配时不影响其他`Lambda`的结果

**不使用 `LambdaSafe` 的示例**：

- 我们手动调用每个监听器，并在类型不匹配时捕获 `ClassCastException`。
- 这需要手动处理异常，并且会导致代码冗长且容易出错。

**使用 `LambdaSafe` 的示例**：

- 使用 `LambdaSafe.callbacks` 安全地调用监听器。
- `LambdaSafe` 自动处理类型检查，并在类型不匹配时安全地跳过调用，而不会抛出异常。
- 代码更加简洁，不需要手动处理异常。
