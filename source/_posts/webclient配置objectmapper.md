---
title: webclient配置objectmapper
date: 2024-01-26 12:46:20
tags: java
---

> 毋以其所不能疑，毋以其所能骄人。——佚名

代码如下，可以通过`ExchangeStrategies`指定序列化反序列化方式：

```java
import com.namaste.config.JacksonObjectMapper;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.codec.json.Jackson2JsonDecoder;
import org.springframework.http.codec.json.Jackson2JsonEncoder;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Bean
    public WebClient.Builder webClientBuilder(ExchangeStrategies exchangeStrategies) {
        return WebClient.builder().exchangeStrategies(exchangeStrategies);
    }

    @Bean("loadBalancedWebClientBuilder")
    @LoadBalanced
    public WebClient.Builder loadBalancedWebClientBuilder(ExchangeStrategies exchangeStrategies) {
        return WebClient.builder().exchangeStrategies(exchangeStrategies);
    }

    @Bean
    public ExchangeStrategies exchangeStrategies(JacksonObjectMapper objectMapper) {
        ExchangeStrategies strategies = ExchangeStrategies.builder()
                .codecs(configurer -> {
                    configurer.defaultCodecs().jackson2JsonDecoder(new Jackson2JsonDecoder(objectMapper));
                    configurer.defaultCodecs().jackson2JsonEncoder(new Jackson2JsonEncoder(objectMapper));
                })
                .build();
        return strategies;
    }
}

```
