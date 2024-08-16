---
title: mvc配置指定参数处理
date: 2021-08-11 19:08:32
tags: java
---

> 人原来是这样健忘的，同样的一个人在短短的时间内竟然变换了两个面目，过后他又想，大概正是因为这样健忘，所以才能够在痛苦中生活下去罢。——巴金

今天遇到这样一个情况，我想使用`parameter`也就是`?orders=[{"column":"sort","asc":false}]`的方式传递参数

![image-20210811191209583](/imgs/oss/picGo/image-20210811191209583.png)

但我很多接口都是生成的如下写法，并且排序使用的`List<OrderItem>`这样的对象数组去接收

![image-20210811211250893](/imgs/oss/picGo/image-20210811211250893.png)

![image-20210811210821727](/imgs/oss/picGo/image-20210811210821727.png)

因此我需要进行全局配置，所以就有了如下代码：

```java
package com.ruben.simplescaffold.config;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.util.ArrayUtil;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.parser.ParserConfig;
import com.alibaba.fastjson.serializer.SerializeConfig;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.alibaba.fastjson.support.config.FastJsonConfig;
import com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter;
import com.baomidou.mybatisplus.core.metadata.OrderItem;
import com.baomidou.mybatisplus.core.toolkit.LambdaUtils;
import com.baomidou.mybatisplus.core.toolkit.support.SFunction;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.ruben.simplescaffold.exception.PageException;
import com.ruben.simplescaffold.handler.GlobalTimeResolver;
import com.ruben.simplescaffold.utils.Opt;
import org.apache.ibatis.reflection.property.PropertyNamer;
import org.springframework.boot.autoconfigure.web.servlet.error.ErrorViewResolver;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.util.unit.DataSize;
import org.springframework.util.unit.DataUnit;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter;

import javax.servlet.MultipartConfigElement;
import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Stream;

/**
 * web配置类
 *
 * @author <achao1441470436@gmail.com>
 * @since 2021/5/18 0018 14:52
 */
@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    public static String ORDERS_PROPERTY_NAME = PropertyNamer.methodToProperty(LambdaUtils.resolve((SFunction<Page<?>, List<OrderItem>>) Page::getOrders).getImplMethodName());

    /**
     * Add resolvers to support custom controller method argument types.
     * <p>This does not override the built-in support for resolving handler
     * method arguments. To customize the built-in support for argument
     * resolution, configure {@link RequestMappingHandlerAdapter} directly.
     *
     * @param resolvers initially an empty list
     */
    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(new HandlerMethodArgumentResolver() {

            /**
             * Whether the given {@linkplain MethodParameter method parameter} is
             * supported by this resolver.
             *
             * @param parameter the method parameter to check
             * @return {@code true} if this resolver supports the supplied parameter;
             * {@code false} otherwise
             */
            @Override
            public boolean supportsParameter(MethodParameter parameter) {
                return parameter.getParameterType() == Page.class;
            }

            /**
             * Resolves a method parameter into an argument value from a given request.
             * A {@link ModelAndViewContainer} provides access to the model for the
             * request. A {@link WebDataBinderFactory} provides a way to create
             * a {@link WebDataBinder} instance when needed for data binding and
             * type conversion purposes.
             *
             * @param parameter     the method parameter to resolve. This parameter must
             *                      have previously been passed to {@link #supportsParameter} which must
             *                      have returned {@code true}.
             * @param mavContainer  the ModelAndViewContainer for the current request
             * @param webRequest    the current request
             * @param binderFactory a factory for creating {@link WebDataBinder} instances
             * @return the resolved argument value, or {@code null} if not resolvable
             * @throws Exception in case of errors with the preparation of argument values
             */
            @Override
            public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
                //获取请求对象
                HttpServletRequest request = webRequest.getNativeRequest(HttpServletRequest.class);
                // 获取参数，并且转换为Map<Object, Object>
                Map<Object, Object> paramMap = Optional.ofNullable(request).map(HttpServletRequest::getParameterMap).map(Map::entrySet).map(Set::parallelStream).map(s -> s.collect(HashMap::new, (m, v) -> m.put(v.getKey(), Optional.ofNullable(v.getValue()).filter(ArrayUtil::isNotEmpty).map(Arrays::stream).flatMap(Stream::findFirst).orElse(null)), HashMap::putAll)).orElseGet(HashMap::new);
                // 处理orders
                Optional.ofNullable(paramMap.get(ORDERS_PROPERTY_NAME)).map(String::valueOf).map(orderString -> JSON.parseArray(orderString, OrderItem.class)).filter(CollectionUtil::isNotEmpty).ifPresent(orders -> paramMap.put(ORDERS_PROPERTY_NAME, orders));
                // 序列化然后反序列化成Page对象返回
                return JSON.parseObject(JSON.toJSONString(paramMap), Page.class);
            }
        });
    }
}
```

这里我重写了`org.springframework.web.servlet.config.annotation.WebMvcConfigurer`中的`addArgumentResolvers`方法，并且调用了`resolvers.add`去添加了我的一个自定义的参数处理器

条件为`Page.class.equals(parameter.getParameterType())`的时候执行下面的`resolveArgument`的逻辑

最后返回的对象即为转换完毕后的结果

我们的`orders`使用`url`传入对象数组

这样就能序列化为我们的`com.baomidou.mybatisplus.extension.plugins.pagination.Page`了

然后身为懒人，只要后端代码如下写，即可在前端传入分页、查询、排序条件完成列表查询

```java
    /**
     * 查询列表
     *
     * @param page 分页参数?size=10&current=1
     * @return 分页结果
     * @author <achao1441470436@gmail.com>
     * @since 2021-08-09
     */
    @GetMapping("page")
    public Result page(Page<CommonTemplate> page, CommonTemplate commonTemplate) {
        return Result.ok().data(commonTemplateService.page(page, Wrappers.lambdaQuery(commonTemplate)));
    }
```

请求如下

![image-20210811211041620](/imgs/oss/picGo/image-20210811211041620.png)

响应如下：

![image-20210811211214288](/imgs/oss/picGo/image-20210811211214288.png)

(有人问我为什么不用`POST`，很简单，`GET`的话能直接在浏览器访问)

![image-20210811211120744](/imgs/oss/picGo/image-20210811211120744.png)
