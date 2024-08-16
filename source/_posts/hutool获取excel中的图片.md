---
title: hutool获取excel中的图片
date: 2022-09-08 12:57:50
tags: java
---

> 人无礼而何为，财非义而不取——耐施庵

依赖如下：

```xml
        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-all</artifactId>
            <version>5.8.6</version>
        </dependency>
        <!-- https://mvnrepository.com/artifact/org.apache.poi/poi-ooxml -->
        <dependency>
            <groupId>org.apache.poi</groupId>
            <artifactId>poi-ooxml</artifactId>
            <version>5.2.2</version>
        </dependency>
```

代码如下：

```java
package com.ruben;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.text.StrPool;
import cn.hutool.core.util.StrUtil;
import cn.hutool.poi.excel.ExcelReader;
import cn.hutool.poi.excel.ExcelUtil;
import org.apache.poi.ss.usermodel.PictureData;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFAnchor;
import org.apache.poi.xssf.usermodel.XSSFPicture;

import java.io.File;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * ExcelDemo
 *
 * @author VampireAchao
 * @since 2022/9/7
 */
public class ExcelDemo {
    public static void main(String[] args) {
        String path = "D:\\file\\tmp\\001.xlsx";
        String localPath = "D:\\file\\tmp\\";
        final ExcelReader reader = ExcelUtil.getReader(path);
        Sheet sheet = reader.getSheet();
        List<XSSFPicture> pictures = StreamSupport.stream(sheet.getDrawingPatriarch().spliterator(), false)
                .filter(XSSFPicture.class::isInstance)
                .map(XSSFPicture.class::cast)
                .collect(Collectors.toList());
        pictures.parallelStream().forEach(picture -> {
            XSSFAnchor anchor = picture.getAnchor();
            String filename = StrUtil.format("{}-{}-{}-{}", anchor.getDx1(), anchor.getDy1(), anchor.getDx2(), anchor.getDy2());
            PictureData pdata = picture.getPictureData();
            String suggestFileExtension = pdata.suggestFileExtension();
            File file = FileUtil.writeBytes(pdata.getData(), localPath + filename + StrPool.DOT + suggestFileExtension);
            System.out.println(picture);
        });
        System.out.println(reader);
    }
}
```

执行后，其中`excel`包含的悬浮在单元格上方的图片已经成功提取