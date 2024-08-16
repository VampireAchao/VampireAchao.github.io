---
title: android隐藏软键盘
date: 2020-11-15 19:14:49
tags: android
---

> 聪明出于勤奋，天才在于积累。——华罗庚

代码

```java
    /**
     * 隐藏软键盘   在dialog的编辑界面时
     */
    public static void hideSoftKeyboard(Activity activity, View view) {
        InputMethodManager inputMethodManager = (InputMethodManager) activity.getSystemService(Activity.INPUT_METHOD_SERVICE);
        inputMethodManager.hideSoftInputFromWindow(view.getWindowToken(), 0);
    }
```

