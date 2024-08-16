---
title: lombok的@StandardException
date: 2024-05-27 19:23:01
tags: java
---

> 但愿每次回忆，对生活都不感到内疚。——郭小川

官方文档：

[@StandardException](https://projectlombok.org/features/experimental/StandardException)

很简单的一个注解，主要是解决自定义异常需要重写一堆构造器

```java

import lombok.experimental.StandardException;

@StandardException
public class ExampleException extends Exception {
}
```

就会生成：

```java

public class ExampleException extends Exception {
    public ExampleException() {
        this(null, null);
    }

    public ExampleException(String message) {
        this(message, null);
    }

    public ExampleException(Throwable cause) {
        this(cause != null ? cause.getMessage() : null, cause);
    }

    public ExampleException(String message, Throwable cause) {
        super(message);
        if (cause != null) super.initCause(cause);
    }
}
```

例如我这里

```java
import lombok.experimental.StandardException;

/**
 * ApiClientException
 *
 * @author VampireAchao<achao @ hutool.cn>
 * @since 2023/9/22
 */
@StandardException
public class ApiClientException extends RuntimeException {
}

```
