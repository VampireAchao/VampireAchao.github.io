---
title: Class下的getEnumConstants
date: 2021-05-13 15:44:32
tags: java
---

> 人生是一次航行。航行中必然遇到从各个方面袭来的劲风,然而每一阵风都会加快你的航速。只要你稳住航舵,即使是暴风雨,也不会使你偏离航向。 ——西·切威廉斯【美】

我们使用枚举过程中，可能会有这种需求

通过传入一个枚举的`Class`获取枚举里的各个常量值

其实这里有一个函数可以满足我们的需求

```java
java.lang.Class#getEnumConstants
```

在`java.lang.Class`类下有个函数`getEnumConstants`

我们可以这么使用

```java
    public static void main(String[] args) {
        LikeSelectTypeEnum[] values = getEnumValues(LikeSelectTypeEnum.class);
        Arrays.stream(values).forEach(System.out::println);
    }

    /**
     * 通过class获取枚举内的常量
     *
     * @param type 枚举对应的class
     * @return T[] 常量数组
     * @author <achao1441470436@gmail.com>
     * @since 2021/5/13 0013 15:50
     */
    public static <T> T[] getEnumValues(Class<T> type) {
        if (type == null) {
            return null;
        }
        return type.getEnumConstants();
    }
```

输出结果

![image-20210513155207879](/imgs/oss/picGo/image-20210513155207879.png)