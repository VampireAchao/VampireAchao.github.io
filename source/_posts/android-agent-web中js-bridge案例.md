---
title: android-agent-web中js-bridge案例
date: 2024-04-14 21:32:13
tags: android
---

> 我的悲伤还来不及出发，就已经到站下车。——《第七天》

代码仓库：

https://github.com/Justson/AgentWeb

主要代码`JsbridgeWebFragment.java`

```java
package com.just.agentweb.sample.fragment;

import android.graphics.Bitmap;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import android.widget.LinearLayout;

import com.github.lzyzsd.jsbridge.BridgeHandler;
import com.github.lzyzsd.jsbridge.BridgeWebView;
import com.github.lzyzsd.jsbridge.BridgeWebViewClient;
import com.github.lzyzsd.jsbridge.CallBackFunction;
import com.google.gson.Gson;
import com.just.agentweb.AgentWeb;
import com.just.agentweb.WebViewClient;

import androidx.annotation.Nullable;

/**
 * Created by cenxiaozhong on 2017/7/1.
 * source code  https://github.com/Justson/AgentWeb
 */

public class JsbridgeWebFragment extends AgentWebFragment {

	public static JsbridgeWebFragment getInstance(Bundle bundle) {

		JsbridgeWebFragment mJsbridgeWebFragment = new JsbridgeWebFragment();
		if (mJsbridgeWebFragment != null) {
			mJsbridgeWebFragment.setArguments(bundle);
		}

		return mJsbridgeWebFragment;
	}

	private BridgeWebView mBridgeWebView;

	@Override
	public String getUrl() {
		return super.getUrl();
	}

	@Override
	public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {

		mBridgeWebView = new BridgeWebView(getActivity());
		mAgentWeb = AgentWeb.with(this)
				.setAgentWebParent((ViewGroup) view, new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT))
				.useDefaultIndicator(-1, 2)
				.setAgentWebWebSettings(getSettings())
				.setWebChromeClient(mWebChromeClient)
				.setWebViewClient(getWebViewClient())
				.setWebView(mBridgeWebView)
				.setSecurityType(AgentWeb.SecurityType.STRICT_CHECK)
//                .setDownloadListener(mDownloadListener) 4.0.0 删除该API
				.createAgentWeb()//
				.ready()//
				.go(getUrl());


		initView(view);


		mBridgeWebView.registerHandler("submitFromWeb", new BridgeHandler() {

			@Override
			public void handler(String data, CallBackFunction function) {
				function.onCallBack("submitFromWeb exe, response data 中文 from Java");
			}

		});

		User user = new User();
		Location location = new Location();
		location.address = "SDU";
		user.location = location;
		user.name = "Agentweb --> Jsbridge";
		mBridgeWebView.callHandler("functionInJs", new Gson().toJson(user), new CallBackFunction() {
			@Override
			public void onCallBack(String data) {
				Log.i(TAG, "data:" + data);
			}
		});

		mBridgeWebView.send("hello");
	}

	private WebViewClient getWebViewClient() {
		return new WebViewClient() {
			BridgeWebViewClient mBridgeWebViewClient = new BridgeWebViewClient(mBridgeWebView);

			@Override
			public boolean shouldOverrideUrlLoading(WebView view, String url) {
				if (mBridgeWebViewClient.shouldOverrideUrlLoading(view, url)) {
					return true;
				}
				return super.shouldOverrideUrlLoading(view, url);
			}

			@Override
			public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
				if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
					if (mBridgeWebViewClient.shouldOverrideUrlLoading(view, request.getUrl().toString())) {
						return true;
					}
				}
				return super.shouldOverrideUrlLoading(view, request);
			}

			@Override
			public void onPageStarted(WebView view, String url, Bitmap favicon) {
				super.onPageStarted(view, url, favicon);
			}

			@Override
			public void onPageFinished(WebView view, String url) {
				super.onPageFinished(view, url);
				mBridgeWebViewClient.onPageFinished(view, url);
			}

		};
	}

	static class Location {
		String address;
	}

	static class User {
		String name;
		Location location;
		String testStr;
	}

}
```

然后是`com/just/agentweb/sample/activity/CommonActivity.java:140`代码：

```java
            /*JsBridge 演示*/
			case FLAG_GUIDE_DICTIONARY_JSBRIDGE_SAMPLE:
				ft.add(R.id.container_framelayout, mAgentWebFragment = JsbridgeWebFragment.getInstance(mBundle = new Bundle()), JsbridgeWebFragment.class.getName());
				mBundle.putString(AgentWebFragment.URL_KEY, "file:///android_asset/jsbridge/demo.html");
				break;
```

还有对应的`html`

```html
<html>
    <head>
        <meta content="text/html; charset=utf-8" http-equiv="content-type">
        <title>
            js调用java
        </title>
    </head>
    
    <body>

        <p>
            <xmp id="show">
            </xmp>
        </p>

        <p>
            <xmp id="init"></xmp>
        </p>

        <p>
            <input type="text" id="text1" value="用户名(username)" />
        </p>

        <p>
           <input type="text" id="text2" value="password" />
        </p>

        <p>
            <input type="button" id="enter" value="发消息给Native" onclick="testClick();"/>
        </p>

        <p>
          <input type="button" id="enter1" value="调用Native方法" onclick="testClick1();"/>
        </p>

        <p>
            <input type="button" id="enter2" value="显示html" onclick="testDiv();" />
        </p>

        <p>
            <input type="file" value="打开文件" />
        </p>

    </body>
    <script>

        function testDiv() {
            document.getElementById("show").innerHTML = document.getElementsByTagName("html")[0].innerHTML;
        }

        function testClick() {
            var str1 = document.getElementById("text1").value;
            var str2 = document.getElementById("text2").value;

            //send message to native
            var data = {id: 1, content: "这是一个图片 <img src=\"a.png\"/> test\r\nhahaha"};
            window.WebViewJavascriptBridge.send(
                data
                , function(responseData) {
                    document.getElementById("show").innerHTML = "repsonseData from java, data = " + responseData
                }
            );

        }

        function testClick1() {
            var str1 = document.getElementById("text1").value;
            var str2 = document.getElementById("text2").value;

            //call native method
            window.WebViewJavascriptBridge.callHandler(
                'submitFromWeb'
                , {'param': '中文测试'}
                , function(responseData) {
                    document.getElementById("show").innerHTML = "send get responseData from java, data = " + responseData
                }
            );
        }

        function bridgeLog(logContent) {
            document.getElementById("show").innerHTML = logContent;
        }

        function connectWebViewJavascriptBridge(callback) {
            if (window.WebViewJavascriptBridge) {
                callback(WebViewJavascriptBridge)
            } else {
                document.addEventListener(
                    'WebViewJavascriptBridgeReady'
                    , function() {
                        callback(WebViewJavascriptBridge)
                    },
                    false
                );
            }
        }

        connectWebViewJavascriptBridge(function(bridge) {
            bridge.init(function(message, responseCallback) {
                console.log('Js got a message', message);
                var data = {
                    'Javascript Responds': '测试中文!'
                };
                console.log('Js responding with', data);
                responseCallback(data);
            });

            bridge.registerHandler("functionInJs", function(data, responseCallback) {
                document.getElementById("show").innerHTML = ("data from Java: = " + data);
                var responseData = "Javascript Says Right back aka!";
                responseCallback(responseData);
            });
        })
    </script>

</html>
```

效果如下：

![](/imgs/oss/blog-img/2024-04-14-21-35-33-image.png)
