---
title: android集成aspectj
date: 2020-10-18 16:08:07
tags: android
---

> 谢谢火焰给你光明，但不要忘了在黑暗中替你执灯的人！——泰戈尔

安卓集成`aspectj`

首先要引入依赖

先在项目`gradle`中配置

![image-20201018161737699](/imgs/oss/picGo/image-20201018161737699.png)

![image-20201018161810565](/imgs/oss/picGo/image-20201018161810565.png)

```gradle
dependencies {
        classpath "com.android.tools.build:gradle:4.0.1"
        classpath 'com.hujiang.aspectjx:gradle-android-plugin-aspectjx:2.0.10'
        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
```

然后在模块`gradle`中配置

```gradle
apply plugin: 'android-aspectjx'
```

以及

```gradle
aspectjx {
        exclude 'module-info.class'
        enabled true
    }
```

![image-20201018161954549](/imgs/oss/picGo/image-20201018161954549.png)

还有在最下面的依赖中加入

```gradle
api 'org.aspectj:aspectjrt:1.9.5'
```

![image-20201018162047092](/imgs/oss/picGo/image-20201018162047092.png)

之后就可以使用我们的`AOP`了