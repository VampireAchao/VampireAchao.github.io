---
title: 实用API设计案例
date: 2021-08-16 20:22:45
tags: java
---

> 艺术生永远不要把学技巧放在第一位，而要把怎么思考放在第一位。——灵遁者

今天为了偷懒，写了两个函数

```java
    /**
     * AR模式in查询
     *
     * @param page 分页参数
     * @param ids  ids
     * @param type Class
     * @return com.baomidou.mybatisplus.extension.plugins.pagination.Page<T>
     * @author <achao1441470436@gmail.com>
     * @since 2021/8/16 16:21
     */
    @SneakyThrows
    public static <T extends BaseEntity<T>> IPage<T> selectPageByIds(IPage<T> page, List<?> ids, Class<T> type) {
        if (ids.isEmpty()) {
            return page;
        }
        return type.newInstance().selectPage(page, new LambdaQueryWrapper<>(type.newInstance()).in(T::getId, ids));
    }
```

这里用到了`AR`模式，`AR`模式我之前博客写过，就不赘述了

[`AR`模式文章戳我](https://VampireAchao.github.io/2021/08/12/ActiveRecord/)

看上去就两三行，但这个函数能应对我此处的需求：查询我的关注企业/收藏资讯/收藏产品列表等

然后我在`service`中调用如下：

```java
    /**
     * 我的关注/收藏
     *
     * @param page          分页参数
     * @param userAttention 查询条件
     * @return com.ruben.zsxh.pojo.common.Result
     * @author <achao1441470436@gmail.com>
     * @since 2021/8/16 15:51
     */
    @Override
    @Transactional(readOnly = true, propagation = Propagation.NOT_SUPPORTED)
    public Result mine(Page page, UserAttention userAttention) {
        userAttention.setUserId(Long.valueOf(ProfileHolder.getProfile().getId()));
        List<Long> ids = list(Wrappers.lambdaQuery(userAttention).select(UserAttention::getAttentionId)).parallelStream().map(UserAttention::getAttentionId).collect(Collectors.toList());
        return Result.ok().data(MybatisPlusUtils.selectPageByIds(page, ids, userAttention.getType().getTypeClass()));
    }
```

这里第一行是给参数赋值，便于作为下方查询条件

```java
		userAttention.setUserId(Long.valueOf(ProfileHolder.getProfile().getId()));
```

第二行是从表内根据条件查询出关联数据

例如这里`service`的第二行是：在`userAttention`中调用`UserAttention::getUserId`，并以`user_id=userId`作为`where`条件，在对应的数据库表名为`user_attention`中取出`attention_id`，但`mybatis-plus`的`selectList`返回的是`UserAttention`，所以我们再使用并行流转换为`attentionId`

```java
		List<Long> ids = list(Wrappers.lambdaQuery(userAttention).select(UserAttention::getAttentionId)).parallelStream().map(UserAttention::getAttentionId).collect(Collectors.toList());
```

最后拿到的返回值就是`attentionId`的集合，然后这个`ids`是用于关联其他表的

最后第三行中我们写法如下：

```java
		return Result.ok().data(MybatisPlusUtils.selectPageByIds(page, ids, userAttention.getType().getTypeClass()));
```

这里调用了我们上面的`selectPageByIds`，然后传入了

`page`：分页参数

`ids`：上方获取到`attentionId`的集合

`userAttention.getType().getTypeClass()`：这个对应了一个枚举如下：

```java
package com.ruben.zsxh.enumration.type;

import com.ruben.zsxh.entity.ArticleInfo;
import com.ruben.zsxh.entity.MemberInfo;
import com.ruben.zsxh.entity.ProductInfo;
import com.ruben.zsxh.pojo.common.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 用户关注类型
 *
 * @author <achao1441470436@gmail.com>
 * @since 2021/8/16 14:46
 */
@Getter
@AllArgsConstructor
public enum UserAttentionTypeEnum {
    /**
     * Cheating the compiler.
     */
    MEMBER("关注企业", MemberInfo.class),
    NEWS("收藏资讯", ArticleInfo.class),
    PRODUCT("收藏商品", ProductInfo.class);


    private final String desc;
    private final Class<? extends BaseEntity> typeClass;
}
```

然后我们再配置[`mvc`配置`fastjson`序列化枚举](https://VampireAchao.github.io/2021/08/09/mvc%E9%85%8D%E7%BD%AEfastjson%E5%BA%8F%E5%88%97%E5%8C%96%E6%9E%9A%E4%B8%BE/)以及[`Mybatis-plus`通用枚举](https://VampireAchao.github.io/2021/08/08/MybatisPlus%E9%80%9A%E7%94%A8%E6%9E%9A%E4%B8%BE/)之后

再到`Controller`中调用`service`

```java
    /**
     * 查询我的列表
     *
     * @param page 分页参数?size=10&current=1
     * @return 分页结果
     * @author <achao1441470436@gmail.com>
     * @since 2021-08-09
     */
    @GetMapping("mine")
    public Result mine(Page page, UserAttention userAttention) {
        return userAttentionService.mine(page, userAttention);
    }
```

最后就能实现传入不同的`type`，分页拿到不同表的数据

例如传入`MEMBER`

![image-20210816205823714](/imgs/oss/picGo/image-20210816205823714.png)

传入`NEWS`

![image-20210816205913153](/imgs/oss/picGo/image-20210816205913153.png)

传入`PRODUCT`

![image-20210816205946379](/imgs/oss/picGo/image-20210816205946379.png)

这样就能用最少的代码做最多的事，达到事半功倍的效果

