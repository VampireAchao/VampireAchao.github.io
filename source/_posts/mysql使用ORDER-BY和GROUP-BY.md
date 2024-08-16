---
title: mysql使用ORDER BY和GROUP BY
date: 2020-07-20 19:48:33
tags: java
---

今天写代码时遇到一个需求是这样的：

取表内最新的一条数据，根据用户名分组

本来以为又是那种<img src="/imgs/oss/picGo/image-20200720195225456.png" alt="image-20200720195225456" style="zoom: 50%;" />需求，然后就开始写<code>sql</code>，写完一运行，报错。。。

然后发现<code>GROUP BY</code>必须放在<code>ORDER BY</code>的前面

但这样又会导致不能取最新的一条数据

于是用了一个“子查询”的办法解决<img src="/imgs/oss/picGo/image-20200720195922053.png" alt="image-20200720195922053" style="zoom: 50%;" />

```xml
  <select id="cowBeer" resultType="map" parameterType="map">
        SELECT
       [字段]
        FROM (
        SELECT DISTINCT 
      	[字段]
        FROM [表名] AS msg,
        [表名] AS user
        WHERE [条件]
        ORDER BY [创建时间字段] DESC
        ) r
        GROUP BY r.[分组条件]
        ORDER BY r.[创建时间字段] DESC
    </select>
```

