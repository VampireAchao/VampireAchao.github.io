---
title: MP字段更新策略
date: 2022-10-14 13:18:00
tags: java
---

> 看不见河底就不要涉水而过——佚名

之前写过[mybatis-plus部分更新](https://VampireAchao.github.io/2021/08/28/mybatis-plus部分更新/)

今天分享一个注解式配置的

添加`@TableField(updateStrategy = FieldStrategy.IGNORED)`

即可在更新时，忽略判空，强制更新

例如：

```java
package com.ruben.simpleboot.pojo.po;

import com.baomidou.mybatisplus.annotation.*;
import com.ruben.simpleboot.pojo.common.BaseRecycleEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

/**
 * UserInfo
 *
 * @author VampireAchao
 * @since 2022/5/21
 */
@Data
public class UserInfo{
    private Long id;
    @TableField(updateStrategy = FieldStrategy.IGNORED)
    private String email;
}
```

更新时：

![image-20221014132105382](/imgs/oss/picGo/image-20221014132105382.png)

可以看到成功更新`email`为`null`值
