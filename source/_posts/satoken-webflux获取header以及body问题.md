---
title: satoken+webflux获取header以及body问题
date: 2024-04-23 21:05:58
tags: java
---

> 自伟大的心灵，而是小人的伎俩。——巴尔扎克

之前分享过一个# [satoken+webflux获取header以及body](https://VampireAchao.github.io/2024/02/29/satoken-webflux%E8%8E%B7%E5%8F%96header%E4%BB%A5%E5%8F%8Abody/)

今天遇到`BUG`了

需要在`filter`方法结尾添加一个`switchIfEmpty(chain.filter(exchange))`

否则会导致有一些没有传入`body`的请求没有调用到`filter`方法导致无响应结果

完整代码：

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
                }).switchIfEmpty(chain.filter(exchange));
    }
}
```
