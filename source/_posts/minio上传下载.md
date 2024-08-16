---
title: minio上传下载
date: 2023-10-04 13:42:30
tags: java
---

> 真正的礼貌表现在对人的善意上。——卢俊

首先是安装，注意选择合对应的的系统和安装方式

https://min.io/docs/minio/kubernetes/upstream/

例如我在`windows`。直接下载

https://dl.min.io/server/minio/release/windows-amd64/minio.exe

然后运行

```powershell
minio.exe server D:\
```

打开`localhost:9000`，默认`minioadmin:minioadmin`进入界面

![](/imgs/oss/picGo/20231004142413.png)

然后是代码实现上传下载，先引入依赖

```xml
        <dependency>
            <groupId>io.minio</groupId>
            <artifactId>minio</artifactId>
            <version>8.5.6</version>
        </dependency>
```

然后是代码：

```java
package com.ruben;

import io.minio.*;
import io.minio.errors.MinioException;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

public class MinioDemo {
    public static void main(String[] args) {
        try {
            // 初始化客户端
            MinioClient minioClient = MinioClient.builder()
                    .endpoint("http://localhost:9000")  // 更新为你的Minio服务器地址
                    .credentials("minioadmin", "minioadmin")  // 使用你的访问和密钥
                    .build();

            // 检查一个存储桶是否存在
            BucketExistsArgs testbucket = BucketExistsArgs.builder().bucket("testbucket").build();
            boolean isExist = minioClient.bucketExists(testbucket);
            if (!isExist) {
                // 创建一个名为'testbucket'的存储桶
                minioClient.makeBucket(MakeBucketArgs.builder().bucket("testbucket").build());
            }

            // 上传一个文件
            String content = "Hello, Minio!";
            InputStream stream = new ByteArrayInputStream(content.getBytes());
            ObjectWriteResponse res = minioClient.putObject(PutObjectArgs.builder().bucket("testbucket")
                    .object("hello.txt").contentType("text/plain")
                    .stream(stream, content.length(), -1).build());

            // 下载文件
            InputStream downloadedStream = minioClient.getObject(GetObjectArgs.builder()
                    .bucket("testbucket").object("hello.txt").build());
            String downloadedContent = readFromInputStream(downloadedStream);
            System.out.println("Downloaded content: " + downloadedContent);
            downloadedStream.close();

        } catch (MinioException e) {
            System.out.println("Error occurred: " + e);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static String readFromInputStream(InputStream is) throws IOException {
        byte[] buffer = new byte[1024];
        int bytesRead;
        StringBuilder sb = new StringBuilder();
        while ((bytesRead = is.read(buffer)) != -1) {
            sb.append(new String(buffer, 0, bytesRead));
        }
        return sb.toString();
    }
}
```
