---
title: java图片切片
date: 2023-06-03 19:42:41
tags: java
---

> 女人绝不会被奉承解除武装，而男人大都会陷落。——王尔德

可以使用`hutool`的`ImgUtil.slice`

```java
ImgUtil.slice(FileUtil.file("d:/test/logo.jpg"), FileUtil.file("d:/test/dest"), 200, 150);
```

```java
	 /**
	 * 图像切片（指定切片的宽度和高度）
	 *
	 * @param srcImageFile 源图像
	 * @param descDir      切片目标文件夹
	 * @param destWidth    目标切片宽度。默认200
	 * @param destHeight   目标切片高度。默认150
	 */
	public static void slice(final File srcImageFile, final File descDir, final int destWidth, final int destHeight)
```

而且除了指定宽度和高度的，还可以使用：

```java
	/**
	 * 图像切割（指定切片的行数和列数）
	 *
	 * @param srcImageFile 源图像文件
	 * @param destDir      切片目标文件夹
	 * @param formatName   格式名称，即图片格式后缀
	 * @param rows         目标切片行数。默认2，必须是范围 [1, 20] 之内
	 * @param cols         目标切片列数。默认2，必须是范围 [1, 20] 之内
	 */
	public static void sliceByRowsAndCols(final File srcImageFile, final File destDir, final String formatName, final int rows, final int cols)
```

来指定切分的行数和列数

```java
ImgUtil.sliceByRowsAndCols(FileUtil.file("d:/test/logo.jpg"), FileUtil.file("d:/test/dest"), ImgUtil.IMAGE_TYPE_JPEG, 1, 5);
```

非常方便