---
title: androidのretrofit2调用接口
date: 2020-10-09 19:33:05
tags: android
---

> 所谓理解，通常不过是误解的总合。——村上春树《斯普特尼克恋人》

安卓调用接口

首先引入依赖

```gradle
    implementation 'com.android.volley:volley:1.1.1'
    implementation 'com.squareup.retrofit2:retrofit:2.9.0'
    implementation 'com.squareup.retrofit2:converter-gson:2.1.0'
    implementation 'com.squareup.okhttp3:logging-interceptor:3.3.0'
    implementation 'com.squareup.okhttp3:okhttp-urlconnection:3.3.0'
```

然后编写主配置类

```java
package com.example.interfacecall.net;

import android.util.Log;

import com.android.volley.BuildConfig;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.concurrent.TimeUnit;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;


public class NetConfig {
    /**
     * url
     */
    public final static String BASEURL = "http://vampireachao.utools.club/";

    private static Retrofit.Builder builder;
    private static Retrofit retrofit;

    public static Retrofit.Builder getRetrofitBuilder() {
        if (builder == null) {
            Gson gson = new GsonBuilder()
                    .setDateFormat("yyyy-MM-dd'T'HH:mm:ssZ")
                    .setLenient()
                    .create();//使用 gson coverter，统一日期请求格式
            HttpLoggingInterceptor logging = new HttpLoggingInterceptor(message -> Log.e("OkHttp", ": " + message));
            logging.setLevel(HttpLoggingInterceptor.Level.BODY);
            OkHttpClient.Builder okHttpBuilder = new OkHttpClient.Builder();
            okHttpBuilder
                    .readTimeout(15000, TimeUnit.MILLISECONDS)
                    .connectTimeout(15000, TimeUnit.MILLISECONDS)
                    .writeTimeout(15000, TimeUnit.MILLISECONDS)
                    .retryOnConnectionFailure(true);
            if (BuildConfig.DEBUG) {
                okHttpBuilder.addInterceptor(logging);
            }
            OkHttpClient httpClient = okHttpBuilder.build();

            builder = new Retrofit.Builder()
                    .addConverterFactory(GsonConverterFactory.create(gson))
                    .client(httpClient)
                    .baseUrl(BASEURL);
        }
        return builder;
    }

    public static Retrofit getRetrofit() {
        if (retrofit == null) {
            retrofit = getRetrofitBuilder().build();
        }
        return retrofit;
    }

    public static <T> T create(Class<T> t) {
        return getRetrofit().create(t);
    }
    

}
```

以及自定义返回处理

```java
package com.example.interfacecall.net;

import android.util.Log;

import com.google.gson.Gson;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public abstract class CustomCallBack<T> implements Callback<T> {

    @Override
    public void onResponse(Call<T> call, Response<T> response) {
        Log.e("okhttp: content_result ", new Gson().toJson(response.body()));
        if (response.raw().code() == 500) {
            failure(new Throwable("500"));
            return;
        }
        if (response.body() == null) {
            failure(new Throwable("500"));
            return;
        }
        response(response);
    }

    @Override
    public void onFailure(Call<T> call, Throwable t) {
        t.printStackTrace();
        failure(t);
    }

    public abstract void response(Response<T> response);

    public abstract void failure(Throwable t);
}
```

定义接口

```java
package com.example.interfacecall.net;

import com.example.interfacecall.bean.User;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;
import retrofit2.http.Query;

public class ProjectApi {
    public interface UserProject {
        @GET("user/shout")
        Call<AjaxJson> shout();

        /**
         * user/say?word=
         * @param word
         * @return
         */
        @GET("user/say")
        Call<AjaxJson> say(@Query("word") String word);

        /**
         * user/say/xxx
         * @param word
         * @return
         */
        @GET("user/say/{word}")
        Call<AjaxJson> speak(@Path("word") String word);

        /**
         * requestBody里{username:"xxx",password:"xxx"}
         * @param user
         * @return
         */
        @POST("user/login")
        Call<AjaxJson> login(@Body User user);

    }
}
```

然后调用

```java
package com.example.interfacecall;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

import com.example.interfacecall.bean.User;
import com.example.interfacecall.net.AjaxJson;
import com.example.interfacecall.net.CustomCallBack;
import com.example.interfacecall.net.NetConfig;
import com.example.interfacecall.net.ProjectApi;
import com.example.interfacecall.utils.ToastUtils;

import java.util.Optional;

import retrofit2.Call;
import retrofit2.Response;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
//        say();
        speak();
//        login();
//        shout();
    }

    private void say() {
        findViewById(R.id.hello).setOnClickListener(v -> {
            Call<AjaxJson> shout = NetConfig.create(ProjectApi.UserProject.class).say("阿巴阿巴阿巴");
            shout.enqueue(new CustomCallBack<AjaxJson>() {
                @Override
                public void response(Response<AjaxJson> response) {
                    ToastUtils.showToast(getApplicationContext(), Optional.ofNullable(response.body()).orElse(new AjaxJson()).getData());
                }

                @Override
                public void failure(Throwable t) {
                    ToastUtils.showToast(getApplicationContext(), "网络异常");
                }
            });
        });
    }

    private void speak() {
        findViewById(R.id.hello).setOnClickListener(v -> {
            Call<AjaxJson> shout = NetConfig.create(ProjectApi.UserProject.class).speak("阿巴阿巴阿巴");
            shout.enqueue(new CustomCallBack<AjaxJson>() {
                @Override
                public void response(Response<AjaxJson> response) {
                    ToastUtils.showToast(getApplicationContext(), Optional.ofNullable(response.body()).orElse(new AjaxJson()).getData());
                }

                @Override
                public void failure(Throwable t) {
                    ToastUtils.showToast(getApplicationContext(), "网络异常");
                }
            });
        });
    }


    private void login() {
        findViewById(R.id.hello).setOnClickListener(v -> {
            User user = new User("rubenHappyAchao", "Ruben8848");
            Call<AjaxJson> shout = NetConfig.create(ProjectApi.UserProject.class).login(user);
            shout.enqueue(new CustomCallBack<AjaxJson>() {
                @Override
                public void response(Response<AjaxJson> response) {
                    ToastUtils.showToast(getApplicationContext(), Optional.ofNullable(response.body()).orElse(new AjaxJson()).getMsg());
                }

                @Override
                public void failure(Throwable t) {
                    ToastUtils.showToast(getApplicationContext(), "网络异常");
                }
            });
        });
    }

    private void shout() {
        findViewById(R.id.hello).setOnClickListener(v -> {
            Call<AjaxJson> shout = NetConfig.create(ProjectApi.UserProject.class).shout();
            shout.enqueue(new CustomCallBack<AjaxJson>() {
                @Override
                public void response(Response<AjaxJson> response) {
                    ToastUtils.showToast(getApplicationContext(), Optional.ofNullable(response.body()).orElse(new AjaxJson()).getMsg());
                }

                @Override
                public void failure(Throwable t) {
                    ToastUtils.showToast(getApplicationContext(), "网络异常");
                }
            });
        });
    }

}
```

完整安卓代码放到了[`gitee`仓库](https://gitee.com/VampireAchao/interface-call.git)里，感兴趣的可以自取。。。

[接口后端代码](https://gitee.com/VampireAchao/simple-springboot.git)