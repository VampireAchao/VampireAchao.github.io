---
title: 对接科大讯飞NLP
date: 2022-07-21 12:37:00
tags: java
---

> “未知苦处，不信神佛。”——Priest《杀破狼》
>

这里对接的是文本纠错

`git`仓库：

https://gitee.com/VampireAchao/simple-kdxf-nlp.git

`api`文档：

https://www.xfyun.cn/doc/nlp/textCorrection/API.html#%E6%8E%A5%E5%8F%A3%E8%AF%B4%E6%98%8E

引入maven依赖

```
        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-all</artifactId>
            <version>5.8.4</version>
        </dependency>
```

然后在 `resources`目录下添加 `app.setting`配置文件(也可以用 `spring`配置文件或者硬编码，随便你)

编写配置文件

![image.png](/imgs/oss/picGo/hgQFhO2qzuAO2vC3750MrjlD38QEFoYA2NEPgXLg.png)

```
# -------------------------------------------------------------
# ----- Setting File with UTF8-----
# ----- 服务接口认证信息配置文件 -----
# -------------------------------------------------------------

HOST_URL = 
          
            https://api.xf-yun.com/v1/private/s9a87e3ec
          
        
APP_ID = XXX
API_SECRET = XXX
API_KEY = XXX
```

接下来是编写代码：

```
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
import java.nio.charset.StandardCharsets;
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
    public static final String HOST_URL;
    public static final String APP_ID;
    public static final String API_SECRET;
    public static final String API_KEY;

    static {
        // 加载配置文件
        Setting setting = new Setting("app.setting");
        HOST_URL = setting.get("HOST_URL");
        APP_ID = setting.get("APP_ID");
        API_SECRET = setting.get("API_SECRET");
        API_KEY = setting.get("API_KEY");
        setting.clear();
    }

    public static void main(String[] args) {
        Map<String, Object> inspect = inspect("Hutool似一个小而全的Java工具类库,通过静态万法封装，降低相咲API的学习城本，提蒿工作效率，使Java拥有函数式语言般的尤雅，让Java语言也何以“甜甜的”。");
        Console.log(inspect);
    }

    public static JSONObject inspect(String words) {
        String authUrl = getAuthUrl(HOST_URL, API_KEY, API_SECRET);
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
                .build(), StandardCharsets.UTF_8, true);
        return HttpUtil.urlWithForm(hostUrl, queryString, CharsetUtil.CHARSET_UTF_8, false);
    }


    public static String getRequestJson(String text) {
        return JSONUtil.toJsonStr(MapUtil.builder(new LinkedHashMap<>())
                .put("header", MapUtil.builder(new LinkedHashMap<>())
                        .put("app_id", APP_ID)
                        .put("status", 3)
                        .build())
                .put("parameter", MapUtil.builder(new LinkedHashMap<>())
                        .put("s9a87e3ec", MapUtil.builder(new LinkedHashMap<>())
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

执行结果：

![image.png](/imgs/oss/picGo/zbCy7kB7C98o5RrzJkldTRiJ0ykD9ZXK3RGmEMhC.png)