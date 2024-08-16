---
title: springboot+camel对接minio上传下载
date: 2023-10-05 11:47:31
tags: java
---

> 不要相信任何人，凡事都要自己用心，即使是有意让人恭维，也是可怕的。——爱·杨格

昨天我们已经实现了 [minio上传下载](https://VampireAchao.github.io/2023/10/04/minio%E4%B8%8A%E4%BC%A0%E4%B8%8B%E8%BD%BD/)

今天我们集成[`camel`](https://camel.apache.org/)方式，相应的参数文档：

[Minio :: Apache Camel](https://camel.apache.org/components/4.0.x/minio-component.html)

首先是依赖：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.1.4</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.ruben</groupId>
    <artifactId>simple-camel</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>simple-camel</name>
    <description>simple-camel</description>
    <properties>
        <java.version>17</java.version>
        <camel.version>4.0.1</camel.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

        <dependency>
            <groupId>org.apache.camel.springboot</groupId>
            <artifactId>camel-spring-boot-starter</artifactId>
            <version>${camel.version}</version>
        </dependency>
        <dependency>
            <groupId>org.apache.camel.springboot</groupId>
            <artifactId>camel-minio-starter</artifactId>
            <version>${camel.version}</version>
        </dependency>
        <!-- we use the endpoint-dsl -->
        <dependency>
            <groupId>org.apache.camel</groupId>
            <artifactId>camel-endpointdsl</artifactId>
            <version>${camel.version}</version>
        </dependency>
        <dependency>
            <groupId>org.apache.camel</groupId>
            <artifactId>camel-direct</artifactId>
            <version>${camel.version}</version>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>
```

然后是配置文件`application.yml`：

```yml
camel:
  component:
    minio:
      access-key: minioadmin
      secret-key: minioadmin
      endpoint: http://localhost:9000
      bucket: testbucket
```

之后是代码配置：

```java
package com.ruben.simplecamel;

import org.apache.camel.builder.endpoint.EndpointRouteBuilder;
import org.springframework.stereotype.Component;

@Component
public class MinioRouteBuilder extends EndpointRouteBuilder {

    @Override
    public void configure() {
        // For the upload route
        from(direct("upload"))
                .to(file("sourceFolder?noop=true"))
                .to(minio("{{camel.component.minio.bucket}}"));

        // For the download route
        from(direct("download"))
                .to(file("targetFolder"))
                .to(minio("{{camel.component.minio.bucket}}").operation("getObject"));
    }
}
```

最后是使用：

```java
package com.ruben.simplecamel;

import io.minio.GetObjectResponse;
import org.apache.camel.CamelContext;
import org.apache.camel.ProducerTemplate;
import org.apache.camel.component.minio.MinioConstants;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@SpringBootTest
class MinioCamelTest {

    @Autowired
    private CamelContext camelContext;

    @Test
    void testUploadAndDownload() throws IOException {
        var content = "Hello, Minio!";
        ProducerTemplate producerTemplate = camelContext.createProducerTemplate();
        producerTemplate.sendBodyAndHeader("direct:upload", content, MinioConstants.OBJECT_NAME, "test.txt");
        GetObjectResponse response = (GetObjectResponse) producerTemplate.requestBodyAndHeader("direct:download", "", MinioConstants.OBJECT_NAME, "test.txt");
        Assertions.assertEquals(content, StreamUtils.copyToString(response, StandardCharsets.UTF_8));
    }

}
```

![](/imgs/oss/picGo/20231005124832.png)
