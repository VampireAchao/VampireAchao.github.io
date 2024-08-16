---
title: TransmittableThreadLocal
date: 2021-11-19 18:48:33
tags: java
---

> 我们一直寻找的，却是自己原本已经拥有的；我们总是东张西望，唯独漏了自己想要的，这就是我们至今难以如愿以偿的原因——柏拉图

分享一个`TransmittableThreadLocal`作为`InheritableThreadLocal`的拓展

出自阿里，`github`地址：

```shell
https://github.com/alibaba/transmittable-thread-local
```

部分描述：

> `JDK`的[`InheritableThreadLocal`](https://docs.oracle.com/javase/10/docs/api/java/lang/InheritableThreadLocal.html)类可以完成父线程到子线程的值传递。但对于使用线程池等会池化复用线程的执行组件的情况，线程由线程池创建好，并且线程是池化起来反复使用的；这时父子线程关系的`ThreadLocal`值传递已经没有意义，应用需要的实际上是把 **任务提交给线程池时**的`ThreadLocal`值传递到 **任务执行时**。
>
> 本库提供的[`TransmittableThreadLocal`](https://gitee.com/alibaba-projects/transmittable-thread-local/blob/master/src/main/java/com/alibaba/ttl/TransmittableThreadLocal.java)类继承并加强`InheritableThreadLocal`类，解决上述的问题，使用详见[User Guide](https://gitee.com/alibaba-projects/transmittable-thread-local?_from=gitee_search#-user-guide)。
>
> 整个`TransmittableThreadLocal`库的核心功能（用户`API`与框架/中间件的集成`API`、线程池`ExecutorService`/`ForkJoinPool`/`TimerTask`及其线程工厂的`Wrapper`），只有 ***~1000 `SLOC`代码行\***，非常精小。

用法上可以没什么改变

![image-20211119185444384](/imgs/oss/picGo/image-20211119185444384.png)
