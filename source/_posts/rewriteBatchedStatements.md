---
title: rewriteBatchedStatements
date: 2023-02-04 16:51:22
tags: java
---

> 从前的日色变得慢，车，马，邮件都慢，一生只够爱一个人。——木心

我们在使用`mybatis`进行批量更新时，可以在`mysql`的链接`url`处添加`rewriteBatchedStatements=true`提升效率.

文档：https://dev.mysql.com/doc/connector-j/8.0/en/connector-j-connp-props-performance-extensions.html

> ```
> rewriteBatchedStatements
> ```
>
> Should the driver use multi-queries, regardless of the setting of 'allowMultiQueries', as well as rewriting of prepared statements for INSERT and REPLACE queries into multi-values clause statements when 'executeBatch()' is called?
>
> Notice that this might allow SQL injection when using plain statements and the provided input is not properly sanitized. Also notice that for prepared statements, if the stream length is not specified when using 'PreparedStatement.set*Stream()', the driver would not be able to determine the optimum number of parameters per batch and might return an error saying that the resultant packet is too large.
>
> 'Statement.getGeneratedKeys()', for statements that are rewritten only works when the entire batch consists of INSERT or REPLACE statements.
>
> Be aware that when using "rewriteBatchedStatements=true" with "INSERT ... ON DUPLICATE KEY UPDATE" for rewritten statements, the server returns only one value for all affected (or found) rows in the batch, and it is not possible to map it correctly to the initial statements; in this case the driver returns "0" as the result for each batch statement if total count was zero, and 'Statement.SUCCESS_NO_INFO' if total count was above zero.
>
> | Default Value | false  |
> | :------------ | ------ |
> | Since Version | 3.1.13 |