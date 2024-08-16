---
title: stream-core实现枚举校验
date: 2022-10-12 12:49:19
tags: java
---

> 同一个美丽而聪慧的人相处，能使人紧张的神经放松，感情变得柔和——巴尔扎尔

引入依赖：

```xml
<!-- https://search.maven.org/artifact/io.github.vampireachao/stream-query -->
<dependency>
    <groupId>io.github.vampireachao</groupId>
    <artifactId>stream-core</artifactId>
    <version>1.1.12</version>
</dependency>
```

编写代码：

```java
    @Test
    void test() {

        class User {
            public GenderEnum getGender() {
                return null;
            }
        }
        String exceptionMessage = null;

        User user = new User();
        try {
            require(user::getGender);
        } catch (IllegalArgumentException e) {
            exceptionMessage = e.getMessage();
        }
        Assertions.assertEquals("'gender'需要'MALE|FEMALE'其一", exceptionMessage);
    }

    @SuppressWarnings("unchecked")
    public static <T extends Enum<T>> void require(SerSupp<T> enumSupp) {
        LambdaExecutable executable = LambdaHelper.resolve(enumSupp);
        Enum<T>[] enumConstants = ((Class<Enum<T>>) executable.getReturnType()).getEnumConstants();
        Sf.of(enumSupp.get()).require(() -> new IllegalArgumentException(
                "'" + BeanHelper.getPropertyName(executable.getName()) +
                        "'需要'" + Steam.of(enumConstants).map(Enum::name).join("|") + "'其一"));
    }
```

当你使用`require(user::getGender)`时，如果`gender`为`null`，则会抛出异常，并提示：`'gender'需要'MALE|FEMALE'其一`

这里获取了`getGender`的`lambda`方法名称，以及返回值枚举类型，通过遍历枚举的`name`列举选项，拼接为字符串