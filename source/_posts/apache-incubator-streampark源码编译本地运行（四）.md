---
title: apache-incubator-streampark源码编译本地运行（四）
date: 2023-07-23 11:06:45
tags: java
---

> 泰山不让土壤，故能成其大；河流不择细流，故能就其深。——李斯

首先是编译，由于我换到了`mac`，并且`maven profile`又发生了改变：

执行跟目录的`build.sh`

执行后`scala`报错。。。

![](/imgs/oss/picGo/20230723110820.png)

此时删除掉`maven`本地`repository`里的`org.scala-lang`

重新执行即可

```bash
Caused by: java.lang.ClassNotFoundException: org.apache.streampark.shaded.org.slf4j.Logger
```

主要最后的部分：

```bash
Caused by: java.lang.ClassNotFoundException: org.apache.streampark.shaded.org.slf4j.Logger
```

我们切换到`shaded`模块进行`install`
