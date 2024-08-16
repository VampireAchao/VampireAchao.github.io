---
title: set-cookie
date: 2022-04-17 17:04:18
tags: java
---

> 我的肩上是风，风上是闪烁的星群。——北岛

我们可以在响应头中添加`set-cookie`的响应头来操作`cookie`

例如我此处：

```java
	@Resource
	private HttpServletResponse response;

	@GetMapping
	public Result testQueryParam(CommonDTO commonDTO) {
        response.setHeader("set-cookie", "cookie-name=cookie-value; Path=/; HttpOnly; Max-Age=5");
        return Result.ok()
    }
```

就设置了一个名为`cookie-name`，值为`cookie-value`，路径为`/`，仅限`http`请求，过期时间为`5`秒的`cookie`

完整的参数可以看`MDN`文档：

https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie

此处`cookie`的效果

![image-20220417170931661](/imgs/oss/picGo/image-20220417170931661.png)