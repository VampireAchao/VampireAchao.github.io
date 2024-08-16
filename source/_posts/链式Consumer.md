---
title: 链式Consumer
date: 2022-06-02 12:37:30
tags: java
---

> 这个时代不会阻止你自己闪耀,但你也覆盖不了任何人的光辉——黄渤

今天发现一种方便的链式`Consumer`写法

```java
import lombok.experimental.UtilityClass;

import java.util.function.Consumer;
import java.util.stream.Stream;

/**
 * @author VampireAchao
 * @since 2022/6/2 10:57
 */
@UtilityClass
public class LambdaHelper {

    @SafeVarargs
    public static <T> Consumer<T> consumers(Consumer<T>... consumers) {
        return Stream.of(consumers).reduce(Consumer::andThen).orElseGet(() -> o -> {});
    }
}
```

使用起来：

```java
        Stream.of("1","2").forEach(
                LambdaHelper.consumers(
                        System.out::println,
                        log::debug
                ));
```

结合`hutool`的`Opt`使用

```java
        Opt.ofNullable(body.getLevelRules())
                .peek(levelRules -> StaticService.saveOrUpdateBatch(levelRules.stream()
                        .flatMap(lambdaRule -> Stream.of(lambdaRule.getQuota(), lambdaRule.getDuration())).collect(Collectors.toList())))
                .peek(levelRules -> levelRules.forEach(
                        LambdaHelper.consumers(
                                levelRule -> levelRule.setRuleId(body.getId()),
                                levelRule -> Opt.ofNullable(levelRule).map(LevelRule::getQuota).map(CommonRange::getId).peek(levelRule::setQuotaId),
                                levelRule -> Opt.ofNullable(levelRule).map(LevelRule::getDuration).map(CommonRange::getId).peek(levelRule::setDurationId),
                                levelRule -> Opt.ofNullable(levelRule).map(LevelRule::getAverage).map(CommonRange::getId).peek(levelRule::setAverageId)
                        )))
                .peek(StaticService::saveOrUpdateBatch);
```

