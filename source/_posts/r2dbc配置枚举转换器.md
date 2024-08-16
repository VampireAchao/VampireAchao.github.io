---
title: r2dbc配置枚举转换器
date: 2024-03-04 20:53:37
tags: java
---

> 你如果愿意做哲学家，尽管做好了，但是你在你的全部哲学思维中，仍然要做一个人。——休谟

首先配置`Converter`

```java



import jakarta.annotation.Nullable;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.convert.WritingConverter;
import org.springframework.stereotype.Component;

/**
 * EnumToIntConverter
 *
 * @author achao@apache.org
 */
@Component
@WritingConverter
public class AgoraNotifyTypeEnumToIntConverter implements Converter<AgoraNotifyTypeEnum, Integer> {
    @Override
    public Integer convert(@Nullable AgoraNotifyTypeEnum source) {
        if (source == null) {
            return null;
        }
        return source.getValue();
    }
}

```

以及

```java


import cn.hutool.core.util.EnumUtil;

import jakarta.annotation.Nullable;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.convert.ReadingConverter;
import org.springframework.stereotype.Component;

/**
 * IntToIEnumConverter
 *
 * @author achao@apache.org
 */
@Component
@ReadingConverter
public class IntToAgoraNotifyTypeEnumConverter implements Converter<Integer, AgoraNotifyTypeEnum> {
    @Override
    public AgoraNotifyTypeEnum convert(@Nullable Integer source) {
        if (source == null) {
            return null;
        }
        return EnumUtil.getBy(AgoraNotifyTypeEnum::getValue, source);
    }
}

```

然后还需要配置

```java


import io.r2dbc.spi.ConnectionFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.convert.CustomConversions;
import org.springframework.data.r2dbc.convert.R2dbcCustomConversions;
import org.springframework.r2dbc.connection.R2dbcTransactionManager;
import org.springframework.transaction.ReactiveTransactionManager;
import org.springframework.transaction.reactive.TransactionalOperator;

import java.util.List;

/**
 * R2dbcConfig
 *
 * @author VampireAchao<achao @ hutool.cn>
 * @since 2023/10/27
 */
@Configuration
public class R2dbcConfig {

    @Bean
    public R2dbcCustomConversions r2dbcCustomConversions(List<Converter<?, ?>> converters) {
        return new R2dbcCustomConversions(CustomConversions.StoreConversions.NONE, converters);
    }
}

```
