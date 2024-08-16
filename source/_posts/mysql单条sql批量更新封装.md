---
title: mysql单条sql批量更新封装
date: 2022-09-13 14:42:35
tags: java
---

> 要成就大事业，就要趁青年时代——歌德

之前写了：[mysql单条sql批量新增封装](https://VampireAchao.github.io/2022/07/28/mysql单条sql批量新增封装/)

现在写个批量更新的，[源码地址](https://gitee.com/VampireAchao/stream-query/blob/master/stream-plugin/stream-plugin-mybatis-plus/src/main/java/io/github/vampireachao/stream/plugin/mybatisplus/engine/methods/UpdateOneSql.java)

目前还不支持乐观锁，主要代码如下：

```java
package io.github.vampireachao.stream.plugin.mybatisplus.engine.methods;

import com.baomidou.mybatisplus.core.injector.AbstractMethod;
import com.baomidou.mybatisplus.core.metadata.TableInfo;
import com.baomidou.mybatisplus.core.toolkit.sql.SqlScriptUtils;
import io.github.vampireachao.stream.core.stream.Steam;
import io.github.vampireachao.stream.plugin.mybatisplus.engine.constant.PluginConst;
import io.github.vampireachao.stream.plugin.mybatisplus.engine.enumration.SqlMethodEnum;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.mapping.SqlSource;

import static com.baomidou.mybatisplus.core.enums.SqlKeyword.IN;

/**
 * 修改多条数据（mysql语法批量）
 *
 * @author sikadai VampireAchao
 */
public class UpdateOneSql extends AbstractMethod implements PluginConst {

    public UpdateOneSql(String methodName) {
        super(methodName);
    }

    /**
     * 注入自定义 MappedStatement
     *
     * @param mapperClass mapper 接口
     * @param modelClass  mapper 泛型
     * @param tableInfo   数据库表反射信息
     * @return MappedStatement
     */
    @Override
    public MappedStatement injectMappedStatement(Class<?> mapperClass, Class<?> modelClass, TableInfo tableInfo) {
        SqlMethodEnum sqlMethod = SqlMethodEnum.UPDATE_ONE_SQL;
        String caseWhenScript = buildCaseWhen(tableInfo);
        StringBuilder whereScript = buildWhereSql(tableInfo);
        String sql = String.format(sqlMethod.getSql(), tableInfo.getTableName(), caseWhenScript, whereScript);
        SqlSource sqlSource = languageDriver.createSqlSource(configuration, sql, modelClass);
        return this.addUpdateMappedStatement(mapperClass, modelClass, sqlSource);
    }

    /**
     * <p>
     * 构建caseWhen的更新语句
     * </p>
     *
     * @param tableInfo 表信息
     * @return caseWhen的更新语句
     * @author VampireAchao sikadai
     * @since 2022/8/24 18:42
     */
    private String buildCaseWhen(TableInfo tableInfo) {
        String safeKeyProperty = SqlScriptUtils.safeParam(ENTITY_DOT + tableInfo.getKeyProperty());
        return Steam.of(tableInfo.getFieldList())
                .filter(i -> !i.isLogicDelete())
                .map(i -> i.getColumn() + EQUALS + CASE + SPACE + tableInfo.getKeyColumn() + NEWLINE +
                        SqlScriptUtils.convertForeach(SqlScriptUtils.convertChoose(
                                String.format(NON_NULL_CONDITION, ENTITY, ENTITY_DOT + i.getProperty())
                                , String.format(WHEN_THEN, safeKeyProperty, SqlScriptUtils.safeParam(ENTITY_DOT + i.getProperty())),
                                String.format(WHEN_THEN, safeKeyProperty, i.getColumn())), COLLECTION_PARAM_NAME, null, ENTITY, null)
                        + END
                )
                .join(COMMA + NEWLINE) + NEWLINE;
    }

    /**
     * <p>
     * 构建where的批量更新
     * </p>
     *
     * @param tableInfo 表信息
     * @return java.lang.StringBuilder
     * @author VampireAchao sikadai
     * @since 2022/8/24 18:43
     */
    private StringBuilder buildWhereSql(TableInfo tableInfo) {
        return new StringBuilder().append(NEWLINE)
                .append(tableInfo.getKeyColumn()).append(SPACE).append(IN.getSqlSegment()).append(NEWLINE)
                .append(LEFT_BRACKET)
                .append(SqlScriptUtils.convertForeach(SqlScriptUtils.safeParam(ENTITY_DOT + tableInfo.getKeyProperty()),
                        COLLECTION_PARAM_NAME, null, ENTITY, COMMA))
                .append(RIGHT_BRACKET).append(NEWLINE)
                .append(tableInfo.getLogicDeleteSql(true, true));
    }
}
```

生成的`sql`：

![image-20220913144646840](/imgs/oss/blog/image-20220913144646840.png)
