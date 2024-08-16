---
title: android选择框
date: 2020-10-25 10:21:30
tags: android
---

> 精神健康的人，总是努力的工作及爱人，只要能做到这两件事，其它的事就没有什么困难。 —— 佛洛依德

直接上代码吧

```java
        new AlertDialog.Builder(activity)
                // 设置标题
                .setTitle("请选择")
                .setSingleChoiceItems(Items, -1, (dialog, which) -> {
                    // 执行操作，例如把选中的值赋给组件
                    System.out.println(Items[which]);
                    // 让弹框消失
                    dialog.dismiss();
                }).show();
```

