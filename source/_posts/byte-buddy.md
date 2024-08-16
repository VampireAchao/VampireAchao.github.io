---
title: byte-buddy
date: 2023-01-09 20:10:06
tags: java
---

> 与有肝胆人共事，从无字句处读书。——周恩来

分享一个字节码框架，能在`jvm`运行时动态加载`Class`、修改`Class`

官方文档：https://bytebuddy.net/#/

![image-20230109202133106](/imgs/oss/blog/vampireachao/image-20230109202133106.png)

github：https://github.com/raphw/byte-buddy.git

引入：

```xml
<dependency>
  <groupId>net.bytebuddy</groupId>
  <artifactId>byte-buddy</artifactId>
  <version>1.12.21</version>
</dependency>
```

一个简单的`Hello World`：

```java
Class<?> dynamicType = new ByteBuddy()
  .subclass(Object.class)
  .method(ElementMatchers.named("toString"))
  .intercept(FixedValue.value("Hello World!"))
  .make()
  .load(getClass().getClassLoader())
  .getLoaded();
 
assertThat(dynamicType.newInstance().toString(), is("Hello World!"));
```

非常的好用