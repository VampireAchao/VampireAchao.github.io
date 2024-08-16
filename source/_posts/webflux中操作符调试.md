---
title: webflux中操作符调试
date: 2023-11-13 08:47:52
tags: java
---

> 生命不息，奋斗不止。——卡莱尔

分享一个小技巧，在`webflux`开发中，我们可以在主启动类上加这么一行代码：

```java
Hooks.onOperatorDebug();
```

这行代码的用处是注册一个回调函数，可以打印操作符信息，举个例子：

```java
import reactor.core.publisher.Flux;
import reactor.core.publisher.Hooks;

public class DebugExample {
    public static void main(String[] args) {
        Hooks.onOperatorDebug(); // 启用操作符调试

        Flux<Integer> flux = Flux.just(1, 2, 3, 4)
                .map(i -> i / 0); // 这里会触发除以零的异常

        flux.subscribe(
                value -> System.out.println("Received: " + value),
                error -> System.err.println("Error: " + error)
        );
    }
}
```

如果我们没有注册，则堆栈打印信息：

```shell
Received: 1
Received: 2
Received: 3
Exception in thread "main" java.lang.ArithmeticException: / by zero
	at DebugExample.lambda$main$0(DebugExample.java:12)
	at reactor.core.publisher.FluxMap$MapSubscriber.onNext(FluxMap.java:120)
	at reactor.core.publisher.FluxJust$WeakScalarSubscription.request(FluxJust.java:91)
	at reactor.core.publisher.FluxMap$MapSubscriber.request(FluxMap.java:155)
	at reactor.core.publisher.Operators$MultiSubscriptionSubscriber.set(Operators.java:1266)
	at reactor.core.publisher.FluxMap.onSubscribe(FluxMap.java:59)
	at reactor.core.publisher.FluxJust.subscribe(FluxJust.java:68)
	at reactor.core.publisher.FluxMap.subscribe(FluxMap.java:44)
	at reactor.core.publisher.Flux.subscribe(Flux.java:9117)
	at reactor.core.publisher.Flux.subscribe(Flux.java:9091)
	at DebugExample.main(DebugExample.java:14)
```

注册以后：

```shell
Received: 1
Received: 2
Received: 3
Error: java.lang.ArithmeticException: / by zero
	at reactor.core.publisher.Operators.onErrorDropped(Operators.java:197)
	Suppressed: reactor.core.publisher.FluxOnAssembly$OnAssemblyException: 
		| onSubscribe([Synchronous Fuseable] FluxMapFuseable.MapFuseableSubscriber)
		|   Flux.map(Map.java:95)
		|   Flux.map(Map.java:92)
		|   DebugExample.main(DebugExample.java:15)
		| onAssembly(FluxMapFuseable)
		|   Flux.map(Map.java:95)
		|   Flux.map(Map.java:92)
		|   DebugExample.main(DebugExample.java:15)
		| request(unbounded)
		at reactor.core.publisher.FluxOnAssembly.onAssembly(FluxOnAssembly.java:482)
		at reactor.core.publisher.FluxMapFuseable.subscribe(FluxMapFuseable.java:64)
		at reactor.core.publisher.Flux.subscribe(Flux.java:9065)
		at reactor.core.publisher.Flux.subscribe(Flux.java:9039)
		at DebugExample.main(DebugExample.java:14)
		Suppressed: java.lang.ArithmeticException: / by zero
			at reactor.core.publisher.Operators.onErrorDropped(Operators.java:197)
		Suppressed: java.lang.ArithmeticException: / by zero
			at reactor.core.publisher.Operators.onErrorDropped(Operators.java:197)
		Suppressed: java.lang.ArithmeticException: / by zero
			at reactor.core.publisher.Operators.onErrorDropped(Operators.java:197)
		Suppressed: java.lang.ArithmeticException: / by zero
			at reactor.core.publisher.Operators.onErrorDropped(Operators.java:197)
		Suppressed: java.lang.ArithmeticException: / by zero
			at reactor.core.publisher.Operators.onErrorDropped(Operators.java:197)
		Suppressed: java.lang.ArithmeticException: / by zero
			at reactor.core.publisher.Operators.onErrorDropped(Operators.java:197)
		Suppressed: java.lang.ArithmeticException: / by zero
			at reactor.core.publisher.Operators.onErrorDropped(Operators.java:197)
		Suppressed: java.lang.ArithmeticException: / by zero
			at reactor.core.publisher.Operators.onErrorDropped(Operators.java:197)
		at reactor.core.publisher.FluxOnAssembly.onAssembly(FluxOnAssembly.java:482)
		at reactor.core.publisher.FluxMapFuseable.subscribe(FluxMapFuseable.java:64)
		at reactor.core.publisher.Flux.subscribe(Flux.java:9065)
		at reactor.core.publisher.Flux.subscribe(Flux.java:9039)
		at DebugExample.main(DebugExample.java:14)
```
