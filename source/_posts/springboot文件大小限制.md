---
title: springboot文件大小限制
date: 2021-03-04 20:56:25
tags: java
---

> 繁枝容易纷纷落，嫩蕊商量细细开。——唐•杜甫

`springboot`文件大小限制

首先是可以在配置文件中进行配置

```yml
spring:
  servlet:
    multipart:
      # 单个文件
      max-file-size: 1GB
      # 一次请求
      max-request-size: 1GB
```

还有，我们也可以在代码中进行配置

```java
    @Bean
    public MultipartConfigElement multipartConfigElement() {
        MultipartConfigFactory factory = new MultipartConfigFactory();
        // 单个数据大小
        factory.setMaxFileSize(DataSize.of(1, DataUnit.GIGABYTES));
        // 总上传数据大小
        factory.setMaxRequestSize(DataSize.of(1, DataUnit.GIGABYTES));
        return factory.createMultipartConfig();
    }
```

这里`DataUnit`是个枚举，表示单位

