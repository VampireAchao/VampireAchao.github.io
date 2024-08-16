---
title: minio预签名上传前端axios注意事项
date: 2023-11-10 08:36:50
tags: 前端
---

> 不论替人家做了多少好事，不论多么忠心耿耿，看起来，绝不能指望人家感谢你。——托尔斯泰

之前说过了[camel+minio实现预签名URL上传](https://VampireAchao.github.io/2023/10/06/camel+minio%E5%AE%9E%E7%8E%B0%E9%A2%84%E7%AD%BE%E5%90%8DURL%E4%B8%8A%E4%BC%A0/)

但当时提供的也是后端代码，现在需要前端`axios`的

`axios`文档：[Axios API | Axios Docs](https://axios-http.com/zh/docs/api_intro)

```javascript
        axios({
            method: 'PUT',
            url,
            headers: {
                "Content-Type": "application/octet-stream",
            },
            data: new Blob([file]),
            responseType: "blob"
        }).then((res) => {
            console.log({ res })
        })
        .catch(console.error)
```

这里的`file`就是前端的`File`对象，我们此处是将其转换为`Blob`，然后再通过`data`参数发送，这里`headers`也需要设置`Content-Type`为`application/octet-stream`

![](/imgs/oss/blog-img/2023-11-10-08-56-07-image.png)
