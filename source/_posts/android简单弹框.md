---
title: android简单弹框
date: 2020-09-24 20:05:07
tags: android
---

> 勇于求知的人，决不至于空闲于事。——孟德斯鸠

非常简单

先看效果

![image-20200924200731804](/imgs/oss/picGo/image-20200924200731804.png)

```java
        // 构件一个AlertDialog
        new AlertDialog.Builder(MainActivity.this)
                // 设置标题
                .setTitle("提示")
                // 设置主要消息
                .setMessage("确认？")
                // 设置确认按钮
                .setPositiveButton("确定", (dialog, which) -> {
                    // 点击确认按钮后执行
                    Log.i("点击了确认", "太棒了！");
                })
                //设置取消按钮
                .setNegativeButton("取消", (dialog, which) -> {
                    // 点击取消按钮后执行
                    Log.e("点击了取消", "退出本页面");
                    finish();
                })
                // 使弹框显示 hide()为隐藏
                .show();
```

对于这种小组件，是经常用到的，顺便一提还可以使用`setView()`自定义弹框视图