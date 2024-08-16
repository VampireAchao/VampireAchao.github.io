---
title: 拦截器注入Service报空指针的坑
date: 2020-07-21 19:26:53
tags: java
---

今天写了个拦截器，注入一个<code>Service</code>，结果没注入进去，报空指针

后来发现原来在拦截器配置处需要用<code>@Bean</code>的形式注入

并且在上面<code>addInterceptor</code>里面调用该函数

```java
@Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(visitInterceptor())
                .addPathPatterns("/**");
    }
 @Bean
    public VisitInterceptor visitInterceptor() {
        return new VisitInterceptor();
    }
```

![youjishu](/imgs/oss/picGo/youjishu.jpg)