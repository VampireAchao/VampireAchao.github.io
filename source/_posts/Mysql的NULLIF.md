---
title: Mysql的NULLIF
date: 2024-04-22 20:53:43
tags: 数据库
---

> 秉性难移。——冯梦龙

`NULLIF`函数是MySQL中的一个条件函数，用来返回两个表达式的比较结果。具体来说，如果两个表达式相等，`NULLIF`函数返回NULL；如果不相等，它就返回第一个表达式的值。其基本语法如下：

```sql
NULLIF(expr1, expr2)
```

其中，`expr1`和`expr2`可以是任何类型的表达式，但它们应该是相同的数据类型或者可以隐式转换的类型。

在数学运算特别是除法运算中，除以零会导致错误。使用`NULLIF`可以有效避免这种错误。例如，我们要计算两个列`A`和`B`的比值，可以这样写：

```sql
SELECT A, B, A / NULLIF(B, 0) AS result
FROM your_table;
```

这里，如果`B`为0，则`NULLIF(B, 0)`返回NULL，`A / NULL`也会返回NULL，从而避免了运行时错误。

在数据导入或处理过程中，我们可能会遇到一些特殊值需要转换为NULL以保持数据的一致性。例如，某些系统中使用`-1`表示数据缺失，我们可以使用`NULLIF`来转换这些值：

```sql
SELECT NULLIF(column_name, -1)
FROM your_table;
```

这样，所有为`-1`的`column_name`值都会被转换为NULL。

在某些情况下，你可能需要在WHERE子句中排除一些特定的值。`NULLIF`可以在这里发挥作用，帮助简化查询逻辑。例如：

```sql
SELECT *
FROM your_table
WHERE NULLIF(column_name, 'Not Applicable') IS NOT NULL;
```

这个查询会排除所有`column_name`为'Not Applicable'的记录。



使用`NULLIF`函数将空字符串转换为NULL是一个简单直接的方法。基本语法如下：

```sql
SELECT NULLIF(column_name, '') AS new_column
FROM your_table;
```

这里的`NULLIF(column_name, '')`会检查`column_name`中的每个值，如果值是空字符串（""），则该函数返回NULL；如果不是空字符串，就返回原值。这样，原本的空字符串就被视为了NULL值。



假设有一个用户信息表`users`，其中包含用户的邮箱地址`email`。在数据集中，未填写邮箱的用户被错误地存储为了空字符串。我们可以使用`NULLIF`来修正这一错误：

```sql
SELECT id, name, NULLIF(email, '') AS email
FROM users;
```

这个查询不仅修正了数据，还保持了原表的其他信息不变，使得整个数据集更加准确和有用。

## 

除了基本的转换，`NULLIF`与其他SQL函数结合使用，可以实现更复杂的数据处理逻辑。比如，与`COALESCE`函数结合，可以实现多重默认值的逻辑：

```sql
SELECT COALESCE(NULLIF(email, ''), 'no-email@example.com') AS email
FROM users;
```

这个例子中，如果`email`是空字符串，则首先被`NULLIF`转换为NULL，然后`COALESCE`函数会将其替换为默认邮箱地址`no-email@example.com`，这样无论`email`是`''`还是`NULL`,都会使用`no-email@example.com`



让我们通过一个实际的例子来看`NULLIF`的应用。假设一个电商数据库中有一个订单表，表中有`coupon_discount`字段，记录了使用优惠券的折扣金额，未使用优惠券的记录这一字段为`0`。我们可以用`NULLIF`来统计实际使用了优惠券的订单数量：

```sql
SELECT COUNT(*) 
FROM orders 
WHERE NULLIF(coupon_discount, 0) IS NOT NULL;
```

这条SQL语句统计了`coupon_discount`不为0的记录，即使用了优惠券的订单数。
