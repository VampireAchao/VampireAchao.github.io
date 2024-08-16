---
title: mysql导出sql
date: 2021-05-04 19:16:18
tags: 数据库
---

> 地位越高，自我评价就越高，自信心多强，能力就有多强。我们总能表现出与环境的和谐平等。——赫兹里特

输入命令

```shell
mysqldump -u root -p [数据库名] > [文件名].sql
```

然后再输入`mysql`密码即可

![image-20210504191909269](/imgs/oss/picGo/image-20210504191909269.png)

![image-20210504191941422](/imgs/oss/picGo/image-20210504191941422.png)

数据库经常备份还是很有必要的