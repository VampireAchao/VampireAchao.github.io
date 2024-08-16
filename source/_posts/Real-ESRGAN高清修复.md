---
title: Real-ESRGAN高清修复
date: 2023-05-05 21:04:48
tags: 软件及插件
---

> 处事，须留余地。——弘一大师

分享一个给图片、视频进行`AI`高清修复的项目：

https://github.com/xinntao/Real-ESRGAN/blob/master/README_CN.md

点击下载`windows`版：

![image-20230505210545236](/imgs/oss/blog/vampireachao/image-20230505210545236.png)

解压缩后，执行命令：

```shell
./realesrgan-ncnn-vulkan.exe -i 输入图像.jpg -o 输出图像.png -n 模型名字
```

例如原来

![image-20230505211107109](/imgs/oss/blog/vampireachao/image-20230505211107109.png)

执行后

![image-20230505211136467](/imgs/oss/blog/vampireachao/image-20230505211136467.png)