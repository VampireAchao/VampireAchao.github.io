---
title: apache的Http请求
date: 2021-02-05 19:49:22
tags: java
---

> 天地英雄气，千秋尚凛然。一一刘禹锡

我们的`Springboot`已经为我们引用了依赖

但我们还需要一个

```xml
        <!--    apache http前置依赖    -->
        <dependency>
            <groupId>com.sun.jersey</groupId>
            <artifactId>jersey-servlet</artifactId>
            <version>1.19</version>
        </dependency>
```

首先是一个`GET`请求

我们接口使用`@RequestParam`接参，所以请求格式应该是`http://127.0.0.1:8080/user/say?word=xxx`这样的

代码如下

```java
        // 指定url和参数,可以在queryParam后继续追加参数
        HttpGet request = new HttpGet(UriBuilder.fromUri("http://127.0.0.1:8080/user/say").queryParam("word", "xxx").build());
        // 构建请求,这里setDefaultRequestConfig指定请求配置，RequestConfig.DEFAULT为默认请求配置，这里我们自定义一个RequestConfig.custom().build()，指定请求超时时间为3000,最大重定向次数为1次
        CloseableHttpClient httpClient = HttpClientBuilder.create().setDefaultRequestConfig(RequestConfig.custom().setConnectionRequestTimeout(3000).setMaxRedirects(1).build()).build();
        // 执行请求，返回响应数据
        CloseableHttpResponse response = httpClient.execute(request);
        // 使用org.springframework.util.StreamUtils.copyToString去把响应回来的数据InputStream转换为String
        String responseData = StreamUtils.copyToString(response.getEntity().getContent(), Charset.defaultCharset());
        // 打印响应数据
        System.out.println(responseData);
```

执行后可以看到响应回来的数据

![image-20210205200810777](/imgs/oss/picGo/image-20210205200810777.png)

如果我们在`Java`代码中是`@RequestBody`接参，并需要使用`Post`方式

这里就可以这样写

```java
        // 指定url和参数
        HttpPost request = new HttpPost(UriBuilder.fromUri("http://localhost:8080/user/userList").build());
        // 添加header，指定请求头中Content-Type为application/json
        request.setHeader("Content-Type", "application/json");
        // 添加参数
        PageDTO param = new PageDTO();
        param.setPageNum(1);
        param.setPageSize(20);
        // 放入参数到requestBody里,这里使用com.alibaba.fastjson.JSON转换成JSON字符串再放入
        request.setEntity(new StringEntity(JSON.toJSONString(param)));
        // 构建请求
        CloseableHttpClient httpClient = HttpClientBuilder.create().setDefaultRequestConfig(RequestConfig.DEFAULT).build();
        // 执行请求，返回响应数据
        CloseableHttpResponse response = httpClient.execute(request);
        // 使用org.springframework.util.StreamUtils.copyToString去把响应回来的数据InputStream转换为String
        String responseData = StreamUtils.copyToString(response.getEntity().getContent(), Charset.defaultCharset());
        // 打印响应数据
        System.out.println(responseData);
```

响应数据如下

![image-20210205204416332](/imgs/oss/picGo/image-20210205204416332.png)

顺便放上[`APIDocumention`](http://hc.apache.org/httpcomponents-client-ga/httpclient/apidocs/index-all.html)

