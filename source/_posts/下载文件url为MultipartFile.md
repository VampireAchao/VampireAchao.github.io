---
title: 下载文件url为MultipartFile
date: 2023-06-01 22:03:00
tags: java
---

> 良好的秩序是一切的基础。——伯克

代码如下：

```java

import lombok.Cleanup;
import lombok.SneakyThrows;
import lombok.val;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.dromara.hutool.core.io.IoUtil;
import org.dromara.hutool.core.net.url.URLUtil;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

/**
 * MultiFileUtils
 *
 * @author VampireAchao
 * @since 2023/6/1
 */
public class MultiFileUtils {


    /**
     * 通过url获取MultipartFile
     *
     * @param url      文件网络路径
     * @param fileName 文件新名称
     * @return MultipartFile
     */
    @SneakyThrows
    public static MultipartFile getMultipartFile(String url, String fileName) {
        @Cleanup val inputStream = URLUtil.url(url).openStream();
        FileItemFactory factory = new DiskFileItemFactory(16, null);
        FileItem fileItem = factory.createItem(fileName, MediaType.MULTIPART_FORM_DATA_VALUE, true, fileName);
        val bytes = IoUtil.readBytes(inputStream);
        @Cleanup val outputStream = fileItem.getOutputStream();
        IoUtil.write(outputStream, false, bytes);
        return new CommonsMultipartFile(fileItem);
    }

}

```

