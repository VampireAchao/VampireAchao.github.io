---
title: hutool动态编译+lombok
date: 2022-09-12 09:32:43
tags: java
---

> 显示出对别人的欢乐不屑一顾的样子，那是侮辱了别人——玛格丽特·尤瑟纳尔

这里采取了一种讨巧的方式避开了需求，实现了效果

思路是使用`lombok`官方自带的`delombok`进行处理：

见：https://gitee.com/dromara/hutool/issues/I56DED

`delombok`官方文档：https://projectlombok.org/features/delombok

代码如下：

```java
package com.ruben;

import cn.hutool.core.compiler.CompilerUtil;
import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.ReflectUtil;
import cn.hutool.core.util.RuntimeUtil;
import cn.hutool.core.util.StrUtil;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

/**
 * Test
 *
 * @author VampireAchao
 * @since 2022/9/11
 */
class TestLombokCompile {

    @Test
    void testCompile() throws ClassNotFoundException {
        String lombokJarPath = FileUtil.getAbsolutePath("lib/lombok-1.18.24.jar");
        final ClassLoader classLoader = CompilerUtil.getCompiler(null)
                .addSource("pojo.User", RuntimeUtil.execForStr(StrUtil.format("java -jar {} delombok target/test-classes/pojo/User.java -p", lombokJarPath)))
                .compile();
        final Class<?> clazz = classLoader.loadClass("pojo.User");
        final Object obj = ReflectUtil.newInstance(clazz);
        ReflectUtil.invoke(obj, "setName", "VampireAchao");
        Assertions.assertEquals("VampireAchao", ReflectUtil.invoke(obj, "getName"));
    }

}
```

![输入图片说明](/imgs/oss/blog/0a5e90a6_7413431.png)