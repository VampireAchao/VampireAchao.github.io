---
title: spring-doc报错Unable to render this definition
date: 2023-12-17 18:46:37
tags: java
---

> 心情愉快是肉体和精神的最佳卫生法。——乔治·桑

![](/imgs/oss/blog-img/2023-12-17-18-48-10-image.png)

原因：自己修改了`ByteArrayHttpMessageConverter`的顺序。。。

解决方案：

[OpenAPI 3 Library for spring-boot](https://springdoc.org/#why-am-i-getting-an-error-swagger-ui-unable-to-render-definition-when-overriding-the-default-spring-registered-httpmessageconverter)

> ### 13.79. Why am i getting an error: `Swagger UI unable to render definition`, when overriding the default spring registered `HttpMessageConverter`?
> 
> When overriding the default spring-boot registered `HttpMessageConverter`, you should have `ByteArrayHttpMessageConverter` registered as well to have proper `springdoc-openapi` support.
> 
> ```java
>     converters.add(new ByteArrayHttpMessageConverter());
>     converters.add(new MappingJackson2HttpMessageConverter(jacksonBuilder.build()));
> ```
> 
> Order is very important, when registering `HttpMessageConverters`.

https://github.com/springdoc/springdoc-openapi/issues/2143
