---
title: chrome复制、导出请求
date: 2022-06-26 16:06:07
tags: 小技巧
---

> 一个人的行动，比他所说的话，更有详细的表现。——卡耐基

可以通过右键点击我们的请求，进行重放，这样就能发起相同的请求

![image-20220626161043618](/imgs/oss/picGo/image-20220626161043618.png)

也可以复制出来，例如以`fetch`格式复制

![image-20220626161224653](/imgs/oss/picGo/image-20220626161224653.png)

复制出来后，粘贴是这个样子：

```javascript
fetch("https://api.bilibili.com/x/space/acc/info?mid=34830549&jsonp=jsonp", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"102\", \"Google Chrome\";v=\"102\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site"
  },
  "referrer": "https://space.bilibili.com/34830549?spm_id_from=333.1007.0.0",
  "referrerPolicy": "no-referrer-when-downgrade",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
});
```

我们可以发送给别人，让别人粘贴在浏览器的控制台进行执行

![image-20220626161411632](/imgs/oss/picGo/image-20220626161411632.png)

粘贴完了还可以对参数进行修改再提交

我们还可以以`cURL(bash)`格式复制

![image-20220626161824144](/imgs/oss/picGo/image-20220626161824144.png)

然后点击`postman`的`imoprt`

![image-20220626161941485](/imgs/oss/picGo/image-20220626161941485.png)

选择`Raw Text`粘贴进去

![image-20220626162027152](/imgs/oss/picGo/image-20220626162027152.png)

可以看到轻松导入

![image-20220626162102722](/imgs/oss/picGo/image-20220626162102722.png)