---
title: '服务器新jdk报错Assistive Technology not found: org.GNOME.Accessibility.AtkWrapper'
date: 2022-09-23 17:20:40
tags: 运维
---

> 寒暄是人际关系的润滑剂——大卫·汉生

打开

```bash
/etc/java-8-openjdk/accessibility.properties
```

注释第一行配置：

![image-20220923172232288](/imgs/oss/picGo/image-20220923172232288.png)



![image-20220923172255582](/imgs/oss/picGo/image-20220923172255582.png)

即可