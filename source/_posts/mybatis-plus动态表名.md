---
title: mybatis-plus动态表名
date: 2021-07-14 22:59:05
tags: java
---

> 却是平流无石处，时时闻说有沉沦。——唐•杜荀鹤

配置

```java
 	@Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        DynamicTableNameInnerInterceptor dynamicTableNameInnerInterceptor = new DynamicTableNameInnerInterceptor();
        HashMap<String, TableNameHandler> map = new HashMap<String, TableNameHandler>(2) {{
            put("user", (sql, tableName) -> {
                String year = "_2018";
                int random = new Random().nextInt(10);
                if (random % 2 == 1) {
                    year = "_2019";
                }
                return tableName + year;
            });
        }};
        dynamicTableNameInnerInterceptor.setTableNameHandlerMap(map);
        interceptor.addInnerInterceptor(dynamicTableNameInnerInterceptor);
        return interceptor;
    }
```

完整配置类

```java
package com.ruben.simpleideaspringboot.config;

import com.baomidou.mybatisplus.annotation.DbType;
import com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor;
import com.baomidou.mybatisplus.extension.plugins.handler.TableNameHandler;
import com.baomidou.mybatisplus.extension.plugins.inner.BlockAttackInnerInterceptor;
import com.baomidou.mybatisplus.extension.plugins.inner.DynamicTableNameInnerInterceptor;
import com.baomidou.mybatisplus.extension.plugins.inner.PaginationInnerInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.security.SecureRandom;
import java.util.HashMap;

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
        PaginationInnerInterceptor paginationInnerInterceptor = new PaginationInnerInterceptor(DbType.MYSQL);
        // 阻止全表更新与删除
        BlockAttackInnerInterceptor blockAttackInnerInterceptor = new BlockAttackInnerInterceptor();
        // 设置请求的页面大于最大页后操作， true调回到首页，false 继续请求  默认false
        paginationInnerInterceptor.setOverflow(true);
        paginationInnerInterceptor.setMaxLimit(200L);
        DynamicTableNameInnerInterceptor dynamicTableNameInnerInterceptor = new DynamicTableNameInnerInterceptor();
        HashMap<String, TableNameHandler> map = new HashMap<String, TableNameHandler>(2) {{
            put("user", (sql, tableName) -> {
                String year = "_2018";
                int random = new SecureRandom().nextInt(10);
                if (random % 2 == 1) {
                    year = "_2019";
                }
                return tableName + year;
            });
        }};
        dynamicTableNameInnerInterceptor.setTableNameHandlerMap(map);
        interceptor.addInnerInterceptor(dynamicTableNameInnerInterceptor);
        interceptor.addInnerInterceptor(paginationInnerInterceptor);
        interceptor.addInnerInterceptor(blockAttackInnerInterceptor);
        return interceptor;
    }


}
```

我们这里把`user`表名替换成`user_2018`或者`user_2019`随机

演示如下，我们原本表名为`user`，执行查询后可以看到替换成了`user_2018`

![image-20210714230120219](/imgs/oss/picGo/image-20210714230120219.png)

再次执行变成了`user_2019`

![image-20210714230218112](/imgs/oss/picGo/image-20210714230218112.png)
