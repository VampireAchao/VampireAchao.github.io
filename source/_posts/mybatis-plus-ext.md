---
title: mybatis-plus-ext
date: 2024-03-08 20:51:34
tags: java
---

> 教育不是注满一桶水，而是点燃一把火。 ——叶芝

分享一个最近加入`dromara`的`orm`

[mybatis-plus-ext: mybatis-plus框架的拓展包，在框架原有基础上做了进一步的轻度封装，增强内容：免手写Mapper、多数据源自动建表、数据自动填充、自动关联查询、冗余数据自动更新、动态查询条件等。](https://gitee.com/dromara/mybatis-plus-ext)

文档：

[Mybatis-Plus-Ext教程 · 语雀](https://www.yuque.com/dontang/codewiki/gzqgd8)

mybatis-plus框架的拓展包，在框架原有基础上做了进一步的轻度封装，增强内容：免手写Mapper、多数据源自动建表、数据自动填充、自动关联查询、冗余数据自动更新、动态查询条件等。

       尽管[MybatisPlus](https://gitee.com/baomidou/mybatis-plus) （后文简称MP）相比较Mybatis丝滑了很多，但是，日常使用中，是否偶尔仍会怀念JPA（Hibernate）的那种纵享丝滑的感受，更好的一心投入业务开发中，如果你也是如此，那么恭喜你发现了MybatisPlusExt（后文简称MPE）。

       MPE对MP做了进一步的拓展封装，即保留MP原功能，又添加更多有用便捷的功能。同样坚持与MP对Mybatis的原则，只做增强不做改变，所以，即便是在使用MPE的情况下，也完全可以百分百的使用MP的方式，因此MP能做的，MPE不仅能做还能做的更多。

       增强功能具体体现在几个方面：自动建表([auto-table](https://gitee.com/tangzc/auto-table))、数据自动填充（类似JPA中的审计）、关联查询（类似sql中的join）、冗余数据自动更新、动态条件等功能做了补充完善。
