---
title: MybatisPlus自动填充忽略存在值直接填充
date: 2024-06-24 23:08:24
tags: java
---

> 再也无需前思后想，一切岂非已然过往。——《且听风吟》

代码如下，主要是重写`strictFillStrategy`方法

```java
import cn.dev33.satoken.stp.StpUtil;
import cn.hutool.core.lang.Opt;
import com.baomidou.mybatisplus.core.MybatisConfiguration;
import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import com.baomidou.mybatisplus.core.handlers.StrictFill;
import com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor;
import com.baomidou.mybatisplus.extension.plugins.inner.BlockAttackInnerInterceptor;
import com.baomidou.mybatisplus.extension.plugins.inner.OptimisticLockerInnerInterceptor;
import com.baomidou.mybatisplus.extension.plugins.inner.PaginationInnerInterceptor;
import org.apache.ibatis.reflection.MetaObject;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.function.Supplier;

@Configuration
@ConditionalOnClass(MybatisConfiguration.class)
public class MyBatisPlusConfiguration {

    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        // 防止全表更新与删除
        interceptor.addInnerInterceptor(new BlockAttackInnerInterceptor());
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor());
        interceptor.addInnerInterceptor(new OptimisticLockerInnerInterceptor());
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
                this.strictInsertFill(findTableInfo(metaObject), metaObject, List.of(
                        StrictFill.of("createAt", LocalDateTime.class, LocalDateTime.now()),
                        StrictFill.of("updateAt", LocalDateTime.class, LocalDateTime.now()),
                        StrictFill.of("createBy", () -> Opt.ofTry(StpUtil::getLoginIdAsLong).get(), Long.class),
                        StrictFill.of("updateBy", () -> Opt.ofTry(StpUtil::getLoginIdAsLong).get(), Long.class)
                ));
            }

            /**
             * 更新元对象字段填充（用于更新时对公共字段的填充）
             *
             * @param metaObject 元对象
             */
            @Override
            public void updateFill(MetaObject metaObject) {
                this.strictUpdateFill(findTableInfo(metaObject), metaObject, List.of(
                        StrictFill.of("updateAt", LocalDateTime.class, LocalDateTime.now()),
                        StrictFill.of("updateBy", () -> Opt.ofTry(StpUtil::getLoginIdAsLong).get(), Long.class)
                ));
            }

            @Override
            public MetaObjectHandler strictFillStrategy(MetaObject metaObject, String fieldName, Supplier<?> fieldVal) {
                Object obj = fieldVal.get();
                if (Objects.nonNull(obj)) {
                    metaObject.setValue(fieldName, obj);
                }
                return this;
            }
        };
    }

}
```
