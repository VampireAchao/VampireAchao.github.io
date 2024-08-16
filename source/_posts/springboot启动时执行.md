---
title: springboot启动时执行
date: 2020-10-15 20:12:17
tags: java
---

> 人生就象弈棋，一步失误，全盘皆输，这是令人悲哀之事；而且人生还不如弈棋，不可能再来一局，也不能悔棋。——弗洛伊德

`springboot`在启动时需要执行的代码

可以实现`CommandLineRunner`接口然后重写`run`方法，在`run`方法里执行

```java
package com.ruben.init;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * @ClassName: SomeMagic
 * @Date: 2020/10/15 0015 20:15
 * @Description:
 */
@Component
public class SomeMagic implements CommandLineRunner {
    @Override
    public void run(String... args) throws Exception {
        System.out.println("启动完成");
    }
}
```

这样启动后就会输出`启动完成`了