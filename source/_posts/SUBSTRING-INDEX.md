---
title: SUBSTRING_INDEX
date: 2023-04-27 22:08:27
tags: 数据库
---

> 天下兴亡，匹夫有责——顾炎武

分享一个函数` SUBSTRING_INDEX`

```mysql
 SUBSTRING_INDEX( your_column , char, 1 )
```

可以像`split`一样截取片段

例如

```mysql
 SUBSTRING_INDEX( '1.00' ,'.',1 )
```

得到`1`

例如

```mysql
 SUBSTRING_INDEX( '1.00' ,'.',-1 )
```

得到`00`

