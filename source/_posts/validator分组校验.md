---
title: validator分组校验
date: 2020-12-07 20:10:38
tags: java
---

> 当生活像一首歌那样轻快流畅时，笑颜常开乃易事；而在一切事都不妙时仍能微笑的人，是真正的乐观。——威尔科克斯

之前写过一篇[`springboot`实现`validator`校验](https://VampireAchao.github.io/2020/08/15/springboot%E5%AE%9E%E7%8E%B0Validator%E6%A0%A1%E9%AA%8C/)

今天进行一个补充

我们可以使用分组校验

首先是我们可以定义一个接口在我们的实现类里

![image-20201207201407118](/imgs/oss/picGo/image-20201207201407118.png)

然后在我们需要分组校验的注解上给上`groups`参数

![image-20201207201524313](/imgs/oss/picGo/image-20201207201524313.png)

最后在`controller`上也给我们的`@Validated`注解加上我们的分组参数

![image-20201207201844586](/imgs/oss/picGo/image-20201207201844586.png)

最后运行就只会校验我们分组的参数

那如果有这么一种场景：一个接口，传入`Id`时修改，不传入`Id`时新增，修改和新增又是不同的校验的话，我们该怎么处理呢？

其实很简单，我们可以注入一个`Validator`，然后在代码里进行分组校验

![image-20201207202801868](/imgs/oss/picGo/image-20201207202801868.png)

```java
package com.ruben;

import com.ruben.pojo.User;
import com.ruben.utils.SpringContextHolder;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.DependsOn;

import javax.annotation.Resource;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.Validator;
import java.util.Objects;
import java.util.Set;

@SpringBootTest
@DependsOn("SpringContextHolder")
class SimpleSpringbootApplicationTests {

    @Resource
    private Validator validator;

    @Test
    void test() {
        User user = User.builder().build();
        // 校验结果
        Set<ConstraintViolation<User>> checkResult;
        if (Objects.isNull(user.getId())) {
            // id为空，新增校验
            checkResult = validator.validate(user, User.AddCheck.class);
        } else {
            // id不为空，修改校验
            checkResult = validator.validate(user, User.UpdateCheck.class);
        }
        if (!checkResult.isEmpty()) {
            // 这里可以抛异常，让全局异常处理器去处理我们的异常
            throw new ConstraintViolationException(checkResult);
        }
    }

}
```

