---
title: mybatis-plus允许自定义handlerType的set
date: 2021-12-26 20:21:43
tags: java
---

> 与有肝胆人共事，从无字句处读书。——周恩来

今天看`mybatis-plus`源码发现了`UpdateWrapper`中的`set`竟然有一两个重载没有在官方文档写到：

![image-20211226202811765](/imgs/oss/picGo/image-20211226202811765.png)

一看官方示例，发现它可以临时自定义`typeHandler`，也就是类型处理器，以及属性所在的`java`类型和数据库中字段的数据类型(`jdbcType`)

例如官方示例传入的：

![image-20211226203053086](/imgs/oss/picGo/image-20211226203053086.png)

我们也可以像方法注释那样传入`javaType`和`jdbcType`

```java
		// wrapper typeHandler 测试
        LambdaUpdateWrapper<User> wrapper = Wrappers.<User>lambdaUpdate().set(User::getWallets, Arrays.asList(new Wallet("Tom",
                Arrays.asList(new Currency("RMB", 1000d)))), "javaType=java.util.List,jdbcType=VARCHAR,typeHandler=com.baomidou.mybatisplus.samples.typehandler.WalletListTypeHandler");
        wrapper.eq(User::getId, 2L);
        Assertions.assertEquals(userMapper.update(new User().setAge(99), wrapper), 1);
```

可以看到是成功运行

![image-20211226203650425](/imgs/oss/picGo/image-20211226203650425.png)