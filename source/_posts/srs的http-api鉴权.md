---
title: srs的http api鉴权
date: 2023-10-14 08:57:18
tags: java
---

> 怒后不可便食，食后不可发怒。——梁章钜

文档

https://ossrs.net/lts/zh-cn/docs/v5/doc/http-api#authentication

```bash
# conf/http.api.auth.conf
http_api {
    enabled on;
    listen 1985;
    auth {
        enabled on;
        username admin;
        password admin;
    }
}
```

配置了之后如何访问？

```javascript
fetch("http://localhost:1985/api/v1/clients/", {
  "headers": {
      'Authorization': 'Basic ' + btoa(`admin` + ":" + `admin`),
    "accept": "*/*",
    "accept-language": "zh-CN,zh;q=0.9",
    "content-type": "text/html",
    "sec-ch-ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "omit"
});
```

bash：

```bash
curl 'http://localhost:1985/api/v1/clients/'   -H 'Authorization: Basic YWRtaW46YWRtaW4='
```
