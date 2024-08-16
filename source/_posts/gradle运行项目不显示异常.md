---
title: gradle运行项目不显示异常
date: 2022-01-04 19:54:40
tags: java
---

> 此刻烦躁的心情就像用十除以三得出的结果一样，无穷无尽。——夏目漱石《我是猫》

我们使用`gradle`项目时经常异常日志打印不全，只打印部分，并提示我们可以使用`--stacktrace`

```shell
* Try:
Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output. Run with --scan to get full insights.
* Get more help at https://help.gradle.org
```

那这个`--stacktrace`在哪加呢？

我们按`alt+shift+f9`再按一下`0`

![image-20220104201034450](/imgs/oss/picGo/image-20220104201034450.png)

或者直接点击右上方的编辑配置

![image-20220104201056383](/imgs/oss/picGo/image-20220104201056383.png)

然后在此处加上`--stracktrace`

![image-20220104201152748](/imgs/oss/picGo/image-20220104201152748.png)

然后再次运行就可以显示完整异常日志了