---
title: '@ModelAttribute'
date: 2020-12-23 20:34:36
tags: java
---

> 

> 小人之过也必文。——《论语》

如果我们需要在`controller`执行前做一些事情，除了使用`AOP`外，我们还可以使用`@ModelAttribute`注解

被`@ModelAttribute`注解的方法会在`controller`执行前执行并把结果传递给了下面`controller`里我们注解的参数

实际开发中可以用来鉴权、过滤参数等

```
package com.ruben.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @ClassName: ModelController
 * @Description: 我还没有写描述
 * @Date: 2020/12/23 0023 20:36
 * *
 * @author: <achao1441470436@gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
@RestController
@RequestMapping("model")
public class ModelController {

    @ModelAttribute
    public String getWords() {
        return "ruben";
    }

    @GetMapping("whoIsAuthor")
    public String whoIsAuthor(@ModelAttribute String word) {
        return word;
    }

}
```

![image-20201223205811650](/imgs/oss/picGo/image-20201223205811650.png)