---
title: open-feign设置全局header
date: 2024-01-03 13:14:38
tags: java
---

> 求学犹植树，春天开花朵，秋天结果实。——爱因斯坦

代码如下：

```java
import feign.RequestInterceptor;
import feign.RequestTemplate;

@Component
public class CustomRequestInterceptor implements RequestInterceptor {
    @Override
    public void apply(RequestTemplate template) {
        // 添加全局Header
        template.header("Global-Header-Name", "Global-Header-Value");
        
        // 例如，如果您需要添加一个认证令牌，可以这样做：
        // template.header("Authorization", "Bearer " + authToken);
    }
}
```

即可实现`feign`全局添加请求头
