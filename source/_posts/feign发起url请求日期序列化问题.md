---
title: feign发起url请求日期序列化问题
date: 2023-12-08 19:15:02
tags: java
---

> 人生得一知己足矣，斯世当以同怀视之。——鲁迅

今天在`open-feign`使用中踩坑，前两天介绍了[feign使用url参数传参@SpringQueryMap使用](https://VampireAchao.github.io/2023/11/25/feign%E4%BD%BF%E7%94%A8url%E5%8F%82%E6%95%B0%E4%BC%A0%E5%8F%82-SpringQueryMap%E4%BD%BF%E7%94%A8/)

然后在进行时间类型的传输过程中发现默认的时间时区有误导致相差`8`小时，且格式不是我们规定的格式

首先我们需要配置：

```java
    @Bean
    public QueryMapEncoder queryMapEncoder() {
        return new FieldQueryMapEncoder() {
            @Override
            public Map<String, Object> encode(Object object) throws EncodeException {
                Map<String, Object> result = super.encode(object);
                var map = (Map<Class<?>, Object>) ReflectUtil.getFieldValue(this, "classToMetadata");
                var fields = (List<Field>) ReflectUtil.getFieldValue(map.get(object.getClass()), "objectFields");
                var typeFieldsMap = Steam.of(fields).group(Field::getType);
                Steam.of(typeFieldsMap.get(Date.class)).forEach((SerCons<Field>) dateField -> result.put(dateField.getName(), DateUtils.format((Date) dateField.get(object))));
                Steam.of(typeFieldsMap.get(LocalDate.class)).forEach((SerCons<Field>) dateField -> result.put(dateField.getName(), DateUtils.format((LocalDate) dateField.get(object))));
                Steam.of(typeFieldsMap.get(LocalDateTime.class)).forEach((SerCons<Field>) dateField -> result.put(dateField.getName(), DateUtils.format((LocalDateTime) dateField.get(object))));
                return result;
            }
        };
    }
```

这里是让其解析完毕后再用反射去实现，实际并不是最优解，主要是注入自己实现的`QueryMapEncoder`

然后日期序列化：[全局日期请求转换处理](https://VampireAchao.github.io/2021/04/04/%E5%85%A8%E5%B1%80%E6%97%A5%E6%9C%9F%E8%AF%B7%E6%B1%82%E8%BD%AC%E6%8D%A2%E5%A4%84%E7%90%86/)

```java
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.beans.PropertyEditorSupport;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Slf4j
@RestControllerAdvice
@ConditionalOnWebApplication(type = ConditionalOnWebApplication.Type.SERVLET) // 仅当为WebMvc应用时激活
public class GlobalUrlParamResolveHandler {

    @InitBinder
    public void initBinder(WebDataBinder binder) {
        // Date 类型转换
        binder.registerCustomEditor(Date.class, new PropertyEditorSupport() {
            @Override
            @SneakyThrows
            public void setAsText(String text) {
                setValue(DateUtils.textToDate(text));
            }
        });
        // LocalDate类型转换
        binder.registerCustomEditor(LocalDate.class, new PropertyEditorSupport() {
            @Override
            public void setAsText(String text) {
                setValue(DateUtils.textToLocalDate(text));
            }
        });
        // LocalDateTime类型转换
        binder.registerCustomEditor(LocalDateTime.class, new PropertyEditorSupport() {
            @Override
            public void setAsText(String text) {
                setValue(DateUtils.textToLocalDateTime(text));
            }
        });
    }

}
```

成功解决！
