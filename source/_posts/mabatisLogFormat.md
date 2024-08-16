---
title: mabatisLogFormat
date: 2021-02-01 19:46:06
tags: 软件及插件
---

> 强本而节用，则天不能贫。——荀况

我们在打印`sql`日志的时候发现参数和`sql`是分开的，如果我们需要完整的`sql`，需要手动填充参数到`sql`上

所以这里介绍一款`idea`插件：`MybatisLogFormat`

![image-20210201194739552](/imgs/oss/picGo/image-20210201194739552.png)

我们点击`install`然后重启`idea`

我们可以选中我们的`SQL`日志然后右键选择`MybatisLogFormat`

![image-20210201195124955](/imgs/oss/picGo/image-20210201195124955.png)

然后右边就会弹出我们填充好的`SQL`

![image-20210201195155594](/imgs/oss/picGo/image-20210201195155594.png)

我们可以点击`copy`复制出来

```sql
 SELECT * FROM user WHERE username LIKE CONCAT('%','ruben','%')
```

