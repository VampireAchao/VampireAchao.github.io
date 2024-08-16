---
title: spring-state-machine守卫
date: 2023-11-04 10:54:26
tags: java
---

> 是非之声，无翼而飞；损益之名，无胫而走。——白居易

文档：

https://docs.spring.io/spring-statemachine/docs/current/reference/#configuring-guards

说白了守卫是用来判断事件执行后能否更新到下一个状态的

这里按之前提到的代码示例来示范

首先是配置为返回`true`，发现下面一路正常打印

![](/imgs/oss/blog-img/2023-11-04-13-31-17-image.png)

然后是`return false`

![](/imgs/oss/blog-img/2023-11-04-13-33-41-image.png)



```java
package com.ruben.parent;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.statemachine.StateMachine;
import org.springframework.statemachine.config.EnableStateMachineFactory;
import org.springframework.statemachine.config.EnumStateMachineConfigurerAdapter;
import org.springframework.statemachine.config.StateMachineBuilder;
import org.springframework.statemachine.config.builders.StateMachineConfigurationConfigurer;
import org.springframework.statemachine.config.builders.StateMachineStateConfigurer;
import org.springframework.statemachine.config.builders.StateMachineTransitionConfigurer;
import org.springframework.statemachine.listener.StateMachineListener;
import org.springframework.statemachine.listener.StateMachineListenerAdapter;
import org.springframework.statemachine.state.State;

@Configuration
@EnableStateMachineFactory
public class StateMachineConfig extends EnumStateMachineConfigurerAdapter<States, Events> {

    @Override
    public void configure(StateMachineConfigurationConfigurer<States, Events> config) throws Exception {
        config
                .withConfiguration()
                .autoStartup(true)
                .listener(listener());
    }

    @Override
    public void configure(StateMachineStateConfigurer<States, Events> states) throws Exception {
        states
                .withStates()
                .initial(States.READY)
                .state(States.GAME, gameStateMachine())
                .and()
                .withStates()
                .parent(States.GAME)
                .initial(States.NIGHT)
                .state(States.DAY);
    }

    @Override
    public void configure(StateMachineTransitionConfigurer<States, Events> transitions) throws Exception {
        transitions
                .withExternal()
                .source(States.READY).target(States.GAME).event(Events.START_GAME).guard(context->{
                    return true;
                })
                .and()
                .withExternal()
                .source(States.NIGHT).target(States.DAY).event(Events.DAY_COMES)
                .and()
                .withExternal()
                .source(States.DAY).target(States.NIGHT).event(Events.NIGHT_COMES);
    }

    @Bean
    public StateMachine<States, Events> gameStateMachine() {
        StateMachineBuilder.Builder<States, Events> builder = StateMachineBuilder.builder();
        try {
            builder.configureStates()
                    .withStates()
                    .initial(States.NIGHT)
                    .state(States.DAY);
            builder.configureTransitions()
                    .withExternal()
                    .source(States.NIGHT).target(States.DAY).event(Events.DAY_COMES)
                    .and()
                    .withExternal()
                    .source(States.DAY).target(States.NIGHT).event(Events.NIGHT_COMES);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return builder.build();
    }

    @Bean
    public StateMachineListener<States, Events> listener() {
        return new StateMachineListenerAdapter<States, Events>() {
            @Override
            public void stateChanged(State<States, Events> from, State<States, Events> to) {
                System.out.println("State change from " + (from != null ? from.getId() : "null") + " to " + to.getId());
            }
        };
    }
}
```

这里的守卫是`org.springframework.statemachine.guard.Guard`这个类，也可以使用`spel`表达式，将`guard`函数改为`guardExpression`即可
