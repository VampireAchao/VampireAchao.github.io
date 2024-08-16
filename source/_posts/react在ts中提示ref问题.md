---
title: react在ts中提示ref问题
date: 2022-06-16 13:03:08
tags: 前端
---

> 不要太在乎一些人，越在乎，越卑微。——周国平

首先按照官方文档的`demo`写好代码，却报错如下：

![image-20220616130732782](/imgs/oss/picGo/image-20220616130732782.png)

安装插件`Error Lens`后：

![image-20220616130416141](/imgs/oss/picGo/image-20220616130416141.png)

如何解决？

前往`Text`的`ref`源码，可以看到是需要一个叫`LegacyRef`的类型

![image-20220616131033822](/imgs/oss/picGo/image-20220616131033822.png)

我们进`LegacyRef`，看到其就是`Ref`或`string`的类型

![image-20220616131134570](/imgs/oss/picGo/image-20220616131134570.png)

因此这里我们定义为`Ref`类型即可

![image-20220616131228231](/imgs/oss/picGo/image-20220616131228231.png)

这里出现了新的问题，不能将`MutableRefObject<Text | null |undefined>`分配给`Ref<Text>`

我们进入`useRef`源码，看到其包含几个重载

![image-20220616131355690](/imgs/oss/picGo/image-20220616131355690.png)

分别查看`MuteableRefObject`和`RefObject`

![image-20220616131558832](/imgs/oss/picGo/image-20220616131558832.png)

可以看到`RefObject`是`Ref`中容许的其中一种类型

![image-20220616131733093](/imgs/oss/picGo/image-20220616131733093.png)

所以应该使用上面一种重载

![image-20220616131807973](/imgs/oss/picGo/image-20220616131807973.png)

在原有代码`React.useRef()`中传入`null`

报错解决

![image-20220616131847569](/imgs/oss/picGo/image-20220616131847569.png)

同理，`trRef`一样

![image-20220616131948951](/imgs/oss/picGo/image-20220616131948951.png)

注意此处`Ref<TextRef>`内的泛型使用的是`konva/lib/shapes/Text`包下的`Text`，改名为`TextRef`

除了在定义变量左侧申明类型，在方法右侧也可以申明泛型，让编辑器自动推测

![image-20220616132252642](/imgs/oss/picGo/image-20220616132252642.png)