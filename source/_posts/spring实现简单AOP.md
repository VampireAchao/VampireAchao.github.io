---
title: spring实现简单AOP
date: 2020-08-07 19:16:51
tags: java
---

> Sometimes we may think about how to do something before the method runs

有时我们会想，如何在一些方法执行前或者执行后做一些操作

比如日志的记录、权限的鉴定等等

昨天，我们搭建了个简单的`spring`项目并写了几个接口

其中一个是这样的

![image-20200807192828167](/imgs/oss/picGo/image-20200807192828167.png)

这里返回给前端的`map`中的`data`，我是手动加的前缀`“服务器对你说”`

我们现在来用`AOP`实现

先修改我们接口中的代码，去掉前缀

![image-20200807193131203](/imgs/oss/picGo/image-20200807193131203.png)

然后配置`AOP`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
	http://www.springframework.org/schema/beans/spring-beans-4.2.xsd
	http://www.springframework.org/schema/mvc
	http://www.springframework.org/schema/mvc/spring-mvc-4.2.xsd
    http://www.springframework.org/schema/aop
    http://www.springframework.org/schema/aop/spring-aop.xsd
	http://www.springframework.org/schema/context
	http://www.springframework.org/schema/context/spring-context-4.2.xsd">


    <!-- 配置包扫描器，扫描@Controller注解的类 -->
    <context:component-scan base-package="com.ruben.controller"/>

    <!-- 配置注解驱动 -->
    <mvc:annotation-driven/>
    <mvc:default-servlet-handler/>

    <!-- 视图解析器 -->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/WEB-INF/"/>
        <property name="suffix" value=".jsp"/>
    </bean>

    <!-- 配置资源映射 -->
    <mvc:resources location="/static/" mapping="/static/**"/>

    <!-- 激活组件扫描功能,在包"com.example.aop及其子包下面自动扫描通过注解配置的组件-->
    <context:component-scan base-package="com.ruben.aop"/>
    <!-- 启动AspectJ支持   只对扫描过的bean有效-->
    <aop:aspectj-autoproxy proxy-target-class="true"/>
</beans>
```

![image-20200807193430033](/imgs/oss/picGo/image-20200807193430033.png)

然后创建我们的`aop`包

![image-20200807193455282](/imgs/oss/picGo/image-20200807193455282.png)

在`aop`包创建一个类，并加上注解

![image-20200807193718138](/imgs/oss/picGo/image-20200807193718138.png)

定义我们的切入点，也就是需要被织入的位置

```java
    /**
     * 指定say方法
     */
    @Pointcut("execution(* com.ruben.controller.UserController.say(..))")
    private void pointcut() {
    }

```

然后编写我们的切面

```java
/**
     * 返回前对参数进行处理，加上前缀
     * @param point
     * @param returnValue
     */
    @AfterReturning(pointcut = "pointcut()", returning = "returnValue")
    public void addPrefix(JoinPoint point, Object returnValue) {
        if (returnValue instanceof HashMap) {
            Map<String, Object> result = (Map<String, Object>) returnValue;
            result.put("data", "achao对你说：" + result.get("data"));
        }
    }
```

完整代码

```java
package com.ruben.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

/**
 * @ClassName: SayWordAop
 * @Description: 说话Aop
 * @Date: 2020/8/7 19:36
 * *
 * @author: achao<achao1441470436 @ gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
@Aspect
@Component
public class SayWordAop {
    /**
     * 指定say方法
     */
    @Pointcut("execution(* com.ruben.controller.UserController.say(..))")
    private void pointcut() {
    }

    /**
     * 返回前对参数进行处理，加上前缀
     * @param point
     * @param returnValue
     */
    @AfterReturning(pointcut = "pointcut()", returning = "returnValue")
    public void addPrefix(JoinPoint point, Object returnValue) {
        if (returnValue instanceof HashMap) {
            Map<String, Object> result = (Map<String, Object>) returnValue;
            result.put("data", "achao对你说：" + result.get("data"));
        }
    }
    
}
```

然后启动我们的项目，发现切面生效了

![image-20200807195401295](/imgs/oss/picGo/image-20200807195401295.png)

![image-20200807195416139](/imgs/oss/picGo/image-20200807195416139.png)

发送的参数为`登录成功！`

但是返回的结果是

![image-20200807195502546](/imgs/oss/picGo/image-20200807195502546.png)

说明我们的切面生效了，我们顺便把其他几种也加上吧

比如加个校验

![image-20200807212935158](/imgs/oss/picGo/image-20200807212935158.png)

```java
    /**
     * 登录参数校验
     *
     * @param point
     * @return
     * @throws Throwable
     */
    @Around("execution(* com.ruben.controller.UserController.login(..))")
    public Object permissionCheck(ProceedingJoinPoint point) throws Throwable {
        List<Object> paramList = Arrays.asList(point.getArgs());
        AtomicBoolean passValidate = new AtomicBoolean(true);
        String pattern = "^[A-Za-z0-9]{4,40}$";
        AtomicReference<String> errorMsg = new AtomicReference<>("您输入的参数格式有误");
        paramList.forEach(param -> {
            User user = (User) param;
            if (!Pattern.matches(pattern, user.getUsername())) {
                errorMsg.set("用户名格式错误");
                passValidate.set(false);
            } else if (!Pattern.matches(pattern, user.getPassword())) {
                errorMsg.set("密码格式错误");
                passValidate.set(false);
            }
        });
        if (!passValidate.get()) {
            Map<String, Object> map = new HashMap<>(1 << 2);
            map.put("success", false);
            map.put("code", -629);
            map.put("msg", errorMsg.get());
            return map;
        }
        return point.proceed();
    }

```

还比如在方法执行前后记录日志

先加上注解

![image-20200807203628215](/imgs/oss/picGo/image-20200807203628215.png)

然后修改配置文件

```xml
    <!-- 配置log4j日志 -->
    <context-param>
        <param-name>log4jConfigLocation</param-name>
        <param-value>/WEB-INF/config/log4j.properties</param-value>
    </context-param>
    <!--log4j日志监听  -->
    <listener>
        <listener-class>org.springframework.web.util.Log4jConfigListener</listener-class>
    </listener>
```



![image-20200807213337816](/imgs/oss/picGo/image-20200807213337816.png)

添加配置文件

![image-20200807215610818](/imgs/oss/picGo/image-20200807215610818.png)

```properties
#log4j properties file
#log4j.rootLogger = [level],appenderName,appenderName2,...
log4j.rootLogger=INFO,console,file
#console
log4j.appender.console=org.apache.log4j.ConsoleAppender
log4j.appender.console.Threshold=DEBUG
log4j.appender.console.layout=org.apache.log4j.PatternLayout
log4j.appender.console.layout.ConversionPattern=%-22d{yyyy/MM/dd HH:mm:ss}%m%n
#file
log4j.appender.file=org.apache.log4j.FileAppender
log4j.appender.file.File=./logs/project.log
log4j.appender.file.Append=true
log4j.appender.file.Encoding=UTF-8
log4j.appender.file.layout=org.apache.log4j.PatternLayout
log4j.appender.file.layout.ConversionPattern=[%-5p][%-22d{yyyy/MM/dd HH:mm:ssS}][%l]%n%m%n
```

就可以用`log.info()`打印日志啦！

```java
/**
     * 在com.ruben包下任意方法执行前打印日志
     *
     * @param point
     */
    @Before(value = "execution(* com.ruben.*.*.*(..))")
    public void logRecode(JoinPoint point) {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        log.info("==>url：" + request.getRequestURI());
        log.info("==>参数：" + Arrays.toString(point.getArgs()));
    }


    /**
     * 在com.ruben.controller包下任意方法执行后打印
     *
     * @param point
     */
    @After("execution(* com.ruben.controller.*.*(..))")
    public void recodeWord(JoinPoint point) {
        log.info("<==" + point.getSignature().getDeclaringTypeName()
                + "." + point.getSignature().getName() + "方法执行结束");
    }
```

```shell
2020/08/07 22:00:11   ==>url：/user/login
2020/08/07 22:00:11   ==>参数：[User(username=achao, password=ruben)]
2020/08/07 22:00:11   <==com.ruben.controller.UserController.login方法执行结束
2020/08/07 22:00:11   ==>url：/user/say
2020/08/07 22:00:11   ==>参数：[登录成功！]
2020/08/07 22:00:11   <==com.ruben.controller.UserController.say方法执行结束
```

[完整代码](https://gitee.com/VampireAchao/simple-spring-springmvc.git)