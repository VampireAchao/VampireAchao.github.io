---
title: 阿里云sms发送短信（新）
date: 2020-06-06 10:30:43
tags: java
---

之前跟着狂神学习sms发送短信

今天拿出来用发现。。。依赖版本冲突，用的新版的依赖，旧的方法直接无法调用了，于是自己去看了看官方文档。废话不多说，直接贴代码

对了，[开通服务教程](https://help.aliyun.com/document_detail/55288.html?spm=a2c4g.11186623.6.557.21f11a81KFhzS6)

```java
package com.ruben.sms;

import com.alibaba.fastjson.JSONObject;
import com.aliyuncs.CommonRequest;
import com.aliyuncs.CommonResponse;
import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.IAcsClient;
import com.aliyuncs.exceptions.ClientException;
import com.aliyuncs.http.MethodType;
import com.aliyuncs.profile.DefaultProfile;

import java.util.HashMap;
import java.util.Map;

/**
 * @ClassName: SmsUtil
 * @Description:
 * @Date: 2020/6/7 10:06
 * *
 * @author: achao<achao1441470436 @ gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 *
 * <dependency>
 * <groupId>com.alibaba</groupId>
 * <artifactId>fastjson</artifactId>
 * <version>1.2.62</version>
 * </dependency>
 * <dependency>
 * <groupId>com.aliyun</groupId>
 * <artifactId>aliyun-java-sdk-core</artifactId>
 * <version>4.5.1</version>
 * </dependency>
 */
public class SmsUtil {
    public static boolean SendSms(String phoneNum, String template, String code) {
        DefaultProfile profile = DefaultProfile.getProfile(
                "cn-hangzhou",
                //accessKeyId
                "<你的accessKeyId>",
                //accessSecret
                "<你的accessSecret>");
        IAcsClient client = new DefaultAcsClient(profile);

        CommonRequest request = new CommonRequest();
        request.setSysMethod(MethodType.POST);
        request.setSysDomain("dysmsapi.aliyuncs.com");
        request.setSysVersion("2017-05-25");
        request.setSysAction("SendSms");
        request.putQueryParameter("RegionId", "cn-hangzhou");
        //接收号码
        request.putQueryParameter("PhoneNumbers", phoneNum);
        //短信签名（如某某科技有限公司）
        request.putQueryParameter("SignName", "<你的短信签名>");
        //短信模板
        request.putQueryParameter("TemplateCode", template);
        //验证码
        Map<String, Object> map = new HashMap<>();
        map.put("code", code);
        request.putQueryParameter("TemplateParam", JSONObject.toJSONString(map));
        try {
            CommonResponse response = client.getCommonResponse(request);
            System.out.println(response.getData());
            map = JSONObject.parseObject(response.getData());
            System.out.println(map);
            code = (String) map.get("Code");
            if (!"OK".equals(code)) {
                return false;
            }
        } catch (ClientException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    public static void main(String[] args) {
        boolean isSuccess = SendSms("<接收的电话号码>", "<短信模板>", "<验证码>");
        System.out.println(isSuccess);
    }
}

```

