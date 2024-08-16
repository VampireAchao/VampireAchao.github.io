---
title: 对接chatGPT
date: 2023-07-21 21:38:37
tags: java
---

> 人不能制情欲，则被情欲所制。——贺拉斯

今天使用`forest`对接`chatGPT`

https://forest.dtflyx.com/

chatGPT的api文档：https://platform.openai.com/docs/api-reference/making-requests

```java
import com.dtflys.forest.Forest;
import com.dtflys.forest.http.ForestProxy;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.dromara.hutool.core.text.StrUtil;
import org.dromara.streamquery.stream.core.collection.Lists;
import org.dromara.streamquery.stream.core.collection.Maps;
import org.dromara.streamquery.stream.core.stream.Steam;

import java.util.Map;
import java.util.Objects;

/**
 * {@code
 * curl https://api.openai.com/v1/chat/completions \
 * -H "Content-Type: application/json" \
 * -H "Authorization: Bearer $APP_KEY" \
 * -d '{
 * "model": "gpt-3.5-turbo",
 * "messages": [{"role":"system","content":"translate english to chinese"},{"role": "user", "content": "Hello, my name is John. What is your name?"}],
 * "temperature": 0.7
 * }'
 * }
 */
@Slf4j
public class ChatGPTUtil {
    private static final ChatGPTProperties properties = SpringContextHolder.getBean(ChatGPTProperties.class);

    public static String translate(LanguageTypeEnum source, LanguageTypeEnum target, String content) {
        if (Objects.isNull(source) || Objects.isNull(target)) {
            return "";
        }
        if (StrUtil.isBlank(content)) {
            return "";
        }
        val prompt = StrUtil.format("translate {} to {}", source.getLocale().getLanguage(), target.getLocale().getLanguage());
        return request(prompt, content);
    }

    public static String request(String prompt, String completion) {
        if (StrUtil.isBlank(completion)) {
            return "";
        }
        val messages = Lists.<Map<String, Object>>of();
        if (StrUtil.isNotBlank(prompt)) {
            messages.add(Maps.of("role", "system", "content", prompt));
        }
        messages.add(Maps.of("role", "user", "content", completion));
        val request = Forest.post("https://api.openai.com/v1/chat/completions")
                .setConnectTimeout(properties.getTimeout()).setReadTimeout(properties.getTimeout())
                .addHeader("Authorization", "Bearer " + properties.getApiKey())
                .contentTypeJson()
                .addBody(Maps.of("model", properties.getModel(), "messages", messages));
        if (properties.getIsProxy()) {
            request.setProxy(new ForestProxy("127.0.0.1", 7890));
        }
        val chatCompletion = request.execute(ChatCompletion.class);
        log.info("{}", chatCompletion);
        return Steam.of(chatCompletion.getChoices())
                .map(ChatCompletion.Choice::getMessage).map(ChatCompletion.Message::getContent).join();
    }
}

```
