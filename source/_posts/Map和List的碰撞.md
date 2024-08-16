---
title: Map和List的碰撞
date: 2020-06-13 22:10:01
tags: java
---

大家都知道map和list是我们常用的数据结构

比如hashmap和arraylist

在实际开发中，有时会遇到一个问题，比如加了个需求，原来的数据库字段不够用，需要加字段，这样会导致很多处做修改，而我们如果灵活使用map和list就可以一个用字段以json的格式存放很多数据，但这种形式也有弊端，比如难以维护、难以拓展，所以一般情况下，能加字段，加表的话就先别用这种形式

但如果遇到不能动数据库的情况，就可以以这种方式（你甚至可以以这种方式把整个项目存放到一条数据里）:joy:废话不多说：

```java
package com.ruben;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * @ClassName: JsonTestController
 * @Description:
 * @Date: 2020/6/12 14:51
 * *
 * @author: achao<achao1441470436 @ gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
@RestController
@RequestMapping("json")
public class JsonTestController {
    @PostMapping
    public String jsonTest(@RequestBody Map<String, List<Map<String, Object>>> mapListMap) {
        List<Map<String, Object>> list = mapListMap.get("1234567");
        list.forEach(map -> {
            String beforeUpdate = (String) map.get("zipName");
            System.out.println(beforeUpdate);
            map.put("zipName", "修改后的名字");
            System.out.println((String) map.get("zipName"));
        });
        return "成功！";
    }
}
```

请求的数据格式

```json
{
    "123456": [
        {
            "videoId": "ads",
            "zipUrl": "adsdas",
            "zipName": "asdaw"
        }
    ],
    "1234567": [
        {
            "videoId": "ads",
            "zipUrl": "adsdas",
            "zipName": "修改前的名字"
        },
        {
            "videoId": "ads",
            "zipUrl": "adsdas",
            "zipName": "修改前的名字2"
        }
    ]
}
```

输出结果

```java
修改前的名字
修改后的名字
修改前的名字2
修改后的名字
```

如果要对单个执行具体修改，就可以在forEach里把它们放入另一个list<Map<String,Object>>里

感觉有点像套娃:baby: