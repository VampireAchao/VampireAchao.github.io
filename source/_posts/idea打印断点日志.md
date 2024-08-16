---
title: idea打印断点日志
date: 2022-07-03 14:53:53
tags: 小技巧
---

> 履不必同，期于适足；治不必同，期于利民。——魏源

先上图

![image-20220703145403865](/imgs/oss/picGo/image-20220703145403865.png)

然后开始 *~~水字数~~* 讲解：

我们可以看到当我们`debug`设置断点时，如果勾选了黄色区域

`Log: "Breakpoint hit" message`(日志 "断点命中"消息)

此时当我们的断点触发后，会打印断点命中时的信息

```shell
BreakPoint reached at 类名:行号
```

旁边还有一个`Stack trace`

和上面的类似，但会打印出堆栈信息