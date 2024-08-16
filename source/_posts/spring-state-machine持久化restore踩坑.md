---
title: spring-state-machine持久化restore踩坑
date: 2023-12-24 17:26:46
tags: java
---

> 没有人事先了解自己到底有多大的力量，直到他试过以后才知道。——歌德

今天遇到的问题是在响应式编程中发生禁止`block`异常：

```java
org.springframework.statemachine.persist.AbstractStateMachinePersister#restore
```

源码如下：

```java
	@Override
	public final StateMachine<S, E> restore(StateMachine<S, E> stateMachine, T contextObj) throws Exception {
		final StateMachineContext<S, E> context = stateMachinePersist.read(contextObj);
		stateMachine.stopReactively().block();
		stateMachine.getStateMachineAccessor().doWithAllRegions(function -> function.resetStateMachineReactively(context).block());
		stateMachine.startReactively().block();
		return stateMachine;
	}
```

自己重新编写该功能

```java
    public Mono<StateMachine<StateEnum, WordChain>> restore(StateMachine<WordChainStateEnuminEventEnum> stateMaring contextObj) {
        return stateMachine.stopReactively().then(Mono.fromSupplier((SerSupp<StateMachineContext<WordChainStateEnum, WordChainEventEn                    ateMachineRuntimePersister.read(contextObj))).flatMapMany(context ->
                        Flux.fromIterable(stateMachine.getStateMachineAccessor().withAllRegions())
                                .flatMap(function -> function.resetStateMachineReactively(context)))
                .then(stateMachine.startReactively()).thenReturn(stateMachine);
    }
```
