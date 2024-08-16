---
title: 获取泛型map工具类
date: 2022-12-16 17:59:11
tags: java
---

> 一个人如果抛弃他忠实的朋友，就等于抛弃他最珍贵的声明。——索福克勒斯

代码如下：

```java
    public static Map<String, Type> getGenericMap(Type paramType) {
        Type type = resolveType(paramType);
        if (type instanceof ParameterizedTypeImpl) {
            ParameterizedTypeImpl ty = (ParameterizedTypeImpl) type;
            final Class<?> rawType = ty.getRawType();
            return Steam.of(rawType.getTypeParameters()).map(Type::getTypeName)
                    .zip(Steam.of(ty.getActualTypeArguments()), Maps::entry)
                    .collect(Collective.entryToMap(LinkedHashMap::new));
        }
        return new HashMap<>();
    }

    private static Type resolveType(Type paramType) {
        Type type;
        for (type = paramType;
             type instanceof Class;
             type = ((Class<?>) type).getGenericSuperclass()) {
            if (Object.class.equals(type)) {
                Type[] genericInterfaces = ((Class<?>) type).getGenericInterfaces();
                if (genericInterfaces.length > 0 && Objects.nonNull(genericInterfaces[0])) {
                    type = genericInterfaces[0];
                }
            }
        }
        return type;
    }
```

使用如下：

```java
    @Test
    void testGetGenericMap() {
        final Map<String, Type> genericMap = ReflectHelper.getGenericMap(new HashMap<String, TreeMap<String, Object>>() {
        }.getClass());
        Assertions.assertEquals(String.class, genericMap.get("K"));
        Assertions.assertEquals(ParameterizedTypeImpl.make(TreeMap.class, new Type[]{String.class, Object.class}, null), genericMap.get("V"));
    }
```

源码地址：https://gitee.com/VampireAchao/stream-query/blob/master/stream-core/src/main/java/io/github/vampireachao/stream/core/reflect/ReflectHelper.java