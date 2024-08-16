---
title: springboot中jackson的yml配置
date: 2021-09-18 20:57:32
tags: java
---

> 生命是短暂的，如果我能让别人以更短的时间，看到更多的美，这难道不是一件值得奋斗的事情吗？——灵遁者

配置如下：

```yaml
spring: 
  jackson:
    # 日期序列化格式
    date-format: yyyy-MM-dd HH:mm:ss
    # 序列化和反序列化属性配置，默认是保留字段名称，并从方法中删除 set/get/is 前缀（以及小写首字母大写字符序列）
    property-naming-strategy: com.fasterxml.jackson.databind.PropertyNamingStrategy
    # 序列化属性可见度
    visibility:
      # 所有的GETTER都设置为只有公共可见
      GETTER: PUBLIC_ONLY
      # 所有的SETTER都设置为只有公共可见
      SETTER: PUBLIC_ONLY
      # 所有的CREATOR都设置为除了PRIVATE的都可见
      CREATOR: NON_PRIVATE
      # 所有的field都设置为只有公共可见
      FIELD: PUBLIC_ONLY
      # 所有的IS_GETTER都设置为只有公共可见
      IS_GETTER: PUBLIC_ONLY
      # 没有访问器受到影响
      NONE: PUBLIC_ONLY
      # 所有访问器都受到影响
      ALL: DEFAULT
    # 序列化配置，有多个
    serialization:
      # 底层格式化序列后的JSON，换行、缩进等
      INDENT_OUTPUT: true
    # 反序列化配置，有多个
    deserialization:
      # 浮点数序列化为bigDecimal
      USE_BIG_DECIMAL_FOR_FLOATS: true
    # mapper配置，多个
    mapper:
      # 忽略大小写
      ACCEPT_CASE_INSENSITIVE_PROPERTIES: true
    # 序列化器配置，多个
    parser:
      # 配置json的key可以忽略引号
      ALLOW_UNQUOTED_FIELD_NAMES: true
    # 反序列化配置，多个
    generator:
      # 确定是否使用BigDecimal.toPlainString()序列化BigDecimal
      WRITE_BIGDECIMAL_AS_PLAIN: true
    # 配置@JsonInclude默认包含哪些属性
    defaultPropertyInclusion: USE_DEFAULTS
    # 配置时区
    timeZone: Asia/Shanghai
    # 配置地区
    locale: CHINA
```

关于`visibility`的值，可以参考我之前这篇博客：

https://VampireAchao.github.io/2021/04/09/JsonAutoDetect/
