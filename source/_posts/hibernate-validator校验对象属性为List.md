---
title: hibernate-validator校验对象属性为List
date: 2022-12-20 13:20:50
tags: java
---

> 君子拙于不知己而信于知己也——司马迁

文档：

https://docs.jboss.org/hibernate/stable/validator/reference/en-US/html_single/#_with_list

我们这里首先引入`starter`

```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
```

然后我们带两个`Entity`以及一个`Controller`

```java
package com.ruben.simplestreamquery.pojo;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
public class TestEntity {

    @NotNull
    private Long id;

    @NotEmpty
    private List<EntityItem> list;

}
```

```java
package com.ruben.simplestreamquery.pojo;

import lombok.Data;

import javax.validation.constraints.NotNull;

/**
 * @author VampireAchao
 * @since 2022/12/20 14:57
 */
@Data
public class EntityItem {
    @NotNull
    private Long id;
}
```

```java
package com.ruben.simplestreamquery.controller;

import com.ruben.simplestreamquery.pojo.TestEntity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * TestController
 *
 * @author VampireAchao
 * @since 2022/10/5
 */
@Slf4j
@RestController
public class TestController {

    @PostMapping("test")
    public void list(@RequestBody @Validated TestEntity testEntity) {
        log.info("请求成功！{}", testEntity);
    }

}
```

我们编写一个`Mock`

```java
package com.ruben.simplestreamquery;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ruben.simplestreamquery.pojo.EntityItem;
import com.ruben.simplestreamquery.pojo.TestEntity;
import io.github.vampireachao.stream.core.collection.Lists;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * @author VampireAchao
 * @since 2022/12/20 13:48
 */
@SpringBootTest
@AutoConfigureMockMvc
class TestControllerTest {

    @Test
    void test(@Autowired MockMvc mockMvc, @Autowired ObjectMapper objectMapper) throws Exception {
        final TestEntity entity = new TestEntity();
        entity.setId(1L);
        entity.setList(Lists.of(new EntityItem()));
        final String jsonStr = objectMapper.writeValueAsString(entity);
        mockMvc.perform(post("/test")
                        .contentType("application/json")
                        .content(jsonStr))
                .andExpect(status().isOk());
    }

}
```

此时我们对`List<EntityItem>`的校验失效了

![image-20221220163851373](/imgs/oss/picGo/image-20221220163851373.png)

如何生效？

将`List<EntityItem>`加上`@Valid`注解

```java
package com.ruben.simplestreamquery.pojo;

import lombok.Data;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
public class TestEntity {

    @NotNull
    private Long id;

    @NotEmpty
    private List<@Valid EntityItem> list;

}
```

再次测试

![image-20221220163949213](/imgs/oss/picGo/image-20221220163949213.png)

校验生效了

![image-20221220164021778](/imgs/oss/picGo/image-20221220164021778.png)

我们稍微封装一下异常处理

```java
package com.ruben.simplestreamquery.handler;

import com.ruben.simplestreamquery.pojo.vo.GlobalResult;
import io.github.vampireachao.stream.core.stream.Steam;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;

/**
 * ResponseHandler
 *
 * @author VampireAchao
 * @since 2022/10/5
 */
@RestControllerAdvice
public class ResponseHandler {
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public GlobalResult parameterValidatorResolver(MethodArgumentNotValidException e) {
        List<FieldError> errors = e.getBindingResult().getFieldErrors();
        final GlobalResult result = GlobalResult.error();
        result.set("msg", Steam.of(errors).map(error -> error.getField() + " " + error.getDefaultMessage()).join("  "));
        return result;
    }

}
```

然后打印出来响应结果

```java
package com.ruben.simplestreamquery;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ruben.simplestreamquery.pojo.EntityItem;
import com.ruben.simplestreamquery.pojo.TestEntity;
import io.github.vampireachao.stream.core.collection.Lists;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * @author VampireAchao
 * @since 2022/12/20 13:48
 */
@Slf4j
@SpringBootTest
@AutoConfigureMockMvc
class TestControllerTest {

    @Test
    void test(@Autowired MockMvc mockMvc, @Autowired ObjectMapper objectMapper) throws Exception {
        final TestEntity entity = new TestEntity();
        entity.setId(1L);
        entity.setList(Lists.of(new EntityItem()));
        final String jsonStr = objectMapper.writeValueAsString(entity);
        final MvcResult result = mockMvc.perform(post("/test")
                        .contentType("application/json")
                        .content(jsonStr))
                .andExpect(status().isOk())
                .andReturn();
        log.info(result.getResponse().getContentAsString());
    }

}
```

成功提示

![image-20221220164248565](/imgs/oss/picGo/image-20221220164248565.png)