---
title: 安卓和webview交互
date: 2023-12-03 18:28:10
tags: android
---

> 劳动是人类财富的创造者。——韦伯斯特

安卓代码：

```java
package com.example.webviewdemo;

import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    private WebView myWebView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        myWebView = (WebView) findViewById(R.id.webview);
        WebSettings webSettings = myWebView.getSettings();
        webSettings.setJavaScriptEnabled(true);

        // 加载本地HTML文件
        myWebView.loadUrl("file:///android_asset/myfile.html");

        // 将Java对象映射到JavaScript
        myWebView.addJavascriptInterface(new WebAppInterface(this), "Android");
    }

    public class WebAppInterface {
        Context mContext;

        WebAppInterface(Context c) {
            mContext = c;
        }

        // 在JavaScript中调用此方法显示安卓Toast
        @JavascriptInterface
        public void showToast(String toast) {
            Toast.makeText(mContext, toast, Toast.LENGTH_SHORT).show();
        }
    }
}
```

`html`代码，放在`assets`目录下

```html
<!DOCTYPE html>
<html>
<head>
    <title>WebView Demo</title>
    <script type="text/javascript">
        function showAndroidToast(toast) {
            Android.showToast(toast);
        }
    </script>
</head>
<body>
    <h1>Hello WebView</h1>
    <input type="button" value="点击我调用安卓Toast" onClick="showAndroidToast('Hello from HTML')" />
</body>
</html>
```

以及安卓布局`xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <WebView
        android:id="@+id/webview"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />
</RelativeLayout>
```
