---
title: feign-reactive
date: 2023-09-30 09:09:37
tags: java
---

> 晚饭少吃口，活到九十九。——钱大昕

https://github.com/openfeign/feign

目前`feign`不支持`webflux`、`reactive`

于是找到了一个三方库

https://github.com/kptfh/feign-reactive

基于Spring WebFlux的Reactive Feign客户端

![](/imgs/oss/picGo/20230930091135.png)

安装：

```xml
<repositories>
    <repository>
        <id>bintray-kptfh-feign-reactive</id>
        <name>bintray</name>
        <url>https://dl.bintray.com/kptfh/feign-reactive</url>
    </repository>
</repositories>
...
<dependencies>
    ...
    
    <dependency>
        <groupId>io.github.reactivefeign</groupId>
        <artifactId>feign-reactor-cloud</artifactId>
        <version>1.0.0</version>
    </dependency>
    
    or if you don't need cloud specific functionality
    
    <dependency>
        <groupId>io.github.reactivefeign</groupId>
        <artifactId>feign-reactor-webclient</artifactId>
        <version>1.0.0</version>
    </dependency>
    
    or if you tend to use Rx2 interfaces
    
    <dependency>
            <groupId>io.github.reactivefeign</groupId>
            <artifactId>feign-reactor-rx2</artifactId>
            <version>1.0.0</version>
        </dependency>
    ...
</dependencies>
```

使用：

像往常一样编写假装 API，但接口的每个方法

- 可以接受 `org.reactivestreams.Publisher` 作为正文
- 必须返回 `reactor.core.publisher.Mono` 或 `reactor.core.publisher.Flux` 。

```java
@Headers({ "Accept: application/json" })
public interface IcecreamServiceApi {

  @RequestLine("GET /icecream/flavors")
  Flux<Flavor> getAvailableFlavors();

  @RequestLine("GET /icecream/mixins")
  Flux<Mixin> getAvailableMixins();

  @RequestLine("POST /icecream/orders")
  @Headers("Content-Type: application/json")
  Mono<Bill> makeOrder(IceCreamOrder order);

  @RequestLine("GET /icecream/orders/{orderId}")
  Mono<IceCreamOrder> findOrder(@Param("orderId") int orderId);

  @RequestLine("POST /icecream/bills/pay")
  @Headers("Content-Type: application/json")
  Mono<Void> payBill(Publisher<Bill> bill);
}
```

构建客户端：

```java
/* Create instance of your API */
IcecreamServiceApi client = ReactiveFeign
    .builder()
    .target(IcecreamServiceApi.class, "http://www.icecreame.com")

/* Execute nonblocking requests */
Flux<Flavor> flavors = icecreamApi.getAvailableFlavors();
Flux<Mixin> mixins = icecreamApi.getAvailableMixins();
```

或`cloud aware`客户端：

```java
 IcecreamServiceApi client = CloudReactiveFeign.<IcecreamServiceApi>builder()
    .setFallback(new TestInterface() {
        @Override
        public Mono<String> get() {
            return Mono.just("fallback");
        }
    })
    .setLoadBalancerCommand(
         LoadBalancerCommand.builder()
                 .withLoadBalancer(AbstractLoadBalancer.class.cast(getNamedLoadBalancer(serviceName)))
                 .withRetryHandler(new DefaultLoadBalancerRetryHandler(1, 1, true))
                 .build()
    )
    .target(IcecreamServiceApi.class, "http://" + serviceName);

/* Execute nonblocking requests */
Flux<Flavor> flavors = icecreamApi.getAvailableFlavors();
Flux<Mixin> mixins = icecreamApi.getAvailableMixins();
```
