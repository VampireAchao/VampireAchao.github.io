---
title: 科大讯飞NLP黑白名单上传
date: 2022-07-25 13:00:47
tags: java
---

> “你喜欢一个人，就像喜欢富士山。你可以看到它，但是不能搬走它。你有什么方法可以移动一座富士山呢？回答是，你自己走过去。爱情也是如此，逛过就已经足够。”——林夕

介绍：[对接科大讯飞NLP](https://VampireAchao.github.io/2022/07/21/对接科大讯飞NLP/)

贴代码，其中一些常量在上面有：

```java
package org.example;

import cn.hutool.core.codec.Base64;
import cn.hutool.core.lang.Console;
import cn.hutool.core.lang.Opt;
import cn.hutool.core.map.MapUtil;
import cn.hutool.core.text.CharSequenceUtil;
import cn.hutool.http.HttpUtil;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;

import java.util.LinkedHashMap;

import static org.example.TextCorrection.*;

/**
 * @author VampireAchao
 * @since 2022/7/21 14:14
 */
public class BlackListUpload {


    public static void main(String[] args) {
        JSONObject upload = upload("战士 展示,支撑 职称,规饭 鬼范,衣据 依据,轮到 论道,尤雅 优雅", "国务院,鱿鱼圈,画蛇天足");
        Console.log(upload);
    }

    public static JSONObject upload(String blackList, String whiteList) {
        String json = getRequestJson(blackList, whiteList);
        String backResult = HttpUtil.post(BLACK_LIST_UPLOAD_URL, json);
        Console.log("上传资源返回结果：" + backResult);
        JSONObject result = JSONUtil.parseObj(backResult);
        if (Opt.ofNullable(result.getInt("code"))
                .filter(code -> code.equals(0))
                .isEmpty()) {
            throw new IllegalStateException(CharSequenceUtil.format("上传黑名单失败：{}", backResult));
        }
        return result;
    }


    public static String getRequestJson(String blackList, String whiteList) {
        return JSONUtil.toJsonStr(MapUtil.builder(new LinkedHashMap<>())
                .put("common", MapUtil.builder(new LinkedHashMap<>())
                        .put("app_id", APP_ID)
                        .put("uid", UID)
                        .build())
                .put("business", MapUtil.builder(new LinkedHashMap<>())
                        .put("res_id", RES_ID)
                        .build())
                .put("data", Base64.encode(JSONUtil.toJsonStr(MapUtil.builder(new LinkedHashMap<>())
                        .put("black_list", blackList)
                        .put("white_list", whiteList)
                        .build())))
                .build());
    }

}
```

注意我们要能够使用这里上传的黑白名单，识别时也要带上相应的`uid`和`res_id`：

```java
package org.example;

import cn.hutool.core.codec.Base64;
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.lang.Console;
import cn.hutool.core.lang.Opt;
import cn.hutool.core.map.MapUtil;
import cn.hutool.core.text.CharSequenceUtil;
import cn.hutool.core.text.StrPool;
import cn.hutool.core.util.CharsetUtil;
import cn.hutool.core.util.URLUtil;
import cn.hutool.crypto.SecureUtil;
import cn.hutool.http.HttpUtil;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import cn.hutool.log.StaticLog;
import cn.hutool.setting.Setting;

import java.net.URL;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.stream.Collectors;

import static cn.hutool.core.text.CharSequenceUtil.format;

/**
 * 文本纠错
 *
 * @author VampireAchao
 */
public class TextCorrection {

    /**
     * 地址与鉴权信息，配置文件中
     */
    public static final String TEXT_CORRECTION_URL;
    public static final String BLACK_LIST_UPLOAD_URL;
    public static final String APP_ID;
    public static final String API_SECRET;
    public static final String API_KEY;
    public static final String RES_ID;
    public static final String UID;

    static {
        // 加载配置文件
        Setting setting = new Setting("app.setting");
        TEXT_CORRECTION_URL = setting.get("TEXT_CORRECTION_URL");
        BLACK_LIST_UPLOAD_URL = setting.get("BLACK_LIST_UPLOAD_URL");
        APP_ID = setting.get("APP_ID");
        API_SECRET = setting.get("API_SECRET");
        API_KEY = setting.get("API_KEY");
        RES_ID = setting.get("RES_ID");
        UID = setting.get("UID");
        setting.clear();
    }

    public static void main(String[] args) {
        Map<String, Object> inspect = inspect("Hutool似一个小而全的Java工具类库,通过静态万法封装，降低相咲API的学习城本，提蒿工作效率，使Java拥有函数式语言般的尤雅，让Java语言也何以“甜甜的”。");
        Console.log(inspect);
    }

    public static JSONObject inspect(String words) {
        String authUrl = getAuthUrl(TEXT_CORRECTION_URL, API_KEY, API_SECRET);
        String json = getRequestJson(words);
        String backResult = HttpUtil.post(authUrl, json);
        StaticLog.debug("文本纠错返回结果：" + backResult);
        JSONObject result = JSONUtil.parseObj(backResult);
        if (Opt.ofNullable(result.getJSONObject("header"))
                .map(header -> header.getInt("code"))
                .filter(code -> code.equals(0))
                .isEmpty()) {
            throw new IllegalStateException(CharSequenceUtil.format("文本纠错失败：{}", backResult));
        }
        String text = result.getJSONObject("payload").getJSONObject("result").getStr("text");
        String base64Decode = Base64.decodeStr(text);
        StaticLog.debug("text字段base64解码后纠错信息：" + base64Decode);
        return JSONUtil.parseObj(base64Decode);
    }

    public static String getAuthUrl(String hostUrl, String apiKey, String apiSecret) {
        URL url = URLUtil.url(hostUrl);
        String date = DateUtil.formatHttpDate(DateUtil.date());
        String signatureTemplate = "host: {}\ndate: {}\nPOST {} HTTP/1.1";
        String signatureBeforeSha = format(signatureTemplate, url.getHost(), date, url.getPath());
        String signature = SecureUtil.hmacSha256(apiSecret).digestBase64(signatureBeforeSha, false);
        String authorization = MapUtil.builder(new LinkedHashMap<>())
                .put("api_key", apiKey)
                .put("algorithm", "hmac-sha256")
                .put("headers", "host date request-line")
                .put("signature", signature)
                .build()
                .entrySet().stream().map(entry -> format("{}=\"{}\"", entry.getKey(), entry.getValue()))
                .collect(Collectors.joining(StrPool.COMMA + StrPool.C_SPACE));
        String queryString = HttpUtil.toParams(MapUtil.<String, Object>builder(new LinkedHashMap<>())
                .put("authorization", Base64.encode(authorization))
                .put("date", date)
                .put("host", url.getHost())
                .build()).replace(":", "%3A");
        return HttpUtil.urlWithForm(hostUrl, queryString, CharsetUtil.CHARSET_UTF_8, false).replace(",", "%2C");
    }


    public static String getRequestJson(String text) {
        return JSONUtil.toJsonStr(MapUtil.builder(new LinkedHashMap<>())
                .put("header", MapUtil.builder(new LinkedHashMap<>())
                        .put("app_id", APP_ID)
                        .put("uid", UID)
                        .put("status", 3)
                        .build())
                .put("parameter", MapUtil.builder(new LinkedHashMap<>())
                        .put("s9a87e3ec", MapUtil.builder(new LinkedHashMap<>())
                                .put("res_id", RES_ID)
                                .put("result", MapUtil.builder(new LinkedHashMap<>())
                                        .put("encoding", "utf8")
                                        .put("compress", "raw")
                                        .put("format", "json")
                                        .build())
                                .build())
                        .build())
                .put("payload", MapUtil.builder(new LinkedHashMap<>())
                        .put("input", MapUtil.builder(new LinkedHashMap<>())
                                .put("encoding", "utf8")
                                .put("compress", "raw")
                                .put("format", "plain")
                                .put("status", 3)
                                .put("text", Base64.encode(text))
                                .build())
                        .build())
                .build());
    }
}
```

