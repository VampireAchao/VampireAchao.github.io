---
title: PersistJobDataAfterExecution注解
date: 2022-10-26 13:11:00
tags: java
---

> 心地善良的人、富于幻想的人比冷酷残忍的人更容易聚合——约翰逊

[`quartz`之前我们也聊过了](https://VampireAchao.github.io/2021/01/24/quartz/)，今天说下这个注解`org.quartz.PersistJobDataAfterExecution`

一般和`DisallowConcurrentExecution`搭配使用

`PersistJobDataAfterExecution`表示`Job`执行结束后更新`JobDataMap`

`DisallowConcurrentExecution`表示不允许并发执行

```java
@Slf4j
@DisallowConcurrentExecution
@PersistJobDataAfterExecution
public class SettlementJob implements Job {

    /**
     * <p>
     * Called by the <code>{@link Scheduler}</code> when a <code>{@link Trigger}</code>
     * fires that is associated with the <code>Job</code>.
     * </p>
     *
     * <p>
     * The implementation may wish to set a
     * {@link JobExecutionContext#setResult(Object) result} object on the
     * {@link JobExecutionContext} before this method exits.  The result itself
     * is meaningless to Quartz, but may be informative to
     * <code>{@link JobListener}s</code> or
     * <code>{@link TriggerListener}s</code> that are watching the job's
     * execution.
     * </p>
     *
     * @param context 上下文
     * @throws JobExecutionException if there is an exception while executing the job.
     */
    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
        final JobDetail jobDetail = context.getJobDetail();
        final JobDataMap jobDataMap = jobDetail.getJobDataMap();
        log.info(jobDetail.getKey().getName() + "执行了");
    }
}
```

