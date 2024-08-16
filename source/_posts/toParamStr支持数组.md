---
title: toParamStr支持数组
date: 2024-03-22 21:21:05
tags: java
---

> 不登高山，不知天之高也；不临深溪，不知地之厚也；不闻先王之遗言，不知学问之大也。——荀子

```java
import org.springframework.web.reactive.function.client.WebClient;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.*;

public class WebClientExample {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static void main(String[] args) {
        // 示例对象
        var searchParams = // 你的复杂对象
        
        // 将对象转换为查询参数字符串
        String queryParamStr = toParamStr(searchParams);
        
        // 使用 WebClient 发起请求
        WebClient webClient = WebClient.create("http://example.com");
        String response = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/your-api-endpoint")
                        .query(queryParamStr)
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .block();

        System.out.println(response);
    }
}
```

这里需要一个`toParamStr`方法

代码如下：

```java


import cn.hutool.core.net.url.UrlQuery;
import com.fasterxml.jackson.core.type.TypeReference;
import lombok.experimental.UtilityClass;
import org.dromara.streamquery.stream.core.collection.Maps;
import org.dromara.streamquery.stream.core.stream.Steam;

import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import static org.dromara.streamquery.stream.core.stream.collector.Collective.entryToMap;

/**
 * ParamUtil
 *
 * @author VampireAchao<achao @ hutool.cn>
 * @since 2023/10/21
 */
@UtilityClass
public class ParamUtil {

    public static Map<String, String> getParamMapFrom(String param) {
        var queryMap =
                UrlQuery.of(param, StandardCharsets.UTF_8).getQueryMap();
        return Steam.of(queryMap)
                .map(e -> Maps.entry(String.valueOf(e.getKey()), String.valueOf(e.getValue())))
                .collect(entryToMap());
    }

    public static Map<String, String> getParamMapFrom(URI uri) {
        return getParamMapFrom(uri.getQuery());
    }

    public static String toParamStr(Object object) {
        Map<String, Object> map = JsonUtils.mapper.convertValue(object, new TypeReference<>() {
        });
        Map<String, String> resultMap = new HashMap<>();
        buildQueryMap("", map, resultMap);
        return Steam.of(resultMap)
                .map(entry -> entry.getKey() + "=" + entry.getValue())
                .join("&");
    }

    private static void buildQueryMap(String str, Object value, Map<String, String> resultMap) {
        if (value instanceof Map) {
            ((Map<?, ?>) value).forEach((k, v) -> {
                String newPrefix = str.isEmpty() ? k.toString() : str + "." + k;
                buildQueryMap(newPrefix, v, resultMap);
            });
        } else if (value instanceof Iterable<?>) {
            Steam.of((Iterable<?>) value).forEachIdx((item, index) -> {
                String newPrefix = String.format("%s[%d]", str, index);
                buildQueryMap(newPrefix, item, resultMap);
            });
        } else {
            resultMap.put(str, Objects.toString(value, ""));
        }
    }
}

```

单测

```java


import cn.hutool.core.util.URLUtil;
import org.dromara.streamquery.stream.core.collection.Maps;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

/**
 * ParamUtilTest
 *
 * @author VampireAchao<achao @ hutool.cn>
 * @since 2023/10/21
 */
class ParamUtilTest {

    @Test
    void getParamMapFromTest() {
        var uri = URLUtil.toURI("http://localhost:8080?userId=1&name=achao");
        var paramMapFrom = ParamUtil.getParamMapFrom(uri);
        Assertions.assertEquals("1", paramMapFrom.get("userId"));
        Assertions.assertEquals("achao", paramMapFrom.get("name"));

        paramMapFrom = ParamUtil.getParamMapFrom("?userId=1&name=achao");
        Assertions.assertEquals("1", paramMapFrom.get("userId"));
        Assertions.assertEquals("achao", paramMapFrom.get("name"));

        paramMapFrom = ParamUtil.getParamMapFrom("userId=1&name=achao");
        Assertions.assertEquals("1", paramMapFrom.get("userId"));
        Assertions.assertEquals("achao", paramMapFrom.get("name"));
    }

    @Test
    void toParamStrTest() {
        var map = Maps.of();
        map.put("name", "jack");
        map.put("data", Maps.of("age", 18));
        map.put("parameterTypes", new Class[]{String.class, Integer.class});
        map.put("position", new int[][]{new int[]{1, 2}, new int[]{3, 4}});
        var paramStr = ParamUtil.toParamStr(map);
        Assertions.assertEquals("parameterTypes[1]=java.lang.Integer&name=jack&position[1][0]=3&parameterTypes[0]=java.lang.String&data.age=18&position[1][1]=4&position[0][1]=2&position[0][0]=1", paramStr);
    }

}

```
