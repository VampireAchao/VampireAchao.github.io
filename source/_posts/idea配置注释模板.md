---
title: idea配置注释模板
date: 2020-10-16 19:44:33
tags: 小技巧
---

> 见善如不及，见不善如探汤。——《论语》

首先打开设置

`File`->`Settings`

![image-20201016195324270](/imgs/oss/picGo/image-20201016195324270.png)

![image-20201016195349162](/imgs/oss/picGo/image-20201016195349162.png)

然后自定义

```java
/**
 * @ClassName: ${NAME}
 * @Description: 我还没有写描述
 * @Date: $DATE $TIME
 * *
 * @author: <achao1441470436@gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
```

如果我们要自定义方法注释模板的话需要找到`Editor`->`Live Templates`

![image-20201016203037509](/imgs/oss/picGo/image-20201016203037509.png)

然后新建组

![image-20201016203205471](/imgs/oss/picGo/image-20201016203205471.png)

![image-20201016203226293](/imgs/oss/picGo/image-20201016203226293.png)

名字随便写

然后新建`Live Template`动态模板

缩写写个`*`，上面的默认展开设为回车

![image-20201016203530336](/imgs/oss/picGo/image-20201016203530336.png)

```java
*
 * @MethodName: $methodName$
 * @Description: 我还没有写描述
 * @Date: $date$ $time$
 * *
 * @author: <achao1441470436@gmail.com>
 * @param: $methodParameters$
 * @returnValue: $methodReturnType$
 */
```

![image-20201016203401944](/imgs/oss/picGo/image-20201016203401944.png)

![image-20201016203413468](/imgs/oss/picGo/image-20201016203413468.png)

还有点右方的编辑变量

![image-20201016203437378](/imgs/oss/picGo/image-20201016203437378.png)

![image-20201016203442789](/imgs/oss/picGo/image-20201016203442789.png)

完成后按`/**`再回车就可以在方法上加上注释了