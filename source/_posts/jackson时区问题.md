---
title: jackson时区问题
date: 2022-10-25 13:10:29
tags: java
---

> 万两黄金容易得，知心一个也难求——曹雪芹

今天发现日期数据返回后日期错乱

怀疑是时区问题，果然改了全局`jackson`序列化配置就好了

```java
ObjectMapper objectMapper = new ObjectMapper();
objectMapper.setTimeZone(TimeZone.getTimeZone("GMT+8"));
```

完整代码：

```java
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

