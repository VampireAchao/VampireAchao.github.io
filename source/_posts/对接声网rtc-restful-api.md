---
title: 对接声网rtc-restful-api
date: 2023-11-17 08:49:23
tags: java
---

> 没有求知欲的学生，就像没有翅膀的鸟。——萨迪

代码如下：

```java
package com.example.agora.api.webclient;

import com.alibaba.nacos.common.utils.JacksonUtils;
import com.fasterxml.jackson.core.type.TypeReference;
import com.example.agora.api.constant.agora.RtcRequestConst;
import com.example.agora.api.pojo.dto.RtcAddKickRuleDTO;
import com.example.agora.api.pojo.dto.RtcDelKickRuleDTO;
import com.example.agora.api.pojo.dto.RtcUpdateKickRuleDTO;
import com.example.agora.api.pojo.vo.rtc.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Base64;

@Service
public class AgoraRtcClient {

    private final WebClient webClient;
    @Value("${agora.rtc.app-id}")
    private String appId;
    @Value("${agora.rtc.api-key}")
    private String apiKey;
    @Value("${agora.rtc.api-secret}")
    private String apiSecret;

    @Autowired
    public AgoraRtcClient(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("http://api.sd-rtn.com").build();
    }

    private String getAuthorization() {
        // 拼接客户 ID 和客户密钥并使用 base64 编码
        String plainCredentials = apiKey + ":" + apiSecret;
        String base64Credentials = new String(Base64.getEncoder().encode(plainCredentials.getBytes()));
        // 创建 authorization header
        return "Basic " + base64Credentials;
    }

    /**
     * 封禁用户权限-创建规则
     * <a href="https://docportal.shengwang.cn/cn/All/rtc_channel_management_restfulapi?platform=Android#%E5%B0%81%E7%A6%81%E7%94%A8%E6%88%B7%E6%9D%83%E9%99%90">
     */
    public Mono<RtcQueryKickRuleRes> getRtcKickRule() {
        return webClient.get().uri("/dev/v1/kicking-rule?appid={appId}", appId)
                .header(RtcRequestConst.AUTHORIZATION_KEY, getAuthorization())
                .retrieve().bodyToMono(String.class)
                .map(str -> JacksonUtils.toObj(str, new TypeReference<>() {
                }));
    }

    /**
     * 封禁用户权限-获取规则列表
     * <a href="https://docportal.shengwang.cn/cn/All/rtc_channel_management_restfulapi?platform=Android#%E8%8E%B7%E5%8F%96%E8%A7%84%E5%88%99%E5%88%97%E8%A1%A8">
     */
    public Mono<RtcAddDelKickRuleRes> addRtcKickRule(RtcAddKickRuleDTO dto) {
        dto.setAppId(appId);
        return webClient.post().uri("/dev/v1/kicking-rule")
                .header(RtcRequestConst.AUTHORIZATION_KEY, getAuthorization())
                .bodyValue(dto).retrieve().bodyToMono(String.class)
                .map(str -> JacksonUtils.toObj(str, new TypeReference<>() {
                }));
    }

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

    /**
     * 封禁用户权限-删除规则
     * <a href="https://docportal.shengwang.cn/cn/All/rtc_channel_management_restfulapi?platform=Android#%E5%88%A0%E9%99%A4%E8%A7%84%E5%88%99">
     */
    public Mono<RtcAddDelKickRuleRes> updateRtcKickRule(RtcUpdateKickRuleDTO dto) {
        dto.setAppId(appId);
        return webClient.put().uri("/dev/v1/kicking-rule")
                .header(RtcRequestConst.AUTHORIZATION_KEY, getAuthorization())
                .bodyValue(dto).retrieve().bodyToMono(String.class)
                .map(str -> JacksonUtils.toObj(str, new TypeReference<>() {
                }));
    }

    /**
     * 查询在线频道信息-查询用户状态
     * <a href="https://docportal.shengwang.cn/cn/All/rtc_channel_management_restfulapi?platform=Android#%E6%9F%A5%E8%AF%A2%E7%94%A8%E6%88%B7%E7%8A%B6%E6%80%81">
     */
    public Mono<RtcUserInfoRes> getRtcUserInfo(Long uid, String channelName) {
        return webClient.get().uri("/dev/v1/channel/user/property/{appid}/{uid}/{channelName}", appId, uid, channelName)
                .header(RtcRequestConst.AUTHORIZATION_KEY, getAuthorization())
                .retrieve().bodyToMono(String.class)
                .map(str -> JacksonUtils.toObj(str, new TypeReference<>() {
                }));
    }

    /**
     * 查询在线频道信息-查询用户列表
     * <a href="https://docportal.shengwang.cn/cn/All/rtc_channel_management_restfulapi?platform=Android#%E6%9F%A5%E8%AF%A2%E7%94%A8%E6%88%B7%E5%88%97%E8%A1%A8">
     */
    public Mono<RtcUserInfosRes> getRtcUserInfos(String channelName, boolean hostsOnly) {
        return webClient.get().uri("/dev/v1/channel/user/{appid}/{channelName}" + (hostsOnly ? "/hosts_only" : ""),
                        appId, channelName)
                .header(RtcRequestConst.AUTHORIZATION_KEY, getAuthorization())
                .retrieve().bodyToMono(String.class)
                .map(str -> JacksonUtils.toObj(str, new TypeReference<>() {
                }));
    }

    /**
     * 查询在线频道信息-查询项目的频道列表
     * <a href="https://docportal.shengwang.cn/cn/All/rtc_channel_management_restfulapi?platform=Android#%E6%9F%A5%E8%AF%A2%E9%A1%B9%E7%9B%AE%E7%9A%84%E9%A2%91%E9%81%93%E5%88%97%E8%A1%A8">
     */
    public Mono<RtcChannelInfosRes> getRtcChannelInfos() {
        return webClient.get().uri("/dev/v1/channel/{appid}", appId)
                .header(RtcRequestConst.AUTHORIZATION_KEY, getAuthorization())
                .retrieve().bodyToMono(String.class)
                .map(str -> JacksonUtils.toObj(str, new TypeReference<>() {
                }));
    }

}
```

使用的是`webclient`实现反应式请求，注意响应判断请求是否成功也分为两种

```java
package com.example.agora.api.pojo.vo.rtc;

/**
 * BaseRtcRes
 *
 * @author VampireAchao<achao @ hutool.cn>
 * @since 2023/11/14
 */
public interface BaseRtcRes {
    boolean isSuccess();
}
```

第一种是用`status`为`success`判断

```java
package com.example.agora.api.pojo.vo.rtc;

import com.example.agora.api.constant.agora.RtcResponseConst;
import lombok.Data;

/**
 * BaseRtcStatusRes
 *
 * @author VampireAchao<achao @ hutool.cn>
 * @since 2023/11/13
 */
@Data
public abstract class BaseRtcStatusRes implements BaseRtcRes {
    private String status;

    @Override
    public boolean isSuccess() {
        return RtcResponseConst.SUCCESS.equals(status);
    }
}
```

第二种是拿`success`为`true`判断

```java
package com.example.agora.api.pojo.vo.rtc;

import lombok.Data;
import org.dromara.streamquery.stream.core.variable.BoolHelper;

/**
 * BaseRtcStatusRes
 *
 * @author VampireAchao<achao @ hutool.cn>
 * @since 2023/11/13
 */
@Data
public abstract class BaseRtcSuccessRes implements BaseRtcRes {
    private Boolean success;

    @Override
    public boolean isSuccess() {
        return BoolHelper.isTruthy(success);
    }
}
```

其他的实体类就建议自行创建吧
