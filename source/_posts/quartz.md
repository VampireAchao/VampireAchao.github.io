---
title: quartz
date: 2021-01-24 23:34:44
tags: java
---

> 天下熙熙，皆为利来；天下攘攘，皆为利往。——《史记》

## Quartz Job Scheduling Library是什么？

Quartz是[功能强大的](http://www.quartz-scheduler.org/documentation/2.4.0-SNAPSHOT/introduction.html#features)开源作业调度库，几乎可以集成到任何Java应用程序中-从最小的独立应用程序到最大的电子商务系统。Quartz可用于创建简单或复杂的计划，以执行数以万计，数以万计的工作。任务定义为标准Java组件的作业，它们实际上可以执行您可以对其执行的任何编程操作。Quartz Scheduler包含许多企业级功能，例如对JTA事务和集群的支持。

Quartz是免费使用的，并根据[Apache 2.0许可获得许可](http://www.apache.org/licenses/LICENSE-2.0)。

> 简单来说，就是一调度框架，用来干动态定时任务的

[quartz官方文档](http://www.quartz-scheduler.org/documentation/2.4.0-SNAPSHOT/index.html)

[quartzAPI文档](http://www.quartz-scheduler.org/documentation/2.3.1-SNAPSHOT/index.html)

在`springboot`中使用`quartz`

导入依赖

```xml
<!-- quartz -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-quartz</artifactId>
</dependency>
```

然后我们如果需要`mysql`支持的话还需要导入`mysql`驱动

```xml
        <!--    mysql驱动    -->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.11</version>
        </dependency>
```

然后我们找到`sql`文件

![image-20210124224430079](/imgs/oss/picGo/image-20210124224430079.png)

![image-20210124224457097](/imgs/oss/picGo/image-20210124224457097.png)

然后到数据库中执行

![image-20210124224542064](/imgs/oss/picGo/image-20210124224542064.png)

更改配置文件

```yaml
spring:
  cloud:
    alicloud:
      access-key: 你猜
      secret-key: 你猜
      oss:
        endpoint: oss-cn-chengdu.aliyuncs.com
        bucket: waibi
  redis:
    host: localhost
    port: 6379
  datasource:
    url: jdbc:mysql://localhost:3306/ruben?autoReconnect=true&zeroDateTimeBehavior=CONVERT_TO_NULL&useUnicode=true&characterEncoding=utf-8&useSSL=false&nullCatalogMeansCurrent=true&serverTimezone=Asia/Shanghai&allowMultiQueries=true
    driver-class-name: com.mysql.cj.jdbc.Driver
    username: root
    password: 你猜
  #  url: jdbc:sqlite:data.db
  #  driver-class-name: org.sqlite.JDBC
  # quartz任务配置
  quartz:
    job-store-type: jdbc
    properties:
      org:
        quartz:
          scheduler:
            instanceName: clusteredScheduler
            instanceId: AUTO
    jobStore:
      class: org.quartz.impl.jdbcjobstore.JobStoreTX
      driverDelegateClass: spring.quartz.properties.org.quartz.jobStore.driverDelegateClass=
      tablePrefix: QRTZ_
      isClustered: false # 打开集群配置
      clusterCheckinInterval: 2000 # 设置集群检查间隔20s
      useProperties: false
    threadPool:
      class: org.quartz.simpl.SimpleThreadPool
      threadCount: 10
      threadPriority: 5
      threadsInheritContextClassLoaderOfInitializingThread: true
# mybatis的配置
mybatis-plus:
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl

```

![image-20210124230157982](/imgs/oss/picGo/image-20210124230157982.png)

然后是自己写的一个`springboot`测试类

```java
package com.ruben;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.quartz.*;
import org.quartz.impl.StdSchedulerFactory;
import org.quartz.impl.matchers.GroupMatcher;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;
import java.util.*;

/**
 * @ClassName: ScheduleTest
 * @Date: 2021/1/20 0020 16:15
 * @Description: Schedule
 * @Author: <achao1441470436@gmail.com>
 */
@Slf4j
@SpringBootTest
public class ScheduleTest {

    @Resource
    private Scheduler scheduler;

    @Test
    public void run() throws Exception {
        // scheduler可以通过StdSchedulerFactory去获取，也可以使用spring的注解@Resource/Autowired引用
//        Scheduler scheduler = StdSchedulerFactory.getDefaultScheduler();
        // Java虚拟机运行时间，以纳秒为单位
        long start = System.nanoTime();
        // JobDetail的key(唯一标识)，由name和group组成
        JobKey jobKey = new JobKey("achao", "ruben");
        // 删除jobKey对应的JobDetail
        scheduler.deleteJob(jobKey);
        // 构建JobDetail，包含任务类、唯一标识、需要发送的数据等信息
        JobDetail jobDetail = JobBuilder.newJob()
                // 描述
                .withDescription("ruben->achao->jobDetail")
                // 指向我们的任务类,需要实现Job接口
                .ofType(GoodJob.class)
                // 唯一标识
                .withIdentity(jobKey)
                // 传入发给Job的数据
                .usingJobData("name", "achao")
                .usingJobData("time", start)
                .build();
        // 构建Trigger，包含执行间隔时间、次数等。许多Trigger可以指向一个Job ，但是一个Trigger只能指向一个Job。
        // 每5秒后执行一次，执行次数无限
        Trigger trigger = TriggerBuilder.newTrigger().withIdentity("achao", "ruben").withSchedule(SimpleScheduleBuilder.simpleSchedule().withIntervalInSeconds(5).repeatForever()).startNow().build();
        // 每五秒一次，执行次数10次
//        Trigger trigger = TriggerBuilder.newTrigger().withIdentity("achao", "ruben").withSchedule(SimpleScheduleBuilder.simpleSchedule().withIntervalInSeconds(5).withRepeatCount(10)).startNow().build();
        // 使用cron构建，这里就可以做动态cron
//        CronTrigger trigger = TriggerBuilder.newTrigger().withIdentity("achao", "ruben").withSchedule(CronScheduleBuilder.cronSchedule("*/5 * * * * ?")).startNow().build();
        // 将给定的JobDetail添加到Scheduler，并将给定的Trigger与其关联。如果给定的触发器未引用任何Job ，则将其设置为引用与此方法一起传递的Job。
        scheduler.scheduleJob(jobDetail, trigger);
        // 开始执行
        scheduler.start();
        log.info("开始" + (System.nanoTime() - start) / (1000.0 * 1000.0) + "ms");
        // 10秒后执行
        new Timer().schedule(new TimerTask() {
            @Override
            public void run() {
                try {
                    // 暂停
                    scheduler.pauseJob(jobKey);
                    log.info("已暂停" + (System.nanoTime() - start) / (1000.0 * 1000.0) + "ms");
                } catch (SchedulerException e) {
                    e.printStackTrace();
                }
            }
        }, 10000);
        // 20秒后执行
        new Timer().schedule(new TimerTask() {
            @Override
            public void run() {
                try {
                    // 继续暂停的job
                    scheduler.resumeJob(jobKey);
                    log.info("已继续" + (System.nanoTime() - start) / (1000.0 * 1000.0) + "ms");
                    // 立马执行一次job
                    scheduler.triggerJob(jobKey);
                    log.info("立马执行" + (System.nanoTime() - start) / (1000.0 * 1000.0) + "ms");
                } catch (SchedulerException e) {
                    e.printStackTrace();
                }
            }
        }, 20000);
        // 30秒后执行
        new Timer().schedule(new TimerTask() {
            @Override
            public void run() {
                try {
                    // 删除任务
                    scheduler.deleteJob(jobKey);
                    log.info("结束[" + jobKey.getGroup() + "." + jobKey.getName() + "] ：" + (System.nanoTime() - start) / (1000.0 * 1000.0) + "ms");
                    // 判断Scheduler是否处于待机模式
                    if (!scheduler.isInStandbyMode()) {
                        // 暂停调度器
                        scheduler.standby();
                        log.info("暂停调度器" + (System.nanoTime() - start) / (1000.0 * 1000.0) + "ms");
//                        scheduler.start();
                    }
                    // 判断Scheduler是否已关闭
                    if (!scheduler.isShutdown()) {
                        // 结束调度器
                        scheduler.shutdown(true);
                        log.info("结束调度器" + (System.nanoTime() - start) / (1000.0 * 1000.0) + "ms");
                    }
                } catch (SchedulerException e) {
                    e.printStackTrace();
                }
            }
        }, 30000);
        try {
            // 封装条件，查询所有
            GroupMatcher<JobKey> matcher = GroupMatcher.anyJobGroup();
            // 查询job
            Set<JobKey> jobKeys = scheduler.getJobKeys(matcher);
            System.out.println("任务列表:");
            jobKeys.forEach(key -> System.out.println(key.getGroup() + "." + key.getName()));
        } catch (SchedulerException e) {
            e.printStackTrace();
        }
        // 获取当前正在执行的所有job列表
        List<JobExecutionContext> jobs = scheduler.getCurrentlyExecutingJobs();
        jobs.forEach(job -> System.out.println("class:" + job.getTrigger().getClass().getName() + " group:" + job.getTrigger().getJobKey().getGroup() + job.getTrigger().getJobKey().getName()));
        // 25秒后执行
        new Timer().schedule(new TimerTask() {
            @Override
            public void run() {
                try {
                    // 重置任务（修改）
                    TriggerKey key = TriggerKey.triggerKey("achao", "ruben");
                    CronTrigger newTrigger = TriggerBuilder.newTrigger().withIdentity(key).withSchedule(CronScheduleBuilder.cronSchedule("*/1 * * * * ?")).build();
                    scheduler.rescheduleJob(key, newTrigger);
                    log.info("重置任务" + (System.nanoTime() - start) / (1000.0 * 1000.0) + "ms");
                } catch (SchedulerException e) {
                    e.printStackTrace();
                }
            }
        }, 25000);
        // 获取输入，挂起程序，避免还没有执行到我们的逻辑就结束，在实际web项目中去掉
        new Scanner(System.in).next();
    }

    // 避免并发执行注解
    @DisallowConcurrentExecution
    public static class GoodJob implements Job {
        @Override
        public void execute(JobExecutionContext context) throws JobExecutionException {
            // 任务逻辑
            // 从jobDetail中获取数据
            String name = (String) context.getJobDetail().getJobDataMap().get("name");
            long start = (long) context.getJobDetail().getJobDataMap().get("time");
            // 打印
            log.info(name + " " + (System.nanoTime() - start) / (1000.0 * 1000.0) + "ms");
        }
    }
}
```

输出日志

```shell
C:\Users\Administrator\.jdks\adopt-openjdk-1.8.0_265-2\bin\java.exe -agentlib:jdwp=transport=dt_socket,address=127.0.0.1:2045,suspend=y,server=n -ea -Didea.test.cyclic.buffer.size=1048576 -javaagent:C:\Users\Administrator\AppData\Local\JetBrains\IntelliJIdea2020.1\captureAgent\debugger-agent.jar -Dfile.encoding=UTF-8 -classpath C:\Users\Administrator\AppData\Local\Temp\classpath541456651.jar com.intellij.rt.junit.JUnitStarter -ideVersion5 -junit5 com.ruben.ScheduleTest,run
连接到目标VM, 地址: ''127.0.0.1:2045'，传输: '套接字'', 传输: '{1}'
23:05:55.290 [main] DEBUG org.springframework.test.context.BootstrapUtils - Instantiating CacheAwareContextLoaderDelegate from class [org.springframework.test.context.cache.DefaultCacheAwareContextLoaderDelegate]
23:05:55.306 [main] DEBUG org.springframework.test.context.BootstrapUtils - Instantiating BootstrapContext using constructor [public org.springframework.test.context.support.DefaultBootstrapContext(java.lang.Class,org.springframework.test.context.CacheAwareContextLoaderDelegate)]
23:05:55.342 [main] DEBUG org.springframework.test.context.BootstrapUtils - Instantiating TestContextBootstrapper for test class [com.ruben.ScheduleTest] from class [org.springframework.boot.test.context.SpringBootTestContextBootstrapper]
23:05:55.357 [main] INFO org.springframework.boot.test.context.SpringBootTestContextBootstrapper - Neither @ContextConfiguration nor @ContextHierarchy found for test class [com.ruben.ScheduleTest], using SpringBootContextLoader
23:05:55.362 [main] DEBUG org.springframework.test.context.support.AbstractContextLoader - Did not detect default resource location for test class [com.ruben.ScheduleTest]: class path resource [com/ruben/ScheduleTest-context.xml] does not exist
23:05:55.362 [main] DEBUG org.springframework.test.context.support.AbstractContextLoader - Did not detect default resource location for test class [com.ruben.ScheduleTest]: class path resource [com/ruben/ScheduleTestContext.groovy] does not exist
23:05:55.362 [main] INFO org.springframework.test.context.support.AbstractContextLoader - Could not detect default resource locations for test class [com.ruben.ScheduleTest]: no resource found for suffixes {-context.xml, Context.groovy}.
23:05:55.365 [main] DEBUG org.springframework.test.context.support.AnnotationConfigContextLoaderUtils - Ignoring class [com.ruben.ScheduleTest$GoodJob]; it must be static, non-private, non-final, and annotated with @Configuration to be considered a default configuration class.
23:05:55.365 [main] INFO org.springframework.test.context.support.AnnotationConfigContextLoaderUtils - Could not detect default configuration classes for test class [com.ruben.ScheduleTest]: ScheduleTest does not declare any static, non-private, non-final, nested classes annotated with @Configuration.
23:05:55.409 [main] DEBUG org.springframework.test.context.support.ActiveProfilesUtils - Could not find an 'annotation declaring class' for annotation type [org.springframework.test.context.ActiveProfiles] and class [com.ruben.ScheduleTest]
23:05:55.508 [main] DEBUG org.springframework.context.annotation.ClassPathScanningCandidateComponentProvider - Identified candidate component class: file [D:\file\idea\IdeaProjects\simple-springboot\target\classes\com\ruben\SimpleSpringbootApplication.class]
23:05:55.510 [main] INFO org.springframework.boot.test.context.SpringBootTestContextBootstrapper - Found @SpringBootConfiguration com.ruben.SimpleSpringbootApplication for test class com.ruben.ScheduleTest
23:05:55.622 [main] DEBUG org.springframework.boot.test.context.SpringBootTestContextBootstrapper - @TestExecutionListeners is not present for class [com.ruben.ScheduleTest]: using defaults.
23:05:55.623 [main] INFO org.springframework.boot.test.context.SpringBootTestContextBootstrapper - Loaded default TestExecutionListener class names from location [META-INF/spring.factories]: [org.springframework.boot.test.mock.mockito.MockitoTestExecutionListener, org.springframework.boot.test.mock.mockito.ResetMocksTestExecutionListener, org.springframework.boot.test.autoconfigure.restdocs.RestDocsTestExecutionListener, org.springframework.boot.test.autoconfigure.web.client.MockRestServiceServerResetTestExecutionListener, org.springframework.boot.test.autoconfigure.web.servlet.MockMvcPrintOnlyOnFailureTestExecutionListener, org.springframework.boot.test.autoconfigure.web.servlet.WebDriverTestExecutionListener, org.springframework.boot.test.autoconfigure.webservices.client.MockWebServiceServerTestExecutionListener, org.springframework.test.context.web.ServletTestExecutionListener, org.springframework.test.context.support.DirtiesContextBeforeModesTestExecutionListener, org.springframework.test.context.support.DependencyInjectionTestExecutionListener, org.springframework.test.context.support.DirtiesContextTestExecutionListener, org.springframework.test.context.transaction.TransactionalTestExecutionListener, org.springframework.test.context.jdbc.SqlScriptsTestExecutionListener, org.springframework.test.context.event.EventPublishingTestExecutionListener]
23:05:55.643 [main] INFO org.springframework.boot.test.context.SpringBootTestContextBootstrapper - Using TestExecutionListeners: [org.springframework.test.context.web.ServletTestExecutionListener@1c5920df, org.springframework.test.context.support.DirtiesContextBeforeModesTestExecutionListener@17f9d882, org.springframework.boot.test.mock.mockito.MockitoTestExecutionListener@79e4c792, org.springframework.boot.test.autoconfigure.SpringBootDependencyInjectionTestExecutionListener@196a42c3, org.springframework.test.context.support.DirtiesContextTestExecutionListener@4c60d6e9, org.springframework.test.context.transaction.TransactionalTestExecutionListener@15043a2f, org.springframework.test.context.jdbc.SqlScriptsTestExecutionListener@4a83a74a, org.springframework.test.context.event.EventPublishingTestExecutionListener@1349883, org.springframework.boot.test.mock.mockito.ResetMocksTestExecutionListener@4b29d1d2, org.springframework.boot.test.autoconfigure.restdocs.RestDocsTestExecutionListener@7f485fda, org.springframework.boot.test.autoconfigure.web.client.MockRestServiceServerResetTestExecutionListener@28261e8e, org.springframework.boot.test.autoconfigure.web.servlet.MockMvcPrintOnlyOnFailureTestExecutionListener@d737b89, org.springframework.boot.test.autoconfigure.web.servlet.WebDriverTestExecutionListener@8519cb4, org.springframework.boot.test.autoconfigure.webservices.client.MockWebServiceServerTestExecutionListener@35dab4eb]
23:05:55.646 [main] DEBUG org.springframework.test.context.support.AbstractDirtiesContextTestExecutionListener - Before test class: context [DefaultTestContext@5b218417 testClass = ScheduleTest, testInstance = [null], testMethod = [null], testException = [null], mergedContextConfiguration = [WebMergedContextConfiguration@645aa696 testClass = ScheduleTest, locations = '{}', classes = '{class com.ruben.SimpleSpringbootApplication}', contextInitializerClasses = '[]', activeProfiles = '{}', propertySourceLocations = '{}', propertySourceProperties = '{org.springframework.boot.test.context.SpringBootTestContextBootstrapper=true}', contextCustomizers = set[org.springframework.boot.test.context.filter.ExcludeFilterContextCustomizer@14dd9eb7, org.springframework.boot.test.json.DuplicateJsonObjectContextCustomizerFactory$DuplicateJsonObjectContextCustomizer@62150f9e, org.springframework.boot.test.mock.mockito.MockitoContextCustomizer@0, org.springframework.boot.test.web.client.TestRestTemplateContextCustomizer@a514af7, org.springframework.boot.test.autoconfigure.properties.PropertyMappingContextCustomizer@0, org.springframework.boot.test.autoconfigure.web.servlet.WebDriverContextCustomizerFactory$Customizer@72d1ad2e, org.springframework.boot.test.context.SpringBootTestArgs@1], resourceBasePath = 'src/main/webapp', contextLoader = 'org.springframework.boot.test.context.SpringBootContextLoader', parent = [null]], attributes = map['org.springframework.test.context.web.ServletTestExecutionListener.activateListener' -> true]], class annotated with @DirtiesContext [false] with mode [null].
23:05:55.686 [main] DEBUG org.springframework.test.context.support.TestPropertySourceUtils - Adding inlined properties to environment: {spring.jmx.enabled=false, org.springframework.boot.test.context.SpringBootTestContextBootstrapper=true}

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::        (v2.3.2.RELEASE)

2021-01-24 23:05:56.206  INFO 1536 --- [           main] com.ruben.ScheduleTest                   : Starting ScheduleTest on B9GZJ8FJDPQC1SI with PID 1536 (started by Administrator in D:\file\idea\IdeaProjects\simple-springboot)
2021-01-24 23:05:56.207  INFO 1536 --- [           main] com.ruben.ScheduleTest                   : No active profile set, falling back to default profiles: default
2021-01-24 23:05:56.845  INFO 1536 --- [           main] .s.d.r.c.RepositoryConfigurationDelegate : Multiple Spring Data modules found, entering strict repository configuration mode!
2021-01-24 23:05:56.847  INFO 1536 --- [           main] .s.d.r.c.RepositoryConfigurationDelegate : Bootstrapping Spring Data Redis repositories in DEFAULT mode.
2021-01-24 23:05:56.873  INFO 1536 --- [           main] .s.d.r.c.RepositoryConfigurationDelegate : Finished Spring Data repository scanning in 13ms. Found 0 Redis repository interfaces.
2021-01-24 23:05:57.004  WARN 1536 --- [           main] o.m.s.mapper.ClassPathMapperScanner      : No MyBatis mapper was found in '[com.ruben.dao.mapper*]' package. Please check your configuration.
Logging initialized using 'class org.apache.ibatis.logging.stdout.StdOutImpl' adapter.
 _ _   |_  _ _|_. ___ _ |    _ 
| | |\/|_)(_| | |_\  |_)||_|_\ 
     /               |         
                        3.1.0 
Registered plugin: 'AbstractSqlParserHandler(sqlParserList=null, sqlParserFilter=null)'
2021-01-24 23:05:58.008  INFO 1536 --- [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Starting...
2021-01-24 23:05:58.158  INFO 1536 --- [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Start completed.
Property 'mapperLocations' was not specified or no matching resources found
2021-01-24 23:05:59.514  INFO 1536 --- [           main] o.s.s.concurrent.ThreadPoolTaskExecutor  : Initializing ExecutorService 'applicationTaskExecutor'
2021-01-24 23:05:59.634  INFO 1536 --- [           main] o.s.b.a.w.s.WelcomePageHandlerMapping    : Adding welcome page: class path resource [static/index.html]
2021-01-24 23:05:59.770  WARN 1536 --- [           main] ion$DefaultTemplateResolverConfiguration : Cannot find template location: classpath:/templates/ (please add some templates or check your Thymeleaf configuration)
2021-01-24 23:06:00.577  INFO 1536 --- [           main] org.quartz.impl.StdSchedulerFactory      : Using default implementation for ThreadExecutor
2021-01-24 23:06:00.589  INFO 1536 --- [           main] org.quartz.core.SchedulerSignalerImpl    : Initialized Scheduler Signaller of type: class org.quartz.core.SchedulerSignalerImpl
2021-01-24 23:06:00.589  INFO 1536 --- [           main] org.quartz.core.QuartzScheduler          : Quartz Scheduler v.2.3.2 created.
2021-01-24 23:06:00.592  INFO 1536 --- [           main] o.s.s.quartz.LocalDataSourceJobStore     : Using db table-based data access locking (synchronization).
2021-01-24 23:06:00.594  INFO 1536 --- [           main] o.s.s.quartz.LocalDataSourceJobStore     : JobStoreCMT initialized.
2021-01-24 23:06:00.595  INFO 1536 --- [           main] org.quartz.core.QuartzScheduler          : Scheduler meta-data: Quartz Scheduler (v2.3.2) 'clusteredScheduler' with instanceId 'NON_CLUSTERED'
  Scheduler class: 'org.quartz.core.QuartzScheduler' - running locally.
  NOT STARTED.
  Currently in standby mode.
  Number of jobs executed: 0
  Using thread pool 'org.quartz.simpl.SimpleThreadPool' - with 10 threads.
  Using job-store 'org.springframework.scheduling.quartz.LocalDataSourceJobStore' - which supports persistence. and is not clustered.

2021-01-24 23:06:00.595  INFO 1536 --- [           main] org.quartz.impl.StdSchedulerFactory      : Quartz scheduler 'clusteredScheduler' initialized from an externally provided properties instance.
2021-01-24 23:06:00.595  INFO 1536 --- [           main] org.quartz.impl.StdSchedulerFactory      : Quartz scheduler version: 2.3.2
2021-01-24 23:06:00.595  INFO 1536 --- [           main] org.quartz.core.QuartzScheduler          : JobFactory set to: org.springframework.scheduling.quartz.SpringBeanJobFactory@43b6cb1c
2021-01-24 23:06:00.620  INFO 1536 --- [           main] o.s.s.c.ThreadPoolTaskScheduler          : Initializing ExecutorService 'taskScheduler'
2021-01-24 23:06:01.120  INFO 1536 --- [           main] o.s.s.quartz.SchedulerFactoryBean        : Starting Quartz Scheduler now
2021-01-24 23:06:01.155  INFO 1536 --- [           main] o.s.s.quartz.LocalDataSourceJobStore     : Freed 0 triggers from 'acquired' / 'blocked' state.
2021-01-24 23:06:01.157  INFO 1536 --- [           main] o.s.s.quartz.LocalDataSourceJobStore     : Recovering 0 jobs that were in-progress at the time of the last shut-down.
2021-01-24 23:06:01.157  INFO 1536 --- [           main] o.s.s.quartz.LocalDataSourceJobStore     : Recovery complete.
2021-01-24 23:06:01.158  INFO 1536 --- [           main] o.s.s.quartz.LocalDataSourceJobStore     : Removed 0 'complete' triggers.
2021-01-24 23:06:01.158  INFO 1536 --- [           main] o.s.s.quartz.LocalDataSourceJobStore     : Removed 0 stale fired job entries.
2021-01-24 23:06:01.159  INFO 1536 --- [           main] org.quartz.core.QuartzScheduler          : Scheduler clusteredScheduler_$_NON_CLUSTERED started.
2021-01-24 23:06:01.171  INFO 1536 --- [           main] com.ruben.ScheduleTest                   : Started ScheduleTest in 5.474 seconds (JVM running for 6.453)

2021-01-24 23:06:01.352  INFO 1536 --- [           main] org.quartz.core.QuartzScheduler          : Scheduler clusteredScheduler_$_NON_CLUSTERED started.
2021-01-24 23:06:01.352  INFO 1536 --- [           main] com.ruben.ScheduleTest                   : 开始31.9214ms
任务列表:
ruben.achao
2021-01-24 23:06:01.394  INFO 1536 --- [eduler_Worker-1] com.ruben.ScheduleTest                   : achao 73.4035ms
2021-01-24 23:06:06.344  INFO 1536 --- [eduler_Worker-2] com.ruben.ScheduleTest                   : achao 5023.774ms
2021-01-24 23:06:11.335  INFO 1536 --- [eduler_Worker-3] com.ruben.ScheduleTest                   : achao 10014.7076ms
2021-01-24 23:06:11.363  INFO 1536 --- [        Timer-0] com.ruben.ScheduleTest                   : 已暂停10042.6578ms
2021-01-24 23:06:21.363  INFO 1536 --- [        Timer-1] com.ruben.ScheduleTest                   : 已继续20043.7775ms
2021-01-24 23:06:21.374  INFO 1536 --- [        Timer-1] com.ruben.ScheduleTest                   : 立马执行20054.4046ms
2021-01-24 23:06:21.380  INFO 1536 --- [eduler_Worker-4] com.ruben.ScheduleTest                   : achao 20060.3024ms
2021-01-24 23:06:21.399  INFO 1536 --- [eduler_Worker-5] com.ruben.ScheduleTest                   : achao 20079.0037ms
2021-01-24 23:06:21.417  INFO 1536 --- [eduler_Worker-6] com.ruben.ScheduleTest                   : achao 20097.102ms
2021-01-24 23:06:26.333  INFO 1536 --- [eduler_Worker-7] com.ruben.ScheduleTest                   : achao 25013.3733ms
2021-01-24 23:06:26.378  INFO 1536 --- [        Timer-3] com.ruben.ScheduleTest                   : 重置任务25058.3857ms
2021-01-24 23:06:26.396  INFO 1536 --- [eduler_Worker-8] com.ruben.ScheduleTest                   : achao 25076.284ms
2021-01-24 23:06:27.007  INFO 1536 --- [eduler_Worker-9] com.ruben.ScheduleTest                   : achao 25687.2499ms
2021-01-24 23:06:28.015  INFO 1536 --- [duler_Worker-10] com.ruben.ScheduleTest                   : achao 26695.0475ms
2021-01-24 23:06:29.008  INFO 1536 --- [eduler_Worker-1] com.ruben.ScheduleTest                   : achao 27688.1692ms
2021-01-24 23:06:30.010  INFO 1536 --- [eduler_Worker-2] com.ruben.ScheduleTest                   : achao 28689.7108ms
2021-01-24 23:06:31.015  INFO 1536 --- [eduler_Worker-3] com.ruben.ScheduleTest                   : achao 29694.8315ms
2021-01-24 23:06:31.367  INFO 1536 --- [        Timer-2] com.ruben.ScheduleTest                   : 结束[ruben.achao] ：30047.4592ms
2021-01-24 23:06:31.368  INFO 1536 --- [        Timer-2] org.quartz.core.QuartzScheduler          : Scheduler clusteredScheduler_$_NON_CLUSTERED paused.
2021-01-24 23:06:31.368  INFO 1536 --- [        Timer-2] com.ruben.ScheduleTest                   : 暂停调度器30047.7245ms
2021-01-24 23:06:31.368  INFO 1536 --- [        Timer-2] org.quartz.core.QuartzScheduler          : Scheduler clusteredScheduler_$_NON_CLUSTERED shutting down.
2021-01-24 23:06:31.368  INFO 1536 --- [        Timer-2] org.quartz.core.QuartzScheduler          : Scheduler clusteredScheduler_$_NON_CLUSTERED paused.
2021-01-24 23:06:31.845  INFO 1536 --- [        Timer-2] org.quartz.core.QuartzScheduler          : Scheduler clusteredScheduler_$_NON_CLUSTERED shutdown complete.
2021-01-24 23:06:31.845  INFO 1536 --- [        Timer-2] com.ruben.ScheduleTest                   : 结束调度器30525.6397ms
```

