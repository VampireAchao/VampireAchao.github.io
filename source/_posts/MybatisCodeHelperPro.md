---
title: MybatisCodeHelperPro
date: 2020-11-02 20:13:55
tags: 软件及插件
---

> 取之有制，用之有节则裕；取之无制，用之不节则乏。——张居正《论时政疏》

安装插件,[官网](https://github.com/gejun123456/MyBatisCodeHelper-Pro)

![image-20201102201801950](/imgs/oss/picGo/image-20201102201801950.png)

然后重启`idea`

![image-20201102202015099](/imgs/oss/picGo/image-20201102202015099.png)

来到我们的`xml`

![image-20201102202300554](/imgs/oss/picGo/image-20201102202300554.png)

点击箭头，点击`Test current xml tag`

这个时候发现需要激活

![image-20201102202504251](/imgs/oss/picGo/image-20201102202504251.png)

我们点击试用就行了

然后回来再次点击发现直接帮我们生成了`sql`

![image-20201102210431304](/imgs/oss/picGo/image-20201102210431304.png)

还有很多功能

```
通过方法名(不需要方法的返回值和参数 会自动推导出来)来生成sql 可以生成大部分单表操作的sql 只需要一个方法的名字即可 会自动补全好方法的参数和返回值 和springdatajpa的语句基本一致
xml sql几乎所有地方都有自动提示，sql正确性检测，插件会识别mybatis的一系列标签 如 include trim set where，在这些标签之后的sql可以自动提示数据库的字段，检测sql的正确性，从此不用担心sql写错
直接从Intellij自带的数据库或者配置一个数据库生成crud代码 自动检测好 useGeneratedkey 自动配置好模块的文件夹 只用添加包名就可以生成代码了
从java类生成建表语句
数据库添加字段后可以继续生成，不会修改之前已经在接口或xml添加的自定义的方法 无需再去进行手动的添加
mybatis接口和xml的互相跳转 支持一个mybatis接口对应多个xml
mybatis接口中的方法名重构支持
xml中的 param的自动提示 if test的自动提示 resultMap refid 等的自动提示
resultMap中的property的自动提示
xml中refid，resultMap等的跳转到定义
检测没有使用的xml 可一键删除
检测mybatis接口中方法是否有实现，没有则报红 可创建一个空的xml
检测resultmap的property是否有误
param检测 检测#{ 中的内容是否有误
ognl 支持 if test when test foreach bind中的自动补全，跳转和检测
mybatis接口中一键添加param注解
mybatis接口一键生成xml
完整的typeAlias支持
支持spring 将mapper注入到spring中 intellij的spring注入不再报错 支持springboot
一键生成mybatis接口的testcase 无需启动spring，复杂sql可进行快速测试
一键生成关联的join
一键从sql语句中 导出resultMap
```

