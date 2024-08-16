---
title: 编写mybatis脱敏插件
date: 2022-10-06 16:35:24
tags: java
---

> 错误是不可避免的，但是不要重复错误——周恩来

首先贴成品链接：https://gitee.com/zhijiantianya/ruoyi-vue-pro/pulls/275

使用方式：

在你的`vo`或者`po/do`上添加注解`@Desensitization`
可指定预设类型`type`为：`cn.hutool.core.util.DesensitizedUtil.DesensitizedType`
例如
```java
@Desensitization(type = DesensitizedUtil.DesensitizedType.EMAIL)
private String email;
```
也可自定义正则表达式
```java
@Desensitization(regex = "(?<=\\d{3})\\d(?=\\d{4})")
private String mobile;
```
还可以自定义处理器进行处理
```java
@Desensitization(handler = MyDesensitizedHandler.class)
private String myField;
```
`MyDesensitizedHandler`实现`cn.iocoder.yudao.framework.desensitization.core.handler.DesensitizationHandler`即可

主要代码是这个拦截器：

```java
package cn.iocoder.yudao.framework.desensitization.interceptor;

import cn.hutool.core.lang.Opt;
import cn.hutool.core.util.ReflectUtil;
import cn.iocoder.yudao.framework.desensitization.core.annotation.Desensitization;
import cn.iocoder.yudao.framework.desensitization.core.handler.DesensitizationHandler;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import com.baomidou.mybatisplus.core.toolkit.PluginUtils;
import com.baomidou.mybatisplus.extension.parser.JsqlParserSupport;
import com.baomidou.mybatisplus.extension.plugins.inner.InnerInterceptor;
import net.sf.jsqlparser.statement.insert.Insert;
import net.sf.jsqlparser.statement.update.Update;
import org.apache.ibatis.binding.MapperMethod;
import org.apache.ibatis.executor.resultset.ResultSetHandler;
import org.apache.ibatis.executor.statement.StatementHandler;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.mapping.SqlCommandType;
import org.apache.ibatis.plugin.*;

import java.lang.reflect.Field;
import java.sql.Connection;
import java.sql.Statement;
import java.util.Collection;
import java.util.Objects;
import java.util.Properties;

/**
 * @author VampireAchao
 * @since 2022/10/6 11:24
 */
@Intercepts(@Signature(type = ResultSetHandler.class, method = "handleResultSets", args = {Statement.class}))
public class DesensitizationInterceptor extends JsqlParserSupport implements InnerInterceptor, Interceptor {

    /**
     * {@link StatementHandler#prepare(Connection, Integer)} 操作前置处理
     * <p>
     * 改改sql啥的
     *
     * @param sh                 StatementHandler(可能是代理对象)
     * @param connection         Connection
     * @param transactionTimeout transactionTimeout
     */
    @Override
    public void beforePrepare(StatementHandler sh, Connection connection, Integer transactionTimeout) {
        PluginUtils.MPStatementHandler mpSh = PluginUtils.mpStatementHandler(sh);
        MappedStatement ms = mpSh.mappedStatement();
        SqlCommandType sct = ms.getSqlCommandType();
        if (sct == SqlCommandType.INSERT || sct == SqlCommandType.UPDATE) {
            PluginUtils.MPBoundSql mpBs = mpSh.mPBoundSql();
            mpBs.sql(parserMulti(mpBs.sql(), mpBs));
        }
    }


    @Override
    public void setProperties(Properties properties) {
        InnerInterceptor.super.setProperties(properties);
    }


    /**
     * 更新
     *
     * @param update
     * @param index
     * @param sql
     * @param obj
     */
    @Override
    protected void processUpdate(Update update, int index, String sql, Object obj) {
        if (!(obj instanceof PluginUtils.MPBoundSql)) {
            return;
        }
        PluginUtils.MPBoundSql boundSql = (PluginUtils.MPBoundSql) obj;
        Object parameterObject = boundSql.parameterObject();
        if (!(parameterObject instanceof MapperMethod.ParamMap<?>)) {
            return;
        }
        MapperMethod.ParamMap<?> paramMap = (MapperMethod.ParamMap<?>) parameterObject;
        Object entity = paramMap.get(Constants.ENTITY);
        if (!Objects.nonNull(entity)) {
            return;
        }
        processDesensitization(entity);
    }

    /**
     * 新增
     *
     * @param insert
     * @param index
     * @param sql
     * @param obj
     */
    @Override
    protected void processInsert(Insert insert, int index, String sql, Object obj) {
        if (!(obj instanceof PluginUtils.MPBoundSql)) {
            return;
        }
        PluginUtils.MPBoundSql boundSql = (PluginUtils.MPBoundSql) obj;
        Object entity = boundSql.parameterObject();
        processDesensitization(entity);
    }

    private void processDesensitization(Object entity) {
        for (Field field : ReflectUtil.getFields(entity.getClass())) {
            if (!field.isAnnotationPresent(Desensitization.class)) {
                continue;
            }
            Desensitization desensitization = field.getAnnotation(Desensitization.class);
            Object fieldValue = ReflectUtil.getFieldValue(entity, field);
            Opt.ofBlankAble(fieldValue).map(Object::toString).ifPresent(value -> {
                DesensitizationHandler desensitizationHandler = ReflectUtil.newInstance(desensitization.handler());
                String newValue = desensitizationHandler.apply(value, desensitization);
                ReflectUtil.setFieldValue(entity, field, newValue);
            });
        }
    }


    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        Object proceed = invocation.proceed();
        if (Collection.class.isAssignableFrom(proceed.getClass())) {
            Collection<?> collection = (Collection<?>) proceed;
            collection.forEach(this::processDesensitization);
        }
        return proceed;
    }

    @Override
    public Object plugin(Object target) {
        return Plugin.wrap(target, this);
    }
}
```

`po`：

```java
package cn.iocoder.yudao.module.pojo.po;

import cn.hutool.core.util.DesensitizedUtil;
import cn.iocoder.yudao.framework.desensitization.core.annotation.Desensitization;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.Tolerate;

/**
 * @author VampireAchao
 * @since 2022/10/6 15:19
 */
@Data
@Builder
public class UserInfo {

    @Tolerate
    public UserInfo() {
        // this is an accessible parameterless constructor.
    }

    private Long id;
    private String name;
    @Desensitization(type = DesensitizedUtil.DesensitizedType.EMAIL)
    private String email;
    @Desensitization(regex = "(?<=\\d{3})\\d(?=\\d{4})")
    private String mobile;

}
```

单元测试：

```java
package cn.iocoder.yudao.module;

import cn.iocoder.yudao.framework.desensitization.config.YudaoDesensitizationAutoConfiguration;
import cn.iocoder.yudao.framework.test.core.ut.BaseDbUnitTest;
import cn.iocoder.yudao.module.pojo.po.UserInfo;
import com.baomidou.mybatisplus.extension.toolkit.SqlHelper;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.jdbc.Sql;

/**
 * @author VampireAchao
 * @since 2022/10/6 15:11
 */
@Import(YudaoDesensitizationAutoConfiguration.class)
@Sql(scripts = "/sql/insert_data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD) // 每个单元测试结束前，新增 DB
class DesensitizationTest extends BaseDbUnitTest {

    @Test
    void testQuery() {
        UserInfo userInfo = SqlHelper.execute(UserInfo.class, m -> m.selectById(1L));
        Assertions.assertEquals("123****8910", userInfo.getMobile());
        Assertions.assertEquals("a**************@gmail.com", userInfo.getEmail());
    }

    @Test
    void testUpdate() {
        UserInfo userInfo = UserInfo.builder().id(1L).mobile("12345678910").email("achao1441470436@gmail.com").build();
        SqlHelper.execute(UserInfo.class, m -> m.updateById(userInfo));
        Assertions.assertEquals("123****8910", userInfo.getMobile());
        Assertions.assertEquals("a**************@gmail.com", userInfo.getEmail());
    }

    @Test
    void testSave() {
        UserInfo userInfo = UserInfo.builder().name("张三").mobile("12345678910").email("achao1441470436@gmail.com").build();
        SqlHelper.execute(UserInfo.class, m -> m.insert(userInfo));
        Assertions.assertEquals("123****8910", userInfo.getMobile());
        Assertions.assertEquals("a**************@gmail.com", userInfo.getEmail());
    }

}
```

