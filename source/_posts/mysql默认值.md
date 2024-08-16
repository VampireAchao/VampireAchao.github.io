---
title: mysql默认值
date: 2021-02-08 20:21:28
tags: 数据库
---

> 时穷节乃见,一一垂丹青。一一文天祥

如果我们在编写`SQL`时需要给一个默认值，例如查询或者编辑的时候，可以使用`mysql`函数`IFNULL`

例如这里我们表内有两条数据

![image-20210208202453135](/imgs/oss/picGo/image-20210208202453135.png)

然后我们编写`SQL`，如果我们用户名为`null`，我们默认填充一个`unknown`

```sql
SELECT id,IFNULL(username,'unknown') username FROM `user`
```

![image-20210208202540360](/imgs/oss/picGo/image-20210208202540360.png)

在编辑的时候也可以用

```sql
UPDATE user set username = IFNULL(`username`,'achao') where id = 2
```

这里如果我们的`username`为`null`，就会被修改成`achao`，但如果已经有值了，则不会进行修改