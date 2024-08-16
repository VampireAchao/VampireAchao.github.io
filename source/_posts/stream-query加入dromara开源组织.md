---
title: stream-query加入dromara开源组织
date: 2023-04-03 22:44:15
tags: java
---

> 宁可理解少些，胜于误解许多。——法郎士

## Stream-Query简介

![logo](https://plus.hutool.cn/images/dromara/stream-query.png)

`Stream-Query`允许完全摆脱`Mapper`的`Mybatis-Plus`体验！可以使用类似“工具类”这样的静态函数进行数据库操作

## Stream-Query诞生背景

自从用了`Mybatis-Plus`后，谓爱不释手，捧读其源码，贡献其代码...慢慢地，我不仅是`Hutool`的`Commiter`，也成为了`Mybatis-Plus`的`Commiter`

于是我产生了一个思考，能不能让`Hutool`的静态工具类概念，用在`Mybatis-Plus`中呢？

这样我就可以不需要每张表都使用代码生成器去生成继承了`ServiceImpl`的`Service`

而是针对某一域的业务去新建`Service`，避免很多可以省略掉的`Service`类(比如除了主键外只包含`user_id`、`role_id`这两个字段的关联表)

然后我就编写了`Db`类，放到了`Mybatis-Plus`的`3.5.3`版本中：

但我还不满足，此时我仍然需要编写一个`UserRoleMapper`，用于`Mybatis-Plus`去动态代理

那么我就又研究了下源码，发现了一种实现动态`Mapper`的方法，那就是使用`Byte-Buddy`，让其在`JVM`运行时动态生成`Mapper`，然后再交给`Mybatis-Plus`去代理

最终，我实现了！再加上之前对于`Stream`的封装，我将其命名为`Stream-Query`，在一段时间的沉淀和积累后，项目成功加入了`Dromara`开源组织

期间`Stream-Query`的`Commiter`臧臧也提供了诸多帮助，例如编写文档、录制`b`站相关教学视频等，如今臧臧也成功加入了`Dromara`开源组织的一份子

##  Stream-Query使用方式

安装——引入依赖：

```xml
<dependency>
    <groupId>org.dromara</groupId>
   <artifactId>stream-plugin-mybatis-plus</artifactId>
   <version>1.4.4</version>
</dependency>
```

在启动类加上注解`@EnableMybatisPlusPlugin`

接下来只需要配置需要生成动态`Mapper`的实体类

```java
    @Bean
    public DynamicMapperHandler dynamicMapperHandler(SqlSessionFactory sqlSessionFactory) throws Exception {
        // 扫描po包下的所有类，作为entity
        String entityPackagePath = "org.dromara.streamquery.stream.plugin.mybatisplus.pojo.po";
        // 这里传入的 entityClassList 即是数据库对应实体类的集合，你可以使用任何你能想到的方式传入，例如Lists.of(UserInfo.class)或者将包路径改为配置文件
        final List<Class<?>> entityClassList = ClassHelper.scanClasses(entityPackagePath);
        return new DynamicMapperHandler(sqlSessionFactory, entityClassList);
    }
```

然后就可以使用啦：

```java
// 查询集合
List<UserInfo> list = Database.list(Wrappers.lambdaQuery(UserInfo.class));
// 批量更新
boolean isSuccess = Database.updateBatchById(list);
```

如果已有对应实体类的`Mapper`类，则使用`Database`进行数据库操作时，获取到的`Mapper`会是自己定义的`Mapper`

对于一些连表查询，还提供了针对列表查询后使用`Stream`进行内存中数据处理的封装：

```java
// 返回map key为id，value为entity对象，如果in函数中的userIds为空，则不会进行查询
Map<Long, UserInfo> idUserMap = OneToOne.of(UserInfo::getId).in(userIds).query();

// 返回map key为id，value为查询到entity的name，且只会查询id和name字段
Map<Long, String> userIdNameMap = OneToOne.of(UserInfo::getId).in(userIds)
    .value(UserInfo::getName).query();

// 返回key为id，value为判断条件(userInfo的name是否不为null，并且包含a字符串)的map
// eq/in函数如果省略的话，则查询全表并按key转换为map，可以通过下面的condition函数限制查询条件
Map<Long, String> userIdHasANameMap = OneToOne.of(UserInfo::getId)
    .condition(w -> w.select(UserInfo::getId, UserInfo::getName))
    .value(userInfo -> userInfo.getName() != null &&
           userInfo.getName().contains("a"))
    .query();
```

除了`OneToOne`，`Stream-Query`还提供了`OneToMany`

```java
// 返回map key为age,value中list的包装对象为entity对象(在进行peek等操作，且大数据量情况下的时候可以考虑并行)
Map<Integer, List<UserInfo>> ageUsersMap = OneToMany.of(UserInfo::getAge)
    .in(userAges).peek(user -> userIds.add(user.getId())).parallel().query();
```

还有诸多特性，可以去官方文档查阅：

官方文档：https://stream-query.dromara.org/

官方文档（国内访问快）：https://dromara.gitee.io/stream-query/

## 阿超有话说

自从投身了开源，体会到了开源的快乐：技术提升了、朋友变多了、生活越好了、头发也少了

我想将这份喜悦分享给大家，也许能感染更多的人一起做开源(当然，希望大家头发能健在)

贡献开源有很多方式，无论是代码pr贡献、一个star、一次分享布道都是一种参与开源的方式

最后，我这个不成熟的`00`后希望大家能给这个不是特别成熟的项目点个`star`，让我们一起见证它能越走越远：

项目仓库地址：https://gitee.com/dromara/stream-query

