---
title: Json Web Token
date: 2021-06-05 21:55:36
tags: java
---

> 我以为人们在每一个时期都可以过有趣而且有用的生活。我们应该不虚度一生，应该能够说，“我已经做了我能做的事”，人们只能要求我们如此，而且只有这样我们才能有一点欢乐——居里夫人

[项目源码](https://gitee.com/VampireAchao/simple-jwt.git)

校验逻辑如下：

我们客户端在每个需要登录的请求带着`token`访问我们的接口，在服务端的`LoginInterceptor`中进行校验`token`

登录逻辑如下：

1.登录校验用户名密码

2.生成token：通过`jwt`工具类，使用用户名和密码生成`token`，然后把`token`存`redis`，设置过期时间

刷新`token`逻辑如下：

`token`过期后返回 “`token`过期对应的`code`”，客户端使用一个大于`token`过期时间的`refreshToken`去调用刷新`token`的接口，`refreshToken`通过校验之后，直接生成新的`token`

我这里设置的两倍，这样在超过token有效期一倍，小于两倍时，期间可以刷新token，再超时就需要重新登录了

[项目](https://gitee.com/VampireAchao/simple-jwt.git)大家可以拉下来玩一玩

![image-20210606232045052](/imgs/oss/picGo/image-20210606232045052.png)

![image-20210606232136030](/imgs/oss/picGo/image-20210606232136030.png)

![image-20210606232145996](/imgs/oss/picGo/image-20210606232145996.png)

