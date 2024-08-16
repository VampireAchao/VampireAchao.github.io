---
title: webclient模板变量
date: 2023-11-14 08:41:43
tags: java
---

> 过于重视行为规则、拘泥形式，往往在事业上错失良机。——培根

今天分享在使用`webclient`进行开发时的的一个小技巧

例如这个方法：

```java
org.springframework.web.reactive.function.client.DefaultWebClient.DefaultRequestBodyUriSpec#uri(java.lang.String, java.lang.Object...)
```

此处如果直接使用：

```java
webClient.get().uri("/dev/v1/kicking-rule?appid={}", appId)
```

或者

```java
webClient.get().uri("/dev/v1/kicking-rule?appid=%s", appId)
```

哪怕

```java
webClient.get().uri("/dev/v1/kicking-rule?appid=%s", appId)
```

都是不行的。。。

正确的方式应该是：

```java
webClient.get().uri("/dev/v1/kicking-rule?appid={appId}", appId)
```

就想这样：

```java
public Mono<RtcKickRuleQueryRes> getRtcKickRule() {
        return webClient.get()
                .uri("/dev/v1/kicking-rule?appid={appId}", appId)
                .header(RtcRequestConst.AUTHORIZATION_KEY, getAuthorization())
                .retrieve().bodyToMono(String.class)
                .map(str -> JacksonUtils.toObj(str, new TypeReference<>() {
                }));
    }
```
