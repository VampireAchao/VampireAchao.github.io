---
title: GenerateAllSetter
date: 2021-12-07 18:29:02
tags: 软件及插件
---

> 每段记忆都是零碎的，犹如残破的蛛丝，无声无息的藏在黑暗的角落里。——桐华

我们在开发中经常会遇到给`POJO`设置值，而对于属性非常多的话，我们使用`setter`设置值，就很不方便，容易弄丢某个属性或者设置多次等

这里介绍一款插件：`GenerateAllSetter`

![image-20211207173116984](/imgs/oss/picGo/image-20211207173116984.png)

使用方式也很简单：

![image-20211207173305977](/imgs/oss/picGo/image-20211207173305977.png)

生成效果：

![image-20211207173332418](/imgs/oss/picGo/image-20211207173332418.png)

包括建造者模式

![image-20211207173448465](/imgs/oss/picGo/image-20211207173448465.png)

![image-20211207173511530](/imgs/oss/picGo/image-20211207173511530.png)

这个是生成不要默认值的`setter`

![image-20211207173632562](/imgs/oss/picGo/image-20211207173632562.png)