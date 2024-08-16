---
title: state-machine持久化踩坑
date: 2023-12-19 21:06:00
tags: java
---

> 植物借栽培而生育，人类借教育而成人。——罗素

今天使用`spring-state-machine`踩坑了，这里配了持久化，然后在事件里更改了额外数据

```java
gameInfo = stateMachine.getExtendedState().get(WordChainConst.GAME_INFO, GameInfo.class);
gameInfo.setXxx(xxx);
```

结果在`interceptor`或者`guard`等其他地方使用的时候，却获取不到正确的值

原来在修改值后，还需要持久化保存一下。。。

```java
public class RedisSmPersister extends AbstractStateMachinePersister<StateEnum, EventEnum, String> 
```

```java
redisSmPersister.persist(sm, sm.getId());
```
