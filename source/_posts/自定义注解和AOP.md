---
title: 自定义注解和AOP
date: 2021-09-26 20:22:48
tags: java
---

> 生命不可能有两次，但许多人连一次也不善于度过——吕凯特

我们写一个注解用`AOP`去实现接口的访问记录，这个也可以用于日志记录等地方

```java
import java.lang.annotation.*;

/**
 * 记录
 *
 * @author <achao1441470436@gmail.com>
 * @since 2021/7/29 11:28
 */
@Inherited
@Documented
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface WithMe {
    String value();
}

```

然后在`AOP`中这样写

```java
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

/**
 * 记录
 *
 * @author <achao1441470436@gmail.com>
 * @since 2021/7/29 11:00
 */
@Slf4j
@Aspect
@Component
public class WithMeAop {

    /**
     * 记录
     *
     * @param point  切面
     * @param withMe 注解
     * @return java.lang.Object
     * @author <achao1441470436@gmail.com>
     * @since 2021/7/29 12:13
     */
    @AfterReturning(pointcut = "@annotation(withMe)", returning = "returnValue")
    public Object recordWithMe(JoinPoint point, WithMe withMe, Object returnValue) {
        // 获取注解内value的值 withMe.value()
        // 做处理...
        return returnValue;
    }
}
```

这样，当你的方法上有`@WithMe`注解时，就会被`AOP`织入

