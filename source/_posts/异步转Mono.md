---
title: 异步转Mono
date: 2024-02-12 01:22:07
tags: java
---

> 小利不争，小忿不发，可以合众。——傅昭

今天分享一个异步方法转`Mono`的方式，利用`reactor.core.publisher.Mono#create`：

```java
            return Mono.create(sink -> rtmClient.subscribe(channelName, options, new ResultCallback<Void>() {
                @Override
                public void onSuccess(Void unused) {
                    sink.success(unused);
                }

                @Override
                public void onFailure(ErrorInfo errorInfo) {
                    sink.error(new IllegalStateException(errorInfo.getErrorReason()));
                }
            }));
```

即可实现
