---
title: html转图片
date: 2020-12-29 20:10:39
tags: java
---

> 真话说一半常是弥天大谎。——富兰克林

引入依赖

```xml
        <!-- html转图片 -->
        <dependency>
            <groupId>com.github.xuwei-k</groupId>
            <artifactId>html2image</artifactId>
            <version>0.1.0</version>
        </dependency>
```

我这里稍微封装了一下

```java
package com.ruben.utils;

import gui.ava.html.image.generator.HtmlImageGenerator;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Arrays;

/**
 * @ClassName: HtmlUtils
 * @Description: 我还没有写描述
 * @Date: 2020/12/29 0029 20:21
 * *
 * @author: <achao1441470436@gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
public class HtmlUtils {
    /**
     * @MethodName: htmlSaveAsImage
     * @Description: html字符串转图片，保存到本地<多用于富文本场景>
     * @Date: 2020/12/29 0029 20:25
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [html, targetPath]
     * @returnValue: void
     */
    public static void htmlSaveAsImage(String html, String targetPath) {
        // 读取html
        HtmlImageGenerator imageGenerator = new HtmlImageGenerator();
        // 加载html模版
        imageGenerator.loadHtml(html);
        // 写入本地
        imageGenerator.saveAsImage(targetPath);
    }

    /**
     * @MethodName: htmlToImageByte
     * @Description: html 转换成byte数组
     * @Date: 2020/12/29 0029 21:16
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [html]
     * @returnValue: byte[]
     */
    public static byte[] htmlToImageByte(String html) {
        // 读取html
        HtmlImageGenerator imageGenerator = new HtmlImageGenerator();
        // 加载html模版
        imageGenerator.loadHtml(html);
        //获取图片
        BufferedImage image = imageGenerator.getBufferedImage();
        byte[] bytes = null;
        try (ByteArrayOutputStream os = new ByteArrayOutputStream()) {
            // 写如ByteArrayOutputStream
            ImageIO.write(image, "png", os);
            // 转成数组
            bytes = os.toByteArray();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return bytes;
    }


    public static void main(String[] args) {
        htmlSaveAsImage("<h1 color='red'>ruben</h1>", "D:\\file\\files\\target\\ruben.png");
        byte[] bytes = htmlToImageByte("<h1 color='red'>ruben</h1>");
    }
}

```

执行后结果

![image-20201229212123768](/imgs/oss/picGo/image-20201229212123768.png)