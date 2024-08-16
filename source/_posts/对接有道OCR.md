---
title: 对接有道OCR
date: 2022-09-10 12:52:57
tags: java
---

> 挑选朋友要慎重，更换朋友更要慎重——富兰克林

[有道智云文档](https://ai.youdao.com/DOCSIRMA/html/%E6%96%87%E5%AD%97%E8%AF%86%E5%88%ABOCR/API%E6%96%87%E6%A1%A3/%E9%80%9A%E7%94%A8%E6%96%87%E5%AD%97%E8%AF%86%E5%88%AB%E6%9C%8D%E5%8A%A1/%E9%80%9A%E7%94%A8%E6%96%87%E5%AD%97%E8%AF%86%E5%88%AB%E6%9C%8D%E5%8A%A1-API%E6%96%87%E6%A1%A3.html)

代码如下：

```java
package com.ruben;

import cn.hutool.core.codec.Base64;
import cn.hutool.core.lang.Console;
import cn.hutool.core.lang.UUID;
import cn.hutool.crypto.digest.DigestUtil;
import cn.hutool.extra.tokenizer.Word;
import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpResponse;
import cn.hutool.http.HttpUtil;
import cn.hutool.setting.Setting;

import javax.sound.sampled.Line;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * YouDaoOcr
 *
 * @author VampireAchao
 * @since 2022/9/10
 */
public class YouDaoOcr {

    /**
     * 地址与鉴权信息，配置文件中
     */
    public static final Setting SETTING = new Setting("app.setting");


    public static void main(String[] args) {
        recognize(Base64.encode(HttpUtil.downloadBytes("https://VampireAchao.github.io/imgs/preview/3051_3.jpg")));
    }

    public static void recognize(String base64Image) {
        String salt = UUID.fastUUID().toString();
        String curTime = String.valueOf(System.currentTimeMillis() / 1000);
        HttpRequest request = HttpUtil.createPost(SETTING.get("YOU_DAO_OCR_URL"))
                .form("detectType", "10012")
                .form("imageType", "1")
                .form("langType", "auto")
                .form("img", base64Image)
                .form("docType", "json")
                .form("signType", "v3")
                .form("curtime", curTime)
                .form("appKey", SETTING.get("YOU_DAO_APP_KEY"))
                .form("salt", salt)
                .form("sign", DigestUtil.sha256Hex(SETTING.get("YOU_DAO_APP_KEY") + truncate(base64Image) + salt + curTime + SETTING.get("YOU_DAO_APP_SECRET")));
        try (HttpResponse response = request.execute()) {
            Console.log(response.body());
        }
    }

    private static String truncate(String q) {
        if (q == null) {
            return null;
        }
        int len = q.length();
        return len <= 20 ? q : (q.substring(0, 10) + len + q.substring(len - 10, len));
    }
}
```

配置文件如下：

```setting
YOU_DAO_OCR_URL = https://openapi.youdao.com/ocrapi
YOU_DAO_APP_KEY = <YOUR_YOU_DAO_APP_KEY>
YOU_DAO_APP_SECRET = <YOUR_YOU_DAO_APP_SECRET>
```

执行结果如下：

![image-20220910125752346](/imgs/oss/blog/image-20220910125752346.png)
