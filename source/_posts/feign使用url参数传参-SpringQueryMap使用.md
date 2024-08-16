---
title: feign使用url参数传参@SpringQueryMap使用
date: 2023-11-25 10:33:23
tags: java
---

> 与人沟通，最重要的事情是听取没有说出来的话。——德拉克

今天使用`open-feign`发起请求时发现个问题，我特别喜欢的`url`参数传参不好使了：

```java
@FeignClient("another-service")
public interface MyFeignClient {
    @GetMapping("/foo/bar")
    Foo<Bar> get(Foo bar);
}
```

对应我们的`controller`

```java
@GetMapping("foo/bar")
public Foo<Bar> get(Foo bar) {
    // ...
    return foo;
}
```

然后发起了请求发现根本没收到参数。。。

但如果我们添加了注解`@RequestParam`

```java
@FeignClient("another-service")
public interface MyFeignClient {
    @GetMapping("/foo/bar")
    Foo<Bar> get(@RequestParam Foo bar);
}
```

会发现项目启动抛出异常

```bash
Caused by: java.lang.IllegalStateException: RequestParam.value() was empty on parameter 0
```

说是没添加参数名，好我们添加一下

```java
@FeignClient("another-service")
public interface MyFeignClient {
    @GetMapping("/foo/bar")
    Foo<Bar> get(@RequestParam("bar") Foo bar);
}
```

但还是不对，我们打开日志：

```bash
2023-11-25T11:25:16.502+08:00 TRACE [user-service,,,] 2558612 --- [           main] s.n.www.protocol.http.HttpURLConnection  : ProxySelector Request for http://127.0.0.1:8000/front/squarePost/foo/bar?bar=Foo%28bar%3Dbar%29
```

可以看到我们的参数变成了：

```http
http://127.0.0.1:8000/foo/bar?bar=Foo%28bar%3Dbar%29
```

我们用浏览器转一下码

```javascript
decodeURIComponent("http://127.0.0.1:8000/foo/bar?bar=Foo%28bar%3Dbar%29")
```

得到：

![](/imgs/oss/blog-img/2023-11-25-11-34-32-image.png)

原来是直接给我`toString`了，并且把整个对象当作参数传递过去了，我们此处使用`@SpringQueryMap`注解解决

```java
@FeignClient("another-service")
public interface MyFeignClient {
    @GetMapping("/foo/bar")
    Foo<Bar> get(@SpringQueryMap Foo bar);
}
```

这下就对了：

```bash
2023-11-25T11:25:16.502+08:00 TRACE [user-service,,,] 2558612 --- [           main] s.n.www.protocol.http.HttpURLConnection  : ProxySelector Request for http://127.0.0.1:8000/front/squarePost/foo/bar?bar=bar
```
