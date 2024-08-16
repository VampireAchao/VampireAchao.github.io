---
title: webclient负载均衡踩坑
date: 2024-01-09 12:35:27
tags: java
---

> 一个人总免不了称为别人的对立面。——乔治·克列孟俊

今天踩坑

```java
import cn.dev33.satoken.same.SaSameUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

/**
 * UserClient
 *
 * @author VampireAchao<achao @ hutool.cn>
 */
@Service
public class UserClient {

    private final WebClient webClient;

    @Autowired
    public UserClient(WebClient.Builder loadBalancedWebClientBuilder) {
        this.webClient = loadBalancedWebClientBuilder.baseUrl("http://user-service").build();
    }

    public Mono<Users> selectUserById(Object userId) {
        return webClient.get()
                .uri("/user/getUserBy/{userId}", userId)
                .headers(m -> {
                    m.add(SaSameUtil.SAME_TOKEN, SaSameUtil.getToken());
                })
                .retrieve().bodyToMono(String.class)
                .map(str -> JsonUtils.getResData(str, Users.class))
                .doOnError(Throwable::printStackTrace);
    }

}
```

这里是这么注入的：

```java
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Bean
    public WebClient.Builder webClientBuilder() {
        return WebClient.builder();
    }

    @Bean("loadBalancedWebClientBuilder")
    @LoadBalanced
    public WebClient.Builder loadBalancedWebClientBuilder() {
        return WebClient.builder();
    }
}

```

看起来没问题，但是一直报错：

```shell
failed to resolve 'user-service' after 2 queries
```

然后排查了很久才发现是依赖没有引入...

```xml
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-loadbalancer</artifactId>
        </dependency>
```

这里因为看到了`@LoadBalanced`注解成功引入，所以先入为主认为依赖引入了，没有排查依赖，浪费了很久时间
