---
title: spring实现Validator校验和全局异常处理
date: 2020-08-17 19:47:39
tags: java
---

开整！

首先引入依赖

```xml
<!-- https://mvnrepository.com/artifact/org.hibernate.validator/hibernate-validator -->
        <dependency>
            <groupId>org.hibernate.validator</groupId>
            <artifactId>hibernate-validator</artifactId>
            <version>6.1.5.Final</version>
        </dependency>
        <!-- FastJson -->
        <!-- https://mvnrepository.com/artifact/com.alibaba/fastjson -->
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>fastjson</artifactId>
            <version>1.2.73</version>
        </dependency>
```

在需要校验的实体类上加注解，这里我们写个接口，给它分个组

```java
package com.ruben.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

/**
 * @ClassName: User
 * @Description:
 * @Date: 2020/8/6 20:22
 * *
 * @author: achao<achao1441470436 @ gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @NotBlank(message = "用户名不能为空", groups = {UserCheck.class})
    private String username;
    @NotBlank(message = "密码不能为空", groups = UserCheck.class)
    private String password;

    public interface UserCheck {

    }
}
```

然后在方法上加上注解，并指定分组

```java
    /**
     * 登录
     *
     * @param user 参数为Json格式的User对象{"username":"","password":""}
     * @return 返回json格式的map
     */
    @PostMapping("login")
    public Map<String, Object> login(@Validated({User.UserCheck.class}) @RequestBody User user) {
        Map<String, Object> map = new HashMap<>(1 << 2);
        String myUsername = "achao";
        String myPassword = "ruben";
        if (myUsername.equals(user.getUsername()) && myPassword.equals(user.getPassword())) {
            map.put("success", true);
            map.put("code", 200);
            map.put("msg", "登录成功！");
        } else {
            map.put("success", false);
            map.put("code", -629);
            map.put("msg", "登录失败，用户名密码错误！");
        }
        return map;
    }
```

这时候，我们发现已经抛出异常了

![image-20200817205630352](/imgs/oss/picGo/image-20200817205630352.png)

我们尝试去捕获这个异常`MethodArgumentNotValidException`

首先写个全局异常处理器

```java
package com.ruben.resolver;

import com.alibaba.fastjson.support.spring.FastJsonJsonView;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

/**
 * @ClassName: GlobalExceptionResolver
 * @Description:
 * @Date: 2020/8/17 20:03
 * *
 * @author: achao<achao1441470436 @ gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
public class GlobalExceptionResolver implements HandlerExceptionResolver {
    @Override
    public ModelAndView resolveException(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) {
        e.printStackTrace();
        ModelAndView modelAndView = new ModelAndView();
        FastJsonJsonView fastJsonJsonView = new FastJsonJsonView();
        Map<String, Object> map = new HashMap<>(1 << 2);
        map.put("success", false);
        map.put("code", HttpStatus.INTERNAL_SERVER_ERROR.value());
        map.put("msg", "内部错误");
        fastJsonJsonView.setAttributesMap(map);
        modelAndView.setView(fastJsonJsonView);
        return modelAndView;
    }
}

```

然后在`springmvc`里一配

```xml
<!-- 全局异常处理 -->
    <bean id="handlerExceptionResolver" class="com.ruben.resolver.GlobalExceptionResolver"/>
```

我们随便写个`int i = 2/0;`的异常，发现全局异常处理器测试通过

然后精彩部分来了，我们`debug`发现这个`MethodArgumentNotValidException`异常全局异常处理器根本没进去!!!

那这样就没办法了吗？`No No No!`

这里我们采用`AOP`的方式

首先自定义个注解

```java
package com.ruben.annotation;

import java.lang.annotation.*;

/**
 * @ClassName: Validator
 * @Description: 自定义Validator校验注解，需参数配合BindingResult一起使用
 * @Date: 2020/8/17 20:57
 * *
 * @author: achao<achao1441470436 @ gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
@Documented
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface Validator {
    String value() default "bindingResult";
}
```

写完，在我们的方法上加上我们的注解和参数

```java
    /**
     * 登录
     *
     * @param user 参数为Json格式的User对象{"username":"","password":""}
     * @return 返回json格式的map
     */
    @Validator
    @PostMapping("login")
    public Map<String, Object> login(@Validated({User.UserCheck.class})
                                     @RequestBody User user,
                                     BindingResult bindingResult) {
        Map<String, Object> map = new HashMap<>(1 << 2);
        String myUsername = "achao";
        String myPassword = "ruben";
        if (myUsername.equals(user.getUsername()) && myPassword.equals(user.getPassword())) {
            map.put("success", true);
            map.put("code", 200);
            map.put("msg", "登录成功！");
        } else {
            map.put("success", false);
            map.put("code", -629);
            map.put("msg", "登录失败，用户名密码错误！");
        }
        return map;
    }
```

然后写个简单的`AOP`来处理

```java
package com.ruben.aop;

import com.ruben.annotation.Validator;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @ClassName: ValidatorAop
 * @Description:
 * @Date: 2020/8/17 20:50
 * *
 * @author: achao<achao1441470436 @ gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
@Aspect
@Component
public class ValidatorAop {
    /**
     * 参数校验AOP
     *
     * @param joinPoint 织入点为这个注解
     * @param validator 自定义的注解
     * @return
     */
    @Around("@annotation(validator)")
    public Object validateParam(ProceedingJoinPoint joinPoint, Validator validator) {
        //获取错误参数(也就是我们注解里面的bindingResult)
        String value = validator.value();
        //获取所有参数名
        String[] parameterNames = ((MethodSignature) joinPoint.getSignature()).getParameterNames();
        BindingResult bindingResult = null;
        //遍历所有参数名，如果参数名相同，则根据当前i作为下标去获取参数
        for (int i = 0; i < parameterNames.length; i++) {
            if (value.equals(parameterNames[i])) {
                bindingResult = (BindingResult) joinPoint.getArgs()[i];
            }
        }
        //返回一个map
        Map<String, Object> map = new HashMap<>(1 << 2);
        //如果bindingResult不为空并且bindingResult数组不为空(hasErrors是调用List的isEmpty取反)
        if (bindingResult != null && bindingResult.hasErrors()) {
            map.put("success", false);
            map.put("code", HttpStatus.BAD_REQUEST);
            //拼接结果(个人喜欢把所有错误信息返回，也可以只返回第一个提升效率)
            map.put("msg", bindingResult.getAllErrors().stream().map(DefaultMessageSourceResolvable::getDefaultMessage).collect(Collectors.joining(" ")));
            return map;
        }
        try {
            //方法执行
            return joinPoint.proceed();
        } catch (Throwable throwable) {
            //方法执行必须抛出一个Throwable异常
            throwable.printStackTrace();
        }
        return null;
    }
}
```

顺便放上一张我们的参数和提示截图

![image-20200817213441715](/imgs/oss/picGo/image-20200817213441715.png)

![image-20200817214138804](/imgs/oss/picGo/image-20200817214138804.png)

大功告成！