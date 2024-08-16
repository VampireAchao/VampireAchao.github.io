---
title: java模块导出与导入
date: 2021-07-23 23:33:48
tags: java
---

> 只有经历过地狱般的磨砺，才能练就创造天堂的力量；只有流过血的手指，才能弹出世间的绝响。——泰戈尔

在`java9`中，新增了模块导入导出功能

我们可以新建一个`module-info.java`文件

![image-20210723233505046](/imgs/oss/picGo/image-20210723233505046.png)

然后我们可以在其中定义模块名、导出模块、引入模块

例如我这里定义了模块名为`simple.design`

导出的包为`com.ruben.vistor.example.insurance`和`com.ruben.vistor.example.check`

导入的包为`java.net.http`以及`java.sql`

```java
module simple.design {
    exports com.ruben.vistor.example.insurance;
    exports com.ruben.vistor.example.check;
    requires java.net.http;
    requires java.sql;
}
```

![image-20210723234209059](/imgs/oss/picGo/image-20210723234209059.png)

我们在本模块中可以使用到`java.net.http`以及`java.sql`

当然我们导出的这两个包下面的类也可以在另一个模块中引用

需要使用`requires`导入

```java
module simple.features {
    requires simple.design;
}
```

![image-20210723234357532](/imgs/oss/picGo/image-20210723234357532.png)

