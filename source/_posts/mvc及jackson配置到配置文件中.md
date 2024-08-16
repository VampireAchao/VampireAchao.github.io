---
title: mvc及jackson配置到配置文件中
date: 2023-04-08 09:48:03
tags: java
---

> 太多的闲暇犹如死水，终必使人腐绣昏睡。——佚名

见：https://github.com/apache/incubator-streampark/pull/2583

该`pr`把`jackson`配置从代码更换到配置文件中，让使用的用户更改`time-zone`时区、`date-format`等变得更方便，因为很多海外用户，并不是使用咱们一个时区

将原来：

```java
@Bean
  public MappingJackson2HttpMessageConverter jackson2HttpMessageConverter() {
    MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
    ObjectMapper mapper = new ObjectMapper();

    mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    mapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));

    SimpleModule simpleModule = new SimpleModule();
    simpleModule.addSerializer(Long.class, ToStringSerializer.instance);
    simpleModule.addSerializer(Long.TYPE, ToStringSerializer.instance);
    mapper.registerModule(simpleModule);
    converter.setObjectMapper(mapper);
    return converter;
  }
```

改为：

```java
  @Bean
  public Module jacksonModule() {
    SimpleModule module = new SimpleModule();
    module.addSerializer(Long.class, ToStringSerializer.instance);
    module.addSerializer(Long.TYPE, ToStringSerializer.instance);
    return module;
  }
```

然后是配置文件

```yaml
spring:  
  jackson:
    date-format: yyyy-MM-dd HH:mm:ss
    time-zone: GMT+8
    deserialization:
      fail-on-unknown-properties: false
  mvc:
    converters:
      preferred-json-mapper: jackson
```

