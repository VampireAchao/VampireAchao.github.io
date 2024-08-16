---
title: mybatis中if-else
date: 2020-07-23 21:26:02
tags: java
---

<code>mybatis</code>中<code>if-else</code>要用<code>choose-when-otherwise</code>

```xml
<choose>
	<when test="page !=null and page.orderBy != null and page.orderBy != ''">
		ORDER BY ${page.orderBy}
	</when>
	<otherwise>
		ORDER BY a.update_date DESC
	</otherwise>
</choose>
```

