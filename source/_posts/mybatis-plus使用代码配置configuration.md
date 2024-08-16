---
title: mybatis-plus使用代码配置configuration
date: 2021-09-08 19:22:29
tags: java
---

> 我之所以写作，不是我有才华，而是我有感情。——巴金

![image-20210909194023423](/imgs/oss/picGo/image-20210909194023423.png)

```java
    /**
     * mybatis-plus自定义配置
     *
     * @return com.baomidou.mybatisplus.autoconfigure.ConfigurationCustomizer
     * @author <achao1441470436@gmail.com>
     * @since 2021/9/8 16:09
     */
    @Bean
    public ConfigurationCustomizer configurationCustomizer() {
        return configuration -> {
            // 开启通用枚举支持，默认使用ordinalType
            configuration.setDefaultEnumTypeHandler(org.apache.ibatis.type.EnumOrdinalTypeHandler.class);
            // 开启mybatis日志
            configuration.setLogImpl(org.apache.ibatis.logging.stdout.StdOutImpl.class);
        };
    }
```

类比`yml`中这部分配置

![image-20210909194144826](/imgs/oss/picGo/image-20210909194144826.png)
