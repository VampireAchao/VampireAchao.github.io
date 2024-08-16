---
title: mybatis-plus乐观锁
date: 2021-09-19 23:23:37
tags: java
---

> 青，取之于蓝而青于蓝;冰，水为之而寒于水。 ——《荀子·劝学》

同样还是`mybatis-plus`官方示例项目

此处乐观锁不同于悲观锁的区别是，它只有在真正执行数据库操作的时候才去进行判断是否重复修改

需要指定一个字段作为版本号，使用`@Version`注解

官方文档中如此描述：

> > 当要更新一条记录的时候，希望这条记录没有被别人更新
> > 乐观锁实现方式：
> >
> > > - 取出记录时，获取当前version
> > > - 更新时，带上这个version
> > > - 执行更新时， set version = newVersion where version = oldVersion
> > > - 如果version不对，就更新失败
>
> **乐观锁配置需要两步**
>
> ### [#](https://mp.baomidou.com/guide/interceptor-optimistic-locker.html#_1-配置插件)1.配置插件
>
> spring xml方式:
>
> ```xml
> <bean class="com.baomidou.mybatisplus.extension.plugins.inner.OptimisticLockerInnerInterceptor" id="optimisticLockerInnerInterceptor"/>
> 
> <bean id="mybatisPlusInterceptor" class="com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor">
>     <property name="interceptors">
>         <list>
>             <ref bean="optimisticLockerInnerInterceptor"/>
>         </list>
>     </property>
> </bean>
> ```
>
> spring boot注解方式:
>
> ```java
> @Bean
> public MybatisPlusInterceptor mybatisPlusInterceptor() {
>     MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
>     interceptor.addInnerInterceptor(new OptimisticLockerInnerInterceptor());
>     return interceptor;
> }
> ```
>
> ### [#](https://mp.baomidou.com/guide/interceptor-optimistic-locker.html#_2-在实体类的字段上加上-version注解)2.在实体类的字段上加上`@Version`注解
>
> ```java
> @Version
> private Integer version;
> ```
>
> 说明:
>
> - **支持的数据类型只有:int,Integer,long,Long,Date,Timestamp,LocalDateTime**
> - 整数类型下 `newVersion = oldVersion + 1`
> - `newVersion` 会回写到 `entity` 中
> - 仅支持 `updateById(id)` 与 `update(entity, wrapper)` 方法
> - **在 `update(entity, wrapper)` 方法下, `wrapper` 不能复用!!!**
>
> 示例：
>
> ```java
> // Spring Boot 方式
> @Configuration
> @MapperScan("按需修改")
> public class MybatisPlusConfig {
>     /**
>      * 旧版
>      */
>     @Bean
>     public OptimisticLockerInterceptor optimisticLockerInterceptor() {
>         return new OptimisticLockerInterceptor();
>     }
>     
>     /**
>      * 新版
>      */
>     @Bean
>     public MybatisPlusInterceptor mybatisPlusInterceptor() {
>         MybatisPlusInterceptor mybatisPlusInterceptor = new MybatisPlusInterceptor();
>         mybatisPlusInterceptor.addInnerInterceptor(new OptimisticLockerInnerInterceptor());
>         return mybatisPlusInterceptor;
>     }
> }
> ```

我们可以试着运行一下官方`demo`

可以看到这里执行`update`操作时，`where`条件自动带上了`version`字段

![image-20210920000737958](/imgs/oss/picGo/image-20210920000737958.png)

我们的`version`字段在修改时会自动加一，多用于加积分、减库存等场景

![image-20210920001347537](/imgs/oss/picGo/image-20210920001347537.png)

![image-20210920001421317](/imgs/oss/picGo/image-20210920001421317.png)
