---
title: image-comparison
date: 2022-03-02 19:41:26
tags: java
---

> 人活在世，不过一场美丽的寄居。——简嫃曾

我们可以使用`image-comparison`来在`java`中进行两个文件的对比：

项目地址：https://github.com/romankh3/image-comparison

![logo-trans](/imgs/oss/picGo/42029324-df117c42-7ad7-11e8-8d3e-9c6cd8822d6c.png)

它会自动生成对比后带红框的对比图，还能返回这些正方形的信息

首先引入`GAV`：

```xml
<dependency>
    <groupId>com.github.romankh3</groupId>
    <artifactId>image-comparison</artifactId>
    <version>4.4.0</version>
</dependency>
```

使用：

```java
   //load images to be compared:
        BufferedImage expectedImage = ImageComparisonUtil.readImageFromResources("expected.png");
        BufferedImage actualImage = ImageComparisonUtil.readImageFromResources("actual.png");

        //Create ImageComparison object and compare the images.
        ImageComparisonResult imageComparisonResult = new ImageComparison(expectedImage, actualImage).compareImages();
        
        //Check the result
        assertEquals(ImageComparisonState.MATCH, imageComparisonResult.getImageComparisonState());
```

这里是对比俩文件是否相同，在这个`imageComparisonResult`中还包含了其他的信息，这里就不一一列举了，可以在项目介绍中看到

如果我们要生成对比后的图，用下面的方式即可

```java
 //load images to be compared:
        BufferedImage expectedImage = ImageComparisonUtil.readImageFromResources("expected.png");
        BufferedImage actualImage = ImageComparisonUtil.readImageFromResources("actual.png");
        
        // where to save the result (leave null if you want to see the result in the UI)
        File resultDestination = new File( "result.png" );

        //Create ImageComparison object with result destination and compare the images.
        ImageComparisonResult imageComparisonResult = new ImageComparison(expectedImage, actualImage, resultDestination).compareImages();
```

`resultDestination`也可以传路径