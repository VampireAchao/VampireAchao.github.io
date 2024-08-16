---
title: spring获取bean的第三种方式
date: 2020-11-12 21:55:08
tags: java 
---

> Had I not seen the Sun[我本可以忍受黑暗]
>
> I could have borne the shade[如果我不曾见过太阳]
>
> But Light a newer Wilderness[然而阳光已使我的荒凉]
>
> My Wilderness has made[成为更新的荒凉]
>
> ——Emily Dickinson

之前我们引用`spring`里的`bean`都是通过`@Autowired`或者`@Resource`注解获取

这里可以使用第三种方式

首先写个工具类

```java
package com.ruben.utils;
/**
 * @ClassName: SpringContextHolder
 * @Date: 2020/11/12 0012 20:40
 * @Description:
 */

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * @ClassName: SpringContextHolder
 * @Description: 可以从applicationContext获取bean
 * @Date: 2020/11/12 0012 20:40
 * *
 * @author: <achao1441470436@gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
@Lazy(false)
@Component("SpringContextHolder")
public class SpringContextHolder implements ApplicationContextAware, DisposableBean {

    private static ApplicationContext applicationContext;
    private static final String ERROR_MESSAGE = "applicationContext尚未注入";

    @Override
    public void destroy() {
        applicationContext = null;
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        SpringContextHolder.applicationContext = applicationContext;
    }

    public static <T> T getBean(Class<T> type) {
        return Optional.ofNullable(applicationContext).orElseThrow(() -> new IllegalStateException(ERROR_MESSAGE)).getBean(type);
    }

    @SuppressWarnings("unchecked")
    public static <T> T getBean(String name) {
        return (T) Optional.ofNullable(applicationContext).orElseThrow(() -> new IllegalStateException(ERROR_MESSAGE)).getBean(name);
    }


}
```

然后就可以通过

```java
private static final UserService userService = SpringContextHolder.getBean(UserService.class);
```

获取到注入到`spring`容器的`bean`

注意，如果是单体架构项目需要在引用时在对应的组件上加`@DependsOn("SpringContextHolder")`注解

或者是分布式项目的话，直接写到最顶层依赖部分就行