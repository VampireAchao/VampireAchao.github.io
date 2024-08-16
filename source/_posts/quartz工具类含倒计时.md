---
title: quartz工具类含倒计时
date: 2023-12-18 19:40:31
tags: java
---

> 一个人有无成就，决定于他青年时期是不是有志气。——谢觉哉

分享一个自己写的`Quartz`工具类，可以轻松实现倒计时功能：

```java
import cn.hutool.core.date.DateUtil;
import lombok.SneakyThrows;
import lombok.experimental.UtilityClass;
import org.dromara.streamquery.stream.core.collection.Lists;
import org.quartz.*;
import org.quartz.core.jmx.JobDataMapSupport;
import org.quartz.impl.StdSchedulerFactory;
import org.quartz.impl.matchers.GroupMatcher;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Set;

@UtilityClass
public class QuartzUtil {

    @SneakyThrows
    public static Scheduler startTaskAt(LocalDateTime time, JobKey jobKey,
                                        Map<String, Object> jobDataMap, Class<? extends Job> jobClazz) {
        var scheduler = StdSchedulerFactory.getDefaultScheduler();
        scheduler.deleteJob(jobKey);
        var jobDetail = JobBuilder.newJob().ofType(jobClazz).withIdentity(jobKey)
                .usingJobData(JobDataMapSupport.newJobDataMap(jobDataMap)).build();
        var trigger = TriggerBuilder.newTrigger().withIdentity(jobKey.getName(), jobKey.getGroup())
                .startAt(DateUtil.date(time)).build();
        scheduler.scheduleJob(jobDetail, trigger);
        scheduler.start();
        return scheduler;
    }

    public static Scheduler startTaskTimeSeconds(Long timeSeconds, JobKey jobKey,
                                                 Map<String, Object> jobDataMap, Class<? extends Job> jobClazz) {
        try {
            var scheduler = StdSchedulerFactory.getDefaultScheduler();
            scheduler.deleteJob(jobKey);
            var jobDetail = JobBuilder.newJob().ofType(jobClazz).withIdentity(jobKey)
                    .usingJobData(JobDataMapSupport.newJobDataMap(jobDataMap)).build();
            var trigger = TriggerBuilder.newTrigger()
                    .withIdentity(jobKey.getName(), jobKey.getGroup())
                    .withSchedule(SimpleScheduleBuilder.repeatSecondlyForTotalCount(timeSeconds.intValue()))
                    .startNow().build();
            scheduler.scheduleJob(jobDetail, trigger);
            scheduler.start();
            return scheduler;
        } catch (SchedulerException e) {
            throw new ApiServerException(e);
        }
    }


    public static void deleteJob(JobKey readyStartJobKey) {
        try {
            var scheduler = StdSchedulerFactory.getDefaultScheduler();
            scheduler.deleteJob(readyStartJobKey);
        } catch (SchedulerException e) {
            throw new ApiServerException(e);
        }
    }

    public static void deleteJobs(String groupName) {
        try {
            var scheduler = StdSchedulerFactory.getDefaultScheduler();
            Set<JobKey> jobKeys = scheduler.getJobKeys(GroupMatcher.groupEquals(groupName));
            scheduler.deleteJobs(Lists.ofColl(jobKeys));
        } catch (SchedulerException e) {
            throw new ApiServerException(e);
        }
    }

    public static void pauseJob(JobKey key) {
        try {
            var scheduler = StdSchedulerFactory.getDefaultScheduler();
            scheduler.pauseJob(key);
        } catch (SchedulerException e) {
            throw new ApiServerException(e);
        }
    }
}
```

对应的单元测试：

```java
import lombok.SneakyThrows;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.JobKey;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

class QuartzUtilTest {

    @Test
    @SneakyThrows
    @Disabled("sleep")
    void startTaskAtTest() {
        var obj = new AtomicInteger();
        Map<String, Object> map = Map.of("test", obj);
        var jobKey = JobKey.jobKey("startTaskAtTest", "test");
        var time = LocalDateTime.now().plus(Duration.ofSeconds(3));
        QuartzUtil.startTaskAt(time, jobKey, map, StartTaskAtTestJob.class);
        TimeUnit.SECONDS.sleep(4);
        Assertions.assertEquals(1, obj.get());
    }

    @Test
    @SneakyThrows
    @Disabled("sleep")
    void startTaskTimeSecondsTest() {
        var obj = new AtomicInteger(3);
        Map<String, Object> map = Map.of("countdown", obj);
        var jobKey = JobKey.jobKey("startTaskTimeSecondsTest", "test");
        QuartzUtil.startTaskTimeSeconds(3L, jobKey, map, StartTaskTimeSecondsTestJob.class);
        TimeUnit.SECONDS.sleep(4);
        Assertions.assertEquals(0, obj.get());
    }

    public static class StartTaskAtTestJob implements Job {
        @Override
        public void execute(JobExecutionContext context) throws JobExecutionException {
            var jobDataMap = context.getMergedJobDataMap();
            var test = jobDataMap.get("test");
            if (test instanceof AtomicInteger obj) {
                obj.set(1);
            }
        }
    }

    public static class StartTaskTimeSecondsTestJob implements Job {
        @Override
        public void execute(JobExecutionContext context) throws JobExecutionException {
            var jobDataMap = context.getMergedJobDataMap();
            var countdown = jobDataMap.get("countdown");
            if (countdown instanceof AtomicInteger obj) {
                obj.set(obj.decrementAndGet());
            }
        }
    }

}

```
