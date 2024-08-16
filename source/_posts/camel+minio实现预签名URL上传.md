---
title: camel+minio实现预签名URL上传
date: 2023-10-06 10:31:49
tags: java
---

> 充实的思想不在于言语的美丽，而在于它引以自豪的内容。——莎士比亚

![](/imgs/oss/picGo/20231006130358.png)

`Camel`文档：

[Minio :: Apache Camel](https://camel.apache.org/components/4.0.x/minio-component.html)

`Minio`文档：

https://min.io/docs/minio/linux/developers/java/API.html#getPresignedObjectUrl

`Amazon`文档：

[使用预签名 URL - Amazon Simple Storage Service](https://docs.aws.amazon.com/zh_cn/AmazonS3/latest/userguide/using-presigned-url.html)

然后核心配置如下：

```java
// For the generate Pre signed Url route
from(direct("createUploadLink"))
        .to(minio(CamelConst.BUCKET_TEMPLATE).operation(MinioOperations.createUploadLink));
```

其余配置部分参考 [springboot+camel对接minio上传下载](https://VampireAchao.github.io/2023/10/05/springboot-camel%E5%AF%B9%E6%8E%A5minio%E4%B8%8A%E4%BC%A0%E4%B8%8B%E8%BD%BD/)

接下来就是使用：

```java
import cn.hutool.core.io.IoUtil;
import cn.hutool.core.util.URLUtil;
import cn.hutool.http.HttpUtil;
import cn.hutool.http.Method;
import io.minio.GetObjectResponse;
import org.apache.camel.CamelContext;
import org.apache.camel.ProducerTemplate;
import org.apache.camel.component.minio.MinioComponent;
import org.apache.camel.component.minio.MinioConstants;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;
import java.time.Duration;
import java.time.temporal.ChronoUnit;
import java.util.Map;
```

代码

```java
    @Test
    void testGeneratePresignedUrl() throws IOException {
        var presignedUrl = producerTemplate.requestBodyAndHeaders("direct:createUploadLink", "",
                Map.of(MinioConstants.BUCKET_NAME, "testbucket",
                        MinioConstants.OBJECT_NAME, "test.txt",
                        MinioConstants.PRESIGNED_URL_EXPIRATION_TIME, Duration.of(1, ChronoUnit.DAYS)));

        Assertions.assertNotNull(presignedUrl);
        var content = "Hello, Minio! Again!";
        try (var response = HttpUtil.createRequest(Method.PUT, presignedUrl.toString())
                .body(content, "application/octet-stream").execute()) {
            Assertions.assertTrue(response.isOk());
        }
        var minio = (MinioComponent) camelContext.getComponent("minio");
        Assertions.assertEquals(content,
                IoUtil.readUtf8(URLUtil.url(minio.getConfiguration().getEndpoint() + "/testbucket/test.txt").openStream()));
    }
```
