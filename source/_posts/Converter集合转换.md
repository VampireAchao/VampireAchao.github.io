---
title: Converter集合转换
date: 2022-05-12 12:57:38
tags: java
---

> 只因生命在继续才盲目地产生信念，这种信念是空的。——乔桑塔亚那

前两天写了[mapstruct的spring拓展](https://VampireAchao.github.io/2022/05/01/mapstruct的spring拓展/)

里面提到了一个`Converter`

一般我们是对象之间互转，如果是集合的话，可以用`Stream#map`去一个一个转换

实际上`org.springframework.core.convert.ConversionService`也为我们提供了参数为`org.springframework.core.convert.TypeDescriptor`的转换

例如我这里封装一个集合之间的转换

> [`SpringContextHolder`工具类](https://VampireAchao.github.io/2020/11/12/spring获取bean的第三种方式/)

```java
import java.util.ArrayList;
import java.util.List;

import org.springframework.core.convert.ConversionService;
import org.springframework.core.convert.TypeDescriptor;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;
import org.springframework.util.CollectionUtils;

import lombok.experimental.UtilityClass;

/**
 * 转换工具类
 *
 * @author <achao1441470436@gmail.com>
 * @since 2022/5/7 18:56
 */
@UtilityClass
public class ConvertUtil {

    private static final ConversionService CONVERSION_SERVICE = SpringContextHolder.getBean(ConversionService.class);


    public static <T> T convert(@NonNull Object source, Class<T> targetType) {
        return CONVERSION_SERVICE.convert(source, targetType);
    }


    public static Object convert(@NonNull Object source, @Nullable TypeDescriptor sourceType, TypeDescriptor targetType) {
        return CONVERSION_SERVICE.convert(source, sourceType, targetType);
    }

    @SuppressWarnings("unchecked")
    public static <T, R> List<R> convertList(List<T> source, Class<R> targetClass) {
        if (CollectionUtils.isEmpty(source)) {
            return new ArrayList<>();
        }
        return (List<R>) convert(source, TypeDescriptor.collection(List.class,
                        TypeDescriptor.valueOf(source.get(0).getClass())),
                TypeDescriptor.collection(List.class, TypeDescriptor.valueOf(targetClass)));
    }
}
```

使用起来只需要：

```java
final List<UserVO> result = ConvertUtil.convertList(userList, UserVO.class);
```

注意前置条件需要配置了`User`到`UserVO`的转换器

如何配置？本篇博客第一行有说明
