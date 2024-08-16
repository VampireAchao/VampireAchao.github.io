---
title: satoken+webflux获取header以及body
date: 2024-02-29 20:03:47
tags: java
---

> 你若要喜爱自己的价值，你就得给世界创造价值。——歌德

代码如下：

```java


import cn.dev33.satoken.context.SaHolder;
import cn.dev33.satoken.context.SaTokenContextForThreadLocalStorage;
import cn.dev33.satoken.reactor.context.SaReactorSyncHolder;
import cn.dev33.satoken.reactor.filter.SaReactorFilter;
import cn.dev33.satoken.router.SaRouter;
import jakarta.annotation.Resource;
import org.jetbrains.annotations.NotNull;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DataBufferFactory;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.core.io.buffer.DefaultDataBufferFactory;
import org.springframework.http.server.reactive.ServerHttpRequestDecorator;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Objects;

/**
 * SaReactorFilter
 *
 * @author achao@apache.org
 */
@Component
public class SaReactorFilter extends SaReactorFilter {

    @Lazy
    @Resource
    private DataBufferFactory dataBufferFactory;
    @Resource
    private AgoraProperties agoraProperties;

    public SaReactorReactorFilter() {
        // 拦截所有路由
        addInclude("/**");
        setAuth(router -> {
            SaRouter.match("/api/rtc/**").check(r -> {
                // 获取header中的值
                var token = SaTokenContextForThreadLocalStorage.getRequest().getHeader("token");
                if (token == null) {
                    throw new ApiClientException("请检查请求头是否包含token");
                }
                // 获取body
                var requestBody = SaHolder.getStorage().get("requestBody", "");
                if (requestBody == null) {
                    throw new ApiClientException("请检查请求体是否为空");
                }
               
            });
        });
    }

    @Bean
    public DataBufferFactory dataBufferFactory() {
        return new DefaultDataBufferFactory();
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        SaReactorSyncHolder.setContext(exchange);
        return DataBufferUtils.join(exchange.getRequest().getBody())
                .flatMap(dataBuffer -> {
                    String requestBody = DataBufferUtil.dataBufferToString(dataBuffer);
                    SaHolder.getStorage().set("requestBody", requestBody);
                    ServerHttpRequestDecorator decoratedRequest = new ServerHttpRequestDecorator(exchange.getRequest()) {
                        public @Override @NotNull Flux<DataBuffer> getBody() {
                            return Flux.just(dataBufferFactory.wrap(requestBody.getBytes()));
                        }
                    };
                    return super.filter(exchange.mutate().request(decoratedRequest).build(), chain);
                });
    }
}

```

对应的`DataBufferUtil`

```java


import lombok.experimental.UtilityClass;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DataBufferUtils;

import java.nio.charset.StandardCharsets;

/**
 * DataBufferUtil
 *
 * @author achao@apache.org
 */
@UtilityClass
public final class DataBufferUtil {

    public static String dataBufferToString(DataBuffer dataBuffer) {
        byte[] bytes = new byte[dataBuffer.readableByteCount()];
        dataBuffer.read(bytes);
        DataBufferUtils.release(dataBuffer); // 释放DataBuffer资源
        return new String(bytes, StandardCharsets.UTF_8);
    }

}

```
