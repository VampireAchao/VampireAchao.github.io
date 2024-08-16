---
title: mybatis拦截器
date: 2022-04-10 22:14:03
tags: java
---

> 你要有种，你就扬着脸一直往前冲。可是你得跟妒忌，毁谤，庸俗斗争，跟所有的人斗争。——巴尔扎克《高老头》

今天学了点`Mybatis`拦截器，参考了`Mybatis-Plus`部分代码

首先是使用`@Intercepts`注解，它的源码注释告诉我们可以这样使用：

![image-20220410215527760](/imgs/oss/blog/image-20220410215527760.png)

`mybatis-plus`中使用的就是这种方式，参考：

![image-20220410215624859](/imgs/oss/blog/image-20220410215624859.png)

这里可以传入`@Signature`，指定它的`type`为：

`Executor`，执行器，我们可以看到它包含了如下方法，说明它是一个比较全能的范围，可以做很多事情参数如处理、返回处理、重写`sql`等

![image-20220410220202015](/imgs/oss/blog/image-20220410220202015.png)

我们依葫芦画瓢写两个：

```java
package com.ruben.simplescaffold.plugin;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.lang.Opt;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.enums.SqlKeyword;
import com.ruben.simplescaffold.entity.UserDetail;
import org.apache.ibatis.cache.CacheKey;
import org.apache.ibatis.executor.Executor;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.plugin.*;
import org.apache.ibatis.reflection.MetaObject;
import org.apache.ibatis.reflection.SystemMetaObject;
import org.apache.ibatis.session.ResultHandler;
import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;
import java.util.ArrayList;


/**
 * @author <achao1441470436@gmail.com>
 * @since 2022/4/10 13:54
 */
@Component
@Intercepts(
		{
				@Signature(type = Executor.class, method = "query", args = {MappedStatement.class, Object.class, RowBounds.class, ResultHandler.class}),
				@Signature(type = Executor.class, method = "query", args = {MappedStatement.class, Object.class, RowBounds.class, ResultHandler.class, CacheKey.class, BoundSql.class}),
		}
)
public class MybatisExecutorQueryPlugin implements Interceptor {

	@Override
	public Object intercept(Invocation invocation) throws Throwable {
		Executor executor = (Executor) invocation.getTarget();
		Object[] args = invocation.getArgs();
		Method method = invocation.getMethod();

		MappedStatement ms = (MappedStatement) args[0];
		Object parameter = args[1];
		BoundSql boundSql;
		if (args.length == 4) {
			boundSql = ms.getBoundSql(parameter);
		} else {
			boundSql = (BoundSql) args[5];
		}
		// 反射工具类，可以修改sql语句等
		MetaObject metaObject = SystemMetaObject.forObject(boundSql);
		String sql = (String) metaObject.getValue("sql");
		if (!StrUtil.containsIgnoreCase(sql, SqlKeyword.ORDER_BY.getSqlSegment())) {
			// 更改sql
			metaObject.setValue("sql", sql + " order by id asc");
		}
		return invocation.proceed();
	}

	@Override
	public Object plugin(Object target) {
		return Plugin.wrap(target, this);
	}
}
```

写完了查询，再写一个更新的

```java
package com.ruben.simplescaffold.plugin;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.lang.func.Func1;
import cn.hutool.core.lang.func.LambdaUtil;
import cn.hutool.core.util.ReflectUtil;
import com.baomidou.mybatisplus.core.conditions.AbstractWrapper;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.update.Update;
import com.baomidou.mybatisplus.core.exceptions.MybatisPlusException;
import com.baomidou.mybatisplus.core.mapper.Mapper;
import com.baomidou.mybatisplus.core.metadata.TableFieldInfo;
import com.baomidou.mybatisplus.core.metadata.TableInfoHelper;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import com.baomidou.mybatisplus.core.toolkit.ReflectionKit;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.ruben.simplescaffold.entity.UserDetail;
import com.ruben.simplescaffold.pojo.common.BaseEntity;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.Consts;
import org.apache.ibatis.binding.MapperMethod;
import org.apache.ibatis.executor.Executor;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.mapping.SqlCommandType;
import org.apache.ibatis.plugin.*;
import org.springframework.stereotype.Component;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Objects;

/**
 * Mybatis拦截器
 *
 * @author <achao1441470436@gmail.com>
 * @since 2022/3/31 22:22
 */
@Component
@Intercepts({@Signature(type = Executor.class, method = "update", args = {MappedStatement.class, Object.class})})
public class MybatisExecutorUpdatePlugin implements Interceptor {
	@Override
	public Object intercept(Invocation invocation) throws Throwable {
		Object[] args = invocation.getArgs();
		MappedStatement ms = (MappedStatement) args[0];
		if (SqlCommandType.INSERT.equals(ms.getSqlCommandType())) {
			// 新增
			fillTime(args[1], UserDetail::getGmtCreate);
			fillTime(args[1], UserDetail::getGmtModified);
		}
		if (SqlCommandType.UPDATE.equals(ms.getSqlCommandType()) && args[1] instanceof MapperMethod.ParamMap) {
			// 更新
			MapperMethod.ParamMap<?> paramMap = (MapperMethod.ParamMap<?>) args[1];
			Object bean = paramMap.get(Constants.ENTITY);
			if (paramMap.containsKey(Constants.WRAPPER)) {
				// 通过Wrapper更新
				Object wrapper = paramMap.get(Constants.WRAPPER);
				if (wrapper instanceof AbstractWrapper && wrapper instanceof Update) {
					String fieldName = LambdaUtil.getFieldName(UserDetail::getGmtModified);
					String mapperClassName = ms.getId().substring(0, ms.getId().lastIndexOf('.'));
					Class<?> entityClass = ReflectionKit.getSuperClassGenericType(Class.forName(mapperClassName), Mapper.class, 0);
					List<TableFieldInfo> fieldList = TableInfoHelper.getTableInfo(entityClass).getFieldList();
					String columnName = fieldList.stream().filter(fieldInfo -> fieldInfo.getProperty().equals(fieldName)).findAny().map(TableFieldInfo::getColumn).orElseThrow(() -> new MybatisPlusException("未找到字段" + fieldName));
					final Map<String, Object> paramNameValuePairs = ((AbstractWrapper<?, ?, ?>) wrapper).getParamNameValuePairs();
					String placeholder = "#" + fieldName + "#";
					paramNameValuePairs.put(placeholder, LocalDateTime.now());
					((Update<?, ?>) wrapper).setSql(String.format("%s = #{%s.%s}", columnName, "ew.paramNameValuePairs", placeholder));
				}
			} else if (Objects.nonNull(bean)) {
				// 通过id更新
				fillTime(bean, UserDetail::getGmtModified);
			}
		}
		return invocation.proceed();
	}

	/**
	 * 给bean填充时间
	 *
	 * @param bean 对象
	 * @param func 填充方法，只用于获取属性名
	 * @param <T>  对象类型
	 */
	private <T> void fillTime(Object bean, Func1<T, ?> func) {
		String fieldName = LambdaUtil.getFieldName(func);
		if (ReflectUtil.hasField(bean.getClass(), fieldName)) {
			BeanUtil.setFieldValue(bean, fieldName, LocalDateTime.now());
		}
	}

	@Override
	public Object plugin(Object target) {
		return Plugin.wrap(target, this);
	}
}
```

然后是指定`@Signature`的`type`为`StatementHandler`，也是有各种方法

![image-20220410220407031](/imgs/oss/blog/image-20220410220407031.png)

我们演示一个隔离级别设置、日志打印、`sql`修改(此处只是取出来再设置进去，可以按需自己处理)

```java
package com.ruben.simplescaffold.plugin;

import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.executor.statement.StatementHandler;
import org.apache.ibatis.plugin.*;
import org.apache.ibatis.reflection.MetaObject;
import org.apache.ibatis.reflection.SystemMetaObject;
import org.springframework.stereotype.Component;

import java.sql.Connection;

/**
 * @author <achao1441470436@gmail.com>
 * @since 2022/4/10 20:49
 */
@Slf4j
@Component
@Intercepts({@Signature(type = StatementHandler.class, method = "prepare", args = {Connection.class, Integer.class})})
public class MybatisStatementHandlerPreparePlugin implements Interceptor {
	@Override
	public Object intercept(Invocation invocation) throws Throwable {
		StatementHandler statementHandler = (StatementHandler) invocation.getTarget();
		Object[] args = invocation.getArgs();
		Connection connection = (Connection) args[0];
		connection.prepareStatement("set transaction isolation level read committed");
		MetaObject metaObject = SystemMetaObject.forObject(statementHandler);
		String sql = (String) metaObject.getValue("delegate.boundSql.sql");
		log.info("sql: {}", sql);
		metaObject.setValue("delegate.boundSql.sql", sql);
		return invocation.proceed();
	}
	@Override
	public Object plugin(Object target) {
		return Plugin.wrap(target, this);
	}
}
```

然后是`@Signature`的`type`为`ParameterHandler`，一看名字就是用来处理参数的

![image-20220410220652903](/imgs/oss/blog/image-20220410220652903.png)

简单演示下

```java
package com.ruben.simplescaffold.plugin;

import cn.hutool.core.lang.func.LambdaUtil;
import cn.hutool.core.util.ReflectUtil;
import com.ruben.simplescaffold.entity.UserDetail;
import org.apache.ibatis.executor.parameter.ParameterHandler;
import org.apache.ibatis.plugin.*;
import org.springframework.stereotype.Component;

import java.sql.PreparedStatement;
import java.sql.ResultSetMetaData;

/**
 * @author <achao1441470436@gmail.com>
 * @since 2022/4/10 21:16
 */
@Component
@Intercepts({@Signature(type = ParameterHandler.class, method = "setParameters", args = {PreparedStatement.class})})
public class MybatisParameterHandlerSetParametersPlugin implements Interceptor {
	@Override
	public Object intercept(Invocation invocation) throws Throwable {
		ParameterHandler parameterHandler = (ParameterHandler) invocation.getTarget();
		Object[] args = invocation.getArgs();
		PreparedStatement preparedStatement = (PreparedStatement) args[0];
		Object parameterObject = parameterHandler.getParameterObject();
		if (parameterObject instanceof UserDetail) {
			ReflectUtil.setFieldValue(parameterObject, LambdaUtil.getFieldName(UserDetail::getTenantId), 1L);
		}
		return invocation.proceed();
	}
	@Override
	public Object plugin(Object target) {
		return Plugin.wrap(target, this);
	}
}
```

最后就是`@Signature`为`ResultSetHandler`，用于处理结果

![image-20220410220936390](/imgs/oss/blog/image-20220410220936390.png)

演示这里查询过滤掉密码

```java
package com.ruben.simplescaffold.plugin;

import cn.hutool.core.collection.CollUtil;
import com.ruben.simplescaffold.entity.UserDetail;
import org.apache.ibatis.executor.resultset.ResultSetHandler;
import org.apache.ibatis.plugin.*;
import org.springframework.stereotype.Component;

import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

/**
 * @author <achao1441470436@gmail.com>
 * @since 2022/4/10 21:40
 */
@Component
@Intercepts(@Signature(type = ResultSetHandler.class, method = "handleResultSets", args = {Statement.class}))
public class MybatisResultSetHandlerHandleResultSetsPlugin implements Interceptor {
	@Override
	public Object intercept(Invocation invocation) throws Throwable {
		List<?> resultList = (List<?>) invocation.proceed();
		Object bean = CollUtil.get(resultList, 0);
		if (bean instanceof UserDetail) {
			@SuppressWarnings("unchecked")
			ArrayList<UserDetail> userList = (ArrayList<UserDetail>) resultList;
			userList.forEach(user -> user.setPassword(null));
			return userList;
		}
		return resultList;
	}

	@Override
	public Object plugin(Object target) {
		return Plugin.wrap(target, this);
	}
}
```

对了，顺便一提`Plugin.wrap`使用动态代理的方式，对我们方法进行了代理，其中还判断了拦截器触发的时机等操作