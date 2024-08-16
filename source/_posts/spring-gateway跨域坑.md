---
title: spring-gateway跨域坑
date: 2023-12-29 19:31:09
tags: java
---

> 没有不可认识的东西，我们只能说还有尚未被认识的东西。——高尔基

今天发现一个问题，前端跨域，这个我已经解决无数次了，但上了个网关，还是踩坑了

首先是网关配置了跨域

```java
    @Bean
    public CorsWebFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOriginPattern("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return new CorsWebFilter(source);
    }
```

然后报错提示重复的`Access-Control-Allow-Origin`请求头

注释掉又报错跨域

最后发现是网关路由到的子服务也配置了允许跨域。。。

```java
/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import jakarta.annotation.Resource;
import org.dromara.streamquery.stream.core.stream.Steam;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.converter.ByteArrayHttpMessageConverter;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Collections;
import java.util.List;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    private static final String[] CORS_MAPPINGS_ALLOWED_METHODS = {
            HttpMethod.POST.name(),
            HttpMethod.GET.name(),
            HttpMethod.PUT.name(),
            HttpMethod.OPTIONS.name(),
            HttpMethod.DELETE.name()
    };
    @Resource
    private Jackson2HttpMessageConverter jackson2HttpMessageConverter;

    @Override
    public void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
        // 将MappingJackson2HttpMessageConverter放到第一个
        converters.removeIf(converter -> converter instanceof MappingJackson2HttpMessageConverter);
        converters.add(jackson2HttpMessageConverter);
        Collections.reverse(converters);
        Integer byteConverterIdx = Steam.of(converters).findFirstIdx(c -> c instanceof ByteArrayHttpMessageConverter);
        converters.add(0, converters.get(byteConverterIdx));
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry
                .addMapping("/**")
                .allowedOriginPatterns("*")
                .allowedMethods(CORS_MAPPINGS_ALLOWED_METHODS)
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        WebMvcConfigurer.super.addInterceptors(registry);
    }
}
```

取消掉`addCorsMappings`的配置即可
