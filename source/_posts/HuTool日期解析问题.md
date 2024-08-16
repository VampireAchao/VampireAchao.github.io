---
title: HuTool日期解析问题
date: 2024-06-05 19:35:36
tags: java
---

> 多说话的人不是长于做事的人。——佚名

收到一个`issue`

[DateUtil.parse()无法解析日期： · Issue #3608 · dromara/hutool · GitHub](https://github.com/dromara/hutool/issues/3608)

> ### 版本情况
> 
> JDK版本：    openjdk_8 and jdk17
> hutool版本： 5.2.7（请确保最新尝试是否还有问题）
> 
> ### 问题描述（包括截图）
> 
> "1940-06-01 00:00:00" ~  "1940-06-01 00:59:00"，这个时间范围是无法使用DateUtil.parse(dateTime, DatePattern.NORM_DATETIME_PATTERN)解析的
> 
> 1. 复现代码
> 
> ```java
>     @Test
>     public void t17() {
>         String dateTime = "1940-06-01 00:00:00";
>         DateTime parse = DateUtil.parse(dateTime, DatePattern.NORM_DATETIME_PATTERN);
>         Console.log(parse);
>     }
> ```
> 
> ```java
> cn.hutool.core.date.DateException: Parse [1940-06-01 00:00:00] with format [yyyy-MM-dd HH:mm:ss] error!
> 
>     at cn.hutool.core.date.DateTime.parse(DateTime.java:1096)
>     at cn.hutool.core.date.DateTime.<init>(DateTime.java:281)
>     at cn.hutool.core.date.DateUtil.parse(DateUtil.java:731)
>     at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
>     at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
>     at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
>     at java.lang.reflect.Method.invoke(Method.java:498)
>     at org.junit.runners.model.FrameworkMethod$1.runReflectiveCall(FrameworkMethod.java:59)
>     at org.junit.internal.runners.model.ReflectiveCallable.run(ReflectiveCallable.java:12)
>     at org.junit.runners.model.FrameworkMethod.invokeExplosively(FrameworkMethod.java:56)
>     at org.junit.internal.runners.statements.InvokeMethod.evaluate(InvokeMethod.java:17)
>     at org.junit.runners.ParentRunner$3.evaluate(ParentRunner.java:306)
>     at org.junit.runners.BlockJUnit4ClassRunner$1.evaluate(BlockJUnit4ClassRunner.java:100)
>     at org.junit.runners.ParentRunner.runLeaf(ParentRunner.java:366)
>     at org.junit.runners.BlockJUnit4ClassRunner.runChild(BlockJUnit4ClassRunner.java:103)
>     at org.junit.runners.BlockJUnit4ClassRunner.runChild(BlockJUnit4ClassRunner.java:63)
>     at org.junit.runners.ParentRunner$4.run(ParentRunner.java:331)
>     at org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:79)
>     at org.junit.runners.ParentRunner.runChildren(ParentRunner.java:329)
>     at org.junit.runners.ParentRunner.access$100(ParentRunner.java:66)
>     at org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:293)
>     at org.junit.runners.ParentRunner$3.evaluate(ParentRunner.java:306)
>     at org.junit.runners.ParentRunner.run(ParentRunner.java:413)
>     at org.junit.runner.JUnitCore.run(JUnitCore.java:137)
>     at com.intellij.junit4.JUnit4IdeaTestRunner.startRunnerWithArgs(JUnit4IdeaTestRunner.java:69)
>     at com.intellij.rt.junit.IdeaTestRunner$Repeater$1.execute(IdeaTestRunner.java:38)
>     at com.intellij.rt.execution.junit.TestsRepeater.repeat(TestsRepeater.java:11)
>     at com.intellij.rt.junit.IdeaTestRunner$Repeater.startRunnerWithArgs(IdeaTestRunner.java:35)
>     at com.intellij.rt.junit.JUnitStarter.prepareStreamsAndStart(JUnitStarter.java:232)
>     at com.intellij.rt.junit.JUnitStarter.main(JUnitStarter.java:55)
> Caused by: java.text.ParseException: Unparseable date: "1940-06-01 00:00:00"
>     at java.text.DateFormat.parse(DateFormat.java:366)
>     at cn.hutool.core.date.DateTime.parse(DateTime.java:1088)
>     ... 30 more
> ```
> 
> 3. 堆栈信息
> 
> 4. 测试涉及到的文件（注意脱密）
> 
> 比如报错的Excel文件，有问题的图片等。

这里原来是因为启用了严格模式，这是一个夏令时

[date - `uuuu` versus `yyyy` in `DateTimeFormatter` formatting pattern codes in Java? - Stack Overflow](https://stackoverflow.com/questions/41177442/uuuu-versus-yyyy-in-datetimeformatter-formatting-pattern-codes-in-java)

[r - as.POSIX error, can not convert a particular date - Stack Overflow](https://stackoverflow.com/questions/63913622/as-posix-error-can-not-convert-a-particular-date)

相关的文章也说了，这里顺带提一下日期的字母表


