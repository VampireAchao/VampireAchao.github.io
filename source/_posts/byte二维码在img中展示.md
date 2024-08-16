---
title: byte二维码在img中展示
date: 2022-01-07 18:01:56
tags: 前端
---

> 睡在哪里都是睡在黑夜里。——贾平凹《废都》

我们使用`hutool`的工具类生成二维码图片后，如果转为`byte`数组，返还给前端，我们要放入`img`中显示

```java
    @GetMapping("generateCode")
    @ResponseBody
    public byte[] generateCode() {
        return QrCodeUtil.generatePng("https://VampireAchao.github.io/", QrConfig.create().setImg(ImgUtil.getImage(URLUtil.url("/imgs/oss/2020-06-01/head.jpg"))));
    }
```

直接放到`src`是不行的，需要在前面加一个`data:image/jpeg;base64,`

![image-20220107180540893](/imgs/oss/picGo/image-20220107180540893.png)

最终变成这样

![image-20220107180613917](/imgs/oss/picGo/image-20220107180613917.png)

效果图：

![image-20220107180624724](/imgs/oss/picGo/image-20220107180624724.png)
