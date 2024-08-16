---
title: mvc配置fastjson序列化枚举
date: 2021-08-09 19:23:00
tags: java
---

> 怯懦囚禁人的灵魂，希望可以令你感受到自由，强者自救，圣者渡人。——《肖申克的救赎》

我们可以使用`SerializerFeature.WriteEnumUsingToString`去完成枚举的序列化操作：

例如我这里某对象属性为枚举类型

![image-20210809192748365](/imgs/oss/picGo/image-20210809192748365.png)

我们当使用该`POJO`接收参数时，我们如果手动转换的话比较麻烦

我们配置如下的后就可以直接传入枚举常量的名字进行映射

![image-20210809192609887](/imgs/oss/picGo/image-20210809192609887.png)

例如我此处

![image-20210809192918305](/imgs/oss/picGo/image-20210809192918305.png)

最后传入`type=INDEX_SHUFFLE`，成功完成映射

![image-20210809193053398](/imgs/oss/picGo/image-20210809193053398.png)

完整代码

```java
package com.ruben.zsxh.config;

import com.alibaba.fastjson.serializer.SerializeConfig;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.alibaba.fastjson.support.config.FastJsonConfig;
import com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter;
import org.springframework.boot.autoconfigure.web.servlet.error.ErrorViewResolver;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.util.unit.DataSize;
import org.springframework.util.unit.DataUnit;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.servlet.MultipartConfigElement;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
        fjc.setSerializerFeatures(SerializerFeature.BrowserCompatible);
        // 列化枚举值为数据库存储值
        fjc.setSerializerFeatures(SerializerFeature.WriteEnumUsingToString);
        SerializeConfig serializeConfig = SerializeConfig.globalInstance;
        // 设置全局LocalDateTime转换
        serializeConfig.put(LocalDateTime.class, (serializer, object, fieldName, fieldType, features) -> Opt.ofNullable(object).ifPresentOrElse(obj -> serializer.out.writeString(((LocalDateTime) obj).format(GlobalTimeResolver.DATE_TIME_FORMATTER)), serializer.out::writeNull));
        fjc.setSerializeConfig(serializeConfig);
        fastJsonConverter.setFastJsonConfig(fjc);
        converters.add(fastJsonConverter);
    }
}
```

