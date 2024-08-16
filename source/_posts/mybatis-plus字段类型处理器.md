---
title: mybatis-plus字段类型处理器
date: 2021-09-17 18:36:32
tags: java
---

> 人的一切痛苦，本质上都是对自己的无能的愤怒。——王小波

我们`clone`下来`mybatis-plus`官方示例项目：

```shell
https://gitee.com/baomidou/mybatis-plus-samples.git
```

首先看文档：

> - JSON 字段类型
>
> ```java
> @Data
> @Accessors(chain = true)
> @TableName(autoResultMap = true)
> public class User {
>     private Long id;
> 
>     ...
> 
> 
>     /**
>      * 注意！！ 必须开启映射注解
>      *
>      * @TableName(autoResultMap = true)
>      *
>      * 以下两种类型处理器，二选一 也可以同时存在
>      *
>      * 注意！！选择对应的 JSON 处理器也必须存在对应 JSON 解析依赖包
>      */
>     @TableField(typeHandler = JacksonTypeHandler.class)
>     // @TableField(typeHandler = FastjsonTypeHandler.class)
>     private OtherInfo otherInfo;
> 
> }
> ```
>
> 该注解对应了 XML 中写法为
>
> ```xml
> <result column="other_info" jdbcType="VARCHAR" property="otherInfo" typeHandler="com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler" />
> ```

文档表明，首先要加`@TableName(autoResultMap = true)`注解，然后再指定`typeHandler`

打开示例项目，可以看到确实如此

![image-20210917184019702](/imgs/oss/picGo/image-20210917184019702.png)

并且我们数据库表里的数据`wallets`字段为`json`

![image-20210917184806288](/imgs/oss/picGo/image-20210917184806288.png)

我们运行测试类测试一下：

得到的结果也是完美映射

![image-20210917184122076](/imgs/oss/picGo/image-20210917184122076.png)

可以看到我们这里也能自定义转换器

![image-20210917184222645](/imgs/oss/picGo/image-20210917184222645.png)

他这里是`jackson`的，如果我们要使用`fastjson`的，则可以继承`fastjsonTypeHandler`

```java
package com.baomidou.mybatisplus.samples.typehandler;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;
import com.baomidou.mybatisplus.extension.handlers.FastjsonTypeHandler;
import com.baomidou.mybatisplus.samples.typehandler.entity.Wallet;

import java.util.List;

/**
 * 自定义复杂类型处理器<br/>
 * 不要问我为什么要重写 parse 因为顶层父类是无法获取到准确的待转换复杂返回类型数据
 */
public class WalletListTypeFastJsonHandler extends FastjsonTypeHandler {
    public WalletListTypeFastJsonHandler(Class<?> type) {
        super(type);
    }

    @Override
    protected Object parse(String json) {
        return JSON.parseObject(json, new TypeReference<List<Wallet>>() {
        });
    }
}
```

测试了下，成功转换

![image-20210917184649445](/imgs/oss/picGo/image-20210917184649445.png)

