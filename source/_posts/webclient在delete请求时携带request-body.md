---
title: webclient在delete请求时携带request body
date: 2023-11-16 08:43:57
tags: java
---

> 君子坦荡荡，小人长戚戚。——孔子

今天分享一个场景：

在对接声网`rtc`时，遇到一个请求，需要在`delete`请求中携带`request body`

所使用的请求框架是`webflux`的`webclient`

如果我们正常使用`delete`方法来构建请求，是无法通过`bodyValue`传入`body`的

![](/imgs/oss/blog-img/2023-11-16-08-47-13-image.png)

但是这里我们可以直接使用：

```java
    /**
     * 封禁用户权限-更新规则
     * <a href="https://docportal.shengwang.cn/cn/All/rtc_channel_management_restfulapi?platform=Android#%E6%9B%B4%E6%96%B0%E8%A7%84%E5%88%99">
     */
    public Mono<RtcAddDelKickRuleRes> delRtcKickRule(RtcDelKickRuleDTO dto) {
        dto.setAppId(appId);
        return webClient.method(HttpMethod.DELETE).uri("/dev/v1/kicking-rule")
                .header(RtcRequestConst.AUTHORIZATION_KEY, getAuthorization())
                .bodyValue(dto).retrieve().bodyToMono(String.class)
                .map(str -> JacksonUtils.toObj(str, new TypeReference<>() {
                }));
    }
```

实现我们通过`delete`请求，且携带`request body`进行对接

注意这并不是标准的写法，建议在`api`设计时候不要这样设计
