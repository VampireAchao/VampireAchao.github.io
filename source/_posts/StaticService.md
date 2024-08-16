---
title: StaticService
date: 2022-05-03 11:33:53
tags: java
---

> 懒惰受到的惩罚不仅仅是自己的失败，还有别人的成功。——米尔•勒纳尔

今天又给`MP`提交了一个`PR`

https://gitee.com/baomidou/mybatis-plus/pulls/223

是用于

在使用mybatis-plus进行开发中，我不禁产生一个疑问，为什么？每次使用我将会产生这些代码：

```java
private UserInfoService userInfoService;
private UserDepartmentService userDepartmentService;
private UserPositionService userPositionService;
private UserOrderService userOrderService;
```

我告诉自己，这是为了引用`SpringBean`，让其保持单例运行，但貌似这些`Service`，大多都是空实现，这是`mybatis-plus`开发者们共同的努力，让我能不用写这些`CRUD`的代码，但仍然每次需要去新建一个`XXXService`实现`IService`，然后再写一个实现类`XXXServiceImpl`继承`ServiceImpl<XXXMapper,XXX>`

我逐渐接受这种方式，比起自己实现，有了`mybatis-plus`，能让我进行单表的几乎所有操作，只需要每加一张表，用代码生成器生成`Entity`、`Mapper`、`Service`、`ServiceImpl`即可，两年里，我一直如此使用

直到近期，我发现也许`Service`和`ServiceImpl`所代表的业务层，要么是无函数，要么是有大量构建参数条件的函数(这些也许应该放到`Mapper`层，只是因为需要批量操作等，不得不放到`Service`)，并且这么多无函数的`Service`，让项目整体看起来很臃肿

因此我通过研读`Mybatis-plus`源码，发现也许并不需要一个实体一个`Service`(就像一些很小的关联表)，写下了这个类

`com.baomidou.mybatisplus.extension.toolkit.StaticService`

 **它能做什么？** 

可以通过静态方式调用对应`Service`操作，就像这样：
```java
        Entity entity = new Entity();
        entity.setName("ruben");
        StaticService.save(entity);
```
并且你不需要对应的`Service`接口以及其实现

![输入图片说明](/imgs/oss/picGo/112220_88832d5b_7413431.png "屏幕截图.png")

它几乎包含了`IService`中所有方法(除了ktolin，这块暂时还未写)

并对应涵盖了测试用例

`com.baomidou.mybatisplus.test.toolkit.StaticServiceTest`

![输入图片说明](/imgs/oss/picGo/112535_8522d6b2_7413431.png "屏幕截图.png")
