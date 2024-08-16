---
title: lambda小技巧
date: 2022-01-30 19:30:32
tags: 小技巧
---

> 人类最不道德订户，是不诚实与懦弱。——高尔基

经常有朋友问我，老是遇到参数为一些`lambda`的函数，我怎么知道对应的`lambda`怎么写呢？

这函数式编程，真是一件美事啊~

对于这种情况，我们依靠我们强大的`idea`即可

例如此处我写到这里写不会了

```
User user = new User();
// idea提示下方参数，如果没显示，光标放到括号里按ctrl+p主动呼出            
         |Function<? super User,?> mapper|
Opt.ofNullable(user).map()
```

这里`idea`为我们提示了参数类型，可这个`Function`我也不知道它是个什么

实际上，我们`new`一个就好了

```
Opt.ofNullable(user).map(new Fun)
                            |Function<User, Object>{...} (java.util.function)   |  <-戳我
                            |Func<P,R> cn.hutool.core.lang.func                 |
```

这里`idea`提示了剩下的代码，我们选`Function`就行了，接下来如下：

```
Opt.ofNullable(user).map(new Function<User, Object>() {
})
```

此处开始编译报错了，不要着急，我们这里根据具体操作选取返回值

例如我这里是想判断`user`是否为空，不为空时调用`getSchool`，从而获取其中的返回值`String`类型的`school`

我们就如下写法，将第二个泛型，也就是象征返回值的泛型改为`String`：

```
Opt.ofNullable(user).map(new Function<User, String>() {
})
```

然后我们使用`idea`的修复所有，默认快捷键`alt`+回车

```
Opt.ofNullable(user).map(new Function<User, String>() {
})                                                | 💡 Implement methods                  |  <-选我
                                                  | ✍  Introduce local variable          |
                                                  | ↩  Rollback changes in current line   |
```

选择第一个`Implement methods`即可，这时候弹出一个框，提示让你选择你想要实现的方法

这里就选择我们的`apply`方法吧，按下一个回车就可以了，或者点击选中`apply`，再按一下`OK`按钮

```
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

```
Opt.ofNullable(user).map(new Function<User, String>() {
    @Override
    public String apply(User user) {
        return null;
    }
})
```

这里重写的方法里面就写你自己的逻辑(别忘了补全后面的分号)

```
Opt.ofNullable(user).map(new Function<User, String>() {
    @Override
    public String apply(User user) {
        return user.getSchool();
    }
});
```

我们可以看到，上边的`new Function<User, String>()`变成了灰色

我们在它上面按一下`alt`+`enter`(回车)

```
Opt.ofNullable(user).map(new Function<User, String>() {
    @Override                              | 💡 Replace with lambda             > |  <-选我啦
    public String apply(User user) {       | 💡 Replace with method reference   > |
        return user.getSchool();           | 💎 balabala...                     > |
    }
});
```

选择第一个`Replace with lambda`，就会自动缩写为`lambda`啦

```
Opt.ofNullable(user).map(user1 -> user1.getSchool());
```

如果选择第二个，则会缩写为我们双冒号格式

```
Opt.ofNullable(user).map(User::getSchool);
```

看，是不是很简单！