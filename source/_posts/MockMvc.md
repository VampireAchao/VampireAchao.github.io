---
title: MockMvc
date: 2022-10-10 14:12:42
tags: java
---

> 反驳和奉承，两者都会造成不愉快的交谈——歌德

有时候我们想针对`spring`的`controller`进行单元测试，可以使用`MockMvc`来进行

文档地址：https://docs.spring.io/spring-framework/docs/current/reference/html/testing.html#spring-mvc-test-server

如果是`springboot`，文档：https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.testing.spring-boot-applications

![image-20221010141418932](/imgs/oss/picGo/image-20221010141418932.png)

这里提到需要加上`@AutoConfigureMockMvc`注解

在[这个文档](https://docs.spring.io/spring-framework/docs/current/reference/html/testing.html#spring-mvc-test-server)里提到要使用`MockMvc`，先静态导入这四个类

![image-20221010141630639](/imgs/oss/picGo/image-20221010141630639.png)

然后按照[这里](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.testing.spring-boot-applications.with-mock-environment)的例子，依葫芦画瓢写一个，但是不一样的是，我这里返回的数据是`json`，因此按照[这里的文档](https://docs.spring.io/spring-framework/docs/current/reference/html/testing.html#webtestclient-json)稍加修改

最终结果：

```kotlin
package com.ruben.simpleboot

import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*

@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {

    @Test
    fun testPage(@Autowired mockMvc: MockMvc) {
        mockMvc.perform(get("/user/page"))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.records").isArray)
            .andExpect(jsonPath("$.records[0].id").value(1L))
    }

}
```

忘说了我这里是`kotlin`，不过`java`的话都一样的哈哈