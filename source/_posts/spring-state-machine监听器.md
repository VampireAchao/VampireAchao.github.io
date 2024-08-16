---
title: spring-state-machine监听器
date: 2023-11-26 11:30:54
tags: java
---

> 在做艺术家之前，先要做一个人。——罗丹

分享一个`spring-state-machine`监听器的用法：

```java
stateMachine.addStateListener(new StateMachineListenerAdapter<States, Events>() {
			@Override
			public void stateEntered(State<States, Events> state) {
				StateMachineMessage message = new StateMachineMessage();
				message.setMessage("Enter state " + state.getId().toString());
				simpMessagingTemplate.convertAndSend("/topic/sm.message", message);
			}

			@Override
			public void stateExited(State<States, Events> state) {
				StateMachineMessage message = new StateMachineMessage();
				message.setMessage("Exit state " + state.getId().toString());
				simpMessagingTemplate.convertAndSend("/topic/sm.message", message);
			}

			@Override
			public void stateChanged(State<States, Events> from, State<States, Events> to) {
				Map<Object, Object> variables = stateMachine.getExtendedState().getVariables();
				ArrayList<StateMachineEvent> list = new ArrayList<StateMachineEvent>();
				for (States state : stateMachine.getState().getIds()) {
					list.add(new StateMachineEvent(state.toString()));
				}
				simpMessagingTemplate.convertAndSend("/topic/sm.states", list);
				simpMessagingTemplate.convertAndSend("/topic/sm.variables", variables);
			}

			@Override
			public void transitionEnded(Transition<States, Events> transition) {
				if (transition != null && transition.getKind() == TransitionKind.INTERNAL) {
					Map<Object, Object> variables = stateMachine.getExtendedState().getVariables();
					simpMessagingTemplate.convertAndSend("/topic/sm.variables", variables);
				}
			}

			@Override
			public void stateMachineError(StateMachine<States, Events> stateMachine, Exception exception) {
				handleStateMachineError(new StateMachineException("Received error from machine", exception));
			}

		})
```

监听器可以监听到状态机状态的进入、退出、变更成功、失败、错误等

例如此处简单地使用：

```java
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.statemachine.listener.StateMachineListenerAdapter;
import org.springframework.statemachine.state.State;

@Slf4j
public class StateMachineListener extends StateMachineListenerAdapter<WordChainStateEnum, WordChainEventEnum> {

    @Override
    public void stateChanged(State<WordChainStateEnum, WordChainEventEnum> from, State<WordChainStateEnum, WordChainEventEnum> to) {
        String msg = "State changed from " + (from != null ? from.getId() : "null") + " to " + to.getId();
        log.info(msg);
    }

    @Override
    public void eventNotAccepted(Message<WordChainEventEnum> event) {
        String msg = "Event not accepted: " + event;
        log.info(msg);
    }
}
```

还有不少

```bash
eventNotAccepted
extendedStateChanged
stateChanged
stateContext
stateEntered
stateExited
stateMachineError
stateMachineStarted
stateMachineStopped
transition
transitionEnded
transitionStarted
```
