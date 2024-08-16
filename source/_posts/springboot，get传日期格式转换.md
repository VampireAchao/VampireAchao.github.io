---
title: springboot，get传日期格式转换
date: 2022-11-09 13:17:25
tags: java
---

> 男女双方愿意相互观察是爱情的第一征象——瓦西列

对于这种请求：

```http
http://api.achao.cn/example?date=2022-11-09
```

我们可以配置转换器，`mvc`则会自动帮我们转

```java
import cn.hutool.core.date.DatePattern;
import io.github.vampireachao.stream.core.optional.Sf;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.ConversionService;
import org.springframework.core.convert.converter.Converter;
import org.springframework.core.convert.support.GenericConversionService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

/**
 * @author <achao1441470436@gmail.com>
 * @since 2022/4/28 18:30
 */
@Configuration
public class ConvertConfig {

    @Autowired
    public <T, R> ConvertConfig(ConversionService conversionService, List<Converter<T, R>> converters) {
        GenericConversionService genericConversionService = (GenericConversionService) conversionService;
        genericConversionService.addConverter(new Converter<String, LocalDate>() {
            @Override
            public LocalDate convert(String source) {
                return Sf.ofStr(source).mayLet(text -> LocalDate.parse(text, DateTimeFormatter.ofPattern(DatePattern.NORM_DATE_PATTERN))).get();
            }
        });
        genericConversionService.addConverter(new Converter<String, LocalDateTime>() {
            @Override
            public LocalDateTime convert(String source) {
                return Sf.ofStr(source).mayLet(text -> LocalDateTime.parse(text, DateTimeFormatter.ofPattern(DatePattern.NORM_DATE_PATTERN))).get();
            }
        });
        converters.forEach(genericConversionService::addConverter);
    }


}
```

