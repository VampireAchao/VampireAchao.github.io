---
title: command too long
date: 2020-10-30 18:39:29
tags: java
---

> 成功与失败的分水岭，可以用这五个字来表达——我没有时间。
> ——（美）富兰克林费尔德

如果idea报`command too long`

这里有两种处理方式
第一种是在`.idea`->`workspace.xml`的`<component name="PropertiesComponent">`标签中添加`<property name="dynamic.classpath" value="true" />`

![image-20201031184515522](/imgs/oss/picGo/image-20201031184515522.png)

还有一种方式是在项目配置中选择`classpath`

![image-20201031184559962](/imgs/oss/picGo/image-20201031184559962.png)

