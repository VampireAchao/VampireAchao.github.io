---
title: 聊聊lambda
date: 2022-08-25 11:48:55
tags: java
---

> 

> 不速之客只在告辞以后才最受欢迎——莎士比亚

公众号链接：https://mp.weixin.qq.com/s/MFXRBr16LuGn6G2rlOFFEw

## 简介

今天主要聊聊`java`中的`lambda`

距离我加入`hutool-commiter`已经有一段时间了，想起曾经封装过的一个类`Opt`，就是使用`lambda`，按照惯例，先介绍下`dromara`组织下的项目`hutool`

> ![logo](https://plus.hutool.cn/images/logo.jpg)
>
> Hutool是一个小而全的Java工具类库，通过静态方法封装，降低相关API的学习成本，提高工作效率，使Java拥有函数式语言般的优雅，让Java语言也可以“甜甜的”。

这个类`Opt`的灵感来源是对`jdk`内置的`java.util.Optional`的拓展，在一些细节方面进了了简化处理

下面主要是通过其介绍`lambda`的使用

## 快速上手

依靠`idea`编译器的提示进行快速上手

下方是判断`user`是否为空，不为空通过`User#getSchool()`获取学校名的操作

例如此处我写到这里

```java
User user = new User();
// idea提示下方参数，如果没显示，光标放到括号里按ctrl+p主动呼出            
         |Function<? super User,?> mapper|
Opt.ofNullable(user).map()
```

这里`idea`为我们提示了参数类型，可这个`Function`我也不知道它是个什么

实际上，我们`new`一个就好了

```java
Opt.ofNullable(user).map(new Fun)
                            |Function<User, Object>{...} (java.util.function)   |  <-戳我
                            |Func<P,R> cn.hutool.core.lang.func                 |
```

这里`idea`提示了剩下的代码，我们选`Function`就行了，接下来如下：

```java
Opt.ofNullable(user).map(new Function<User, Object>() {
})
```

我们这里根据具体操作选取返回值

例如这里是想判断`user`是否为空，不为空时调用`getSchool`，从而获取其中的返回值`String`类型的`school`

我们就如下写法，将第二个泛型，也就是象征返回值的泛型改为`String`：

```java
Opt.ofNullable(user).map(new Function<User, String>() {
})
```

然后这里红线提示了，我们就使用`idea`的修复所有，默认快捷键`alt`+回车

```java
Opt.ofNullable(user).map(new Function<User, String>() {
})                                                | 💡 Implement methods                  |  <-选我
                                                  | ✍  Introduce local variable          |
                                                  | ↩  Rollback changes in current line   |
```

选择第一个`Implement methods`即可，这时候弹出一个框，提示让你选择你想要实现的方法

这里就选择我们的`apply`方法吧，按下一个回车就可以了，或者点击选中`apply`，再按一下`OK`按钮

```java
    ||IJ| Select Methods to Implement                        X |
    |                                                          |
    | 👇  ©  |  ↹  ↸                                          |
    | -------------------------------------------------------- |
    | | java.util.function.Function                            |
    | | ⒨ 🔓 apply(t:T):R                                     |      <-选我选我
    | | ⒨ 🔓 compose(before:Function<? super V,? extents T):Fu|
    | | ⒨ 🔓 andThen(after:Function<? super R,? extends V>):Fu|
    | |                                                        |
    | | ========================================               |                                        
    | -------------------------------------------------------- |
    |  ☐ Copy JavaDoc                                          |
    |  ☑ Insert @Override               |  OK  |  | CANCEL |   |     <-选完点我点我
```

此时此刻，代码变成了这样子

```java
Opt.ofNullable(user).map(new Function<User, String>() {
    @Override
    public String apply(User user) {
        return null;
    }
})
```

这里重写的方法里面就写你自己的逻辑(别忘了补全后面的分号)

```java
Opt.ofNullable(user).map(new Function<User, String>() {
    @Override
    public String apply(User user) {
        return user.getSchool();
    }
});
```

我们可以看到，上边的`new Function<User, String>()`变成了灰色

我们在它上面按一下`alt`+`enter`(回车)

```java
Opt.ofNullable(user).map(new Function<User, String>() {
    @Override                              | 💡 Replace with lambda             > |  <-选我啦
    public String apply(User user) {       | 💡 Replace with method reference   > |
        return user.getSchool();           | 💎 balabala...                     > |
    }
});
```

选择第一个`Replace with lambda`，就会自动缩写为`lambda`啦

```java
Opt.ofNullable(user).map(user1 -> user1.getSchool());
```

如果选择第二个，则会缩写为我们双冒号格式

```java
Opt.ofNullable(user).map(User::getSchool);
```

接下来我们获取值即可

```java
// 这里的school可能为null，
String school = Opt.ofNullable(user).map(User::getSchool).get();
// 如果想要为其提供默认值，可以使用orElse
String school = Opt.ofNullable(user).map(User::getSchool).orElse("NO_SCHOOL");
// 如果想要为null时才调用方法为其提供默认值，可以使用orElseGet
// 这在一些为null时 使用db新增并返回值的场景下很有用
String school = Opt.ofNullable(user).map(User::getSchool).orElseGet(() -> User.getDefaultSchool());
```

## 进阶

简单来说：函数式编程就是把我们的函数(方法)作为参数/变量传递、调用等，有点像反射的`Method`对象，都是作为函数的载体

例子：自定义函数式接口

```java
import java.io.Serializable;

/**
 * 可序列化的Functional
 *
 * @author VampireAchao
 * @since 2021/6/13 16:42
 */
@FunctionalInterface
public interface Func<T, R> extends Serializable {

    /**
     * 调用
     *
     * @param t 参数
     * @return 返回值
     */
    R apply(T t);
}
```

我们定义一个类可以去实现该接口

```java
/**
 * 可序列化的函数式接口实现类
 *
 * @author VampireAchao
 * @since 2021/6/13 16:45
 */
public class FuncImpl implements Func<Object, String> {
    /**
     * 调用
     *
     * @param o 参数
     * @return 返回值
     */
    @Override
    public String apply(Object o) {
        return o.toString();
    }
}
```

这里就有个问题：假设我有很多的地方需要不同的类去实现`Func`，我就得每次都去写这么一个类，然后实现该接口并重写方法

这样很麻烦！因此我们使用匿名内部类

```java
        Func<String, Integer> func = new Func<String, Integer>() {
            /**
             * 调用
             *
             * @param s 参数
             * @return 返回值
             */
            @Override
            public Integer apply(String s) {
                return s.hashCode();
            }
        };
```

我们可以看到，使用了匿名内部类后不用每次去新建这个类了，只需要在调用的地方，`new`一下接口，创建一个匿名内部类即可

但这样还有个问题，我们每次都要写这么一大堆，特别麻烦

由此而生，我们有了`lambda`这种简写的形式

```java
        Func<String, String> func1 = (String s) -> {
            return s.toUpperCase();
        };
```

如果只有一行，我们可以省略掉中括号以及`return`

```java
        Func<String, String> func2 = (String s) -> s.toUpperCase();
```

我们可以省略掉后边`lambda`中的参数类型，因为前面已经定义过了，编译器能自动推断

```java
        Func<String, String> func3 = s -> s.toUpperCase();
```

如果我们满足特定的形式，我们还可以使用双冒号的形式缩写

```java
        Func<String, String> func4 = String::toUpperCase;
```

这里除了我们的`参数->返回值`写法：`s->s.toUpperCase()`，还有很多种

例如无参数带返回值写法`()->"yes"`、无参无返回值写法`()->{}`等等

而双冒号这种写法至少有如下几种：

```java
package com.ruben;

import java.util.function.Function;
import java.util.function.IntFunction;
import java.util.function.Supplier;

/**
 * 语法糖——双冒号写法::
 *
 * @author VampireAchao
 * @since 2021/7/1 17:44
 */
public class MethodReferences {

    public static Object staticSupplier() {
        return "whatever";
    }

    public Object instanceSupplier() {
        return "whatever";
    }

    public Object anonymousInstanceFunction() {
        return "whatever";
    }

    public static void main(String[] args) {
        // 引用构造函数
        Supplier<MethodReferences> conSup = () -> new MethodReferences();
        conSup = MethodReferences::new;
        // 数组构造函数引用
        IntFunction<int[]> intFunction = value -> new int[value];
        // intFunc == new int[20];
        int[] intFuncResult = intFunction.apply(20);
        // 引用静态方法
        Supplier<Object> statSup = () -> staticSupplier();
        statSup = MethodReferences::staticSupplier;
        Object statSupResult = statSup.get();
        // 引用特定对象的实例方法
        Supplier<Object> instSup = new MethodReferences()::instanceSupplier;
        instSup = new MethodReferences()::instanceSupplier;
        Object instSupResult = instSup.get();
        // 引用特定类型的任意对象的实例方法
        Function<MethodReferences, Object> anonInstFunc = streamDemo -> streamDemo.anonymousInstanceFunction();
        anonInstFunc = MethodReferences::anonymousInstanceFunction;

    }

}
```

顺便放几个常用的函数式接口写法

```java
package com.ruben;

import java.math.BigDecimal;
import java.util.function.*;

/**
 * 常用的几个函数式接口写法
 *
 * @author VampireAchao
 * @since 2021/7/1 17:44
 */
class Usual {

    public static Consumer<Object> consumer() {
        // 有参数无返回值
        return o -> {
        };
    }

    public static Function<Integer, Object> function() {
        // 有参数有返回值
        return o -> o;
    }

    public static Predicate<Object> predicate() {
        // 有参数，返回值为boolean，注意 o -> null 写法调用test执行lambda时会NPE
        return o -> true;
    }

    public static Supplier<Object> supplier() {
        // 无参数有返回值
        return Object::new;
    }

    public static BiConsumer<String, Integer> biConsumer() {
        // 俩参数无返回值
        return (q, o) -> {
        };
    }

    public static BiFunction<Integer, Long, BigDecimal> biFunction() {
        // 俩参数，有返回值
        return (q, o) -> new BigDecimal(q).add(BigDecimal.valueOf(o));
    }

    public static UnaryOperator<Object> unaryOperator() {
        // 一个参数，返回值类型和参数一样
        return q -> q;
    }

    public static BinaryOperator<Object> binaryOperator() {
        // 俩参数和返回值类型保持一致
        return (a, o) -> a;
    }

}
```

## Stream介绍

`Java 8 API`添加了一个新的抽象称为流`Stream`，可以让你以一种声明的方式处理数据。方法全是传入函数作为参数，来达到我们的目的。

```java
        // 声明式编程是告诉计算机需要计算“什么”而不是“如何”去计算
        // 现在，我想要一个List，包含3个数字8
        List<Integer> list =
                // 我想要：
                Stream
                        // 8
                        .generate(() -> 8)
                        // 3个
                        .limit(3)
                        // 最后收集起来转为List
                        .collect(Collectors.toList());
        // 结果 [8, 8, 8]
```

`Stream` 使用一种类似用 `SQL` 语句从数据库查询数据的直观方式来提供一种对 `Java` 集合运算和表达的高阶抽象。

```java
        // 就像sql里的排序、截取
        // 我要把传入的list逆序，然后从第五个(元素下标为4)开始取值，取4条
		List<String> list = Arrays.asList("dromara", "Hmily", "Hutool", "Sa-Token", "Jpom", "TLog", "Cubic", "Koalas-rpc", "Fast Request");
		list = list.stream()
				// 排序(按照自然顺序的逆序)
				.sorted(Comparator.reverseOrder())
				// 从下标为4开始取值
				.skip(4)
				// 取4条
				.limit(4)
				// 最后收集起来转为List
				.collect(Collectors.toList());
        // 结果 [Jpom, Hutool, Hmily, Fast Request]
```

`Stream API`可以极大提高`Java`程序员的生产力，让程序员写出高效率、干净、简洁的代码。

```java
    /**
     * 老办法实现一个list，存储3个8，并转换为String
     *
     * @return [8, 8, 8]
     */
    private static List<String> oldFunc() {
		List<Integer> list = Arrays.asList(8, 8, 8);
		List<String> stringList = new ArrayList<>(list.size());
		for (Integer integer : list) {
			stringList.add(String.valueOf(integer));
		}
		return stringList;
    }

    /**
     * Stream实现一个list，存储3个8，并转换为String
     *
     * @return [8, 8, 8]
     */
    private static List<String> newFunc() {
        return Stream.generate(() -> 8).limit(3).map(String::valueOf).collect(Collectors.toList());
    }
```

生成`26`个大写字母组成的集合

```java
List<Character> abc = Stream.iterate('A', i -> (char) (i + 1)).limit(26).collect(Collectors.toList());
// [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z]
```

这种风格将要处理的元素集合看作一种流， 流在管道中传输， 并且可以在管道的节点上进行处理， 比如筛选， 排序，聚合等。

```java
        // 管道中传输，节点中处理
        int pipe = abc.stream()
                // 筛选大于G的字母
                .filter(i -> i > 'G')
                // 排序 按照自然排序顺序逆序
                .sorted(Comparator.reverseOrder())
                .mapToInt(Object::hashCode)
                // 聚合求和
                .sum();
        // 1539
```

元素流在管道中经过中间操作（`intermediate operation`）的处理，最后由最终操作(`terminal operation`)得到前面处理的结果。

```java
        // 将26个大写字母Character集合转换为String然后转换为小写字符
        List<String> terminalOperation = abc.stream()
                // 中间操作（intermediate operation）
                .map(String::valueOf).map(String::toLowerCase)
                // 最终操作
                .collect(Collectors.toList());
        // [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z]
```

## EasyStream

这是即将推出的`hutool-6.x`新特新之一，对`Stream`进行了进一步简化(设计灵感来源新版`jdk`新特性以及日常使用痛点)，例如：

```java
// 使用toList代替collect(Collectors.toList())
List<String> toList = EasyStream.of(list).map(String::valueOf).toList();
// 使用toMap代替collect(Collectors.toMap(String::valueOf, Function.identity()))
Map<String, Integer> identityMap = EasyStream.of(list).toMap(String::valueOf);
// 可以通过三参数创建无限流，提供终止条件
List<Integer> list = EasyStream.iterate(0, i -> i < 3, i -> i + 1).toList();
// 提供遍历下标
List<String> list = Arrays.asList("dromara", "hutool", "sweet");
List<String> mapIndex = EasyStream.of(list).mapIdx((e, i) -> i + 1 + "." + e).toList();
// 结果为 ["1.dromara", "2.hutool", "3.sweet"]
// ...
```

当然这个类还在完善中，目前只是一个实验性功能，还存在一些争议和问题，后续优化完成后会开放使用

[EasyStream源码链接](https://gitee.com/dromara/hutool/blob/v6-dev/hutool-core/src/main/java/cn/hutool/core/stream/EasyStream.java)