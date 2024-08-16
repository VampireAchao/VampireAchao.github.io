---
title: debugのChrome篇
date: 2020-12-01 20:24:12
tags: java
---

> 我来到这个世界为的是看太阳和蔚蓝色的田野。——巴尔蒙特


`chrome`中如何`debug`？我们可以打开`chrome`的控制台

![image-20201201203437207](/imgs/oss/picGo/image-20201201203437207.png)

找到我们的文件

![image-20201201203500555](/imgs/oss/picGo/image-20201201203500555.png)

然后在想要调试的地方打断点

![image-20201201203527958](/imgs/oss/picGo/image-20201201203527958.png)

然后执行到此处的时候就会触发调试

![image-20201201203556273](/imgs/oss/picGo/image-20201201203556273.png)

我们可以点击右侧的`Step into next function call`来执行下一步函数调用

![image-20201201203633579](/imgs/oss/picGo/image-20201201203633579.png)

可以点击`Resume script execution`放行到下个断点

![image-20201201210339802](/imgs/oss/picGo/image-20201201210339802.png)

然后`Step over next function call`则可以执行步过，执行到当前函数结尾

![image-20201201204025840](/imgs/oss/picGo/image-20201201204025840.png)

`Step out of current function`步出，则可以跳出我们当前执行的函数

![image-20201201204233323](/imgs/oss/picGo/image-20201201204233323.png)

`Step`和我们第一个`Step into next function call`差不多，都是执行下一步

![image-20201201204850979](/imgs/oss/picGo/image-20201201204850979.png)

`Activate breakpoints`则是禁用断点

![image-20201201205012179](/imgs/oss/picGo/image-20201201205012179.png)

最后一个`Pause on exceptions`则是在所有异常发生时暂停程序，开始调试

![image-20201201205137674](/imgs/oss/picGo/image-20201201205137674.png)

我们也可以直接在代码里右键，点击执行到当前代码

![image-20201201205810411](/imgs/oss/picGo/image-20201201205810411.png)

`Call Stack`区域可以查看我们当前函数以及它的调用者 甚至 调用者的调用者...

![image-20201201210009626](/imgs/oss/picGo/image-20201201210009626.png)

下方的`Scope`区域可以观测我们的参数，在`Breakpoints`区域则是我们设置的断点

![image-20201201203824755](/imgs/oss/picGo/image-20201201203824755.png)

在我们设置的断点右键，可以看到也有很多选项

![image-20201201213400553](/imgs/oss/picGo/image-20201201213400553.png)

`XHR/fectch Breakpoints`右侧的`+`则可以在指定请求设置断点

![image-20201201210653747](/imgs/oss/picGo/image-20201201210653747.png)

我们还可以设置为任意请求

![image-20201201210759521](/imgs/oss/picGo/image-20201201210759521.png)

`DOM Breakpoints`则是元素断点

![image-20201201210958371](/imgs/oss/picGo/image-20201201210958371.png)

比如我这里给`input`元素设置了个当标签的属性发生修改时停止我们的程序

![image-20201201211107627](/imgs/oss/picGo/image-20201201211107627.png)

顺带一提，我们还可以把指定`js`放入“黑盒”

![image-20201201211632011](/imgs/oss/picGo/image-20201201211632011.png)

放入“黑盒”的代码，我们执行的时候会跳过这些js，比如一些第三方框架源码我们就可以放入“黑盒”。当然我们可以点击上方的按钮移出“黑盒”

![image-20201201211752404](/imgs/oss/picGo/image-20201201211752404.png)

右边的`Configure`按钮则可以进行一些配置，甚至能看到我们`DEBUG`的快捷键

![image-20201201211926834](/imgs/oss/picGo/image-20201201211926834.png)

下面则是我们的全局监听断点，`Global`能看到我们设置的触发调试监听事件

`Event Listener Breakpoints`中我们可以任意设置触发调试的监听事件

![image-20201201213105178](/imgs/oss/picGo/image-20201201213105178.png)

大概就是这里啦~现在大家能在以后写前端的时候除了`console.log()`还能多一种选择