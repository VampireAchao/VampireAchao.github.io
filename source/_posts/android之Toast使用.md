---
title: android之Toast使用
date: 2020-09-22 19:33:22
tags: android
---

> 总盯着过去，你会瞎掉一只眼；然而忘掉历史，你会双目失明。——索尔仁尼琴

要实现一个`toast`效果其实非常简单

![image-20200922193402304](/imgs/oss/picGo/image-20200922193402304.png)

只需要这三行代码就能搞定

```java
        Toast shortToast = Toast.makeText(getApplicationContext(), "短Toast", Toast.LENGTH_SHORT);
        shortToast.setGravity(Gravity.CENTER, 0, 0);
        shortToast.show();
```

还有一种长`toast`

![image-20200922193603011](/imgs/oss/picGo/image-20200922193603011.png)

同样非常简单

```java
        Toast longToast = Toast.makeText(getApplicationContext(), "长Toast", Toast.LENGTH_LONG);
        longToast.setGravity(Gravity.CENTER, 0, 0);
        longToast.show();
```

