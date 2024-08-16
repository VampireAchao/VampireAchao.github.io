---
title: 花里胡哨的peeks
date: 2021-10-30 15:29:42
tags: java
---

> 莫见乎隐，莫显乎微，故君子慎其独也。一一《礼记》

今天又给`hutool`提交了`PR`，将前两天写的动态函数式参数用了起来

https://gitee.com/dromara/hutool/pulls/445

[新特性]  
~~你啊，总能给我整出点新花样~~

- 【以前使用`peek`】

```java
Opt.ofNullable("hutool").peek(user::setUsername).peek(user::setNickname);
```

- 【现在使用`peeks`】

```java
Opt.ofNullable("hutool").peeks(user::setUsername, user::setNickname);
```

什么？没看出有什么区别？都差不多？？？`Na` `Na` `Na`！接着往下看：
首先是它使用`java`动态参数(可变参数)的特性，你可以传入`0`个或`n`个你想要的操作，例如：

- 【以前使用`peek`】

```java
if (condition) {
	// 满足条件，我就要把username设置为Opt中的值
	hutool.peek(user::setUsername);
	if (anotherCondition) {
		// 如果满足另一个条件，我就要把nickname设置为Opt中的值
		hutool.peek(user::setNickname);
	}
}
```

- 【现在使用`peeks`】

```java
List<Consumer<String>> actions = new ArrayList<>();
if (condition) {
	// 满足条件，我就要把username设置为Opt中的值
	actions.add(user::setUsername);
	if (anotherCondition) {
		// 如果满足另一个条件，我就要把nickname设置为Opt中的值
		actions.add(user::setNickname);
	}
	if (timeReversal) {
		// 如果满足这个叫的条件，就移除掉上一个操作，划重点！它甚至可以移除掉未进行的操作链！！！
		// 甚至你可以对它进行排序、更换操作等
		// How amazing!!!
		actions.remove(actions.size() - 1);
	}
}
hutool.peeks(actions.stream().toArray(Consumer[]::new));
```

它的额外价值：
你可以点进源码，查看并学习知识点：

```java
	/**
	 * 如果包裹里元素的值存在，就执行对应的操作集，并返回本身
	 * 如果不存在，返回一个空的{@code Opt}
	 *
	 * <p>属于 {@link #ifPresent}的链式拓展
	 * <p>属于 {@link #peek(Consumer)}的动态拓展
	 *
	 * @param actions 值存在时执行的操作，动态参数，可传入数组，当数组为一个空数组时并不会抛出 {@code NPE}
	 * @return this
	 * @throws NullPointerException 如果值存在，并且传入的操作集中的元素为 {@code null}
	 * @author VampireAchao
	 */
	@SafeVarargs
	public final Opt<T> peeks(Consumer<T>... actions) throws NullPointerException {
		return Stream.of(actions).reduce(this, Opt<T>::peek, (opts, opt) -> null);
	}

```

这里首先是`@SafeVarargs`这个注解
其次是`Consumer`函数式接口
然后还有`<T>`泛型参数
以及`Consumer<T>...`这三个点，动态参数(可变参数)
然后是`Stream.of`函数
接下来是`reduce`函数，它是`Stream`的`reduce`众多重载中的一个，也是我最喜欢的一个！
这里的第三个参数` (opts, opt) -> null`其实并不会执行到该函数式接口所以直接返回了个`null`
因为这个参数只有并行流时才会生效，用于合并并行流异步出现的多个结果
看！经过这个函数你学到了多少知识点？！
不管该`PR`通过与否，我都相信学以致用，我希望大伙们学完了赶紧用起来，函数式编程不只是简单的炫技，它更是对技术探究的热情以及当今编程的趋势！

