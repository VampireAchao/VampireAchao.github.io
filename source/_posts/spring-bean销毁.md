---
title: spring bean销毁
date: 2023-11-22 08:58:51
tags: java
---

> 天才只可以体会，但绝不能模仿。——狄德罗

对于`spring bean`销毁，可以使用两种方式：

1.实现`org.springframework.beans.factory.DisposableBean`接口，重写`destroy`方法

2.添加`jakarta.annotation.PreDestroy`注解

但是要注意，例如我这里的代码：

```java
import io.agora.rtm.RtmClient;
import jakarta.annotation.PreDestroy;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;

@Slf4j
@Configuration
@EnableConfigurationProperties(AgoraProperties.class)
public class AgoraRtmConfig {
    @Resource
    private AgoraRtmClientListener agoraRtmClientListener;
    @Resource
    private AgoraProperties agoraProperties;
    @Lazy
    @Resource
    private RtmClient rtmClient;

    @Bean
    public RtmClient rtmClient() throws Exception {
        var mRtmClient = RtmClient.createInstance(agoraProperties.getAppId(), agoraRtmClientListener);
        mRtmClient.login(AgoraUtil.generateRtmToken(), AgoraUtil.getServerId(), AgoraUtil.resultCallback("login"));
        return mRtmClient;
    }

    @PreDestroy
    public void destroy() {
        rtmClient.logout(null);
        rtmClient.release();
    }


}
```

这里添加了`@Lazy`避免循环注入，但是还是报错了：

```shell
org.springframework.beans.factory.BeanCreationNotAllowedException: Error creating bean with name 'rtmClient': Singleton bean creation not allowed while singletons of this factory are in destruction (Do not request a bean from a BeanFactory in a destroy method implementation!)
	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:220) ~[spring-beans-6.0.4.jar:6.0.4]
	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:324) ~[spring-beans-6.0.4.jar:6.0.4]
	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:205) ~[spring-beans-6.0.4.jar:6.0.4]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.resolveBeanByName(AbstractAutowireCapableBeanFactory.java:458) ~[spring-beans-6.0.4.jar:6.0.4]
	at org.springframework.context.annotation.CommonAnnotationBeanPostProcessor.autowireResource(CommonAnnotationBeanPostProcessor.java:496) ~[spring-context-6.0.4.jar:6.0.4]
	at org.springframework.context.annotation.CommonAnnotationBeanPostProcessor.getResource(CommonAnnotationBeanPostProcessor.java:467) ~[spring-context-6.0.4.jar:6.0.4]
	at org.springframework.context.annotation.CommonAnnotationBeanPostProcessor$1.getTarget(CommonAnnotationBeanPostProcessor.java:419) ~[spring-context-6.0.4.jar:6.0.4]
	at org.springframework.aop.framework.CglibAopProxy$DynamicAdvisedInterceptor.intercept(CglibAopProxy.java:687) ~[spring-aop-6.0.4.jar:6.0.4]
	at io.agora.rtm.RtmClient$$SpringCGLIB$$0.logout(<generated>) ~[agora-rtm-sdk-1.0.jar:na]
	at com.ruben.infra.rtm.AgoraRtmConfig.destroy(AgoraRtmConfig.java:34) ~[classes/:na]
	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method) ~[na:na]
	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:77) ~[na:na]
	at java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43) ~[na:na]
	at java.base/java.lang.reflect.Method.invoke(Method.java:568) ~[na:na]
	at org.springframework.beans.factory.annotation.InitDestroyAnnotationBeanPostProcessor$LifecycleElement.invoke(InitDestroyAnnotationBeanPostProcessor.java:424) ~[spring-beans-6.0.4.jar:6.0.4]
	at org.springframework.beans.factory.annotation.InitDestroyAnnotationBeanPostProcessor$LifecycleMetadata.invokeDestroyMethods(InitDestroyAnnotationBeanPostProcessor.java:382) ~[spring-beans-6.0.4.jar:6.0.4]
	at org.springframework.beans.factory.annotation.InitDestroyAnnotationBeanPostProcessor.postProcessBeforeDestruction(InitDestroyAnnotationBeanPostProcessor.java:212) ~[spring-beans-6.0.4.jar:6.0.4]
	at org.springframework.beans.factory.support.DisposableBeanAdapter.destroy(DisposableBeanAdapter.java:191) ~[spring-beans-6.0.4.jar:6.0.4]
	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.destroyBean(DefaultSingletonBeanRegistry.java:587) ~[spring-beans-6.0.4.jar:6.0.4]
	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.destroySingleton(DefaultSingletonBeanRegistry.java:559) ~[spring-beans-6.0.4.jar:6.0.4]
	at org.springframework.beans.factory.support.DefaultListableBeanFactory.destroySingleton(DefaultListableBeanFactory.java:1177) ~[spring-beans-6.0.4.jar:6.0.4]
	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.destroySingletons(DefaultSingletonBeanRegistry.java:520) ~[spring-beans-6.0.4.jar:6.0.4]
	at org.springframework.beans.factory.support.DefaultListableBeanFactory.destroySingletons(DefaultListableBeanFactory.java:1170) ~[spring-beans-6.0.4.jar:6.0.4]
	at org.springframework.context.support.AbstractApplicationContext.destroyBeans(AbstractApplicationContext.java:1082) ~[spring-context-6.0.4.jar:6.0.4]
	at org.springframework.context.support.AbstractApplicationContext.doClose(AbstractApplicationContext.java:1051) ~[spring-context-6.0.4.jar:6.0.4]
	at org.springframework.boot.web.reactive.context.ReactiveWebServerApplicationContext.doClose(ReactiveWebServerApplicationContext.java:149) ~[spring-boot-3.0.2.jar:3.0.2]
	at org.springframework.context.support.AbstractApplicationContext.close(AbstractApplicationContext.java:1001) ~[spring-context-6.0.4.jar:6.0.4]
	at org.springframework.boot.SpringApplicationShutdownHook.closeAndWait(SpringApplicationShutdownHook.java:139) ~[spring-boot-3.0.2.jar:3.0.2]
	at java.base/java.lang.Iterable.forEach(Iterable.java:75) ~[na:na]
	at org.springframework.boot.SpringApplicationShutdownHook.run(SpringApplicationShutdownHook.java:108) ~[spring-boot-3.0.2.jar:3.0.2]
	at java.base/java.lang.Thread.run(Thread.java:840) ~[na:na]
```

主要是这句：

`Singleton bean creation not allowed while singletons of this factory are in destruction (Do not request a bean from a BeanFactory in a destroy method implementation!)`

提示不要在`bean`销毁时从`BeanFactory`请求一个`bean`

解决办法是再新建一个类来管理：

```java
import io.agora.rtm.RtmChannel;
import io.agora.rtm.RtmClient;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Set;

@Component
public class RtmClientAdapter implements DisposableBean {

    private final RtmClient rtmClient;

    public RtmClientAdapter(RtmClient rtmClient) {
        this.rtmClient = rtmClient;
    }

    @Override
    public void destroy() {
        getChannels().forEach(RtmChannel::release);
        rtmClient.logout(null);
        rtmClient.release();
    }

}
```
