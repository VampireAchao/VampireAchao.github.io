---
title: spring-state-machine使用redis持久化
date: 2023-12-11 20:14:10
tags: java
---

> 问号是开启任何一门科学的钥匙。——巴甫洛夫

之前介绍过[spring-state-machine持久化](https://VampireAchao.github.io/2023/11/05/spring-state-machine%E6%8C%81%E4%B9%85%E5%8C%96/)

今天使用`redis`实现

首先是需要一个`RedisStateMachineRepository`

```java
import com.alibaba.nacos.common.utils.JacksonUtils;
import jakarta.annotation.Nonnull;
import jakarta.annotation.Resource;
import org.dromara.streamquery.stream.core.stream.Steam;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.statemachine.data.redis.RedisRepositoryStateMachine;
import org.springframework.statemachine.data.redis.RedisStateMachineRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class StateMachineRedisRepository implements RedisStateMachineRepository {


    @Resource
    private StringRedisTemplate stringRedisTemplate;

    @Nonnull
    @Override
    public <S extends RedisRepositoryStateMachine> S save(@Nonnull S entity) {
        stringRedisTemplate.opsForHash()
                .put(SmCacheConst.STATE_MACHINE, entity.getId(), serialize(entity));
        return entity;
    }

    @Nonnull
    @Override
    public <S extends RedisRepositoryStateMachine> Iterable<S> saveAll(@Nonnull Iterable<S> entities) {
        var map = Steam.of(entities).toMap(RedisRepositoryStateMachine::getId, this::serialize);
        stringRedisTemplate.opsForHash().putAll(SmCacheConst.STATE_MACHINE, map);
        return Steam.of(entities).toList();
    }

    @Nonnull
    @Override
    public Optional<RedisRepositoryStateMachine> findById(@Nonnull String s) {
        return Optional.ofNullable(stringRedisTemplate.opsForHash().get(SmCacheConst.STATE_MACHINE, s)).map(this::deserialize);
    }

    @Override
    public boolean existsById(@Nonnull String s) {
        return stringRedisTemplate.opsForHash().hasKey(SmCacheConst.STATE_MACHINE, s);
    }

    @Nonnull
    @Override
    public Iterable<RedisRepositoryStateMachine> findAll() {
        return Steam.of(stringRedisTemplate.opsForHash().values(SmCacheConst.STATE_MACHINE)).map(this::deserialize).toList();
    }

    @Nonnull
    @Override
    public Iterable<RedisRepositoryStateMachine> findAllById(@Nonnull Iterable<String> strings) {
        var ids = Steam.<Object>of(strings).toList();
        var list = stringRedisTemplate.opsForHash().multiGet(SmCacheConst.STATE_MACHINE, ids);
        return Steam.of(list).map(this::deserialize).toList();
    }


    @Override
    public long count() {
        return stringRedisTemplate.opsForHash().size(SmCacheConst.STATE_MACHINE);
    }

    @Override
    public void deleteById(@Nonnull String s) {
        stringRedisTemplate.opsForHash().delete(SmCacheConst.STATE_MACHINE, s);
    }

    @Override
    public void delete(@Nonnull RedisRepositoryStateMachine entity) {
        stringRedisTemplate.opsForHash().delete(SmCacheConst.STATE_MACHINE, entity.getId());
    }

    @Override
    public void deleteAllById(@Nonnull Iterable<? extends String> strings) {
        var array = Steam.of(strings).toArray();
        stringRedisTemplate.opsForHash().delete(SmCacheConst.STATE_MACHINE, array);
    }

    @Override
    public void deleteAll(@Nonnull Iterable<? extends RedisRepositoryStateMachine> entities) {
        var ids = Steam.of(entities).map(RedisRepositoryStateMachine::getId).toArray();
        stringRedisTemplate.opsForHash().delete(SmCacheConst.STATE_MACHINE, ids);
    }

    @Override
    public void deleteAll() {
        stringRedisTemplate.opsForHash().delete(SmCacheConst.STATE_MACHINE);
    }

    private String serialize(Object entity) {
        return JacksonUtils.toJson(entity);
    }

    private RedisRepositoryStateMachine deserialize(Object obj) {
        if (obj instanceof String json) {
            return JacksonUtils.toObj(json, RedisRepositoryStateMachine.class);
        }
        return null;
    }
}
```

然后是配置：

```java
    @Bean
    public StateMachineRuntimePersister<WordChainStateEnum, WordChainEventEnum, String>
    stateMachineRuntimePersister(StateMachineRedisRepository stateMachineRedisRepository) {
        return new RedisPersistingStateMachineInterceptor<>(stateMachineRedisRepository);
    }

    @Bean
    public StateMachineService<WordChainStateEnum, WordChainEventEnum>
    stateMachineService(StateMachineFactory<WordChainStateEnum, WordChainEventEnum> stateMachineFactory,
                        StateMachineRuntimePersister<WordChainStateEnum, WordChainEventEnum, String> stateMachineRuntimePersister) {
        return new DefaultStateMachineService<>(stateMachineFactory, stateMachineRuntimePersister);
    }
```

接下来是状态机处使用

```java
     StateMachineBuilder.Builder<WordChainStateEnum, WordChainEventEnum> builder = StateMachineBuilder.builder();

     builder.configureConfiguration().withConfiguration().machineId(room);

     builder.configureStates().withStates()
            .initial(STATE_WAITING_FOR_READY)
            .states(Set.of(WordChainStateEnum.values()));

     builder.configureConfiguration().withPersistence().runtimePersister(stateMachineRuntimePersister);
```
