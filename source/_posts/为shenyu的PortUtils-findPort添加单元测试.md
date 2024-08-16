---
title: 为shenyu的PortUtils.findPort添加单元测试
date: 2023-05-03 21:04:13
tags: java
---

> 爱好自由是人的天性，但往往过度而陷于放纵。斯宾诺莎

今天为`shenyu`的`shenyu-client-core`模块下添加了`PortUtils.findPort`的`test case`：

https://github.com/apache/shenyu/pull/4604

对应的代码如下：

```java
/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.apache.shenyu.client.core.utils;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.beans.factory.support.GenericBeanDefinition;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;

/**
 * Test for {@link PortUtils}.
 */
public class PortUtilsTest {

    @Test
    public void testFindPort() {
        DefaultListableBeanFactory beanFactory = new DefaultListableBeanFactory();
        GenericBeanDefinition beanDefinition = new GenericBeanDefinition();
        beanDefinition.setBeanClass(TomcatServletWebServerFactory.class);
        beanFactory.registerBeanDefinition("webServerFactory", beanDefinition);

        int port = PortUtils.findPort(beanFactory);
        Assertions.assertEquals(8080, port);
    }

}
```

![image-20230503211545620](/imgs/oss/blog/vampireachao/image-20230503211545620.png)

