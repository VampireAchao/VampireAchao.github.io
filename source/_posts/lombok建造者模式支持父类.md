---
title: lombok建造者模式支持父类
date: 2021-10-19 18:24:45
tags: java
---

> 精力充沛的青春，是不怎么容易灭亡的。——卡罗萨

使用`@SuperBuilder`注解代替原本的`@Builder`就可以了

如果对建造者模式不太了解的，可以看我以往写的博客：

https://VampireAchao.github.io/2020/11/08/%E5%BB%BA%E9%80%A0%E8%80%85%E6%A8%A1%E5%BC%8F/

这里做个对比，加之前：

![image-20211019174128848](/imgs/oss/picGo/image-20211019174128848.png)

![image-20211019180447313](/imgs/oss/picGo/image-20211019180447313.png)



![image-20211019180419448](/imgs/oss/picGo/image-20211019180419448.png)

加之后：

![image-20211019180437521](/imgs/oss/picGo/image-20211019180437521.png)

![image-20211019180456043](/imgs/oss/picGo/image-20211019180456043.png)

可以看到子类开始的建造者模式成功访问到父类属性，不过最终获取到的还是父类

如果想要最终获取到的还是子类，可以在父类也使用`@SuperBuilder`

不过父类的父类也要有`@SuperBuilder`

![image-20211020115100028](/imgs/oss/picGo/image-20211020115100028.png)
