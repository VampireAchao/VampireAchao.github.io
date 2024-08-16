---
title: Function
date: 2020-11-09 21:37:13
tags: java
---

> 应该笑着面对生活，不管一切如何。——伏契克

`java8`的`Function`这个类

它有一个`@FunctionalInterface`注解

![image-20201109225543573](/imgs/oss/picGo/image-20201109225543573.png)

这里举个例子

首先我们看`apply`

解释为

> 表示接受一个参数并产生一个结果的功能。
> 这是一个功能性的接口，其功能性的方法是apply(Object) 。

简单来说，你可以使用它里面的`apply`方法，这个方法参数为`lambda`写法的函数，返回值为函数执行的结果

![image-20201109214535163](/imgs/oss/picGo/image-20201109214535163.png)

我们实际写法如下

执行了`apply`能调用`getUsername`返回我们的`username`为`ruben`

源码这里的`T`为我们实际写的`User`，`R`为返回结果`String`

```java
public class FunctionDemo {

    public static void main(String[] args) {
        System.out.println(getUsername(User::getUsername, user));
    }

    public static String getUsername(Function<User, String> func, User user) {
        return func.apply(user);
    }

}
```

接下来是`andThen`，简单来说我们要在`apply`之后做点啥就可以使用它，这里举例为获取用户名长度

```java
public class FunctionDemo {

    public static void main(String[] args) {
        System.out.println(getNameLength(User::getUsername, user));
    }

    public static int getNameLength(Function<User, String> func, User user) {
        return func.andThen(String::length).apply(user);
    }

}
```

源码也超级简单

![image-20201109223524520](/imgs/oss/picGo/image-20201109223524520.png)

既然有在方法执行之后做操作，那么也有之前的，例如我们执行方法`getUsername()`之前给它赋个值

```java
public class FunctionDemo {

    public static void main(String[] args) {
        System.out.println(getAchaoName(User::getUsername, user));
    }

    public static String getAchaoName(Function<User, String> func, User user) {
        return func.compose(obj -> {
            User tempUser = (User) obj;
            tempUser.setUsername("achao");
            return tempUser;
        }).apply(user);
    }

}
```

然后是源码![image-20201109225303551](/imgs/oss/picGo/image-20201109225303551.png)

还有最后一个`identity`

官方解释：返回一个总是返回其输入参数的函数

简单点，就是`Function`的给定类型的实例

例如我们给定一个`User类型`，调用里面的`apply`，可以返回一个`User`的实例

```java
        Function<User, User> identity = Function.identity();
        User user = identity.compose(obj -> {
            User tempUser = (User) obj;
            tempUser.setUsername("alex");
            return tempUser;
        }).andThen(obj -> {
            obj.setUsername("ruben");
            return obj;
        }).apply(new User("steve", "xxxxxx"));
```

这里在`compose`、`apply`、`andThen`中分别给`username`赋值，但是最终的`user`为`ruben`，也就是我们最后执行的`andThen`覆盖了前面的

![image-20201109232000992](/imgs/oss/picGo/image-20201109232000992.png)