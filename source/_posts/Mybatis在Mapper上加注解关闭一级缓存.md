---
title: Mybatis在Mapper上加注解关闭一级缓存
date: 2024-07-11 23:12:37
tags: java
---

> 正如自然忌讳真空一样，人类是讨厌平等的。——《我是猫》

MyBatis的一级缓存是SqlSession级别的缓存，默认是开启的。如果你想在查询时禁用一级缓存，可以使用`@Options`注解并将`flushCache`属性设置为`true`：

```java
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MyMapper {

    @Select("SELECT * FROM my_table WHERE id = #{id}")
    @Options(flushCache = Options.FlushCachePolicy.TRUE)
    MyEntity selectById(int id);

}
```

这样每次执行查询时，都会刷新缓存。
