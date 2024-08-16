---
title: androidのdialog点击按钮不关闭
date: 2020-10-20 21:00:57
tags: android
---

> 智慧是宝石，如果用谦虚镶边，就会更加灿烂夺目。——高尔基

如果想要安卓的`dialog`点击按钮后默认不关闭弹框，可以这么写

```java
AlertDialog.Builder builder = new AlertDialog.Builder(context);
            AlertDialog alertDialog = builder.setPositiveButton("保存", null)
                    .setNegativeButton("收藏", (dialog, which) -> {
                        ToastUtils.shortToast("我还没做收藏功能!");
                    }).create();
            alertDialog.show();
            alertDialog.getButton(AlertDialog.BUTTON_POSITIVE).setOnClickListener(v1 -> {
                RestVolleyDownload.DownloadResponse response = RestVolleyDownload.syncDownload(context, url, url.substring(url.lastIndexOf("/") + 1));
                System.out.println(response);
                ToastUtils.shortToast("保存成功");
            });
```

