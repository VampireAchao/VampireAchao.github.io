---
title: minio临时凭证直传切换到阿里云oss
date: 2024-02-01 12:26:12
tags: java
---

> 孤独没有什么不好。使孤独变得不好，是因为你害怕孤独。——《孤独六讲》

代码非常简单，像之前的实现：

```java
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.io.file.FileNameUtil;
import cn.hutool.core.lang.UUID;
import cn.hutool.core.text.StrPool;
import cn.hutool.core.util.StrUtil;
import cn.hutool.core.util.URLUtil;
import cn.hutool.http.ContentType;
import com.aliyun.oss.HttpMethod;
import com.aliyun.oss.OSS;
import com.aliyun.oss.model.DeleteObjectsRequest;
import com.aliyun.oss.model.GeneratePresignedUrlRequest;
import com.namaste.hsswobjectstorage.api.service.IOssService;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.Date;
import java.util.List;

import static java.util.stream.Collectors.*;

/**
 * AliOssServiceImpl
 *
 * @author achao@apache.org
 */
@Service
public class AliOssServiceImpl implements IOssService {

    @Resource
    private OSS ossClient;

    /**
     * @param rootPath bucket是配死的
     * @param fileName fileName
     * @return 预签名url
     */
    @Override
    public String getPresignedUrlPut(String bucket, String fileName) {
        var expiration = new Date(new Date().getTime() + 3600 * 1000L);
        var objectName = DateUtil.date().toDateStr() +
                FileNameUtil.UNIX_SEPARATOR +
                UUID.fastUUID() +
                DateUtil.date().toTimestamp() +
                StrPool.DOT +
                FileNameUtil.extName(fileName);
        GeneratePresignedUrlRequest request = new GeneratePresignedUrlRequest(bucket, objectName, HttpMethod.PUT);
        request.setExpiration(expiration);
        request.setContentType(ContentType.OCTET_STREAM.getValue());
        return ossClient.generatePresignedUrl(request).toString();
    }

    @Override
    public void deleteBatch(List<String> fileUrls) {
        if (ObjectUtils.isEmpty(fileUrls)) {
            return;
        }
        var bucketObjectsMap = fileUrls.stream()
                .collect(groupingBy(
                        url -> url.substring(url.indexOf(StrPool.SLASH) + 2, url.indexOf(StrPool.DOT)),
                        mapping(url -> StrUtil.removePrefix(URLUtil.getPath(url), StrPool.SLASH),
                                toList())));
        bucketObjectsMap.entrySet().stream()
                .map(entry -> {
                    var req = new DeleteObjectsRequest(entry.getKey());
                    req.setKeys(entry.getValue());
                    return req;
                }).forEach(ossClient::deleteObjects);
    }

}

```

`minio`的实现：

```java


import cn.hutool.core.date.DateUtil;
import cn.hutool.core.io.file.FileNameUtil;
import cn.hutool.core.lang.UUID;
import cn.hutool.core.net.url.UrlBuilder;
import cn.hutool.core.text.StrPool;

import io.minio.RemoveObjectsArgs;
import io.minio.messages.DeleteObject;
import jakarta.annotation.Resource;
import org.apache.camel.ProducerTemplate;
import org.apache.camel.component.minio.MinioConstants;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.util.ObjectUtils;

import java.time.Duration;
import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.*;

/**
 * OssServiceImpl
 *
 * @author VampireAchao<achao @ hutool.cn>
 * @since 2023/10/5
 */
//@Service
public class MinioOssServiceImpl implements IOssService {

    @Value("${camel.component.minio.presigned-url-expire}")
    private Duration presignedUrlExpire;
    @Resource
    private ProducerTemplate producerTemplate;
    @Lazy
    @Resource
    private IOssService ossService;

    @Override
    public String getPresignedUrlPut(String bucket, String fileName) {
        var objectName = DateUtil.date().toDateStr() +
                FileNameUtil.UNIX_SEPARATOR +
                UUID.fastUUID() +
                DateUtil.date().toTimestamp() +
                StrPool.DOT +
                FileNameUtil.extName(fileName);
        return String.valueOf(producerTemplate.requestBodyAndHeaders(
                "direct:createUploadLink", "",
                Map.of(MinioConstants.BUCKET_NAME, bucket,
                        MinioConstants.OBJECT_NAME, objectName,
                        MinioConstants.PRESIGNED_URL_EXPIRATION_TIME, presignedUrlExpire)));
    }

    @Override
    public void deleteBatch(List<String> fileUrls) {
        if (ObjectUtils.isEmpty(fileUrls)) {
            return;
        }
        var bucketObjectsMap = fileUrls.stream().map(path -> UrlBuilder.of(path).getPath())
                .collect(groupingBy(path -> path.getSegment(0), mapping(path -> {
                    path.getSegments().remove(0);
                    return String.join(StrPool.SLASH, path.getSegments());
                }, toList())));
        bucketObjectsMap.entrySet().stream()
                .map(entry -> RemoveObjectsArgs.builder()
                        .bucket(entry.getKey())
                        .objects(entry.getValue().stream().map(DeleteObject::new).toList())
                ).parallel()
                .forEach(args -> producerTemplate.sendBody("direct:deleteBatch", args));
    }

}

```

对应的`service`：

```java
import com.namaste.enums.GreenLabelEnum;
import org.dromara.streamquery.stream.core.variable.BoolHelper;

import java.util.List;

/**
 * IOssService
 *
 * @author VampireAchao<achao @ hutool.cn>
 * @since 2023/10/5
 */
public interface IOssService {

    /**
     * 获取预签名url上传
     *
     * @param bucket   桶
     * @param fileName fileName
     * @return 用于上传资源的url
     */
    String getPresignedUrlPut(String bucket, String fileName);

    /**
     * 批量删除
     *
     * @param fileUrls fileUrls
     */
    void deleteBatch(List<String> fileUrls);

    /**
     * 内容安全审查
     *
     * @param img 图片url
     * @return 审查结果
     */
    default GreenVO green(String img) {
        var result = GreenUtil.inspectImg(img, GreenLabelEnum.LIVE_STREAM_CHECK);
        var vo = GreenVO.of(result);
        if (BoolHelper.isFalsy(vo.getIsViolation())) {
            deleteBatch(List.of(img));
        }
        return vo;
    }

}

```

`test case`

```java
import cn.hutool.core.io.IoUtil;
import cn.hutool.core.net.url.UrlBuilder;
import cn.hutool.core.net.url.UrlQuery;
import cn.hutool.core.util.URLUtil;
import cn.hutool.http.ContentType;
import cn.hutool.http.HttpUtil;
import cn.hutool.http.Method;
import jakarta.annotation.Resource;
import lombok.SneakyThrows;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.FileNotFoundException;
import java.util.List;

/**
 * OssServiceTest
 *
 * @author VampireAchao<achao @ hutool.cn>
 * @since 2023/10/5
 */
@SpringBootTest
class OssServiceTest {

    @Resource
    private IOssService ossService;

    @Test
    @SneakyThrows
    void getUploadSTSAndDeleteBatchTest() {
        var presignedUrl = ossService.getPresignedUrlPut("test", "test.txt");
        Assertions.assertNotNull(presignedUrl);
        var content = "Hello, Minio! Again!";
        try (var response = HttpUtil.createRequest(Method.PUT, presignedUrl)
                .body(content, "application/octet-stream").execute()) {
            Assertions.assertTrue(response.isOk());
        }
        var urlBuilder = UrlBuilder.of(presignedUrl).setQuery(new UrlQuery());
        Assertions.assertEquals(content,
                IoUtil.readUtf8(urlBuilder.toURL().openStream()));
        ossService.deleteBatch(List.of(urlBuilder.toString()));
        Assertions.assertThrows(FileNotFoundException.class,
                () -> IoUtil.readUtf8(urlBuilder.toURL().openStream()));
    }

    @Test
    void greenNormalTest() {
        var url = [foo];
        var bytes = IoUtil.readBytes(URLUtil.getStream(URLUtil.url(url)));
        var preUrl = ossService.getPresignedUrlPut("test", "normal.jpg");
        try (var response = HttpUtil.createRequest(Method.PUT, preUrl).contentType(ContentType.OCTET_STREAM.getValue()).body(bytes).execute()) {
            Assertions.assertTrue(response.isOk());
            var urlBuilder = UrlBuilder.of(preUrl).setQuery(new UrlQuery());
            Assertions.assertEquals(bytes.length, IoUtil.readBytes(URLUtil.getStream(urlBuilder.toURL())).length);
            var imgUrl = urlBuilder.toURL().toString();
            var greenVO = ossService.green(imgUrl);
            Assertions.assertFalse(greenVO.getIsViolation());
            Assertions.assertThrows(FileNotFoundException.class,
                    () -> IoUtil.readUtf8(urlBuilder.toURL().openStream()));

        }
    }


    @Test
    void greenYellowTest() {
        var url = [bar];
        var bytes = IoUtil.readBytes(URLUtil.getStream(URLUtil.url(url)));
        var preUrl = ossService.getPresignedUrlPut("test", "normal.jpg");
        try (var response = HttpUtil.createRequest(Method.PUT, preUrl).body(bytes).execute()) {
            Assertions.assertTrue(response.isOk());
            var urlBuilder = UrlBuilder.of(preUrl).setQuery(new UrlQuery());
            Assertions.assertEquals(bytes.length, IoUtil.readBytes(URLUtil.getStream(urlBuilder.toURL())).length);
            var imgUrl = urlBuilder.toURL().toString();
            var greenVO = ossService.green(imgUrl);
            Assertions.assertTrue(greenVO.getIsViolation());
            var readBytes = IoUtil.readBytes(URLUtil.getStream(urlBuilder.toURL()));
            Assertions.assertEquals(readBytes.length, bytes.length);
        }
    }

}

```
