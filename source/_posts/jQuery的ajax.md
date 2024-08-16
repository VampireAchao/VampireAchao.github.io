---
title: jQuery的ajax
date: 2020-06-30 23:04:11
tags: 前端
---

今天公司实习生问我jQuery的ajax怎么写，这玩意不是很简单吗

```javascript
$.ajax({
            url: "/cowBeer",			//url
            method: "post",					//请求方式
            contentType: "application/json",		//参数类型
            data: JSON.stringify({				//这里面是参数
                "name":"cowBeer"
            }),
            success: function (res) {
                console.log(res);			//处理返回的数据
            },
            error: function (res) {			//错误处理
                
            }
```

