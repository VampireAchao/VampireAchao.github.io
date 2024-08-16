---
title: mybatis-plus自动填充
date: 2021-06-28 20:27:39
tags: java
---

> 遵守诺言就象保卫你的荣誉一样。——巴尔扎克

[官方文档](https://mp.baomidou.com/guide/auto-fill-metainfo.html)里说首先需要加`@TableField`注解并指定`fill`的值

![image-20210628211043626](/imgs/oss/picGo/image-20210628211043626.png)

对应的值在`com.baomidou.mybatisplus.annotation.FieldFill`这个枚举里

例如我这里`gmtCreate`字段需要在新增的时候自动填充，就使用`FieldFill.INSERT`

然而我需要让`gmtModified`字段在新增和修改的时候都自动填充，就使用`FieldFill.INSERT_UPDATE`

不过，加了注解后咱们还得去注入一个`com.baomidou.mybatisplus.core.handlers.MetaObjectHandler`

完整代码如下

```java
package com.ruben.simpleideaboot.config;

import com.baomidou.mybatisplus.annotation.DbType;
import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import com.baomidou.mybatisplus.core.handlers.StrictFill;
import com.baomidou.mybatisplus.core.toolkit.LambdaUtils;
import com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor;
import com.baomidou.mybatisplus.extension.plugins.inner.PaginationInnerInterceptor;
import com.ruben.simpleideaboot.pojo.User;
import org.apache.ibatis.reflection.MetaObject;
import org.apache.ibatis.reflection.property.PropertyNamer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.Arrays;

/**
 * mybatis-plus配置类
 *
 * @author <achao1441470436@gmail.com>
 * @since 2021/5/20 0020 9:29
 */
@Configuration
public class MybatisPlusConfig {

    /**
     * 分页拦截器
     *
     * @author <achao1441470436@gmail.com>
     * @since 2021/5/20 0020 9:29
     */
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        PaginationInnerInterceptor innerInterceptor = new PaginationInnerInterceptor(DbType.MYSQL);
        // 设置请求的页面大于最大页后操作， true调回到首页，false 继续请求  默认false
        innerInterceptor.setOverflow(true);
        // 最大分页限制200条
        innerInterceptor.setMaxLimit(200L);
        interceptor.addInnerInterceptor(innerInterceptor);
        return interceptor;
    }

    @Bean
    public MetaObjectHandler metaObjectHandler() {
        return new MetaObjectHandler() {
            /**
             * 插入元对象字段填充（用于插入时对公共字段的填充）
             *
             * @param metaObject 元对象
             */
            @Override
            public void insertFill(MetaObject metaObject) {
                // 不止一种写法
                this.strictInsertFill(findTableInfo(metaObject), metaObject,
                        Arrays.asList(
                                // 从User::getGmtCreate拿到属性gmtCreate，然后调用LocalDateTime.now()填充
                                StrictFill.of(PropertyNamer.methodToProperty(LambdaUtils.resolve(User::getGmtCreate)
                                        .getImplMethodName()), LocalDateTime::now, LocalDateTime.class),
                                // 填充LocalDateTime.now()进gmtModified对应字段
                                StrictFill.of("gmtModified", LocalDateTime.class, LocalDateTime.now())
                        ));
            }

            /**
             * 更新元对象字段填充（用于更新时对公共字段的填充）
             *
             * @param metaObject 元对象
             */
            @Override
            public void updateFill(MetaObject metaObject) {
                // 填充LocalDateTime.now()进gmtModified对应字段，这里是一行写法,中间参数可缩写为LocalDateTime::now
                this.strictUpdateFill(metaObject, "gmtModified", () -> LocalDateTime.now(), LocalDateTime.class);
            }
        };
    }


}
```

然后调用`insert`方法或者`update`方法就会自动更新上去啦
