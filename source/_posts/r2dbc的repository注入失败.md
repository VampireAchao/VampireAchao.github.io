---
title: r2dbc的repository注入失败
date: 2023-10-28 10:07:27
tags: java
---

> 怀疑与信仰，两者都是必需的。怀疑能把昨天的信仰摧毁，替明日的信仰开路。——罗曼·罗兰

今天`springboot3`使用`r2dbc`踩坑

```shell
Caused by: org.springframework.beans.factory.NoSuchBeanDefinitionException: No qualifying bean of type 'com.ruben.repository.UserRepository' available: expected at least 1 bean which qualifies as autowire candidate. Dependency annotations: {@jakarta.annotation.Resource(shareable=true, lookup="", name="", description="", authenticationType=CONTAINER, type=java.lang.Object.class, mappedName="")}
```
依赖大概是：
```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-r2dbc</artifactId>
            <version>3.0.2</version>
        </dependency>
        <dependency>
            <groupId>io.asyncer</groupId>
            <artifactId>r2dbc-mysql</artifactId>
            <version>1.0.3</version>
        </dependency>
```
使用时：
```java
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface UserRepository extends ReactiveCrudRepository<User, Long>{
}
```
乍一看没啥问题，但就是报错，最后发现控制台打印了一句`INFO`等级的日志：
```shell
2023-10-28T08:32:14.926+08:00  INFO [im-logic-service,,,] 50350 --- [           main] .RepositoryConfigurationExtensionSupport : Spring Data R2DBC - Could not safely identify store assignment for repository candidate interface com.ruben.repository.RoomRepository; If you want this repository to be a R2DBC repository, consider annotating your entities with one of these annotations: org.springframework.data.relational.core.mapping.Table (preferred), or consider extending one of the following types with your repository: org.springframework.data.r2dbc.repository.R2dbcRepository
```
原来是需要在实体类上加`@Table`注解或者接口继承`R2dbcRepository`。。。
