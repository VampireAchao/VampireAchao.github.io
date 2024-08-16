---
title: mybatis-plus代码方式配置
date: 2022-11-28 12:41:36
tags: java
---

> 发光的不全是黄金——莎士比亚

示例：https://github.com/apache/incubator-streampark/pull/2099

原来的方式：

```yaml
# mybatis plus setting
mybatis-plus:
  type-aliases-package: org.apache.streampark.console.*.entity
  mapper-locations: classpath:mapper/*/*.xml
  configuration:
    jdbc-type-for-null: null
  global-config:
    db-config:
      id-type: auto
    # close mybatis-plus banner
    banner: false
```

现在的方式：

```java
	/**
     * mybatis plus setting
     *
     * @return MybatisPlusPropertiesCustomizer
     */
    @Bean
    public MybatisPlusPropertiesCustomizer mybatisPlusPropertiesCustomizer() {
        return properties -> {
            properties.setTypeAliasesPackage("org.apache.streampark.console.*.entity");
            properties.setMapperLocations(new String[]{"classpath:mapper/*/*.xml"});
            MybatisConfiguration mybatisConfiguration = new MybatisConfiguration();
            mybatisConfiguration.setJdbcTypeForNull(IdType.NULL);
            properties.setConfiguration(mybatisConfiguration);
            GlobalConfig globalConfig = GlobalConfigUtils.getGlobalConfig(mybatisConfiguration);
            GlobalConfig.DbConfig dbConfig = globalConfig.getDbConfig();
            dbConfig.setIdType(IdType.AUTO);
            // close mybatis-plus banner
            globalConfig.setBanner(false);
            properties.setGlobalConfig(globalConfig);
        };
    }
```

