---
title: bean-searcher整合mybatis-plus逻辑删除
date: 2022-06-12 11:36:31
tags: java
---

> 人死像熟透的梨，离树而落，梨者，离也。——《活着》

需要用到参数过滤器：

https://bs.zhxu.cn/guide/latest/advance.html#%E5%8F%82%E6%95%B0%E8%BF%87%E6%BB%A4%E5%99%A8

```java
    @Bean
    public ParamFilter logicDeleteFilter() {
        return new ParamFilter() {
            @Override
            public <T> Map<String, Object> doFilter(BeanMeta<T> beanMeta, Map<String, Object> paraMap) {
                // beanMeta 是正在检索的实体类的元信息, paraMap 是当前的检索参数
                // 返回过滤后的检索参数
                TableInfo tableInfo = TableInfoHelper.getTableInfo(beanMeta.getBeanClass());
                Opt.ofNullable(tableInfo).ifPresent(info -> {
                    TableFieldInfo logicDelField = tableInfo.getLogicDeleteFieldInfo();
                    String logicNoDelVal = logicDelField.getLogicNotDeleteValue();
                    if (StringPool.NULL.equalsIgnoreCase(logicNoDelVal)) {
                        MapUtils.builder(paraMap).field(logicDelField.getProperty()).op(IsNull.class);
                    } else {
                        MapUtils.builder(paraMap).field(logicDelField.getProperty(), logicNoDelVal);
                    }
                });
                return paraMap;
            }
        };
    }
```

