---
title: springboot中VO属性别名
date: 2021-02-26 22:41:55
tags: java
---

> 路是脚踏出来的，历史是人写出来的。人的每一步行动都在书写自己的历史。——吉鸿昌

使用`springboot`进行开发时，使用的`VO`有时候会更改别名，如果我们直接更改属性名，就需要把引用的地方都改了，较为麻烦

`springboot`默认使用`jackson`进行序列化/反序列化参数

所以我们可以使用`com.fasterxml.jackson.annotation.JsonProperty`注解

![image-20210226224436770](/imgs/oss/picGo/image-20210226224436770.png)

给我们的`VO`起一个别名，然后我们请求就可以使用别名`keyword`

![image-20210226224612989](/imgs/oss/picGo/image-20210226224612989.png)

我们发送请求后`debug`可以看到确实接收到了

![image-20210226224704607](/imgs/oss/picGo/image-20210226224704607.png)