---
title: r2dbc分页条件查询
date: 2023-10-29 09:57:57
tags: java
---

> 假如人只能自己单独生活，只会考虑自己，他的痛苦将是难以承受的。——帕斯卡

代码很简单：

```java
userRepository.findBy(Example.of(new User()), x -> x.page(PageRequest.of(0, 1)))
```

这里`repository`需要继承`org.springframework.data.repository.query.ReactiveQueryByExampleExecutor`

例如：

```java
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.data.repository.query.ReactiveQueryByExampleExecutor;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface UserRepository extends R2dbcRepository<User, Long>, ReactiveQueryByExampleExecutor<User> {
}
```

使用：

```java
        userRepository.findBy(Example.of(new User()),
                        x -> x.page(PageRequest.of(0, 1)))
                .as(StepVerifier::create)
                .expectNextMatches(Streamable::isEmpty).verifyComplete();
```
