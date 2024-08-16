---
title: springboot全局异常处理器
date: 2020-08-16 11:15:08
tags: java
---

直接贴代码

```java
package com.ruben.resolver;

import com.ruben.utils.AjaxJson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @ClassName: GlobalExceptionResolver
 * @Description: 全局异常处理器
 * @Date: 2020/8/15 14:24
 * *
 * @author: achao<achao1441470436 @ gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 * @Slf4j 日志打印
 * @RestControllerAdvice @ResponseBody+@ControllerAdvice 增强注解
 */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionResolver {
    /**
     * 参数校验异常处理
     *
     * @param e
     * @return
     */
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public AjaxJson parameterValidatorResolver(MethodArgumentNotValidException e) {
        List<FieldError> errors = e.getBindingResult().getFieldErrors();
        return AjaxJson.error(errors.stream().map(FieldError::getDefaultMessage)
                .collect(Collectors.joining(" ")));
    }

    /**
     * 其他异常
     *
     * @param e
     * @return
     */
    @ExceptionHandler(value = Exception.class)
    public AjaxJson otherExceptionResolver(Exception e) {
        log.error("发生了异常，可能是你的代码有BUG，请跑路", e);
        return AjaxJson.error("服务器异常，后端跑路了");
    }
}
```

非常简单

在类上加个`@RestControllerAdvice`注解，在方法加上`@ExceptionHandler`注解，`value`给对应的异常类就行

注意如果是`@ControllerAdvice`注解的话，返回的格式不是`json`，会被`thymeleaf`等解析跳转页面

