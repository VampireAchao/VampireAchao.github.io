---
title: byte-buddy实现mybatis-plus动态mapper
date: 2023-01-11 20:47:59
tags: java
---

> 掌握了教育，就掌握了国家——法国谚语

构造动态`mapper`部分代码如下：

```java
    public static void buildMapper(Configuration configuration, Class<?> entityClass) {
        if (!(configuration instanceof MybatisConfiguration)) {
            throw new IllegalArgumentException("configuration must be MybatisConfiguration");
        }
        ENTITY_MAPPER_CLASS_CACHE.computeIfAbsent(entityClass, k -> {
            Class<?> dynamicMapper = new ByteBuddy()
                    .makeInterface(TypeDescription.Generic.Builder.parameterizedType(IMapper.class, entityClass).build())
                    .name(String.format("io.github.vampireachao.mapper.%sMapper", entityClass.getSimpleName()))
                    .make()
                    .load(ClassUtils.class.getClassLoader())
                    .getLoaded();
            configuration.addMapper(dynamicMapper);
            return dynamicMapper;
        });
    }
```

这里是放到一个`map`里，获取的地方如下：

```java
    public static <T> Class<?> getMapperClass(Class<T> clazz) {
        if (clazz == null || clazz.isPrimitive() || SimpleTypeRegistry.isSimpleType(clazz) || clazz.isInterface()) {
            throw ExceptionUtils.mpe("找不到指定的class！请仅在明确确定会有 class 的时候，调用该方法");
        }
        Class<?> targetClass = ClassUtils.getUserClass(clazz);
        Class<?> mapperClass = ENTITY_MAPPER_CLASS_CACHE.get(targetClass);
        if (null != mapperClass) {
            return mapperClass;
        }
        Class<?> currentClass = clazz;
        while (null == mapperClass && Object.class != currentClass) {
            currentClass = currentClass.getSuperclass();
            mapperClass = ENTITY_MAPPER_CLASS_CACHE.get(ClassUtils.getUserClass(currentClass));
        }
        if (mapperClass == null) {
            mapperClass = ClassUtils.toClassConfident(getTableInfo(clazz).getCurrentNamespace());
        }
        if (mapperClass != null) {
            ENTITY_MAPPER_CLASS_CACHE.put(targetClass, mapperClass);
        }
        return mapperClass;
    }
```

使用：

```java
    @Test
    void testBuildMapper() {
        UserInfo userInfo = new UserInfo() {{
            setId(1L);
            setName("Jone");
        }};
        Configuration configuration = TableInfoHelper.getTableInfo(UserInfo.class).getConfiguration();
        Database.buildMapper(configuration, UserInfo.class);
        TableInfo tableInfo = TableInfoHelper.getTableInfo(userInfo.getClass());
        Assertions.assertNotNull(tableInfo);
        Assertions.assertFalse(Database.list(userInfo.getClass()).isEmpty());
    }
```

完整源码：https://gitee.com/VampireAchao/stream-query