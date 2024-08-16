---
title: jackson kt module
date: 2022-11-02 12:51:49
tags: java
---

> 儿童在学校的相似，是强制的结果。一旦毕业，强制随即结束。——爱尔维修

我们在使用`jackson`时，如果项目还包含`kotlin`，则会有警告

![image-20221102125512617](/imgs/oss/picGo/image-20221102125512617.png)

此时需要引入依赖

```xml
        <dependency>
            <groupId>com.fasterxml.jackson.module</groupId>
            <artifactId>jackson-module-kotlin</artifactId>
            <version>2.11.3</version>
        </dependency>
```

并添加`module`

```java
import com.fasterxml.jackson.module.kotlin.KotlinModule;

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
        MappingJackson2HttpMessageConverter jackson2HttpMessageConverter = new MappingJackson2HttpMessageConverter();
        ObjectMapper objectMapper = new ObjectMapper();
        // 添加kotlin模块
        objectMapper.registerModule(new KotlinModule());
        objectMapper.setTimeZone(TimeZone.getTimeZone("GMT+8"));
        SimpleModule simpleModule = new SimpleModule();
        simpleModule.addSerializer(Long.class, ToStringSerializer.instance);
        simpleModule.addSerializer(Long.TYPE, ToStringSerializer.instance);
        objectMapper.registerModule(simpleModule);

        JavaTimeModule module = new JavaTimeModule();
        module.addDeserializer(LocalDateTime.class, new LocalDateTimeDeserializer(DateTimeFormatter.ofPattern(DatePattern.NORM_DATETIME_PATTERN)));
        module.addDeserializer(LocalDate.class, new LocalDateDeserializer(DateTimeFormatter.ofPattern(DatePattern.NORM_DATE_PATTERN)));
        module.addSerializer(new LocalDateSerializer(DateTimeFormatter.ofPattern(DatePattern.NORM_DATE_PATTERN)));
        module.addSerializer(new LocalDateTimeSerializer(DateTimeFormatter.ofPattern(DatePattern.NORM_DATETIME_PATTERN)));
        objectMapper.setDateFormat(new SimpleDateFormat(DatePattern.NORM_DATETIME_PATTERN));
        objectMapper.registerModule(module);

        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        objectMapper.configure(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true);

        jackson2HttpMessageConverter.setObjectMapper(objectMapper);
        converters.add(jackson2HttpMessageConverter);
    }
}
```

