---
title: android背景省略drawable
date: 2024-05-09 20:42:02
tags: android
---

> 带来安定的是两种力量：法律和礼貌。——歌德

https://github.com/JavaNoober/BackgroundLibrary

作为一个android程序员，对于shape、selector这两个标签一定不陌生。每当UI设计师给我们设计出一个个button背景的时候，我们就需要去drawable文件夹下去新建一个bg_xxx.xml，然后很多时候区别仅仅是一个边框的颜色或者填充的颜色。这就导致了很多非常相似的.xml文件产生。 网上之前也有了一种通过自定义View，在xml中通过设置属性达到shape效果的控件。但是这种自定义的控件不太灵活，归根到底是一个自定义的button，如果我想改造项目的话就得去替换原有的button或者textView。接下来就给大家提供一种更加简单的方式：  
**无需自定义View，直接添加属性便可以实现shape、selector效果**。



依赖方式：

```
allprojects {
    repositories {
        ...
        maven { url 'https://jitpack.io' }
    }
}

implementation "com.android.support:appcompat-v7:$supportVersion"
implementation 'com.github.JavaNoober.BackgroundLibrary:library:1.7.6'
```

如果项目使用了androidx：

```
allprojects {
    repositories {
        ...
        maven { url 'https://jitpack.io' }
    }
}

implementation "androidx.appcompat:appcompat:$supportVersion" 
implementation 'com.github.JavaNoober.BackgroundLibrary:libraryx:1.7.6'
```

使用效果完全和原生shape selector一样，但是只需要直接在xml中加入属性即可，例如

```
    <TextView
        android:id="@+id/ttt"
        android:layout_width="130dp"
        android:layout_height="36dp"
        android:layout_marginTop="5dp"
        android:gravity="center"
        android:text="TextView"
        android:textColor="#8c6822"
        android:textSize="20sp"
        app:bl_corners_radius="4dp"
        app:bl_solid_color="#E3B666"
        app:bl_stroke_color="#8c6822"
        app:bl_stroke_dashGap="5dp"
        app:bl_stroke_dashWidth="10dp"
        app:bl_stroke_width="2dp" />
```

1、边框+背景+圆角

```
<TextView
    android:layout_width="130dp"
    android:layout_width="130dp"
    android:layout_height="36dp"
    android:gravity="center"
    android:text="TextView"
    android:textColor="#8c6822"
    android:textSize="20sp"
    app:bl_corners_radius="4dp"
    app:bl_solid_color="#E3B666"
    app:bl_stroke_color="#8c6822"
    app:bl_stroke_width="2dp" />
```

等同于

```
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <corners android:radius="2dp"/>
    <solid android:color="#E3B666"/>
    <stroke android:color="#E3B666" android:width="2dp"/>
</shape>
```

2、渐变

```
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <corners android:radius="2dp"/>
    <gradient android:angle="0" 
              android:startColor="#63B8FF"
              android:endColor="#4F94CD"/>
</shape>
```

等同于

```
 <Button
    android:id="@+id/btn"
    android:layout_width="130dp"
    android:layout_height="36dp"
    android:layout_marginTop="5dp"
    android:gravity="center"
    android:padding="0dp"
    android:text="跳转到列表"
    android:textColor="#4F94CD"
    android:textSize="20sp"
    app:bl_corners_radius="2dp"
    app:bl_gradient_angle="0"
    app:bl_gradient_endColor="#4F94CD"
    app:bl_gradient_startColor="#63B8FF" />
```

3、点击效果

[![](https://camo.githubusercontent.com/1da06d34b0fcdb9ca0445115b3b1122ff4b12cdd01da71ca4c233d4928063252/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f392f31322f313635636530653732323662366530353f773d32363426683d363826663d67696626733d323933383531)](https://camo.githubusercontent.com/1da06d34b0fcdb9ca0445115b3b1122ff4b12cdd01da71ca4c233d4928063252/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f392f31322f313635636530653732323662366530353f773d32363426683d363826663d67696626733d323933383531)

第一个点赞效果：

```
android:layout_width="20dp"
android:layout_height="20dp"
android:layout_marginTop="5dp"
app:bl_pressed_drawable="@drawable/circle_like_pressed"
app:bl_unPressed_drawable="@drawable/circle_like_normal" />
```

就等同于:

```
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:state_pressed="true"
        android:drawable="@drawable/circle_like_pressed" />
    <item android:state_pressed="false"
        android:drawable="@drawable/circle_like_normal" />
</selector>
```

通过代码设置：

```
Drawable drawable4 = new DrawableCreator.Builder().setCornersRadius(dip2px(20))
        .setPressedDrawable(ContextCompat.getDrawable(this, R.drawable.circle_like_pressed))
        .setUnPressedDrawable(ContextCompat.getDrawable(this, R.drawable.circle_like_normal))
        .build();
tv.setClickable(true);
tv.setBackground(drawable4);   
```

第二个按钮效果：

```
<Button
        android:layout_width="300dp"
        android:layout_height="50dp"
        android:layout_marginTop="5dp"
        android:gravity="center"
        android:padding="0dp"
        android:text="有波纹触摸反馈的按钮"
        android:textColor="@android:color/white"
        android:textSize="20sp"
        app:bl_corners_radius="20dp"
        app:bl_pressed_drawable="#71C671"
        app:bl_ripple_color="#71C671"
        app:bl_ripple_enable="true"
        app:bl_stroke_color="#8c6822"
        app:bl_stroke_width="2dp"
        app:bl_unPressed_drawable="#7CFC00" />
```

通过代码设置：

```
Drawable drawable3 = new DrawableCreator.Builder().setCornersRadius(dip2px(20))
        .setRipple(true, Color.parseColor("#71C671"))
        .setSolidColor(Color.parseColor("#7CFC00"))
        .setStrokeColor(Color.parseColor("#8c6822"))
        .setStrokeWidth(dip2px(2))
        .build();
btn.setBackground(drawable3);
```

使用其实基本和selector shape一样。

4、点击文字变色 [![](https://camo.githubusercontent.com/cbc8a7e3c4d3987f6a82280f2c220cef7d9961be0acaaaebf3371835f50075be/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f392f31392f313635663133316637653835623165373f773d32383926683d363126663d67696626733d38383238)](https://camo.githubusercontent.com/cbc8a7e3c4d3987f6a82280f2c220cef7d9961be0acaaaebf3371835f50075be/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f392f31392f313635663133316637653835623165373f773d32383926683d363126663d67696626733d38383238)

```
<Button
    android:layout_width="300dp"
    android:layout_height="50dp"
    android:layout_marginTop="5dp"
    android:gravity="center"
    android:padding="0dp"
    android:text="点击文字变色"
    app:bl_pressed_textColor="#919DAF"
    app:bl_unPressed_textColor="@android:color/holo_red_dark"/>
```

5、点击填充边框变色属性

[![](https://raw.githubusercontent.com/JavaNoober/BackgroundLibrary/master/test/pic11.gif)](https://raw.githubusercontent.com/JavaNoober/BackgroundLibrary/master/test/pic11.gif)

```
<TextView
    android:layout_width="180dp"
    android:layout_height="36dp"
    android:layout_marginTop="15dp"
    android:gravity="center"
    android:text="点击边框变色"
    android:textColor="@android:color/black"
    android:textSize="18dp"
    android:textStyle="bold"
    android:clickable="true"
    app:bl_pressed_solid_color="#FFDEAD"
    app:bl_unPressed_solid_color="#E9967A"
    app:bl_stroke_width="1dp"
    app:bl_pressed_stroke_color="#C6E2FF"
    app:bl_unPressed_stroke_color="#98FB98"/>
```

6、style类似的使用方式

style中不要加入"app:", 直接写属性名即可

```
<style name="bg">
    <item name="bl_corners_radius">4dp</item>
    <item name="bl_solid_color">#E3B666</item>
    <item name="bl_stroke_color">#8c6822</item>
    <item name="bl_stroke_width">2dp</item>
</style>

<TextView
    android:layout_width="130dp"
    android:layout_height="36dp"
    android:gravity="center"
    android:text="TextView"
    android:textColor="#8c6822"
    android:textSize="20sp"
    style="@style/bg"/>
```

7、设置drawableLeft [![](https://camo.githubusercontent.com/8bc4fdb1c4aace126648d80d4c837b366d1a1be6e9b66af80571992e27aa5d18/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031392f312f32382f313638393237666535313436623830643f773d32363126683d383226663d67696626733d3237313632)](https://camo.githubusercontent.com/8bc4fdb1c4aace126648d80d4c837b366d1a1be6e9b66af80571992e27aa5d18/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031392f312f32382f313638393237666535313436623830643f773d32363126683d383226663d67696626733d3237313632)

```
    <Button
        android:id="@+id/btn_like"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="5dp"
        app:bl_position="left"
        android:background="@null"
        android:text="点赞+1"
        app:bl_pressed_drawable="@drawable/circle_like_pressed"
        app:bl_unPressed_drawable="@drawable/circle_like_normal" />

    <Button
        android:id="@+id/btn_like2"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="5dp"
        app:bl_position="left"
        android:background="@null"
        android:text="未点赞"
        app:bl_selected_textColor="#fbdc4a"
        app:bl_unSelected_textColor="@android:color/black"
        app:bl_selected_drawable="@drawable/circle_like_pressed"
        app:bl_unSelected_drawable="@drawable/circle_like_normal" />
```

8、设置帧动画  
[![](https://raw.githubusercontent.com/JavaNoober/BackgroundLibrary/master/test/anim.gif)](https://raw.githubusercontent.com/JavaNoober/BackgroundLibrary/master/test/anim.gif)

```
    <View
        android:id="@+id/v_anim"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:bl_oneshot="false"
        app:bl_duration="50"
        app:bl_anim_auto_start="true"
        app:bl_frame_drawable_item0="@drawable/img00"
        app:bl_frame_drawable_item1="@drawable/img01"
        app:bl_frame_drawable_item2="@drawable/img02"
        app:bl_frame_drawable_item3="@drawable/img03"
        app:bl_frame_drawable_item4="@drawable/img04"
        app:bl_frame_drawable_item5="@drawable/img05"
        app:bl_frame_drawable_item6="@drawable/img06"
        app:bl_frame_drawable_item7="@drawable/img07"
        app:bl_frame_drawable_item8="@drawable/img08"
        app:bl_frame_drawable_item9="@drawable/img09"
        app:bl_frame_drawable_item10="@drawable/img10"
        app:bl_frame_drawable_item11="@drawable/img11"
        app:bl_frame_drawable_item12="@drawable/img12"
        app:bl_frame_drawable_item13="@drawable/img13"
        app:bl_frame_drawable_item14="@drawable/img14"/>
```

9、甚至支持直接在xml中设置方法，暂时只支持无参方法，支持父类方法

```
    <Button
        android:id="@+id/btn"
        android:layout_width="320dp"
        android:layout_height="36dp"
        android:text="通过bl_function属性跳转到列表"
        app:bl_function="finish"/>
```

加入bl_function属性即可，这样控件就增加了finish点击事件，很多时候返回键只是一个finish，我们仅需要加入该属性即可， 当然使用场景还有很多。
