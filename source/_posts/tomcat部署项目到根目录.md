---
title: tomcat部署项目到根目录
date: 2020-06-09 21:26:49
tags: 运维
---

在tomcat的conf目录下的server.xml

```xml
<Context path="/" docBase="路径" debug="true" reloadable="false"></Context>
```

哦对了，是放在Host标签里