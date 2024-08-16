---
title: '@SafeVarargs'
date: 2021-10-21 18:25:52
tags: java
---

> 不管怎样的事情，都请安静地愉快吧！这是人生。我们要依样地接受人生，勇敢地大胆地，而且永远地微笑着——卢森堡

前两天给`mybatis-plus`贡献了代码

https://gitee.com/baomidou/mybatis-plus/pulls/192

这里用到了一个注解`SafeVarargs`

我们在使用动态参数+泛型的时候，会提示`来自形参化 vararg 类型的可能的堆污染 `

例如：

![image-20211021154320305](/imgs/oss/picGo/image-20211021154320305.png)

我们这里加上`@SafeVarargs`后发现它只能加在`final`或者`static`修饰的方法上：

![image-20211021154456182](/imgs/oss/picGo/image-20211021154456182.png)

不加的话会编译错误

![image-20211021154513912](/imgs/oss/picGo/image-20211021154513912.png)

再放几个例子吧：

```java
package com.ruben.simplescaffold;


import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

/**
 * 测试类
 *
 * @author <achao1441470436@gmail.com>
 * @since 2021/7/11 0011 18:09
 */
public class Tests {

    @Test
    void contextLoads() {
    }

    @SafeVarargs
    static void function(List<String>... stringLists) {
    }

    abstract static class BaseUser implements UserInterface {

        @SafeVarargs
        final <T> void gamma(T... ts) {
        }

        @Override
        @SafeVarargs
        public final void method(Optional<Object>... optionals) {
            UserInterface.super.method(optionals);
        }
    }

    interface UserInterface {

        default void method(Optional<Object>... optionals) {
        }

        @SafeVarargs
        static <T> void gamma(Class<T>... classes) {
        }
    }

}
```

