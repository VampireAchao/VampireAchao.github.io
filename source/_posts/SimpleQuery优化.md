---
title: SimpleQuery优化
date: 2021-12-25 16:40:10
tags: java
---

> 做老实人，说老实话，干老实事，就是实事求是。——邓小平

今天又给`Mybatis-Plus`贡献了代码

https://gitee.com/baomidou/mybatis-plus/pulls/198

优化`SimpleQuery`,处理了值为空的情况：

之前的情况：

假设数据库中表数据：

| id   | name  |
| ---- | ----- |
| 1    | ruben |
| 2    | null  |

我们构建一个`Enitity`(向`miemie`大佬致敬)

```java
package com.baomidou.mybatisplus.test.rewrite;

import lombok.Data;

import java.io.Serializable;

/**
 * @author miemie
 * @since 2020-06-23
 */
@Data
public class Entity implements Serializable {
    private static final long serialVersionUID = 6962439201546719734L;

    private Long id;

    private String name;
}
```

使用`SimplerQuery`进行查询

```java
        Map<Long, String> idNameMap = SimpleQuery.map(Wrappers.lambdaQuery(), Entity::getId, Entity::getName);
```

期望的数据格式如下：

![输入图片说明](/imgs/oss/picGo/154819_90b81853_7413431.png "屏幕截图.png")

这样我就可以通过`idNameMap.get(1L)`获取到`id`为`1L`对应的表数据中`name`字段的值，非常便利

但是如果是之前的版本，则会抛出`NullPointerException`(下方简称`NPE`)

![输入图片说明](/imgs/oss/picGo/155225_453cbe05_7413431.png "屏幕截图.png")

原因是因为默认使用`Collectors#toMap`这个函数

![输入图片说明](/imgs/oss/picGo/155432_c36cf60a_7413431.png "屏幕截图.png")

它调用的是`HashMap#merge`

![输入图片说明](/imgs/oss/picGo/155546_560409c6_7413431.png "屏幕截图.png")

其中判断了如果`value`为空，则抛出`NPE`

![输入图片说明](/imgs/oss/picGo/155801_73c37965_7413431.png "屏幕截图.png")

而此处我期望的数据，它是允许`name`为`null`的

因此我进行了一点小修改：

![输入图片说明](/imgs/oss/picGo/160026_253210fa_7413431.png "屏幕截图.png")

![输入图片说明](/imgs/oss/picGo/160013_b8658c9a_7413431.png "屏幕截图.png")

然后再次执行，成功得到我们期望的值

![输入图片说明](/imgs/oss/picGo/160129_642fad16_7413431.png "屏幕截图.png")

还有一处修改，也是相同的道理，我期望得到如下结果：

这里获取到的`map`，`key`为表中的`name`，`value`则是对应`key`中`name`相同的数据组成的集合

为了方便测试，我再新增了一条数据：

```java
        // SqlHelper#getMapper是根据`entity`获取对应`mapper`的方法
        BaseMapper<Entity> mapper = SqlHelper.getMapper(Entity.class);
        Entity entity = new Entity();
        entity.setId(3L);
        entity.setName("ruben");
        mapper.insert(entity);
```

开始查询：

```java
        Map<String, List<Entity>> nameUsersMap = SimpleQuery.group(Wrappers.lambdaQuery(), Entity::getName);
```

期望结果如下：

![输入图片说明](/imgs/oss/picGo/160700_1224d336_7413431.png "屏幕截图.png")

实际还是抛出了`NPE`：

![输入图片说明](/imgs/oss/picGo/161143_7d2c5c59_7413431.png "屏幕截图.png")

这是因为原来使用的`Collectors#groupingBy`，它也对`key`进行了判空处理，实际上我们并不想丢掉这些数据

![输入图片说明](/imgs/oss/picGo/161644_f4c61188_7413431.png "屏幕截图.png")

![输入图片说明](/imgs/oss/picGo/161400_3eb7a778_7413431.png "屏幕截图.png")

因为可以根据`nameUsersMap.get(null)`去顺带获取`name`为`null`的数据，最起码，个别`name`为`null`的数据不能影响我取其他的值，说白了就是你别给我抛出`NPE`...

所以我又施展了一点小修改：

![输入图片说明](/imgs/oss/picGo/161807_e7fa6996_7413431.png "屏幕截图.png")

测试成功通过！

![输入图片说明](/imgs/oss/picGo/161912_07bffb1e_7413431.png "屏幕截图.png")