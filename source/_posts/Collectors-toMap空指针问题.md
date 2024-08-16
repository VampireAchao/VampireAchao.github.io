---
title: Collectors.toMap空指针问题
date: 2021-12-06 21:45:29
tags: java
---

> 社会上崇敬名人，于是以为名人的话就是名言，却忘记了他所以得名是那一种学问和事业。 —— 鲁迅

对于[`Collectors.toMap`](https://VampireAchao.github.io/2020/08/05/Collectors-toMap/)，我们使用时如果`value`为空，则会抛出空指针，因为底层调用的`Map.merge`函数

如果我们想避免该问题，就可以使用[`collect`](https://VampireAchao.github.io/2021/06/14/collect%E8%A1%A5%E5%85%85/)去处理，例如我给`hutool`提交的[这个`PR`](https://gitee.com/dromara/hutool/pulls/478)一样

原先：

```java
StreamUtil.of(collection, isParallel).collect(Collectors.toMap(key, value, (l, r) -> l));
```

现在：

```java
StreamUtil.of(collection, isParallel).collect(HashMap::new, (HashMap<K, V> m, E v) -> m.put(key.apply(v), value.apply(v)), HashMap::putAll);
```

完整函数：

```java
	/**
	 * @param collection 需要转化的集合
	 * @param key        E类型转化为K类型的lambda方法
	 * @param value      E类型转化为V类型的lambda方法
	 * @param isParallel 是否并行流
	 * @param <E>        collection中的泛型
	 * @param <K>        map中的key类型
	 * @param <V>        map中的value类型
	 * @return 转化后的map
	 */
	public static <E, K, V> Map<K, V> toMap(Collection<E> collection, Function<E, K> key, Function<E, V> value, boolean isParallel) {
		if (CollUtil.isEmpty(collection)) {
			return Collections.emptyMap();
		}
		return StreamUtil.of(collection, isParallel).collect(HashMap::new, (HashMap<K, V> m, E v) -> m.put(key.apply(v), value.apply(v)), HashMap::putAll);
	}
```

当然，对于`hutool`中另一个函数`CollStream.toIdentityMap`也同理

原来：

```java
StreamUtil.of(collection, isParallel).collect(Collectors.toMap(key, Function.identity(), (l, r) -> l));
```

现在：

```java
StreamUtil.of(collection, isParallel).collect(HashMap::new, (HashMap<K, V> m, V v) -> m.put(Opt.ofNullable(v).map(key).get(), v), HashMap::putAll);
```

完整代码：

```java
	/**
	 * 将collection转化为类型不变的map<br>
	 * <B>{@code Collection<V>  ---->  Map<K,V>}</B>
	 *
	 * @param collection 需要转化的集合
	 * @param key        V类型转化为K类型的lambda方法
	 * @param isParallel 是否并行流
	 * @param <V>        collection中的泛型
	 * @param <K>        map中的key类型
	 * @return 转化后的map
	 */
	public static <V, K> Map<K, V> toIdentityMap(Collection<V> collection, Function<V, K> key, boolean isParallel) {
		if (CollUtil.isEmpty(collection)) {
			return Collections.emptyMap();
		}
		return StreamUtil.of(collection, isParallel)
				.collect(HashMap::new, (HashMap<K, V> m, V v) -> m.put(Opt.ofNullable(v).map(key).get(), v), HashMap::putAll);
	}
```

实际发生场景如下：我查询出用户与好友关联关系，并想获取`Map<好友编号, 好友备注>`时，使用该函数导致`NPE`，因为默认使用的
`Map.merge`不允许空值，而我此处场景下，允许未给好友备注，也就是允许`null`值，故 修复了该问题
