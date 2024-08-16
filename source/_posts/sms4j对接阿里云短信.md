---
title: sms4j对接阿里云短信
date: 2023-09-23 11:26:23
tags: java
---

> 迷信、愚昧和虚伪腰缠万贯，但真理一直是一个乞丐。——马丁·路德

开通服务：[新手指引_短信服务-阿里云帮助中心](https://help.aliyun.com/zh/sms/getting-started/get-started-with-sms)

首先安装：

```xml
<dependency>
    <groupId>org.dromara.sms4j</groupId>
    <artifactId>sms4j-spring-boot-starter</artifactId>
    <version>${sms4j.version}</version>
</dependency>
```

然后配置：

```yml
sms:
  # 标注从yml读取配置
  config-type: yaml
  is-print: false
  blends:
    # 自定义的标识，也就是configId这里可以是任意值（最好不要是中文）
    aliyun:
      # 厂商标识，标定此配置是哪个厂商，详细请看厂商标识介绍部分
      supplier: alibaba
      # 您的accessKey
      access-key-id: <您的accessKey>
      # 您的accessKeySecret
      access-key-secret: <您的accessKeySecret>
      # 请求地址
      request-url: dysmsapi.aliyuncs.com
      # 接口名称
      action: SendSms
      # 版本号
      version: 2017-05-25
      # 地域信息
      region-id: cn-hangzhou
      # 短信签名
      signature: 阿里云短信测试
      # 模板code
      template-id: SMS_XXXXXXXXX
```

使用：

```java
@Value("${sms.blends.aliyun.template-id}")
private String templateId;

// 发送短信
SmsBlend smsBlend = SmsFactory.getSmsBlend("aliyun");
LinkedHashMap<String, String> map = new LinkedHashMap<>(1);
map.put("code", code);
SmsResponse smsResponse = smsBlend.sendMessage(phone, templateId, map);
```

非常滴简单
