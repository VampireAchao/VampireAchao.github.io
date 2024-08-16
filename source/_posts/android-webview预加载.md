---
title: android webview预加载
date: 2024-05-29 20:59:47
tags: android
---

> 对人关怀一次，比说千百句恭维话更能打动其心。——海涛法师

之前也说过了[android使用闲置线程执行](https://vampireachao.github.io/2024/05/26/android%E4%BD%BF%E7%94%A8%E9%97%B2%E7%BD%AE%E7%BA%BF%E7%A8%8B%E6%89%A7%E8%A1%8C/)

今天上实战：

```java
package com.ruben.simple_webview;

import android.content.Context;
import android.os.Bundle;
import android.os.Looper;
import android.os.MessageQueue;
import android.view.ViewGroup;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.Button;
import android.widget.RelativeLayout;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    private RelativeLayout mainLayout;
    private WebView myWebView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mainLayout = (RelativeLayout) findViewById(R.id.main_layout);
        Button addWebViewButton = (Button) findViewById(R.id.addWebViewButton);

        // 在主线程空闲时预加载 WebView
        prepareWebView();

        addWebViewButton.setOnClickListener(v -> {
            if (myWebView.getParent() == null) {
                // 设置WebView布局参数
                RelativeLayout.LayoutParams params = new RelativeLayout.LayoutParams(
                        ViewGroup.LayoutParams.MATCH_PARENT,
                        ViewGroup.LayoutParams.MATCH_PARENT);
                myWebView.setLayoutParams(params);
                mainLayout.addView(myWebView);
            }
        });
    }

    private void prepareWebView() {
        myWebView = new WebView(new android.view.ContextThemeWrapper(this, null));
        WebSettings webSettings = myWebView.getSettings();
        webSettings.setJavaScriptEnabled(true);

        // 使用 IdleHandler 来初始化和加载 WebView
        MessageQueue.IdleHandler idleHandler = () -> {
            myWebView.loadUrl("https://gitee.com/VampireAchao");
            myWebView.addJavascriptInterface(new WebAppInterface(this), "Android");
            return false; // 返回 false 表示不再调用此 IdleHandler
        };
        Looper.myQueue().addIdleHandler(idleHandler);
    }

    public class WebAppInterface {
        Context mContext;

        WebAppInterface(Context c) {
            mContext = c;
        }

        @JavascriptInterface
        public void showToast(String toast) {
            Toast.makeText(mContext, toast, Toast.LENGTH_SHORT).show();
        }
    }
}

```

对应的`activity_main.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
        android:layout_width="match_parent"
        android:id="@+id/main_layout"
        android:layout_height="match_parent">

    <Button
            android:id="@+id/addWebViewButton"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Load WebView"
            android:layout_centerInParent="true" />
</RelativeLayout>

```
