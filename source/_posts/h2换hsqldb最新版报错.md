---
title: h2换hsqldb最新版报错
date: 2023-02-12 22:19:10
tags: java
---

> 沉溺于追求物质享受，就等于给飞鸟的双翅系上了黄金——佚名

直接改依赖：

```xml
        <!--<dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <version>${h2.version}</version>
            <scope>test</scope>
        </dependency>-->
        <dependency>
            <groupId>org.hsqldb</groupId>
            <artifactId>hsqldb</artifactId>
            <version>2.7.1</version>
            <scope>test</scope>
        </dependency>
```

随便运行一个`test`报错：

![image-20230212222807012](/imgs/oss/blog/vampireachao/image-20230212222807012.png)

这里提到了关键字：`TestDatabaseAutoConfiguration`

我们进入`org.springframework.boot.test.autoconfigure.jdbc.TestDatabaseAutoConfiguration$EmbeddedDataSourceFactory.getEmbeddedDatabase(TestDatabaseAutoConfiguration.java:191)`

发现这里连接为空才会抛异常

![image-20230212223548155](/imgs/oss/blog/vampireachao/image-20230212223548155.png)

那我们`ctrl+f8`断点打在`if`这里，`shift+f9`来`debug`一下

发现进入了`EmbeddedDatabaseConnection.get`

![image-20230212223815174](/imgs/oss/blog/vampireachao/image-20230212223815174.png)

`F7`再回车，深入`get`方法，发现这里的逻辑是如果`driverClass`存在，则返回对应的连接枚举`EmbeddedDatabaseConnection`，我们等待`hsql`的`driverClass`驱动

![image-20230212224200317](/imgs/oss/blog/vampireachao/image-20230212224200317.png)

`f7`看下`ClassUtils.isPresent`，发现是`forName`

按下`f8`发现直接到抛出异常返回`false`了，此时我们丢帧

![image-20230212224412070](/imgs/oss/blog/vampireachao/image-20230212224412070.png)

回到了外面

![image-20230212224438056](/imgs/oss/blog/vampireachao/image-20230212224438056.png)

再按下`f7`进去，`ctrl+w`选中`forName`和参数，按下`alt+f8`，发现了真正的报错

![image-20230212224553965](/imgs/oss/blog/vampireachao/image-20230212224553965.png)

```shell
org/hsqldb/jdbc/JDBCDriver has been compiled by a more recent version of the Java Runtime (class file version 55.0), this version of the Java Runtime only recognizes class file versions up to 52.0
```

![image-20230212224610959](/imgs/oss/blog/vampireachao/image-20230212224610959.png)

大概意思就是说不支持当前`java`版本了

我们换个早一点的依赖试试：

```xml
        <dependency>
            <groupId>org.hsqldb</groupId>
            <artifactId>hsqldb</artifactId>
            <version>2.5.2</version>
            <scope>test</scope>
        </dependency>
```

成功运行下来

![image-20230212225254629](/imgs/oss/blog/vampireachao/image-20230212225254629.png)

之后的报错就很容易解决了，是原来`H2`的`ddl(Data Definition Language)`的`COMMENT`关键字不支持，我们用正则替换掉

`ctrl+r`打开替换框，`alt+x`打开正则模式，输入正则后，按下`alt+a`替换全部

```regex
// 以COMMENT开头，直到遇到","为止，我们这里替换为空即可
COMMENT[^,]+
COMMENT[^,]*
```

![image-20230212230052485](/imgs/oss/blog/vampireachao/image-20230212230052485.png)

我们再试试另一个正则

```regex
// 以[ COMMENT ' ]开头，以'结尾，我们这里替换为空即可
COMMENT '.*'
```

再次运行，发现不支持`NULL DEFAULT xxx`格式，替换掉`DEFAULT`前面的`NULL`

![image-20230212231509792](/imgs/oss/blog/vampireachao/image-20230212231509792.png)

再次运行，发现不支持无`SQL`不执行查询，而是会报错

![image-20230212231705849](/imgs/oss/blog/vampireachao/image-20230212231705849.png)

而且不支持`CASE field WHEN conditionValue THEN actualValue`的语法

![image-20230212232854860](/imgs/oss/blog/vampireachao/image-20230212232854860.png)

因此换回`H2`了，`ctrl`+`alt`+`z`，选择`pom.xml`，按下`alt+r`或者直接回车

![image-20230212232949229](/imgs/oss/blog/vampireachao/image-20230212232949229.png)

