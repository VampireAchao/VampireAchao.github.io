---
title: jquery和springBoot文件上传
date: 2021-08-13 20:27:08
tags: java
---

> 友情在过去的生活里，就像一盏明灯，照彻了我的灵魂，使我的生存有了一点点光彩。——巴金

首先是后端代码：

写入文件工具类

```java
package com.ruben.simplescaffold.utils;

import lombok.extern.slf4j.Slf4j;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Collections;
import java.util.Optional;
import java.util.Spliterator;
import java.util.function.Predicate;
import java.util.stream.Stream;

/**
 * 文件工具类
 *
 * @author <achao1441470436@gmail.com>
 * @since 2021/6/23 16:57
 */
@Slf4j
public class FileUtils {

    private FileUtils() {
        /* Uh!Uh! What are you thinking of? */
    }

    /**
     * 保存文件
     *
     * @param file     你要保存的文件字节
     * @param filePath 文件路径
     * @param fileName 文件名
     * @return java.lang.Boolean
     * @author <achao1441470436@gmail.com>
     * @since 2021/8/13 22:42
     */
    public static Boolean saveFile(byte[] file, String filePath, String fileName) {
        File targetFile = new File(filePath);
        //如果目录不存在，创建目录
        Predicate.isEqual(Optional.of(targetFile).map(File::exists).filter(Boolean.TRUE::equals).orElseGet(targetFile::mkdirs)).and(i -> Stream.builder().add(null).build().spliterator().tryAdvance(c -> log.error("mkdir failed"))).test(false);
        String fullPath = filePath + fileName;
        try (FileOutputStream out = new FileOutputStream(fullPath)) {
            out.write(file);
            out.flush();
            return Stream.builder().add(fullPath).add(out).build().spliterator().tryAdvance(i -> log.info("file path is：{}", i));
        } catch (IOException e) {
            Spliterator<IOException> spliterator = Collections.singleton(e).spliterator();
            spliterator.tryAdvance(c -> log.error("file save failed!", c));
            return spliterator.tryAdvance(c -> log.error("Oh!You found me!", c));
        }
    }

}
```

然后是`Controller`

```java
package com.ruben.simplescaffold.controller;

import com.baomidou.mybatisplus.core.toolkit.ClassUtils;
import com.baomidou.mybatisplus.core.toolkit.IdWorker;
import com.ruben.simplescaffold.pojo.common.Result;
import com.ruben.simplescaffold.utils.FileUtils;
import com.ruben.simplescaffold.utils.Opt;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.Objects;

/**
 * 文件上传
 *
 * @author <achao1441470436@gmail.com>
 * @since 2021/5/20 0020 19:24
 */
@Slf4j
@RestController
public class UploadController {

    @PostMapping("upload")
    public Result projectPictureUpload(MultipartFile file) {
        //将图片上传到服务器
        if (file.isEmpty()) {
            return Result.error("项目图片不能为空");
        }
        //原始文件名
        String originalFilename = Opt.ofNullable(file.getOriginalFilename()).orElseGet(file::getName);
        //文件后缀
        String suffix = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);
        //图片名称为uuid+图片后缀防止冲突
        String fileName = IdWorker.getTimeId() + "." + suffix;
        // 项目文件保存路径
        String filePath = "";
        //获取项目classes/static的地址
        filePath = Objects.requireNonNull(ClassUtils.getDefaultClassLoader().getResource("static")).getPath() + "/upload/img/";
        try {
            // 写入文件
            Boolean writePictureTarget = FileUtils.saveFile(file.getBytes(), filePath, fileName);
            // 开发环境中写一份在本地
            Boolean writePictureProject = FileUtils.saveFile(file.getBytes(), System.getProperty("user.dir") + "/src/main/resources/static/upload/img/", fileName);
            if (!writePictureTarget) {
                //上传文件失败
                return Result.error("上传项目文件失败");
            }
            //上传成功后，将可以访问的完整路径返回
            String fullImgPath = "/upload/img/" + fileName;
            return Result.ok().data(fullImgPath);
        } catch (Exception e) {
            log.error("上传项目文件失败", e);
            //上传图片失败
            return Result.error("上传项目文件失败");
        }
    }
}
```

这里用到的`Result`在[之前一篇博客](https://VampireAchao.github.io/2021/08/07/%E5%B1%8F%E8%94%BD%E8%AF%8D%E8%BF%87%E6%BB%A4%E5%99%A8/)提到过，当然也可以在最下方找到全部的源码

然后就是前端代码啦

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>上传Demo</title>
    <script src="https://www.jq22.com/jquery/jquery-3.3.1.js"></script>
</head>
<body>
<div>
    <input type="file" onchange="upload(this)">
</div>
<script>
    function upload(file) {
        file = $(file)
        if (!file.prop("files")[0]) {
            return
        }
        let formData = new FormData()
        formData.append('file', file.prop("files")[0]);
        $.ajax({
                type: "post",
                url: "/upload",
                data: formData,
                processData: false,
                contentType: false,
                success: function (res) {
                    file.after(`<img src='${res.data}'>`)
                }
            }
        );
    }
</script>
</body>
</html>
```

效果如下：

![image-20210813232656563](/imgs/oss/picGo/image-20210813232656563.png)

![image-20210813232712760](/imgs/oss/picGo/image-20210813232712760.png)

![image-20210813232729024](/imgs/oss/picGo/image-20210813232729024.png)

完整源码：https://gitee.com/VampireAchao/simple-scaffold.git
