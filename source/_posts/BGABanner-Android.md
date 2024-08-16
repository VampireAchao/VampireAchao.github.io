---
title: BGABanner-Android
date: 2024-06-15 20:09:52
tags: android
---

> 家和万事兴——佚名

分享一个安卓组件

https://github.com/bingoogolapple/BGABanner-Android

demo: https://github.com/bingoogolapple/BGABanner-Android/tree/master/demo



- [x]  引导界面导航效果
- [x]  支持根据服务端返回的数据动态设置广告条的总页数
- [x]  支持大于等于1页时的无限循环自动轮播、手指按下暂停轮播、抬起手指开始轮播
- [x]  支持自定义指示器位置和广告文案位置
- [x]  支持图片指示器和数字指示器
- [x]  支持 ViewPager 各种切换动画
- [x]  支持选中特定页面
- [x]  支持监听 item 点击事件
- [x]  加载网络数据时支持占位图设置，避免出现整个广告条空白的情况
- [x]  多个 ViewPager 跟随滚动



## 使用

[](https://github.com/bingoogolapple/BGABanner-Android#%E4%BD%BF%E7%94%A8)

### 1.添加 Gradle 依赖

[](https://github.com/bingoogolapple/BGABanner-Android#1%E6%B7%BB%E5%8A%A0-gradle-%E4%BE%9D%E8%B5%96)

- 把 `maven { url 'https://jitpack.io' }` 添加到 root build.gradle 的 repositories 中
- 在 app build.gradle 中添加如下依赖，末尾的「latestVersion」指的是徽章 [![](https://camo.githubusercontent.com/ad4e29aa3291c58c7798616b38b76fd3ab825841ee93f049894f3b2088b2c3bb/68747470733a2f2f6a69747061636b2e696f2f762f62696e676f6f676f6c6170706c652f42474142616e6e65722d416e64726f69642e737667)](https://jitpack.io/#bingoogolapple/BGABanner-Android) 里的版本名称，请自行替换

```groovy
implementation 'androidx.legacy:legacy-support-v4:latestVersion'
implementation 'com.github.bingoogolapple:BGABanner-Android:latestVersion'
```

### 2.在布局文件中添加 BGABanner

[](https://github.com/bingoogolapple/BGABanner-Android#2%E5%9C%A8%E5%B8%83%E5%B1%80%E6%96%87%E4%BB%B6%E4%B8%AD%E6%B7%BB%E5%8A%A0-bgabanner)

```xml
<cn.bingoogolapple.bgabanner.BGABanner    android:id="@+id/banner_guide_content"
    style="@style/MatchMatch"
    app:banner_pageChangeDuration="1000"
    app:banner_pointAutoPlayAble="false"
    app:banner_pointContainerBackground="@android:color/transparent"
    app:banner_pointDrawable="@drawable/bga_banner_selector_point_hollow"
    app:banner_pointTopBottomMargin="15dp"
    app:banner_transitionEffect="alpha" />
```

### 3.在 Activity 或者 Fragment 中配置 BGABanner 的数据源

[](https://github.com/bingoogolapple/BGABanner-Android#3%E5%9C%A8-activity-%E6%88%96%E8%80%85-fragment-%E4%B8%AD%E9%85%8D%E7%BD%AE-bgabanner-%E7%9A%84%E6%95%B0%E6%8D%AE%E6%BA%90)

有多种配置数据源的方式，这里仅列出三种方式。更多初始化方式请查看 [demo](https://github.com/bingoogolapple/BGABanner-Android/tree/master/demo)

> 配置数据源的方式1：通过传入数据模型并结合 Adapter 的方式配置数据源。这种方式主要用于加载网络图片，以及实现少于3页时的无限轮播

```java
mContentBanner.setAdapter(new BGABanner.Adapter<ImageView, String>() {    @Override
    public void fillBannerItem(BGABanner banner, ImageView itemView, String model, int position) {        Glide.with(MainActivity.this)                .load(model)                .placeholder(R.drawable.holder)                .error(R.drawable.holder)                .centerCrop()                .dontAnimate()                .into(itemView);    }});

mContentBanner.setData(Arrays.asList("网络图片路径1", "网络图片路径2", "网络图片路径3"), Arrays.asList("提示文字1", "提示文字2", "提示文字3"));
```

> 配置数据源的方式2：通过直接传入视图集合的方式配置数据源，主要用于自定义引导页每个页面布局的情况

```java
List<View> views = new ArrayList<>();
views.add(View.inflate(context, R.layout.layout_guide_one, null));
views.add(View.inflate(context, R.layout.layout_guide_two, null));
views.add(View.inflate(context, R.layout.layout_guide_three, null));
mContentBanner.setData(views);
```

> 配置数据源的方式3：通过传入图片资源 id 的方式配置数据源，主要用于引导页每一页都是只显示图片的情况

```
// Bitmap 的宽高在 maxWidth maxHeight 和 minWidth minHeight 之间
BGALocalImageSize localImageSize = new BGALocalImageSize(720, 1280, 320, 640);
// 设置数据源
mContentBanner.setData(localImageSize, ImageView.ScaleType.CENTER_CROP,
        R.drawable.uoko_guide_background_1,
        R.drawable.uoko_guide_background_2,
        R.drawable.uoko_guide_background_3);
```

### 4.监听广告 item 的单击事件，在 BGABanner 里已经帮开发者处理了防止重复点击事件

[](https://github.com/bingoogolapple/BGABanner-Android#4%E7%9B%91%E5%90%AC%E5%B9%BF%E5%91%8A-item-%E7%9A%84%E5%8D%95%E5%87%BB%E4%BA%8B%E4%BB%B6%E5%9C%A8-bgabanner-%E9%87%8C%E5%B7%B2%E7%BB%8F%E5%B8%AE%E5%BC%80%E5%8F%91%E8%80%85%E5%A4%84%E7%90%86%E4%BA%86%E9%98%B2%E6%AD%A2%E9%87%8D%E5%A4%8D%E7%82%B9%E5%87%BB%E4%BA%8B%E4%BB%B6)

```java
mContentBanner.setDelegate(new BGABanner.Delegate<ImageView, String>() {    @Override
    public void onBannerItemClick(BGABanner banner, ImageView itemView, String model, int position) {        Toast.makeText(banner.getContext(), "点击了" + position, Toast.LENGTH_SHORT).show();    }});
```

### 5.设置「进入按钮」和「跳过按钮」控件资源 id 及其点击事件，如果进入按钮和跳过按钮有一个不存在的话就传 0，在 BGABanner 里已经帮开发者处理了防止重复点击事件，在 BGABanner 里已经帮开发者处理了「跳过按钮」和「进入按钮」的显示与隐藏

[](https://github.com/bingoogolapple/BGABanner-Android#5%E8%AE%BE%E7%BD%AE%E8%BF%9B%E5%85%A5%E6%8C%89%E9%92%AE%E5%92%8C%E8%B7%B3%E8%BF%87%E6%8C%89%E9%92%AE%E6%8E%A7%E4%BB%B6%E8%B5%84%E6%BA%90-id-%E5%8F%8A%E5%85%B6%E7%82%B9%E5%87%BB%E4%BA%8B%E4%BB%B6%E5%A6%82%E6%9E%9C%E8%BF%9B%E5%85%A5%E6%8C%89%E9%92%AE%E5%92%8C%E8%B7%B3%E8%BF%87%E6%8C%89%E9%92%AE%E6%9C%89%E4%B8%80%E4%B8%AA%E4%B8%8D%E5%AD%98%E5%9C%A8%E7%9A%84%E8%AF%9D%E5%B0%B1%E4%BC%A0-0%E5%9C%A8-bgabanner-%E9%87%8C%E5%B7%B2%E7%BB%8F%E5%B8%AE%E5%BC%80%E5%8F%91%E8%80%85%E5%A4%84%E7%90%86%E4%BA%86%E9%98%B2%E6%AD%A2%E9%87%8D%E5%A4%8D%E7%82%B9%E5%87%BB%E4%BA%8B%E4%BB%B6%E5%9C%A8-bgabanner-%E9%87%8C%E5%B7%B2%E7%BB%8F%E5%B8%AE%E5%BC%80%E5%8F%91%E8%80%85%E5%A4%84%E7%90%86%E4%BA%86%E8%B7%B3%E8%BF%87%E6%8C%89%E9%92%AE%E5%92%8C%E8%BF%9B%E5%85%A5%E6%8C%89%E9%92%AE%E7%9A%84%E6%98%BE%E7%A4%BA%E4%B8%8E%E9%9A%90%E8%97%8F)

```java
mContentBanner.setEnterSkipViewIdAndDelegate(R.id.btn_guide_enter, R.id.tv_guide_skip, new BGABanner.GuideDelegate() {    @Override
    public void onClickEnterOrSkip() {        startActivity(new Intent(GuideActivity.this, MainActivity.class));        finish();    }});
```

## 自定义属性说明

[](https://github.com/bingoogolapple/BGABanner-Android#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%B1%9E%E6%80%A7%E8%AF%B4%E6%98%8E)

```xml
<declare-styleable name="BGABanner">    <!-- 指示点容器背景 -->
    <attr name="banner_pointContainerBackground" format="reference|color" />    <!-- 指示点背景 -->
    <attr name="banner_pointDrawable" format="reference" />    <!-- 指示点容器左右内间距 -->
    <attr name="banner_pointContainerLeftRightPadding" format="dimension" />    <!-- 指示点上下外间距 -->
    <attr name="banner_pointTopBottomMargin" format="dimension" />    <!-- 指示点左右外间距 -->
    <attr name="banner_pointLeftRightMargin" format="dimension" />    <!-- 指示器的位置 -->
    <attr name="banner_indicatorGravity">        <flag name="top" value="0x30" />        <flag name="bottom" value="0x50" />        <flag name="left" value="0x03" />        <flag name="right" value="0x05" />        <flag name="center_horizontal" value="0x01" />    </attr>    <!-- 是否开启自动轮播 -->
    <attr name="banner_pointAutoPlayAble" format="boolean" />    <!-- 自动轮播的时间间隔 -->
    <attr name="banner_pointAutoPlayInterval" format="integer" />    <!-- 页码切换过程的时间长度 -->
    <attr name="banner_pageChangeDuration" format="integer" />    <!-- 页面切换的动画效果 -->
    <attr name="banner_transitionEffect" format="enum">        <enum name="defaultEffect" value="0" />        <enum name="alpha" value="1" />        <enum name="rotate" value="2" />        <enum name="cube" value="3" />        <enum name="flip" value="4" />        <enum name="accordion" value="5" />        <enum name="zoomFade" value="6" />        <enum name="fade" value="7" />        <enum name="zoomCenter" value="8" />        <enum name="zoomStack" value="9" />        <enum name="stack" value="10" />        <enum name="depth" value="11" />        <enum name="zoom" value="12" />    </attr>    <!-- 提示文案的文字颜色 -->
    <attr name="banner_tipTextColor" format="reference|color" />    <!-- 提示文案的文字大小 -->
    <attr name="banner_tipTextSize" format="dimension" />    <!-- 加载网络数据时覆盖在 BGABanner 最上层的占位图 -->
    <attr name="banner_placeholderDrawable" format="reference" />    <!-- 是否是数字指示器 -->
    <attr name="banner_isNumberIndicator" format="boolean" />    <!-- 数字指示器文字颜色 -->
    <attr name="banner_numberIndicatorTextColor" format="reference|color" />    <!-- 数字指示器文字大小 -->
    <attr name="banner_numberIndicatorTextSize" format="dimension" />    <!-- 数字指示器背景 -->
    <attr name="banner_numberIndicatorBackground" format="reference" />    <!-- 当只有一页数据时是否显示指示器，默认值为 false -->
    <attr name="banner_isNeedShowIndicatorOnOnlyOnePage" format="boolean" />    <!-- 自动轮播区域距离 BGABanner 底部的距离，用于使指示器区域与自动轮播区域不重叠 -->
    <attr name="banner_contentBottomMargin" format="dimension"/>    <!-- 宽高比例，如果大于 0，则会根据宽度来计算高度，否则使用 android:layout_height 指定的高度 -->
    <attr name="banner_aspectRatio" format="float"/>    <!-- 占位图和资源图片缩放模式 -->
    <attr name="android:scaleType"/></declare-styleable>
```
