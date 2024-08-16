---
title: x-easypdf
date: 2022-07-18 13:04:55
tags: java
---

> 三月桃花，两人一马，明日天涯。——七堇年

分享一个`PDF`框架：https://gitee.com/dromara/x-easypdf

**一个用搭积木的方式构建pdf的框架（基于pdfbox）**

官方文档：https://dromara.gitee.io/x-easypdf/#/

`API`文档：https://apidoc.gitee.com/dromara/x-easypdf/

#### [项目概述](https://dromara.gitee.io/x-easypdf/#/README?id=项目概述)

> x-easypdf基于pdfbox二次封装，极大降低使用门槛，以组件化的形式进行pdf的构建。简单易用，帮助开发者快速生成pdf文档。

参考示例：https://dromara.gitee.io/x-easypdf/#/md/%E5%8F%82%E8%80%83%E7%A4%BA%E4%BE%8B

> ##### [创建文档](https://dromara.gitee.io/x-easypdf/#/md/参考示例?id=创建文档)

```java
// 定义文档路径
String filePath = OUTPUT_PATH + "testBuild.pdf";
// 构建文档
XEasyPdfHandler.Document.build(
        // 构建空白页
        XEasyPdfHandler.Page.build()
        //保存并关闭文档
).save(filePath).close();Copy to clipboardErrorCopied
```

------

> ##### [读取文档](https://dromara.gitee.io/x-easypdf/#/md/参考示例?id=读取文档)

```java
// 定义源文件路径
String sourcePath = OUTPUT_PATH + "testBuild.pdf";
// 读取文档
XEasyPdfDocument document = XEasyPdfHandler.Document.load(sourcePath);
// 获取文档总页数
int totalPage = document.getTotalPage();
// 打印文档总页数
System.out.println("totalPage = " + totalPage);
// 关闭文档
document.close();
```