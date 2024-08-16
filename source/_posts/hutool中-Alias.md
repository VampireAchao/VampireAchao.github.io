---
title: hutool中@Alias
date: 2022-02-14 22:02:50
tags: java
---

> 何必向不值得的人证明什么，生活得更好，乃是为你自己——忽而今夏

我们可以使用`hutool`中的`@Alias`注解去给`bean`取别名，例如：

```java
	@Data
	public static class BeanWithAlias {
		@Alias("name")
		private String value1;
		@Alias("age")
		private Integer value2;
	}
```

然后别名不仅能在`BeanUtil.copyProperties`中使用，还可以在`JSONUtil`中使用：

```java
		final BeanWithAlias beanWithAlias = new BeanWithAlias();
		beanWithAlias.setValue1("张三");
		beanWithAlias.setValue2(35);

		final JSONObject jsonObject = JSONUtil.parseObj(beanWithAlias);
		Assert.assertEquals("张三", jsonObject.getStr("name"));
		Assert.assertEquals(new Integer(35), jsonObject.getInt("age"));

		JSONObject json = JSONUtil.createObj()
				.set("name", "张三")
				.set("age", 35);
		final BeanWithAlias bean = JSONUtil.toBean(Objects.requireNonNull(json).toString(), BeanWithAlias.class);
		Assert.assertEquals("张三", bean.getValue1());
		Assert.assertEquals(new Integer(35), bean.getValue2());

```

这个注解还是非常方便的