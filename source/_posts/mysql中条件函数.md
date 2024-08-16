---
title: mysql中条件函数
date: 2021-02-25 20:43:59
tags: 数据库
---

> 世上有味之事，包括诗、酒、哲学、爱情，往往无用。吟无用之诗，醉无用之酒，读无用之书，钟无用之情，终于成一无用之人，却因此活得有滋有味。——周国平《风中的纸屑》 

在我们日常开发中，有时可能会在`SQL`中写一些条件，例如这里一个例子

这里有这样一张表,数据如下：

![image-20210225204952578](/imgs/oss/picGo/image-20210225204952578.png)

如果我们需要把未认证(状态为`NOT_AUTH`)的用户放到前面排序显示，在不影响分页的情况下，我们可以这么写

```sql
SELECT *,IF(status='NOT_AUTH','NOT_AUTH',null) AS sort FROM `user` ORDER BY sort DESC
```

这里使用到了`MYSQL`的`IF`函数

```sql
IF([条件],[为true时值],[为false时值])
```

例如我们需要整体排序，认证中的在最前，然后是未认证的，最后是已认证的

我们则可以使用`MYSQL`中的`CASE`、`WHEN`、`THEN`、`ELSE`、`END`一套去做

```sql
SELECT *,( CASE WHEN STATUS = 'AUTHING' THEN 0 WHEN STATUS = 'NOT_AUTH' THEN 1 WHEN STATUS = 'HAS_AUTH' THEN 2 ELSE 999 END ) AS sort 
FROM
	`user` 
ORDER BY
	sort ASC
```

这里

```sql
CASE
WHEN [条件1] THEN [条件1满足时值]
WHEN [条件2] THEN [条件2满足时值]
WHEN [条件3] THEN [条件3满足时值]
ELSE [条件都不满足时值]
END
```

`Tips`：在除了查询语句中，其余操作的`SQL`都可以用该函数哦

这就是今天的博客内容啦！