---
title: lambda2sql
date: 2023-04-22 12:19:22
tags: java
---

> 哪怕对自己的一点小小的克制，也会使人变得强而有力。——高尔基

分享一个开源项目`lambda2sql`：

https://github.com/ajermakovics/lambda2sql

编写如下的`lambda`

```
 person -> person.getAge() < 100 && person.getHeight() > 200
```

会被转换为

```
  age < 100 AND height > 200
```

使用起来非常简单，也非常有意思

```java
package lambda2sql;

import org.junit.Assert;
import org.junit.Test;

public class Lambda2SqlTest {

	@Test
	public void testComparisons() {
		assertEqual("age = 1", e -> e.getAge() == 1);
		assertEqual("age > 1", e -> e.getAge() > 1);
		assertEqual("age < 1", e -> e.getAge() < 1);
		assertEqual("age >= 1", e -> e.getAge() >= 1);
		assertEqual("age <= 1", e -> e.getAge() <= 1);
		assertEqual("age != 1", e -> e.getAge() != 1);
	}

	@Test
	public void testLogicalOps() {
		assertEqual("!isActive", e -> !e.isActive());
		assertEqual("age < 100 AND height > 200", e -> e.getAge() < 100 && e.getHeight() > 200);
		assertEqual("age < 100 OR height > 200", e -> e.getAge() < 100 || e.getHeight() > 200);
	}

	@Test
	public void testMultipleLogicalOps() {
		assertEqual("isActive AND (age < 100 OR height > 200)", e -> e.isActive() && (e.getAge() < 100 || e.getHeight() > 200));
		assertEqual("(age < 100 OR height > 200) AND isActive", e -> (e.getAge() < 100 || e.getHeight() > 200) && e.isActive());
	}

	@Test
	public void testWithVariables() {
		String name = "Donald";
		int age = 80;
		assertEqual("name = 'Donald' AND age > 80", person -> person.getName() == name && person.getAge() > age);
	}

	private void assertEqual(String expectedSql, SqlPredicate<Person> p) {
		String sql = Lambda2Sql.toSql(p);
		Assert.assertEquals(expectedSql, sql);
	}
}
```

