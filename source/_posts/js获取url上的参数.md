---
title: js获取url上的参数
date: 2020-09-02 20:23:22
tags: 前端
---

获取`url`上的参数

```javascript
       function getUrlParam(name) {
            if (name == null) {
                return name;
            }
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                //return unescape(r[2]);
                return r[2];
            }
            return null;
        }
```

![image-20200902203005919](/imgs/oss/picGo/image-20200902203005919.png)

```javascript
		console.log(getUrlParam("id"));
```

![image-20200902203057830](/imgs/oss/picGo/image-20200902203057830.png)