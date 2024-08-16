---
title: mp自定义sql注入
date: 2022-07-26 12:45:55
tags: java
---

> 我有一瓢酒，可以慰风尘。——韦应物

以`mysql`语法`INSERT INTO user_info (name,age,email) VALUES ( ?,?,? ),( ?,?,? )`举例：

首先注入自定义策略

```java
package io.github.vampireachao.stream.plugin.mybatisplus.injector;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.core.injector.AbstractMethod;
import com.baomidou.mybatisplus.core.injector.DefaultSqlInjector;
import com.baomidou.mybatisplus.core.metadata.TableInfo;
import org.apache.ibatis.executor.keygen.NoKeyGenerator;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.mapping.SqlSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * MPSql注入
 *
 * @author VampireAchao
 */
@Configuration
public class SqlInjectorConfig {

    @Bean
    public DefaultSqlInjector defaultSqlInjector() {
        return new DefaultSqlInjector() {
            @Override
            public List<AbstractMethod> getMethodList(Class<?> mapperClass, TableInfo tableInfo) {
                List<AbstractMethod> methodList = super.getMethodList(mapperClass, tableInfo);
                methodList.add(new AbstractMethod(SqlMethodEnum.INSERT_BATCH.getMethod()) {
                    @Override
                    public MappedStatement injectMappedStatement(Class<?> mapperClass, Class<?> modelClass, TableInfo tableInfo) {
                        final String sql = SqlMethodEnum.INSERT_BATCH.getSql();
                        final String fieldSql = prepareFieldSql(tableInfo);
                        final String valueSql = prepareValuesSqlForMysqlBatch(tableInfo);
                        final String sqlResult = String.format(sql, tableInfo.getTableName(), fieldSql, valueSql);
                        SqlSource sqlSource = languageDriver.createSqlSource(configuration, sqlResult, modelClass);
                        return this.addInsertMappedStatement(mapperClass, modelClass, sqlSource, new NoKeyGenerator(), null, null);
                    }

                    private String prepareFieldSql(TableInfo tableInfo) {
                        StringBuilder fieldSql = new StringBuilder();
                        if (!IdType.AUTO.equals(tableInfo.getIdType())) {
                            fieldSql.append(tableInfo.getKeyColumn()).append(",");
                        }
                        tableInfo.getFieldList().forEach(x -> fieldSql.append(x.getColumn()).append(","));
                        fieldSql.delete(fieldSql.length() - 1, fieldSql.length());
                        fieldSql.insert(0, "(");
                        fieldSql.append(")");
                        return fieldSql.toString();
                    }

                    private String prepareValuesSqlForMysqlBatch(TableInfo tableInfo) {
                        final StringBuilder valueSql = new StringBuilder();
                        valueSql.append("<foreach collection=\"list\" item=\"item\" index=\"index\" open=\"(\" separator=\"),(\" close=\")\">");
                        if (!IdType.AUTO.equals(tableInfo.getIdType())) {
                            valueSql.append("#{item.").append(tableInfo.getKeyProperty()).append("},");
                        }
                        tableInfo.getFieldList().forEach(x -> valueSql.append("#{item.").append(x.getProperty()).append("},"));
                        valueSql.delete(valueSql.length() - 1, valueSql.length());
                        valueSql.append("</foreach>");
                        return valueSql.toString();
                    }
                });
                return methodList;
            }
        };
    }

}
```

这里用到的枚举：

```java
package io.github.vampireachao.stream.plugin.mybatisplus.injector;

/**
 * sql方法类型
 *
 * @author VampireAchao
 */
public enum SqlMethodEnum {
    /**
     * 插入
     */
    INSERT_BATCH("insertBatch", "插入多条数据（mysql语法批量）", "<script>\nINSERT INTO %s %s VALUES %s\n</script>"),
    ;
    private final String method;
    private final String desc;
    private final String sql;

    SqlMethodEnum(String method, String desc, String sql) {
        this.method = method;
        this.desc = desc;
        this.sql = sql;
    }

    public String getMethod() {
        return method;
    }

    public String getDesc() {
        return desc;
    }

    public String getSql() {
        return sql;
    }
}
```

然后编写自定义公共`Mapper`

```java
package io.github.vampireachao.stream.plugin.mybatisplus.injector;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;

import java.util.Collection;

/**
 * @author VampireAchao
 */
public interface IMapper<T> extends BaseMapper<T> {

    /**
     * 插入多条数据（mysql语法批量）
     *
     * @param list 数据
     * @return 条数
     */
    int insertBatch(@Param("list") Collection<T> list);

}
```

使用：

```java
package io.github.vampireachao.stream.plugin.mybatisplus.mapper;

import io.github.vampireachao.stream.plugin.mybatisplus.injector.IMapper;
import io.github.vampireachao.stream.plugin.mybatisplus.pojo.po.UserInfo;
import org.apache.ibatis.annotations.Mapper;

/**
 * UserInfoMapper
 *
 * @author VampireAchao
 * @since 2022/5/21
 */
@Mapper
public interface UserInfoMapper extends IMapper<UserInfo> {
}
```

```java
    @Test
    void insertBatchTest() {
        UserInfo entity = new UserInfo();
        entity.setName("cat");
        entity.setAge(20);
        entity.setEmail("achao1441470436@gmail.com");
        UserInfo userInfo = new UserInfo();
        userInfo.setName("ruben");
        List<UserInfo> list = Arrays.asList(userInfo, entity);
        int i = userInfoMapper.insertBatch(list);
        Assertions.assertEquals(2, i);
        Assertions.assertEquals(7, QueryHelper.count(UserInfo.class));
    }
```

生成`sql`

```shell
2022-07-26 12:50:12.237 DEBUG 34136 --- [           main] o.s.jdbc.datasource.init.ScriptUtils     : 5 returned as update count for SQL: INSERT INTO user_info (name, age, email) VALUES ('Jone', 18, 'test1@baomidou.com'), ('Jack', 18, 'test2@baomidou.com'), ('Tom', 28, 'test3@baomidou.com'), ('Sandy', 21, 'test4@baomidou.com'), ('Billie', 24, 'test5@baomidou.com')
```

