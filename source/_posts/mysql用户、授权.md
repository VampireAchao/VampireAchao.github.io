---
title: mysql用户、授权
date: 2022-04-13 12:44:25
tags: 数据库
---

> 天空没有一片云，一轮圆月在这一碧无际的大海里航行，孤独的，清冷的，它把它的光辉撒下来，地上，瓦上都染上了一层银白色，夜非常静。——巴金

官方文档：

https://dev.mysql.com/doc/refman/8.0/en/assigning-passwords.html

创建用户

```sql
CREATE USER 'jeffrey'@'localhost' IDENTIFIED BY 'password';
```

修改密码

```sql
ALTER USER 'jeffrey'@'localhost' IDENTIFIED BY 'password';
```

匿名用户登录，修改自身密码

```sql
ALTER USER USER() IDENTIFIED BY 'password';
```

使用[`mysqladmin`[^1]](https://dev.mysql.com/doc/refman/8.0/en/mysqladmin.html)修改密码

```shell
mysqladmin -u user_name -h host_name password "password"
```

注意修改失效时检查用户使用的检验`plugin`

```sql
use mysql;
select user,host,authentication_string,plugin from user;
-- plugin需要改成 mysql_native_password (auth_socket不行)
```

注意我们上方使用的[账户名称语法](https://dev.mysql.com/doc/refman/8.0/en/account-names.html)为：

```sql
'用户名'@'主机名'
```

主机名用于限制连接的`ip`

并且`@'主机名'`这一部分是可选的,默认为`@'%'`，我们甚至可以指定`ip`范围和网关

```sql
CREATE USER 'david'@'198.51.100.0/255.255.255.0';
```

修改用户主机名可以执行`sql`

```sql
-- 允许root远程访问
use mysql;
UPDATE user SET host = '%' WHERE user = 'root';
```

`AlTER USER`文档：https://dev.mysql.com/doc/refman/8.0/en/alter-user.html

重命名用户：https://dev.mysql.com/doc/refman/8.0/en/rename-user.html

```sql
RENAME USER 'jeffrey'@'localhost' TO 'jeff'@'127.0.0.1';
```

权限：

https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html

刷新权限的`sql`：https://dev.mysql.com/doc/refman/8.0/en/flush.html#flush-privileges

```sql
-- 从MySQL系统授权表中重新读取权限
FLUSH PRIVILEGES;
```

常用的授权`sql`命令为`GRANT`：

https://dev.mysql.com/doc/refman/8.0/en/grant.html

```sql
-- 赋予'someuser'@'somehost'所有数据库的所有权限
GRANT ALL ON *.* TO 'someuser'@'somehost';
GRANT ALL PRIVILEGES ON *.* TO 'someuser'@'somehost';
-- 赋予'someuser'@'somehost'数据库为test的所有权限
GRANT ALL ON test.* TO 'someuser'@'somehost';
```

然后是`REVOKE`撤销权限：语法上和`GRANT`相同

https://dev.mysql.com/doc/refman/8.0/en/revoke.html

```sql
-- 如果指定的权限或角色或用户存在，移除他的SELECT权限
REVOKE SELECT ON test.t1 FROM jerry@localhost IGNORE UNKNOWN USER;
```

注意移除权限并不会移除用户，删除用户可以用`DROP USER`:

https://dev.mysql.com/doc/refman/8.0/en/drop-user.html

```sql
-- 删除'jeffrey'@'localhost'用户
DROP USER 'jeffrey'@'localhost';
```

我们更改权限后可以执行`FLUSH PRIVILEGES;`立即生效



[^1]: mysql提供的工具