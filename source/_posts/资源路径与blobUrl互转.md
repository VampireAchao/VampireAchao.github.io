---
title: 资源路径与blobUrl互转
date: 2022-08-31 21:46:49
tags: 前端
---

> 害怕树敌的人永远得不到真正的朋友——哈兹里特

首先是普通资源`URL`转换为`blobUrl`

```javascript
        // 生成blobURL
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://VampireAchao.github.io/imgs/preview/3356_3.jpg', true);
        xhr.responseType = 'blob';
        xhr.onload = function (e) {
            if (this.status == 200) {
                var blob = this.response;
                console.log(blob);
                // document.getElementById("myImg").src = URL.createObjectURL(blob);
                console.log(URL.createObjectURL(blob))
            }
        };
        xhr.send();
```

这边执行后，打印出了结果

![image-20220831214915939](/imgs/oss/blog/image-20220831214915939.png)

尝试新标签打开，`404`

![image-20220831214939747](/imgs/oss/blog/image-20220831214939747.png)

但是我们直接替换`img src`，成功渲染

![image-20220831215021043](/imgs/oss/blog/image-20220831215021043.png)

如果一开始将图片格式转为`webp`，能阻挡大部分爬虫了

那么如果遇到`blob:`开头的`blobUrl`，怎么下载呢？.

用下面的`js`

```javascript
        // 下载blob
        const filename = '3356_3.jpg'
        const blobUrlString = 'blob:https://VampireAchao.github.io/a4adbbc7-8375-424b-b9c3-0d1ec54b7ced'
        fetch(blobUrlString)
            .then((response) => response.blob())
            .then((blob) => {
                let aLink = document.createElement('a')
                let evt = document.createEvent('HTMLEvents')
                evt.initEvent('click', true, true)
                aLink.download = filename
                aLink.href = URL.createObjectURL(blob)
                aLink.click()
            })
```

成功下载

![image-20220831215733321](/imgs/oss/blog/image-20220831215733321.png)
