---
title: ThreadLocal
date: 2021-10-22 18:28:11
tags: java
---

> 只有利害关系和出众的才干，才能帮你出起主意来，才认真细到，眼光透彻。——巴尔扎克

我们在`web`开发中经常遇到在一个线程中需要共享变量

这里就可以使用`ThreadLocal`去完成

例如我们用户发起请求，我们在过滤器等将用户信息存储在`ThreadLocal`中，这样在代码中获取用户信息就相对容易

写法如下：

```java
import cn.hutool.core.lang.Opt;

/**
 * 用户工具类
 *
 * @author <achao1441470436@gmail.com>
 * @since 2021/8/25 12:10
 */
public class UserUtils {
    private static final ThreadLocal<UserDetail> USER_THREAD = new ThreadLocal<>();
    
    /**
     * 设置当前用户
     *
     * @param userDetail 用户信息
     * @author <achao1441470436@gmail.com>
     * @since 2021/9/10 16:23
     */
    public static void setUser(UserDetail userDetail) {
        USER_THREAD.set(userDetail);
    }

    /**
     * 移除当前用户
     *
     * @author <achao1441470436@gmail.com>
     * @since 2021/10/22 16:49
     */
    public static void clear() {
        USER_THREAD.remove();
    }
    
    /**
     * 获取用户信息，有可能获取不到
     *
     * @return com.baomidou.shaun.core.profile.TokenProfile
     * @author <achao1441470436@gmail.com>
     * @since 2021/9/9 10:33
     */
    public static Opt<UserDetail> getUser() {
        return Opt.ofNullable(USER_THREAD.get()).or(() -> {
            // 这里UserDetail从实际登录框架调用对应api获取
            UserDetail userDetail = null;
            return Opt.of(userDetail);
        });
    }
    
}
```

在拦截器中：

```java
package com.ruben.xchat.interceptor;

import com.ruben.xchat.utils.UserUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.AsyncHandlerInterceptor;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 用户信息拦截器
 *
 * @author <achao1441470436@gmail.com>
 * @since 2021/10/22 19:19
 */
@Component
public class UserInfoInterceptor implements HandlerInterceptor {
    
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        UserUtils.getUser().ifPresent(UserUtils::setUser);
        return true;
    }
    
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        UserUtils.clear();
    }
}
```

然后别忘了让拦截器生效

```java
@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
    @Resource
    private UserInfoInterceptor userInfoInterceptor;
    
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(userInfoInterceptor).addPathPatterns("/**");
    }
    
}
```

