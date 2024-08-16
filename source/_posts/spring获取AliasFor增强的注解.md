---
title: spring获取AliasFor增强的注解
date: 2023-06-14 20:55:32
tags: java
---

> 无论何时，别让你自己卷进去反对他人。——歌德

此处是关于`issue`：https://gitee.com/dromara/stream-query/issues/I7BSNV

这里使用的一个自定义的`@Table`注解+`@AliasFor`来增强`@TableName`

```java
/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package issue.org.dromara.streamquery.gitee.issue17BSNV;

import com.baomidou.mybatisplus.annotation.TableName;
import org.springframework.core.annotation.AliasFor;

import java.lang.annotation.*;

@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@TableName
public @interface Table {
  @AliasFor(annotation = TableName.class, attribute = "value")
  String value() default "";
}

```

然后是

```java
/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package issue.org.dromara.streamquery.gitee.issue17BSNV;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import lombok.Data;
import org.dromara.streamquery.stream.plugin.mybatisplus.engine.mapper.IGenerateMapper;

import java.time.LocalDateTime;

@Data
@Table(value = "user_info")
public class UserInfoWithTableAnnotation implements IGenerateMapper {
  private static final long serialVersionUID = -7219188882388819210L;

  @TableId(value = "id", type = IdType.AUTO)
  private Long id;

  private String name;
  private Integer age;
  private String email;

  @TableLogic(value = "'2001-01-01 00:00:00'", delval = "NOW()")
  private LocalDateTime gmtDeleted;
}

```

使用时：

```java
/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package issue.org.dromara.streamquery.gitee.issue17BSNV;

import org.dromara.streamquery.stream.core.collection.Lists;
import org.dromara.streamquery.stream.plugin.mybatisplus.Database;
import org.dromara.streamquery.stream.plugin.mybatisplus.annotation.AbstractMybatisPlusTestApplication;
import org.dromara.streamquery.stream.plugin.mybatisplus.engine.annotation.EnableMybatisPlusPlugin;
import org.dromara.streamquery.stream.plugin.mybatisplus.engine.mapper.IMapper;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import java.util.Arrays;
import java.util.List;

/**
 * @author VampireAchao
 * @since 2023/6/8
 */
@EnableAutoConfiguration
@EnableMybatisPlusPlugin
class RevisionTest extends AbstractMybatisPlusTestApplication {

  @Test
  void testExecute() {
    UserInfoWithTableAnnotation entity = new UserInfoWithTableAnnotation();
    entity.setName("cat");
    entity.setAge(20);
    entity.setEmail("myEmail");
    UserInfoWithTableAnnotation userInfo = new UserInfoWithTableAnnotation();
    userInfo.setName("ruben");
    List<UserInfoWithTableAnnotation> list = Arrays.asList(userInfo, entity);
    long effectRows = Database.execute(UserInfoWithTableAnnotation.class,
            (IMapper<UserInfoWithTableAnnotation> m) -> m.saveOneSql(list));
    Assertions.assertEquals(2, effectRows);
    Assertions.assertEquals(7, Database.count(UserInfoWithTableAnnotation.class));

    Assertions.assertEquals(
            0L, Database.execute(UserInfoWithTableAnnotation.class,
                    (IMapper<UserInfoWithTableAnnotation> m) -> m.saveOneSql(Lists.empty())));
  }
}

```

此时发现并没有映射上，这里找表名没有找到。。。

于是我进行了处理

```java
  String originalTableName = tableInfo.getTableName();
    Annotation[] annotations = tableInfo.getEntityType().getAnnotations();
    for (Annotation annotation : annotations) {
      if (annotation.annotationType().isAnnotationPresent(TableName.class)) {
        Map<String, Object> annotationAttributes =
            AnnotationUtils.getAnnotationAttributes(annotation);
        TableName synthesizedTableName =
            AnnotationUtils.synthesizeAnnotation(
                annotationAttributes, TableName.class, tableInfo.getEntityType());
        String tableNamePropertyName = LambdaHelper.getPropertyName(TableInfo::getTableName);
        String tableNameValue = synthesizedTableName.value();
        ReflectHelper.setFieldValue(tableInfo, tableNamePropertyName, tableNameValue);
        Map<String, TableInfo> tableNameInfoCache =
            ((SerSupp<Map<String, TableInfo>>)
                    () ->
                        SerFunc.<Object, Map<String, TableInfo>>cast()
                            .apply(
                                ReflectHelper.accessible(
                                        TableInfoHelper.class.getDeclaredField(
                                            "TABLE_NAME_INFO_CACHE"))
                                    .get(null)))
                .get();
        tableNameInfoCache.remove(originalTableName);
        tableNameInfoCache.put(tableNameValue, tableInfo);
        break;
      }
```

完整代码如下：

```java
/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.dromara.streamquery.stream.plugin.mybatisplus.engine.handler;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.core.handlers.PostInitTableInfoHandler;
import com.baomidou.mybatisplus.core.metadata.TableFieldInfo;
import com.baomidou.mybatisplus.core.metadata.TableInfo;
import com.baomidou.mybatisplus.core.metadata.TableInfoHelper;
import org.apache.ibatis.mapping.ResultMap;
import org.apache.ibatis.mapping.ResultMapping;
import org.apache.ibatis.session.Configuration;
import org.apache.ibatis.type.TypeHandler;
import org.dromara.streamquery.stream.core.lambda.LambdaHelper;
import org.dromara.streamquery.stream.core.lambda.function.SerFunc;
import org.dromara.streamquery.stream.core.lambda.function.SerSupp;
import org.dromara.streamquery.stream.core.reflect.ReflectHelper;
import org.springframework.core.annotation.AnnotationUtils;

import java.lang.annotation.Annotation;
import java.util.Map;

/**
 * @author VampireAchao
 * @since 2023/3/20 18:10
 */
public class JsonPostInitTableInfoHandler implements PostInitTableInfoHandler {

  /**
   * 参与 TableInfo 初始化
   *
   * @param tableInfo TableInfo
   * @param configuration Configuration
   */
  @Override
  public void postTableInfo(TableInfo tableInfo, Configuration configuration) {
    PostInitTableInfoHandler.super.postTableInfo(tableInfo, configuration);
    String originalTableName = tableInfo.getTableName();
    Annotation[] annotations = tableInfo.getEntityType().getAnnotations();
    for (Annotation annotation : annotations) {
      if (annotation.annotationType().isAnnotationPresent(TableName.class)) {
        Map<String, Object> annotationAttributes =
            AnnotationUtils.getAnnotationAttributes(annotation);
        TableName synthesizedTableName =
            AnnotationUtils.synthesizeAnnotation(
                annotationAttributes, TableName.class, tableInfo.getEntityType());
        String tableNamePropertyName = LambdaHelper.getPropertyName(TableInfo::getTableName);
        String tableNameValue = synthesizedTableName.value();
        ReflectHelper.setFieldValue(tableInfo, tableNamePropertyName, tableNameValue);
        Map<String, TableInfo> tableNameInfoCache =
            ((SerSupp<Map<String, TableInfo>>)
                    () ->
                        SerFunc.<Object, Map<String, TableInfo>>cast()
                            .apply(
                                ReflectHelper.accessible(
                                        TableInfoHelper.class.getDeclaredField(
                                            "TABLE_NAME_INFO_CACHE"))
                                    .get(null)))
                .get();
        tableNameInfoCache.remove(originalTableName);
        tableNameInfoCache.put(tableNameValue, tableInfo);
        break;
      }
    }

    for (TableFieldInfo fieldInfo : tableInfo.getFieldList()) {
      if (fieldInfo.getTypeHandler() == null) {
        continue;
      }
      if (tableInfo.getResultMap() == null) {
        return;
      }
      ResultMap resultMap = configuration.getResultMap(tableInfo.getResultMap());
      for (ResultMapping resultMapping : resultMap.getResultMappings()) {
        TypeHandler<?> handler = resultMapping.getTypeHandler();
        if (handler instanceof AbstractJsonFieldHandler) {
          AbstractJsonFieldHandler<?> typeHandler = (AbstractJsonFieldHandler<?>) handler;
          typeHandler.setTableInfo(tableInfo);
          typeHandler.setFieldInfo(fieldInfo);
        }
      }
    }
  }
}
```

然后通过`AnnotationUtils.*synthesizeAnnotation*`解决了这个问题

完整代码：

https://gitee.com/dromara/stream-query/commit/f4c15fdca66c5e6037644b0888e2b756eb5db25a