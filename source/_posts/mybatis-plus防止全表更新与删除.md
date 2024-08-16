---
title: mybatis-plus防止全表更新与删除
date: 2021-07-10 21:58:20
tags: java
---

> 宁要好梨一个，不要烂梨一筐。积极肯干和忠心耿耿的人即使只有两三个，也比十个朝气沉沉的人强。——列宁

我们可以如下配置

```java
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        PaginationInnerInterceptor paginationInnerInterceptor = new PaginationInnerInterceptor(DbType.MYSQL);
        // 阻止全表更新与删除
        BlockAttackInnerInterceptor blockAttackInnerInterceptor = new BlockAttackInnerInterceptor();
        // 设置请求的页面大于最大页后操作， true调回到首页，false 继续请求  默认false
        paginationInnerInterceptor.setOverflow(true);
        paginationInnerInterceptor.setMaxLimit(200L);
        interceptor.addInnerInterceptor(paginationInnerInterceptor);
        interceptor.addInnerInterceptor(blockAttackInnerInterceptor);
        return interceptor;
    }
```

主要的是这个`BlockAttackInnerInterceptor`

然后我们试着全表更新

![image-20210710220342335](/imgs/oss/picGo/image-20210710220342335.png)

然后是全表删除

![image-20210710220407267](/imgs/oss/picGo/image-20210710220407267.png)

发现都操作不了了
