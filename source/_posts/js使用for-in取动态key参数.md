---
title: js使用for in取动态key参数
date: 2020-08-19 20:13:13
tags: 前端
---

> It's a nice day for coding,isn't it?Ha ha!

今天遇到一种服务端响应的参数，`key`是动态的

就像这样

![image-20200819205140028](/imgs/oss/picGo/image-20200819205140028.png)

我们一般静态`key`取值就是直接

```javascript
data.data.id.username
```

但这种`id`是动态的

我们就只能用`for in`的方式取值了

```javascript
var data = { "msg": "查询成功！", "code": 200, "data": { "2f793b1baf4b441c99a12d22af6678aa": { "username": "ruben2", "password": null, "userInfo": null, "genderEnum": null }, "59fa61fe88b64df58568a7046f17ab38": { "username": "ruben0", "password": null, "userInfo": null, "genderEnum": null }, "6996ac2dfefa42548111224e344052d6": { "username": "ruben1", "password": null, "userInfo": null, "genderEnum": null } }, "success": true };
        console.log(data);
        for (const user in data.data) {
            if (data.data.hasOwnProperty(user)) {
                const element = data.data[user];
                console.log(element.username);
            }
        }
```

输出结果

![](/imgs/oss/picGo/image-20200819205352737.png)