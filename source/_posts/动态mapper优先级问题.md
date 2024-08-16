---
title: 动态mapper优先级问题
date: 2023-03-18 22:56:17
tags: java
---

> 甚至不愿听朋友说真话的人，是真正不可救药的人——西塞罗

之前使用[byte-buddy实现mybatis-plus动态mapper](https://VampireAchao.github.io/2023/01/11/byte-buddy实现mybatis-plus动态mapper/)

但是使用过程中发现一个问题，相关的`issue`链接：

https://gitee.com/VampireAchao/stream-query/issues/I6EJ27

在项目中已经定义了`Mapper`，如果在动态`mapper`已经注入的情况下，没法再通过`Database.execute`方法拿到，而是拿到的动态`Mapper`

进而导致大部分只要是基于`execute`方法的函数都是这样

于是为了解决这个问题，在`DefaultSqlInjector`处进行了处理

在`io.github.vampireachao.stream.plugin.mybatisplus.engine.configuration.StreamPluginAutoConfiguration`下，当前的代码如下：

```java
package io.github.vampireachao.stream.plugin.mybatisplus.engine.configuration;

import com.baomidou.mybatisplus.core.injector.AbstractMethod;
import com.baomidou.mybatisplus.core.injector.DefaultSqlInjector;
import com.baomidou.mybatisplus.core.mapper.Mapper;
import com.baomidou.mybatisplus.core.metadata.TableInfo;
import com.baomidou.mybatisplus.core.metadata.TableInfoHelper;
import com.baomidou.mybatisplus.core.toolkit.ReflectionKit;
import io.github.vampireachao.stream.core.lambda.LambdaHelper;
import io.github.vampireachao.stream.core.reflect.ReflectHelper;
import io.github.vampireachao.stream.plugin.mybatisplus.Database;
import io.github.vampireachao.stream.plugin.mybatisplus.engine.enumration.SqlMethodEnum;
import io.github.vampireachao.stream.plugin.mybatisplus.engine.methods.SaveOneSql;
import io.github.vampireachao.stream.plugin.mybatisplus.engine.methods.UpdateOneSql;
import org.apache.ibatis.builder.MapperBuilderAssistant;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.core.annotation.Order;

import java.util.List;

/**
 * MPSql注入
 *
 * @author VampireAchao Cizai_
 */
public class StreamPluginAutoConfiguration {

    private static final String CURRENT_NAMESPACE = LambdaHelper.getPropertyName(TableInfo::getCurrentNamespace);

    /**
     * <p>defaultSqlInjector.</p>
     *
     * @return a {@link com.baomidou.mybatisplus.core.injector.DefaultSqlInjector} object
     */
    @Bean
    @Order
    @ConditionalOnMissingBean(DefaultSqlInjector.class)
    public DefaultSqlInjector defaultSqlInjector() {
        return new DefaultSqlInjector() {
            @Override
            public List<AbstractMethod> getMethodList(Class<?> mapperClass, TableInfo tableInfo) {
                List<AbstractMethod> methodList = super.getMethodList(mapperClass, tableInfo);
                methodList.add(new SaveOneSql(SqlMethodEnum.SAVE_ONE_SQL.getMethod()));
                methodList.add(new UpdateOneSql(SqlMethodEnum.UPDATE_ONE_SQL.getMethod()));
                return methodList;
            }

            @Override
            public void inspectInject(MapperBuilderAssistant builderAssistant, Class<?> mapperClass) {
                super.inspectInject(builderAssistant, mapperClass);
                Class<?> modelClass = ReflectionKit.getSuperClassGenericType(mapperClass, Mapper.class, 0);
                if (modelClass == null) {
                    return;
                }
                TableInfo tableInfo = TableInfoHelper.initTableInfo(builderAssistant, modelClass);
                if (Database.isDynamicMapper(tableInfo.getCurrentNamespace()) &&
                        !mapperClass.getName().equals(tableInfo.getCurrentNamespace())) {
                    // 降低动态mapper优先级
                    ReflectHelper.setFieldValue(tableInfo, CURRENT_NAMESPACE, mapperClass.getName());
                }
                if (!Database.isDynamicMapper(mapperClass.getName())) {
                    Database.getEntityMapperClassCache().put(modelClass, mapperClass);
                }
            }
        };
    }

}

```

这里重写了`inspectInject`方法，判断了当前如果`tableInfo`内存入的是动态`mapper`，且两个`mapper`的类名不一致，则使用反射修改掉`tableInfo`的`currentNamespace`

进而使得优先获取到的是项目中的`Mapper`

相关的单元测试用例如下：

```java
    @Test
    @SuppressWarnings("unchecked")
    void testMapperPriority() {
        try (SqlSession sqlSession = SqlHelper.sqlSession(UserInfo.class)) {
            IMapper<UserInfo> userMapper = Database.getMapper(UserInfo.class, sqlSession);
            MybatisMapperProxy<UserInfoMapper> userMapperProxy =
                    (MybatisMapperProxy<UserInfoMapper>) Proxy.getInvocationHandler(userMapper);
            Class<UserInfoMapper> userMapperClass = ReflectHelper.getFieldValue(userMapperProxy, "mapperInterface");
            Assertions.assertEquals(UserInfoMapper.class, userMapperClass);
            Assertions.assertFalse(Database.isDynamicMapper(userMapperClass.getName()));

            IMapper<RoleInfo> roleMapper = Database.getMapper(RoleInfo.class, sqlSession);
            MybatisMapperProxy<? super IMapper<RoleInfo>> roleMapperProxy =
                    (MybatisMapperProxy<? super IMapper<RoleInfo>>) Proxy.getInvocationHandler(roleMapper);
            Class<? super IMapper<RoleInfo>> roleMapperClass = ReflectHelper.getFieldValue(roleMapperProxy, "mapperInterface");
            Assertions.assertTrue(Database.isDynamicMapper(roleMapperClass.getName()));
        }

    }
```

此时的`UserInfoMapper`是项目中存在的

因为直接使用`Database.getMapper`获取到的是一个代理，所以使用了`Proxy.getInvocationHandler(userMapper)`以及反射获取`mapperInterface`属性来得到代理到的目标类型

两个`mapper`通过`isDynamicMapper`方法的对比：

不是动态`Mapper`

```java
Assertions.assertFalse(Database.isDynamicMapper(userMapperClass.getName()));
```

是动态`Mapper`

```java
 Assertions.assertTrue(Database.isDynamicMapper(roleMapperClass.getName()));
```

