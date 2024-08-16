---
title: webclient远程调用
date: 2023-10-01 08:29:24
tags: java
---

> 无论谁想获得自己的名声，都应该隐藏起他的自负。——斯威夫特

我们在`webflux`场景下可以使用`webclient`

依赖就包含在了`webflux`中

```xml
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-webflux</artifactId>
		</dependency>
```

这里使用的话：

```java
import cn.dev33.satoken.same.SaSameUtil;
import cn.hutool.core.map.MapUtil;
import cn.hutool.json.JSONUtil;
import com.alibaba.nacos.common.utils.JacksonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
public class AuthService {

    private final WebClient webClient;

    @Autowired
    public AuthService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("http://auth-service/user").build();
    }

    public Mono<List<String>> getPermissionList(Object loginId, String loginType) {
        MultiValueMap<String, String> param = new LinkedMultiValueMap<>(2);
        param.add("loginId", loginId.toString());
        param.add("loginType", loginType);
        return webClient.post()
                .uri("/getPermissionList")
                .headers(m -> {
                    m.add(SaSameUtil.SAME_TOKEN, SaSameUtil.getToken());
                })
                .body(BodyInserters.fromFormData(param))
                .retrieve()
                .bodyToFlux(String.class)
                .flatMap(str -> {
                    Hsswonse res = JacksonUtils.toObj(str, HsswResp.class);
                    return Flux.fromIterable((List<String>) res.getData());
                })
                .collectList()
                .doOnError(Throwable::printStackTrace);
    }

    public Mono<List<String>> getRoleList(Object loginId) {
        MultiValueMap<String, String> param = new LinkedMultiValueMap<>(2);
        param.add("loginId", loginId.toString());
        return webClient.post()
                .uri("/getRoleList")
                .headers(m -> {
                    m.add(SaSameUtil.SAME_TOKEN, SaSameUtil.getToken());
                })
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(JSONUtil.toJsonStr(MapUtil.of("loginId", loginId))), String.class)
                .retrieve()
                .bodyToFlux(String.class)
                .doOnError(Throwable::printStackTrace)
                .flatMap(str -> {
                    HsswResponse = JacksonUtils.toObj(str, HsswResponse.cla
                    return Flux.fromIterable((List<String>) res.getData());
                })
                .collectList()
                .doOnError(Throwable::printStackTrace);
    }
}

```

剩下就可以向普通的`service`一样调用就行
