---
title: spring-state-machine动态构建
date: 2023-11-07 08:33:57
tags: java
---

> 习惯的力量是巨大的。——西塞罗

文档：

https://docs.spring.io/spring-statemachine/docs/current/reference/#state-machine-via-builder

此处表明状态机不仅可以通过配置类的方式进行配置，还可以通过建造者模式动态构建

```java
StateMachine<String, String> buildMachine1() throws Exception {
	Builder<String, String> builder = StateMachineBuilder.builder();
	builder.configureStates()
		.withStates()
			.initial("S1")
			.end("SF")
			.states(new HashSet<String>(Arrays.asList("S1","S2","S3","S4")));
	return builder.build();
}
```

这里声明了许多的`states`

还可以修改其配置

```java
StateMachine<String, String> buildMachine2() throws Exception {
	Builder<String, String> builder = StateMachineBuilder.builder();
	builder.configureConfiguration()
		.withConfiguration()
			.autoStartup(false)
			.beanFactory(null)
			.listener(null);
	return builder.build();
}
```

当然事件也可以定义

```java
public static StateMachine<String, String> buildMachine(BeanFactory beanFactory) throws Exception {
	Builder<String, String> builder = StateMachineBuilder.builder();

	builder.configureConfiguration()
		.withConfiguration()
			.machineId("myMachineId")
			.beanFactory(beanFactory);

	builder.configureStates()
		.withStates()
			.initial("S1")
			.state("S2");

	builder.configureTransitions()
		.withExternal()
			.source("S1")
			.target("S2")
			.event("E1");

	return builder.build();
}

@WithStateMachine(id = "myMachineId")
static class Bean17 {

	@OnStateChanged
	public void onStateChanged() {
	}
}
```
