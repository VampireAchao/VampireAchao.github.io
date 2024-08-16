---
title: 获取图片dpi
date: 2023-05-23 20:09:39
tags: java
---

> 在只能说谎与沉默两者来选择的时候，沉默也是好的。——何其芳

可以通过下面的代码获取：

```java
ImageInfo imageInfo = Imaging.getImageInfo(file);
imageInfo.getPhysicalWidthDpi();
imageInfo.getPhysicalHeightDpi();
```

对应的依赖：

```xml
        <dependency>
            <groupId>org.apache.commons</groupId>
            <artifactId>commons-imaging</artifactId>
            <version>1.0-alpha3</version>
        </dependency>
```

用的是`apache-commons`的`commons-imaging`这个库

https://commons.apache.org/proper/commons-imaging/index.html