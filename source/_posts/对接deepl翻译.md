---
title: 对接deepl翻译
date: 2023-08-02 23:25:08
tags: java
---

> 富而不清白，不如贫而有名誉——弥尔顿

`api`文档如下，需要注意的是必须要绑定支付方式才能显示`authKey`：

https://www.deepl.com/docs-api

代码如下：

```java
import com.dtflys.forest.Forest;
import lombok.val;
import org.dromara.hutool.core.text.StrUtil;
import org.dromara.streamquery.stream.core.collection.Lists;
import org.dromara.streamquery.stream.core.stream.Steam;

import java.util.List;
import java.util.Objects;

public class DeeplUtil {

    private static final DeeplProperties properties = SpringContextHolder.getBean(DeeplProperties.class);

    public static List<String> translate(LanguageTypeEnum source, LanguageTypeEnum target, List<String> contents) {
        if (Objects.isNull(source) || Objects.isNull(target)) {
            return Lists.empty();
        }
        if (Lists.isEmpty(contents)) {
            return Lists.empty();
        }
        val response = Forest.post("https://api-free.deepl.com/v2/translate")
                .addHeader("Authorization", StrUtil.format("DeepL-Auth-Key {}", properties.getAuthKey()))
                .contentTypeJson()
                .addBody("text", contents)
                .addBody("source_lang", source.getDeeplCode())
                .addBody("target_lang", target.getDeeplCode())
                .execute(DeeplResponse.class);
        return Steam.of(response.getTranslations()).map(DeeplTranslation::getText).toList();
    }
}

```
