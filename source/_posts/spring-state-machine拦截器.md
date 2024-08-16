---
title: spring-state-machine拦截器
date: 2023-11-27 08:47:48
tags: java
---

> 不乘人于利，不迫人于险。——刘向

继续分享`spring-state-machine`状态机的拦截器使用，这里需要留意一个细节：

如果一个事件没有被状态机接受（例如当前状态不是事件的`source`导致无法转换）

则不会进入拦截器进行处理（但监听器仍然工作，[监听器的博客](https://VampireAchao.github.io/2023/11/26/spring-state-machine%E7%9B%91%E5%90%AC%E5%99%A8/)）

这里配置拦截器也很简单：

```java
machine.addStateMachineInterceptor(new StateMachineInterceptorAdapter<TestStates,TestEvents>() {
			@Override
			public void postStateChange(State<TestStates, TestEvents> state, Message<TestEvents> message,
					Transition<TestStates, TestEvents> transition, StateMachine<TestStates, TestEvents> stateMachine,
					StateMachine<TestStates, TestEvents> rootStateMachine) {
				if (state.getId() == TestStates.S4) {
					nullCheck.set(transition == null);
				}
				super.postStateChange(state, message, transition, stateMachine, rootStateMachine);
			}
		})
```

或者

```java
stateMachine.getStateMachineAccessor().withRegion()
                    .addStateMachineInterceptor(new StateMachineInterceptor());
```

同样，这里有非常多的方法在不同的时机执行：

```bash
postStateChange
postTransition
preEvent
preStateChange
preTransition
stateMachineError
```

拦截器主要的特征是可以修改状态机、事件的行为，例如在 `preEvent` 方法中返回 `null`，则事件不会执行
