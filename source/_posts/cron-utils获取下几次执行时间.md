---
title: cron-utils获取下几次执行时间
date: 2024-01-04 12:50:03
tags: java
---

> 忍耐与温柔是最大的力量。——哈特

首先引入依赖：

```xml
            <dependency>
                <groupId>com.cronutils</groupId>
                <artifactId>cron-utils</artifactId>
                <version>9.2.0</version>
            </dependency>
```

然后是代码：

```java
import com.cronutils.model.Cron;
import com.cronutils.model.CronType;
import com.cronutils.model.definition.CronDefinitionBuilder;
import com.cronutils.model.time.ExecutionTime;
import com.cronutils.parser.CronParser;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

public class CronUtils {

    public static LocalDateTime getNextExecutions(String cronExpression) {
        return getNextExecutions(cronExpression, 1).stream().findFirst().orElse(null);
    }

    public static List<LocalDateTime> getNextExecutions(String cronExpression, int count) {
        CronParser parser = new CronParser(CronDefinitionBuilder.instanceDefinitionFor(CronType.QUARTZ));
        Cron quartzCron = parser.parse(cronExpression);
        ExecutionTime executionTime = ExecutionTime.forCron(quartzCron);

        List<LocalDateTime> nextExecutions = new ArrayList<>();
        ZonedDateTime nextExecution = ZonedDateTime.now();

        for (int i = 0; i < count; i++) {
            nextExecution = executionTime.nextExecution(nextExecution).orElse(null);
            if (nextExecution != null) {
                nextExecutions.add(nextExecution.toLocalDateTime());
            } else {
                break;
            }
        }

        return nextExecutions;
    }
}
```

使用：

```java
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

/**
 * CronUtilsTest
 *
 * @author VampireAchao<achao @ hutool.cn>
 */
class CronUtilsTest {

    @Test
    void getNextExecutionTest() {
        String cronExpression = "0 0 6 * * ?";
        LocalDateTime localDateTime = CronUtils.getNextExecutions(cronExpression);
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime nextSixAM = now.truncatedTo(ChronoUnit.DAYS).withHour(6);
        if (now.isAfter(nextSixAM)) {
            nextSixAM = nextSixAM.plusDays(1);
        }
        Assertions.assertEquals(nextSixAM, localDateTime);
    }

    @Test
    void getNextExecutionsTest() {
        String cronExpression = "0 0 6 * * ?";
        List<LocalDateTime> nextExecutions = CronUtils.getNextExecutions(cronExpression, 10);
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime nextSixAM = now.truncatedTo(ChronoUnit.DAYS).withHour(6);
        if (now.isAfter(nextSixAM)) {
            nextSixAM = nextSixAM.plusDays(1);
        }
        Assertions.assertEquals(List.of(
                nextSixAM,
                nextSixAM.plusDays(1),
                nextSixAM.plusDays(2),
                nextSixAM.plusDays(3),
                nextSixAM.plusDays(4),
                nextSixAM.plusDays(5),
                nextSixAM.plusDays(6),
                nextSixAM.plusDays(7),
                nextSixAM.plusDays(8),
                nextSixAM.plusDays(9)
        ), nextExecutions);
    }
}
```
