---
title: lombok的Tolerate注解
date: 2022-03-29 13:18:45
tags: java
---

> 一年好景君须记，最是橙黄橘绿时。——苏轼

这个注解就像它的名字一样：

`@Tolerate`：包容、宽容

用法很简单，例如此处场景：

```java
package com.ruben.simplescaffold.pojo.vo;

import java.io.Serializable;

import lombok.Builder;
import lombok.Data;

/**
 * 用户VO
 *
 * @author <achao1441470436@gmail.com>
 * @since 2022/3/23 19:20
 */
@Data
@Builder
public class UserVO implements Serializable {

    private static final long serialVersionUID = -6541515410807361292L;

    private String uname;

    private String pwd;

}
```

这是一个很简单的`pojo`，额外加了一个[`@Builder`注解](https://VampireAchao.github.io/2020/11/08/%E5%BB%BA%E9%80%A0%E8%80%85%E6%A8%A1%E5%BC%8F/)

但此处我们发现其生成后没有无参构造

![image-20220329132439079](/imgs/oss/picGo/image-20220329132439079.png)

如果我们需要无参构造，就得加一个`@NoArgsConstructor`

加完发现，`@Builder`需要的全参构造无法生成

![image-20220329134907127](/imgs/oss/picGo/image-20220329134907127.png)

糟糕，那不是还得加一个`@AllArgsConstructor`？这样确实能解决问题，但我们这里就会出现一大堆注解，很丑

![image-20220329135016610](/imgs/oss/picGo/image-20220329135016610.png)

这时候我们就可以使用包容注解`@Tolerate`

我们只需要手动编写一个无参构造，再加上注解

![image-20220329135234531](/imgs/oss/picGo/image-20220329135234531.png)

成功编译并兼容`@Builder`！
