---
title: spel获取spring bean
date: 2022-10-19 13:19:40
tags: java
---

> 男人创造作品，而女人创造男人——罗曼·罗兰

代码如下：

```kotlin
package com.ruben.simpleboot

import org.junit.jupiter.api.Test
import org.springframework.beans.factory.BeanFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.context.expression.BeanFactoryResolver
import org.springframework.expression.spel.standard.SpelExpressionParser
import org.springframework.expression.spel.support.StandardEvaluationContext


/**
 * @author VampireAchao
 * @since 2022/10/18 17:08
 */
@SpringBootTest
class SPELTest {


    @Test
    fun test(@Autowired beanFactory: BeanFactory) {
        val expression = SpelExpressionParser()
            .parseExpression("1+(@userInfoMapper.limit(20L).size()+20)*4")
        val value = expression.getValue(StandardEvaluationContext().apply {
            setBeanResolver(BeanFactoryResolver(beanFactory))
        })
        print(value)
    }
}
```

