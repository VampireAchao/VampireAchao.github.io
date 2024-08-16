---
title: mybatis-plus源码环境搭建及运行
date: 2021-09-15 21:30:41
tags: java
---

> 知古不知今，谓之落沉。知今不知古，谓之盲瞽。——王充

今天有小伙伴问我`mybatis-plus`源码运行不了

让我写一篇教程。。。

首先来到[`gitee`仓库](https://gitee.com/baomidou/mybatis-plus)

复制地址

```shell
https://gitee.com/baomidou/mybatis-plus.git
```

然后在`idea`中导入

![image-20210915213421318](/imgs/oss/picGo/image-20210915213421318.png)

![image-20210915213435043](/imgs/oss/picGo/image-20210915213435043.png)

完成后打开项目了

等待`gradle`构建、导入依赖

![image-20210915213517911](/imgs/oss/picGo/image-20210915213517911.png)

然后检查环境

![image-20210915213544077](/imgs/oss/picGo/image-20210915213544077.png)

指定为`jdk8`

![image-20210915213605624](/imgs/oss/picGo/image-20210915213605624.png)

注意也要检查一下模块这里

![image-20210915213634603](/imgs/oss/picGo/image-20210915213634603.png)

然后如果我们`gradle`依赖下载好了就可以找一个测试类执行了

![image-20210915214057462](/imgs/oss/picGo/image-20210915214057462.png)

如果有一些废弃警告可以忽略

我的`gradle`配置如下，那都是用的`idea`默认的配置，当然如果是`idea2021`版本`lombok`有问题，可以看我[这一篇博客](https://VampireAchao.github.io/2021/05/11/idea2021lombok%E9%97%AE%E9%A2%98/)：

![image-20210915214201157](/imgs/oss/picGo/image-20210915214201157.png)

如果还是不行，可以试着清除一下`idea`缓存

![image-20210915214645556](/imgs/oss/picGo/image-20210915214645556.png)
