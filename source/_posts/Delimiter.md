---
title: Delimiter
date: 2023-08-19 09:56:52
tags: java
---

> 青春如初春，如朝日，如百卉之萌动，如利刃之新发于硎，人生最宝贵之时期也。青年之于社会，犹新鲜活泼细胞之在身。——陈独秀

分享一下：`org.springframework.boot.convert.Delimiter`的用法

```java
/*
 * Copyright 2012-2019 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.springframework.boot.convert;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Declares a field or method parameter should be converted to collection using the
 * specified delimiter.
 *
 * @author Phillip Webb
 * @since 2.0.0
 */
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ ElementType.METHOD, ElementType.FIELD, ElementType.PARAMETER, ElementType.ANNOTATION_TYPE })
public @interface Delimiter {

	/**
	 * A delimiter value used to indicate that no delimiter is required and the result
	 * should be a single element containing the entire string.
	 */
	String NONE = "";

	/**
	 * The delimiter to use or {@code NONE} if the entire contents should be treated as a
	 * single element.
	 * @return the delimiter
	 */
	String value();

}
```

配置文件：`application.properties`

```properties
server.port=8172
app.items=item1;item2;item3
```

使用：

```java
package com.ruben.simpleweb;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.convert.Delimiter;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class Startup implements ApplicationRunner {
    @Value("${app.items}")
    @Delimiter(";")
    private List<String> items;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        items.forEach(System.out::println);
    }
}
```

可以看到，我们的`items`的值，使用了我们自定义的分隔符

当然除了用`@Value`，用新建`properties`类的方式也可以
