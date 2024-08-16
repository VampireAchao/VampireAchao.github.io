---
title: 使用BiFunction更改map的value
date: 2022-04-05 19:34:38
tags: java
---

> 伟大变为可笑只有一步，但再走一步，可笑又会变为伟大。——佩思

这个[`PR`](https://gitee.com/dromara/hutool/pulls/583)是这样的：

`map` 通过传入的BiFunction实现来返回值为新的map，支持返回别的类型

```java
	/**
	 * 通过biFunction自定义一个规则，此规则将原Map中的元素转换成新的元素，生成新的Map返回<br>
	 * 变更过程通过传入的 {@link BiFunction} 实现来返回一个值可以为不同类型的 {@link Map}
	 *
	 * @param map        原有的map
	 * @param biFunction {@code lambda}，参数包含{@code key},{@code value}，返回值会作为新的{@code value}
	 * @param <K>        {@code key}的类型
	 * @param <V>        {@code value}的类型
	 * @param <R>        新的，修改后的{@code value}的类型
	 * @return 值可以为不同类型的 {@link Map}
	 * @since 5.8.0
	 */
	public static <K, V, R> Map<K, R> map(Map<K, V> map, BiFunction<K, V, R> biFunction) {
		if (null == map || null == biFunction) {
			return MapUtil.newHashMap();
		}
		return map.entrySet().stream().collect(Collectors.toMap(Map.Entry::getKey, m -> biFunction.apply(m.getKey(), m.getValue())));
	}
```

定义个小枚举

```java
enum PeopleEnum {GIRL, BOY, CHILD}
```
开始操作
```java
Map<Integer, String> adjectivesMap = MapUtil.<Integer, String>builder()
.put(0, "lovely")
.put(1, "friendly")
.put(2, "happily")
.build();

Map<Integer, String> resultMap = MapUtil.map(adjectivesMap, (k, v) -> v + " " + PeopleEnum.values()[k].name().toLowerCase());
```

结果为

```json
{
  0: "lovely girl",
  1: "friendly boy",
  2: "happily child"
}
```

复杂一点的例子：

```java
	@Data
	@Builder
	public static class User {
		private Long id;
		private String name;
	}

	@Data
	@Builder
	public static class Group {
		private Long id;
		private List<User> users;
	}

	@Data
	@Builder
	public static class UserGroup {
		private Long userId;
		private Long groupId;
	}
```

操作：

```java
		// 下单用户，Queue表示正在 .排队. 抢我抢不到的二次元周边！
		Queue<String> customers = new ArrayDeque<>(Arrays.asList("刑部尚书手工耿", "木瓜大盗大漠叔", "竹鼠发烧找华农", "朴实无华朱一旦"));
		// 分组
		List<Group> groups = Stream.iterate(0L, i -> ++i).limit(4).map(i -> Group.builder().id(i).build()).collect(Collectors.toList());
		// 如你所见，它是一个map，key由用户id，value由用户组成
		Map<Long, User> idUserMap = Stream.iterate(0L, i -> ++i).limit(4).map(i -> User.builder().id(i).name(customers.poll()).build()).collect(Collectors.toMap(User::getId, Function.identity()));
		// 如你所见，它是一个map，key由分组id，value由用户ids组成，典型的多对多关系
		Map<Long, List<Long>> groupIdUserIdsMap = groups.stream().flatMap(group -> idUserMap.keySet().stream().map(userId -> UserGroup.builder().groupId(group.getId()).userId(userId).build())).collect(Collectors.groupingBy(UserGroup::getUserId, Collectors.mapping(UserGroup::getGroupId, Collectors.toList())));

		// 神奇的魔法发生了， 分组id和用户ids组成的map，竟然变成了订单编号和用户实体集合组成的map
		Map<Long, List<User>> groupIdUserMap = MapUtil.map(groupIdUserIdsMap, (groupId, userIds) -> userIds.stream().map(idUserMap::get).collect(Collectors.toList()));

		// 然后你就可以拿着这个map，去封装groups，使其能够在订单数据带出客户信息啦
		groups.forEach(group -> Opt.ofNullable(group.getId()).map(groupIdUserMap::get).ifPresent(group::setUsers));

		// 下面是测试报告
		groups.forEach(group -> {
			List<User> users = group.getUsers();
			Assert.assertEquals("刑部尚书手工耿", users.get(0).getName());
			Assert.assertEquals("木瓜大盗大漠叔", users.get(1).getName());
			Assert.assertEquals("竹鼠发烧找华农", users.get(2).getName());
			Assert.assertEquals("朴实无华朱一旦", users.get(3).getName());
		});
```

