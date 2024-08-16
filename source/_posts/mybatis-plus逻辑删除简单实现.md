---
title: mybatis-plus逻辑删除简单实现
date: 2021-04-03 18:52:08
tags: java
---

> 1

> 人生不是一支短短的烛炬，而是一只由我们暂时拿着的火把；我们一要把它燃得十分光明辉煌，然后交给下一代的人们。——（英）萧伯纳

`mybatis-plus`配置逻辑删除

我们可以在配置文件中配置

```yaml
mybatis-plus:
  global-config:
    db-config:
      logic-delete-value: 1 # 逻辑已删除值(默认为 1)
      logic-not-delete-value: 0 # 逻辑未删除值(默认为 0)
```

然后在`pojo`的删除字段属性加一个`@TableLogic`注解

![image-20210403144037029](/imgs/oss/picGo/image-20210403144037029.png)

然后我们启动测试类

```java
    @Test
    public void deleteTest() {
        List<Film> films = filmMapper.selectList(Wrappers.lambdaQuery(Film.builder().build()).last("LIMIT 1"));
        films.stream().findFirst().map(Film::getFilmId).ifPresent(filmMapper::deleteById);
    }
```

可以看到我们的删除方法打印的`SQL`日志

![image-20210403182626684](/imgs/oss/picGo/image-20210403182626684.png)

此时，我们的删除已经变成逻辑删除了

这里我们的表字段如下

![image-20210403182912844](/imgs/oss/picGo/image-20210403182912844.png)