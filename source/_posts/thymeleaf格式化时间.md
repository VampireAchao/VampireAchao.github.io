---
title: thymeleaf格式化时间
date: 2021-05-29 23:42:42
tags: java
---

> 牙齿痛的人，想世界上有一种人最快乐，那就是牙齿不痛的人。——萧伯纳

将返回的日期类型在页面上显示为指定的格式

首先是格式化`Date`类型

```html
<span th:text="${#dates.format(data.gmtCreate,'yyyy-MM-dd HH:mm:ss')}"></span>
```

然后是`LocalDateTime`等`Temporal`类

```html
<span th:text="${#temporals.format(data.gmtCreate,'yyyy-MM-dd HH:mm:ss')}"></span>
```

