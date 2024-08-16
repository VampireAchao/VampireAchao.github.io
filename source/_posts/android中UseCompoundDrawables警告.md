---
title: android中UseCompoundDrawables警告
date: 2024-05-02 16:45:44
tags: android
---

> 促使一个人值得信任的唯一方式就是信任他。——史汀生

在`Android`开发中，如果你看到 `UseCompoundDrawables` 这类的提示或警告，它通常来自于`Android Lint`工具，这是一种代码质量检测工具，用于指出可以优化的代码实践。`UseCompoundDrawables` 警告提示你可以使用 `TextView` 的 `compound drawables` 功能，而不是在布局中单独使用一个 `ImageView` 和 `TextView`。

`TextView` 提供了一种方式来直接在文本周围放置图标（上、下、左、右），这可以通过在TextView中使用 `android:drawableLeft`、`android:drawableRight`、`android:drawableTop` 或 `android:drawableBottom` 属性来实现。使用这种方式比起分别放置 `ImageView` 和 `TextView` 更有效率，因为它减少了布局层次结构的复杂性，并且可以提升渲染性能。

假设你有一个 `TextView` 和一个图标显示性别，而你当前是这样布置的：

```xml
<LinearLayout
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_marginTop="@dimen/dp_4"
    android:gravity="center_vertical"
    android:orientation="horizontal">

    <TextView
        android:id="@+id/name"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:ellipsize="end"
        android:lines="1"
        android:maxWidth="@dimen/dp_200"
        android:text="foo"
        android:textColor="@color/ff333333"
        android:textSize="15sp"
        android:textStyle="bold" />

    <ImageView
        android:id="@+id/gender"
        android:layout_width="@dimen/dp_17"
        android:layout_height="@dimen/dp_17"
        android:layout_marginStart="@dimen/dp_5"
        android:src="@mipmap/gender_boy" />

</LinearLayout>
```

可以优化为：

```xml
<TextView
    android:id="@+id/name"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_marginTop="@dimen/dp_4"
    android:ellipsize="end"
    android:lines="1"
    android:maxWidth="@dimen/dp_200"
    android:drawableRight="@mipmap/gender_boy"
    android:drawablePadding="@dimen/dp_5"
    android:text="foo"
    android:textColor="@color/ff333333"
    android:textSize="15sp"
    android:textStyle="bold"
    android:gravity="center_vertical" />
```

在这个优化后的例子中，你使用了 `android:drawableRight` 来放置图标，并用 `android:drawablePadding` 来设置图标与文本之间的间距。这样做简化了布局并可能提高了性能。

### 总结

如果你的项目中出现 `UseCompoundDrawables` 警告，考虑调整你的布局以使用 `TextView` 的 `compound drawables` 功能，这通常是一个更优的布局实践。
