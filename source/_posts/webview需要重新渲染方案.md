---
title: webview需要重新渲染方案
date: 2024-04-29 23:22:12
tags: android
---

> 开成花灾的玫瑰不是灿烂，而是荒凉。——严歌苓

方案如下：

添加一个`LinearLayout`

```xml
    <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
        android:id="@+id/webContainer"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:orientation="vertical"
        android:visibility="gone" />
```

然后对其添加、删除`webview`

```java
    private void createAndLoadWebView(String url) {
        // 移除旧的 WebView
        if (mWebView != null) {
            binding.webContainer.removeView(mWebView);
            mWebView.destroy();
        }

        // 创建新的 WebView
        mWebView = new CommonWebView(this);
        initWebViewSetting(); // 初始化设置

        // 设置 WebView 的布局参数
        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.MATCH_PARENT);
        mWebView.setLayoutParams(params);

        // 将 WebView 添加到布局
        binding.webContainer.addView(mWebView); // 假设您的布局中有一个ID为webContainer的容器

        // 加载 URL
        mWebView.loadUrl(url);
        binding.webContainer.setVisibility(View.VISIBLE);
    }
```

即可实现重新渲染新的`webview`
