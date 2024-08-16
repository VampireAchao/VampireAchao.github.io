---
title: exists
date: 2022-06-09 13:13:05
tags: 数据库
---

> 发上开出了蔷薇，袖底是风，足下是莲。——顾城

我们可以使用`exists`代替`in`查询：

[阿里编码规约第五条第(三)条第9条：](https://alibaba.github.io/p3c/MySQL%E6%95%B0%E6%8D%AE%E5%BA%93/SQL%E8%AF%AD%E5%8F%A5.html)

> 9. 【推荐】in操作能避免则避免，若实在避免不了，需要仔细评估in后边的集合元素数量，控制在1000个之内。

我们可以在子元素多的情况下，使用`exists`查询

比如下面这个`in`查询

```mysql
SELECT
	* 
FROM
	sys_user AS a 
WHERE
	id in (
	SELECT
		user_id
	FROM
		sys_user_role AS b 
	WHERE
		b.role_id IN ( SELECT id FROM sys_role AS c WHERE b.role_id = c.id AND c.role_code LIKE '%o%' ));
```

可以改为：

```sql
SELECT
	* 
FROM
	sys_user AS a 
WHERE
	EXISTS (
	SELECT
		user_id
	FROM
		sys_user_role AS b 
	WHERE
	a.id = b.user_id 
	AND EXISTS ( SELECT id FROM sys_role AS c WHERE b.role_id = c.id AND c.role_code LIKE '%o%' ));
```

