---
title: mybatis-plus随机查询工具类(二)
date: 2021-08-10 22:41:54
tags: java
---

> 当真理还正在穿鞋的时候，谎言就能走遍半个世界。——马克吐温

[之前写过一个](https://VampireAchao.github.io/2021/05/17/mybatis-plus%E9%9A%8F%E6%9C%BA%E6%9F%A5%E8%AF%A2%E5%B7%A5%E5%85%B7%E7%B1%BB/)，最近感觉不好用

然后写了一个更优雅的

```java
    /**
     * 随机查询
     *
     * @param mapper 持久层DAO
     * @param limit  随机条数
     * @return java.util.List<T>
     * @author <achao1441470436@gmail.com>
     * @since 2021/8/10 15:30
     */
    public static <T> List<T> getAny(BaseMapper<T> mapper, T condition, Integer limit) {
        LambdaQueryWrapper<T> wrapper = Wrappers.lambdaQuery(condition);
        Integer total = mapper.selectCount(wrapper);
        if (limit == null || limit <= 0 || total == 0) {
            return Collections.emptyList();
        }
        List<T> list = Optional.of(limit).filter(l -> l > total).map(l -> mapper.selectList(wrapper)).orElseGet(() -> mapper.selectList(wrapper.last("LIMIT " + new SecureRandom().nextInt(total - (limit - 1)) + "," + limit)));
        Collections.shuffle(list);
        return list;
    }
```

使用方式同样很简单

![image-20210810224358310](/imgs/oss/picGo/image-20210810224358310.png)

两个例子：

![image-20210810224423293](/imgs/oss/picGo/image-20210810224423293.png)

调用方传入对应的`DAO`和条件参数以及`limit`随机获取的条数即可

