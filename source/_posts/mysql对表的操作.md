---
title: mysql对表的操作
date: 2021-01-02 16:11:54
tags: 数据库
---

> 如果工作对于人类不是人生强索的代价，而是目的，人类将是多么幸福。—— 罗丹

[转，原文](https://blog.csdn.net/wbjylk/article/details/51085251)

## mysql对表的操作

1. 表的概念
   表是包含数据库中所有数据的数据库对象。表中的数据库对象包含列、索引、触发器。其中触发器是指用户定义的事务命令集合，当对一个表中的数据进行插入、更新或者删除时，这组命令就会自动执行，可以确保数据的安全性和完整性。
2. 创建表
   create table tableName(
   属性名 字段类型，
   属性名 字段类型，
   ……
   属性名 字段类型
   );
   最后一个字段类型后面没有逗号，整个语句的小括号后边有分号。

例如：创建一个数据库，并且创建一张表：
create database 数据库名；
show databases； //查看当前用户下mysql中所有的数据库
use 数据库名； //使用这个数据库
create table class（
id Integer primary key auto_increment,
name varvhar(32),
number int
）;//创建了一张有三列的表，表名为class。id 为整型，主键且自增长。
![创建表](https://img-blog.csdn.net/20160407123023538)
\3. 查看表
describe table_name; //查看表名为table_name 的表
![查看表结构](https://img-blog.csdn.net/20160407123259742)
如果需要知道表结构的详细信息：
show create table table_name; //查看表结构的相信信息
![查看表的详细信息](https://img-blog.csdn.net/20160407123622400)
可以看到用这条语句可以看到详细的建表语句，在工作的时候可以用这条语句得到建表语句，把建表语句在其它的数据库中执行也可在其它数据库中建立一个一样的表。
\4. 删除表
drop table table_name; //删除表
要删除的表必须是数据库中已经存在的表，这条sql语句会删除表的结构信息以及表内数据，所以删除表要小心。删除后可以用describe table_name 来确认是否删除。
truncate table table_name; // 清除表中所有数据
\5. 修改表
1>修改表名
alter table old_table_name rename [to] new_table_name;
表名在数据库中是唯一的，用上边语句可以更改表名。
2>增加字段
alter table table_name add 属性名 属性类型； //在表的最后一个位置增加字段。
alter table table_name add 属性名 属性类型 first; //在表的第一个位置增加字段
alter table table_name add 属性名 属性类型 after 已有的属性名； //在关键字所指的属性后边增加字段
![增加字段](https://img-blog.csdn.net/20160407133230470)
3>删除字段
alter table table_name drop 属性名；
![删除字段](https://img-blog.csdn.net/20160407133714410)

4>修改字段
修改字段的数据类型：
alter table table_name modify 属性名 数据类型；
修改字段的名称
alter table table_name change 旧属性名 新属性名 旧数据类型；
同时修改字段的名称和数据类型
alter table table_name change 旧属性名 新属性名 新数据类型；
![修改字段名和数据类型](https://img-blog.csdn.net/20160407134421850)
修改字段的顺序：
alter table table_name modify 属性名1 数据类型 first/after 属性名2； //属性名1 代表要修改的字段，”first“代表把属性1放到表的第一个位置，“after 属性名2 ”代表把属性1调整到属性2后边。
![更改顺序](https://img-blog.csdn.net/20160407135239665)

1. 操作表的约束
   mysql支持的完整性约束：
   完整性指的是数据的准确性和一致性。
   ![完整性约束](https://img-blog.csdn.net/20160407140020309)

   ```
   其中主键 primary key可以设置单字段主键也可以设置多字段主键。单字段主键直接在字段数据类型后加 primary key就可以了，比如class表的id字段。
   多字段主键：
   12
   ```

   当主键由多个字段组合而成时，要用sql的constraint来实现：
   create table table_name(
   属性名 数据类型，
   ……
   [constraint 约束名] primary key （属性名，属性名….）
   );

参考书目：《mysql数据库应用从入门到精通 第二版》