---
title: 修改mybatis-plus更新策略
date: 2024-04-04 15:14:04
tags: java
---

> 把完善的教育留给子女，乃是最佳的遗产。——斯各特

就像：

https://github.com/apache/incubator-streampark/pull/3615

首先修改`dbConfig.setUpdateStrategy(FieldStrategy.IGNORED);`

```java
  /**
   * mybatis plus setting
   *
   * @return MybatisPlusPropertiesCustomizer
   */
  @Bean
  public MybatisPlusPropertiesCustomizer mybatisPlusPropertiesCustomizer() {
    return properties -> {
      properties.setTypeAliasesPackage("org.apache.streampark.console.*.entity");
      properties.setTypeEnumsPackage("org.apache.streampark.console.*.enums");
      properties.setMapperLocations(new String[] {"classpath:mapper/*/*.xml"});
      MybatisConfiguration mybatisConfiguration = new MybatisConfiguration();
      mybatisConfiguration.setJdbcTypeForNull(JdbcType.NULL);
      properties.setConfiguration(mybatisConfiguration);
      GlobalConfig globalConfig = GlobalConfigUtils.getGlobalConfig(mybatisConfiguration);
      GlobalConfig.DbConfig dbConfig = globalConfig.getDbConfig();
      dbConfig.setIdType(IdType.AUTO);
      dbConfig.setUpdateStrategy(FieldStrategy.IGNORED);
      // close mybatis-plus banner
      globalConfig.setBanner(false);
      properties.setGlobalConfig(globalConfig);
    };
  }
```

然后对于`updateById`的地方，进行调整,例如

```java
  @Override
  public boolean updateById(Application application) {
    Application app = getById(application.getId());
    BeanUtil.copyIgnoreNull(application, app, Application::getId, Application::getCreateTime);
    app.setAppId(application.getAppId());
    app.setJobId(application.getJobId());
    app.setJobManagerUrl(application.getJobManagerUrl());
    app.setRestartSize(application.getRestartSize());
    app.setAlertId(application.getAlertId());
    app.setEndTime(application.getEndTime());
    app.setHotParams(application.getHotParams());
    app.setFlinkClusterId(application.getFlinkClusterId());
    return super.updateById(app);
  }
```

这里用到的是

```java
/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.apache.streampark.console.core.utils;

import cn.hutool.core.bean.copier.CopyOptions;
import cn.hutool.core.lang.func.Func1;

/** Util class for bean */
public class BeanUtil {

  /**
   * bean copy ignore null field
   *
   * @param source the source object for copy
   * @param target the target object for copy
   */
  @SafeVarargs
  public static <P, R> void copyIgnoreNull(
      Object source, Object target, Func1<P, R>... ignoreProperties) {
    cn.hutool.core.bean.BeanUtil.copyProperties(
        source,
        target,
        CopyOptions.create().ignoreNullValue().setIgnoreProperties(ignoreProperties));
  }
}
```
