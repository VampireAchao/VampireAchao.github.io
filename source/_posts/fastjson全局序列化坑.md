---
title: fastjson全局序列化坑
date: 2021-08-17 20:15:53
tags: java
---


> 偌大的城市，绵延无尽，并非是我眼见的让我停住了脚步，而是我所看不见的。——《海上钢琴师》

今天遇到这样一个问题：
序列化出现了与预期不一致的效果，重现代码很简单，就返回一个`list`，包含几个对象

```java
    @GetMapping
    public Result testQueryParam(CommonDTO commonDTO) {
        final UserDetail userDetail = UserDetail.builder().build();
        return Result.ok().data(Arrays.asList(userDetail, userDetail, userDetail));
    }
```

但可以看到我这里第一条数据是正确的，第二条开始就变成了`{$ref: "$.data[0]"}`

![image-20210817201607951](/imgs/oss/picGo/image-20210817201607951.png)

这是因为我们在使用`fastjson`作为`mvc`全局序列化框架的时候

> 在`fastjson`中，会自动检测循环引用，并且输出为`fastjson`专有的引用表示格式。但这个不能被其他JSON库识别，也不能被浏览器识别，所以`fastjson`提供了关闭循环引用检测的功能。使用如下：
>
> ```java
> import com.alibaba.fastjson.serializer.SerializerFeature;
> 
> JSON.toJSONString(obj, SerializerFeature.DisableCircularReferenceDetect);
> ```

`fastjson`文档链接：https://gitee.com/wenshao/fastjson/wikis/pages?sort_id=1591202&doc_id=10706

处理方式：

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
    
    /**
     * @param converters 转换器
     * @author <achao1441470436@gmail.com>
     * @since 2021/5/21 0021 15:08
     */
    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        FastJsonHttpMessageConverter fastJsonConverter = new FastJsonHttpMessageConverter();
        // 设置允许ContentType
        List<MediaType> supportedMediaTypes = new ArrayList<>();
        supportedMediaTypes.add(MediaType.APPLICATION_JSON);
        supportedMediaTypes.add(MediaType.APPLICATION_ATOM_XML);
        supportedMediaTypes.add(MediaType.APPLICATION_FORM_URLENCODED);
        supportedMediaTypes.add(MediaType.APPLICATION_OCTET_STREAM);
        supportedMediaTypes.add(MediaType.APPLICATION_PDF);
        supportedMediaTypes.add(MediaType.APPLICATION_RSS_XML);
        supportedMediaTypes.add(MediaType.APPLICATION_XHTML_XML);
        supportedMediaTypes.add(MediaType.APPLICATION_XML);
        supportedMediaTypes.add(MediaType.IMAGE_GIF);
        supportedMediaTypes.add(MediaType.IMAGE_JPEG);
        supportedMediaTypes.add(MediaType.IMAGE_PNG);
        supportedMediaTypes.add(MediaType.TEXT_EVENT_STREAM);
        supportedMediaTypes.add(MediaType.TEXT_HTML);
        supportedMediaTypes.add(MediaType.TEXT_MARKDOWN);
        supportedMediaTypes.add(MediaType.TEXT_PLAIN);
        supportedMediaTypes.add(MediaType.TEXT_XML);
        fastJsonConverter.setSupportedMediaTypes(supportedMediaTypes);
        FastJsonConfig fjc = new FastJsonConfig();
        // 配置序列化策略
        // ID_WORKER 生成主键太长导致 js 精度丢失
        // JavaScript 无法处理 Java 的长整型 Long 导致精度丢失，具体表现为主键最后两位永远为 0，解决思路： Long 转为 String 返回
        fjc.setSerializerFeatures(SerializerFeature.BrowserCompatible,
                // 在fastjson中，会自动检测循环引用，并且输出为fastjson专有的引用表示格式。但这个不能被其他JSON库识别，也不能被浏览器识别，所以fastjson提供了关闭循环引用检测的功能。
                SerializerFeature.DisableCircularReferenceDetect,
                // 列化枚举值为数据库存储值
                SerializerFeature.WriteEnumUsingToString);
        SerializeConfig serializeConfig = SerializeConfig.globalInstance;
        // 设置全局LocalDateTime转换
        serializeConfig.put(LocalDateTime.class, (serializer, object, fieldName, fieldType, features) -> Opt.ofNullable(object).ifPresentOrElse(obj -> serializer.out.writeString(((LocalDateTime) obj).format(GlobalTimeResolver.DATE_TIME_FORMATTER)), serializer.out::writeNull));
        fjc.setSerializeConfig(serializeConfig);
        ParserConfig parserConfig = ParserConfig.getGlobalInstance();
        fjc.setParserConfig(parserConfig);
        fastJsonConverter.setFastJsonConfig(fjc);
        converters.add(fastJsonConverter);
    }

}
```

![image-20210817202358414](/imgs/oss/picGo/image-20210817202358414.png)

然后正常

![image-20210817202433808](/imgs/oss/picGo/image-20210817202433808.png)
