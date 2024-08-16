---
title: apache-shenyu处理修改了context-path后dashboard没有同步问题
date: 2024-03-21 20:56:18
tags: java
---

> 不及跬步，无以至千里，不积小流，无以成江海。——荀子

https://github.com/apache/shenyu/pull/5510

[[Fix] Resolve dashboard routing mismatch post context-path update by VampireAchao · Pull Request #428 · apache/shenyu-dashboard · GitHub](https://github.com/apache/shenyu-dashboard/pull/428)

主要是将`IndexController`中新增了一个路由`/`

```java
 @RequestMapping(value = {"/index", "/"})
```

然后在`shenyu-admin/src/main/java/org/apache/shenyu/admin/listener/ApplicationStartListener.java`

注入了

```java
 @Value("${server.servlet.context-path:}")
 private String contextPath;
```

并且拼接在后面

```java
ShenyuDomain.getInstance().setHttpPath("http://" + String.join(":", host, String.valueOf(port)) + contextPath);
```

再把`dashboard`的`.webpackrc.js`里`publicPath`改为相对路径即可

```javascript
 publicPath: ""
```
