---
title: bean-searcher支持DbType为UNKNOWN的使用Converter
date: 2023-02-17 22:51:08
tags: java
---

> 人固有一死，或重于泰山，或轻于鸿毛——司马迁

今天使用`bean-searcher`时发现，前端传入的查询条件是枚举的`name`

但数据库里存储的是`tinyint`类型，所以默认情况下没有查询到

于是我研究了下`bean-searcher`源码，对其源码进行了修改，提交了`pr`

https://gitee.com/troyzhxu/bean-searcher/pulls/3

主要是修改了此处对于`UNKNOWN`的判断，并且修改了`Convertor`接口的入参，直接传入`FieldMeta`字段信息

![image-20230217225456731](/imgs/oss/blog/vampireachao/image-20230217225456731.png)

![image-20230217225725441](/imgs/oss/blog/vampireachao/image-20230217225725441.png)

然后改了影响到的单元测试

这个`Convertor`用起来也很简单，注入到`spring`中，重写一下`supports`和`convert`方法即可