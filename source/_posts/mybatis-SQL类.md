---
title: mybatis SQL类
date: 2023-01-23 16:54:06
tags: java
---

> 对于不屈不挠的人来说，没有。——俾斯麦

分享一个`mybatis`在代码里编写`sql`的方法

官方文档：https://mybatis.org/mybatis-3/zh/statement-builders.html

> ## SQL 语句构建器
>
> ### 问题
>
> Java 程序员面对的最痛苦的事情之一就是在 Java 代码中嵌入 SQL 语句。这通常是因为需要动态生成 SQL 语句，不然我们可以将它们放到外部文件或者存储过程中。如你所见，MyBatis 在 XML 映射中具备强大的 SQL 动态生成能力。但有时，我们还是需要在 Java 代码里构建 SQL 语句。此时，MyBatis 有另外一个特性可以帮到你，让你从处理典型问题中解放出来，比如加号、引号、换行、格式化问题、嵌入条件的逗号管理及 AND 连接。确实，在 Java 代码中动态生成 SQL 代码真的就是一场噩梦。例如：
>
> ```
> String sql = "SELECT P.ID, P.USERNAME, P.PASSWORD, P.FULL_NAME, "
> "P.LAST_NAME,P.CREATED_ON, P.UPDATED_ON " +
> "FROM PERSON P, ACCOUNT A " +
> "INNER JOIN DEPARTMENT D on D.ID = P.DEPARTMENT_ID " +
> "INNER JOIN COMPANY C on D.COMPANY_ID = C.ID " +
> "WHERE (P.ID = A.ID AND P.FIRST_NAME like ?) " +
> "OR (P.LAST_NAME like ?) " +
> "GROUP BY P.ID " +
> "HAVING (P.LAST_NAME like ?) " +
> "OR (P.FIRST_NAME like ?) " +
> "ORDER BY P.ID, P.FULL_NAME";
> ```
>
> ### 解决方案
>
> MyBatis 3 提供了方便的工具类来帮助解决此问题。借助 SQL 类，我们只需要简单地创建一个实例，并调用它的方法即可生成 SQL 语句。让我们来用 SQL 类重写上面的例子：
>
> ```
> private String selectPersonSql() {
>   return new SQL() {{
>     SELECT("P.ID, P.USERNAME, P.PASSWORD, P.FULL_NAME");
>     SELECT("P.LAST_NAME, P.CREATED_ON, P.UPDATED_ON");
>     FROM("PERSON P");
>     FROM("ACCOUNT A");
>     INNER_JOIN("DEPARTMENT D on D.ID = P.DEPARTMENT_ID");
>     INNER_JOIN("COMPANY C on D.COMPANY_ID = C.ID");
>     WHERE("P.ID = A.ID");
>     WHERE("P.FIRST_NAME like ?");
>     OR();
>     WHERE("P.LAST_NAME like ?");
>     GROUP_BY("P.ID");
>     HAVING("P.LAST_NAME like ?");
>     OR();
>     HAVING("P.FIRST_NAME like ?");
>     ORDER_BY("P.ID");
>     ORDER_BY("P.FULL_NAME");
>   }}.toString();
> }
> ```
>
> 这个例子有什么特别之处吗？仔细看一下你会发现，你不用担心可能会重复出现的 "AND" 关键字，或者要做出用 "WHERE" 拼接还是 "AND" 拼接还是不用拼接的选择。SQL 类已经为你处理了哪里应该插入 "WHERE"、哪里应该使用 "AND" 的问题，并帮你完成所有的字符串拼接工作。

