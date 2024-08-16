---
title: 声网rtm加密传输
date: 2023-12-07 21:05:47
tags: java
---

> 忍耐能抚慰所有的不幸。——维吉尔

加密方式，文档：

https://doc.shengwang.cn/api-ref/rtm2/android/toc-configuration/configuration#RtmEncryptionConfig

```java
    @Bean
    public RtmClient rtmClient() throws Exception {
        RtmEncryptionConfig rtmEncryptionConfig = new RtmEncryptionConfig();
        rtmEncryptionConfig.setEncryptionMode(RtmConstants.RtmEncryptionMode.AES_256_GCM);
        rtmEncryptionConfig.setEncryptionKey(agoraProperties.getEncryptionKey());
        rtmEncryptionConfig.setEncryptionSalt(agoraProperties.getEncryptionKdfSalt().getBytes(StandardCharsets.UTF_8));
        RtmConfig rtmConfig = new RtmConfig.Builder(agoraProperties.getAppId(), RoomConst.SERVER_ID.toString())
                .eventListener(agoraRtmClientListener)
                .encryptionConfig(rtmEncryptionConfig)
                .build();
        var mRtmClient = RtmClient.create(rtmConfig);
        mRtmClient.login(AgoraUtil.generateRtmToken(), AgoraUtil.resultCallback("login"));
        return mRtmClient;
    }
```

这里需要客户端和服务端都配置加密才可以
