---
title: Mybatis在Mapper上加注解关闭二级缓存
date: 2024-07-10 21:05:52
tags: java
---

> 久视伤血，久卧伤气，久坐伤肉，久立伤骨，久行伤筋。——曹廷栋

代码如下

```java
import org.apache.ibatis.annotations.CacheNamespace;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.cache.impl.PerpetualCache;

@Mapper
@CacheNamespace(implementation = PerpetualCache.class, blocking = false)
public interface MyMapper {

    @Select("SELECT * FROM my_table WHERE id = #{id}")
    MyEntity selectById(int id);

}
```

上使用`@CacheNamespace`注解，并将`implementation`设置为`org.apache.ibatis.cache.impl.PerpetualCache.class`，`blocking`设置为`false`即可禁用二级缓存
