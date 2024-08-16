---
title: 安卓dp转px
date: 2021-02-09 19:26:40
tags: android
---

> 一个人最伤心的事情莫过于良心的死灭，一个社会最伤心的现象无过于正义的沦亡。——郭沫若

`code`

```java
    public static int dp2Px(Context context,int dp){
       return Math.round(context.getResources().getDisplayMetrics().density * dp);
    }
```

