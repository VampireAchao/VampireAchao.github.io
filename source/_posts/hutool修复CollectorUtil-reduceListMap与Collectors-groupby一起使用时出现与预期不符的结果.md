---
title: hutool修复CollectorUtil.reduceListMap与Collectors.groupby一起使用时出现与预期不符的结果
date: 2023-11-12 17:21:08
tags: java
---

> 待小人宜宽，防小人宜严。——金瑛

问题的`issue`：

https://github.com/dromara/hutool/issues/3380

此处复现：

```java
        List<Map<String, String>> data = ListUtil.toList(
			MapUtil.builder("name", "sam").put("count", "80").map(),
			MapUtil.builder("name", "sam").put("count", "81").map(),
			MapUtil.builder("name", "sam").put("count", "82").map(),
			MapUtil.builder("name", "jack").put("count", "80").map(),
			MapUtil.builder("name", "jack").put("count", "90").map()
		);

		Map<String, Map<String, List<String>>> nameMap = data.stream()
			.collect(Collectors.groupingBy(e -> e.get("name"), CollectorUtil.reduceListMap()));
		Assert.assertEquals(MapUtil.builder("jack", MapUtil.builder("name", Arrays.asList("jack", "jack"))
				.put("count", Arrays.asList("80", "90")).build())
			.put("sam", MapUtil.builder("name", Arrays.asList("sam", "sam", "sam"))
				.put("count", Arrays.asList("80", "81", "82")).build())
			.build(), nameMap);
    // 期望数据
    // {jack={name=[jack, jack], count=[80, 90]}, sam={name=[sam, sam, sam], count=[80, 81, 82]}}
    // 实际数据
    // {jack={name=[sam, sam, sam, jack, jack], count=[80, 81, 82, 80, 90]}, sam={name=[sam, sam, sam, jack, jack], count=[80, 81, 82, 80, 90]}}
```

原因是在`reducing`的第三个参数里出现重复引用导致问题

解决办法：每次都调用第一个参数的`supplier`创建新`map`

相关pr：[[Fix] 修复 github issue 3380 CollectorUtil.reduceListMap与collectors.groupby一起使用时出现与预期不符的结果 · Pull Request !1102 · dromara/hutool - Gitee.com](https://gitee.com/dromara/hutool/pulls/1102)

将原来的：

```java
public static <K, V, R extends Map<K, List<V>>> Collector<Map<K, V>, ?, R> reduceListMap(final Supplier<R> mapSupplier) {
		return Collectors.reducing(mapSupplier.get(), value -> {
					final R result = mapSupplier.get();
					value.forEach((k, v) -> result.computeIfAbsent(k, i -> new ArrayList<>()).add(v));
					return result;
				}, (l, r) -> {
					r.forEach((k, v) -> l.computeIfAbsent(k, i -> new ArrayList<>()).addAll(v));
					return l;
				}
		);
	}
```

改为：

```java
public static <K, V, R extends Map<K, List<V>>> Collector<Map<K, V>, ?, R> reduceListMap(final Supplier<R> mapSupplier) {
		return Collectors.reducing(mapSupplier.get(), value -> {
					final R result = mapSupplier.get();
					value.forEach((k, v) -> result.computeIfAbsent(k, i -> new ArrayList<>()).add(v));
					return result;
				}, (l, r) -> {
					final R resultMap = mapSupplier.get();
					resultMap.putAll(l);
					r.forEach((k, v) -> resultMap.computeIfAbsent(k, i -> new ArrayList<>()).addAll(v));
					return resultMap;
				}
		);
	}
```

即可解决
