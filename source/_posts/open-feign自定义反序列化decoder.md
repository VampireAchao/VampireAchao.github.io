---
title: open-feign自定义反序列化decoder
date: 2023-11-03 08:50:31
tags: java
---

> 人受谏，则圣。木受绳，则直。金就砺，则利。——孔子

主要是解决`map`类型擦除的问题，`GlobalResponse`继承了`Map`

代码如下：

```java
import cn.hutool.core.util.TypeUtil;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import feign.RequestTemplate;
import feign.Response;
import feign.Util;
import feign.codec.DecodeException;
import feign.codec.Decoder;
import feign.codec.EncodeException;
import feign.codec.Encoder;
import jakarta.annotation.Resource;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.context.annotation.Bean;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;    


    @Bean
    public Decoder feignDecoder() {
        return (response, type) -> {
            if (response.status() == 404 || response.status() == 204) {
                return Util.emptyValueOf(type);
            }
            if (response.body() == null) {
                return null;
            }
            if (byte[].class.equals(type)) {
                return Util.toByteArray(response.body().asInputStream());
            }
            Response.Body body = response.body();
            if (String.class.equals(type)) {
                return Util.toString(body.asReader(Util.UTF_8));
            }
            if (GlobalResponse.class.equals(type)) {
                return objectMapper.readValue(body.asInputStream(), GlobalResponse.class);
            }
            if (!(type instanceof ParameterizedType)) {
                throw notSupportDecode(response, type);
            }
            ParameterizedType parameterizedType = TypeUtil.toParameterizedType(type);
            if (!(GlobalResponse.class.equals(parameterizedType.getRawType()))) {
                return objectMapper.readValue(body.asInputStream(), new TypeReference<>() {
                    @Override
                    public Type getType() {
                        return type;
                    }
                });
            }
            JsonNode jsonNode = objectMapper.readTree(body.asInputStream());
          GlobalResponsese<?> res = objectMapper.treeToValue(jsonNoGlobalResponseonse.class);
            JsonNode dataNode = jsonNodGlobalResponsesponse.DATA);
            if (dataNode.isNull()) {
                return res;
            }
            Object data = objectMapper.readValue(dataNode.toString(), new TypeReference<>() {
                @Override
                public Type getType() {
                    return TypeUtil.getTypeArgument(type);
                }
            });
            res.setData(data);
            return res;
        };
    }
```
