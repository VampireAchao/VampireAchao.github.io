---
title: bean-searcher
date: 2022-05-07 12:46:11
tags: java
---

> 等到看你银色满际，等到分不清季节更替，才敢说沉溺。——《水星记》

分享一个只读`ORM`框架`bean-searcher`

官方文档：https://bs.zhxu.cn/

介绍：

https://bs.zhxu.cn/guide/latest/introduction.html

例如以下代码：

```java
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private MapSearcher mapSearcher;              // 注入 BeanSearcher 的检索器

    @GetMapping("/index")
    public SearchResult<Map<String, Object>> index(HttpServletRequest request) {
        // 一行代码，实现一个用户检索接口（MapUtils.flat 只是收集前端的请求参数）
        return mapSearcher.search(User.class, MapUtils.flat(request.getParameterMap()));
    }

}
```

只需要前端传入参数即可对应检索，例如这样的格式：

```http
GET /user/index? age=20 & age-op=ne
```



