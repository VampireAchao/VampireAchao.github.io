---
title: seata实现分布式事务
date: 2021-03-15 18:36:28
tags: java
---

> 尽管世界和人生是坏透了，其中却有一件东西永远是好，那便是青春——显克维奇

首先是下载[`seata1.4.1`](https://github.com/seata/seata/releases)

然后解压

先修改`conf`下的`registry.conf`

把`type`改为`nacos`

![image-20210314184336107](/imgs/oss/picGo/image-20210314184336107.png)

进入`bin`

打开控制台运行`seata-server.bat`

然后在项目中引入依赖，记得需要分布式式事务的服务都要配置

```xml
        <!--    seata 分布式事务    -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-seata</artifactId>
        </dependency>
```

配置类

```java
package com.ruben.config;

import com.alibaba.druid.pool.DruidDataSource;
import com.zaxxer.hikari.HikariDataSource;
import io.seata.rm.datasource.DataSourceProxy;
import org.apache.commons.lang3.StringUtils;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.annotation.Resource;
import javax.sql.DataSource;
import java.util.Optional;

/**
 * @ClassName: SeataConfig
 * @Description: 我还没有写描述
 * @Date: 2021/3/14 0014 16:53
 * *
 * @author: <achao1441470436@gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
@Configuration
public class SeataConfig {


    @Bean
    @ConfigurationProperties(prefix = "spring.datasource")
    public DataSource druidDataSource(){
        return new DruidDataSource();
    }

}
```

然后是项目中的配置文件

```yaml
seata:
  enabled: true
  application-id: ${spring.application.name}
  tx-service-group: ruben
  config:
    type: file
    file:
      name: file.conf
  service:
    disable-global-transaction: false
```

如果之后启动一直报没配置`disableGlobalTransaction`

就需要新建一个`file.conf`到`resources`目录下

内容为

```conf
service{
    disableGlobalTransaction = false
}
```

接下来是编写两个接口

首先是调用方

`controller`

```java
@RestController
@RequestMapping("user")
public class UserController {
    @Resource
    private UserService userService;
    
    @GetMapping("order")
    public AjaxJson order() {
        return userService.order();
    }
}
```

`service`

```java
@Slf4j
@Service
public class UserServiceImpl implements UserService {
    
    @Resource
    private MpOrderMapper mpOrderMapper;
    @Resource
    private ConsumerService consumerService;
    
    @Override
    @Transactional
    @GlobalTransactional
    public AjaxJson order() {
        consumerService.dropWare();
        mpOrderMapper.insert(OrderPO.builder().id(1L).build());
        return AjaxJson.success();
    }
}
```

`ConsumerService`是使用`feign`远程调用另一个接口

```java
package com.ruben.feign;

import com.ruben.pojo.dto.PageDTO;
import com.ruben.utils.AjaxJson;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient("ruben-consumer")
public interface ConsumerService {

    @GetMapping("ware")
    AjaxJson dropWare();
}
```

`MpOrderMapper`是`mybatis-plus`调用数据库的方法

```java
package com.ruben.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.ruben.pojo.po.OrderPO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MpOrderMapper extends BaseMapper<OrderPO> {
}
```

然后是调用的`ruben-consumer`

首先也是引入依赖

其次是配置

```java
seata:
  enabled: true
  application-id: ${spring.application.name}
  tx-service-group: SEATA_GROUP
  config:
    type: file
    file:
      name: file.conf
  service:
    disable-global-transaction: false
```

```java
package com.ruben.rubenproducerdemo.config;

import com.alibaba.druid.pool.DruidDataSource;
import com.zaxxer.hikari.HikariDataSource;
import io.seata.rm.datasource.DataSourceProxy;
import org.apache.commons.lang3.StringUtils;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.annotation.Resource;
import javax.sql.DataSource;
import java.util.Optional;

/**
 * @ClassName: SeataConfig
 * @Description: 我还没有写描述
 * @Date: 2021/3/14 0014 16:53
 * *
 * @author: <achao1441470436@gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
@Configuration
public class SeataConfig {


    @Bean
    @ConfigurationProperties(prefix = "spring.datasource")
    public DataSource druidDataSource(){
        return new DruidDataSource();
    }

}
```

然后是接口

```java
package com.ruben.rubenproducerdemo.controller;

import com.ruben.rubenproducerdemo.service.WareService;
import com.ruben.rubenproducerdemo.utils.AjaxJson;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @ClassName: WareController
 * @Description: 我还没有写描述
 * @Date: 2021/3/13 0013 22:10
 * *
 * @author: <achao1441470436@gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
@RestController
@RequestMapping("ware")
public class WareController {
    @Resource
    private WareService wareService;

    @GetMapping
    public AjaxJson dropWare() {
        return wareService.dropWare();
    }
}
```

`service`

```java
package com.ruben.rubenproducerdemo.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ruben.dao.WareMapper;
import com.ruben.rubenproducerdemo.pojo.po.WarePO;
import com.ruben.rubenproducerdemo.service.WareService;
import com.ruben.rubenproducerdemo.utils.AjaxJson;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * @ClassName: WareServiceImpl
 * @Description: 我还没有写描述
 * @Date: 2021/3/13 0013 22:14
 * *
 * @author: <achao1441470436@gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
@Service
public class WareServiceImpl extends ServiceImpl<WareMapper, WarePO> implements WareService {

    @Override
    @Transactional
    public AjaxJson dropWare() {
        WarePO ware = this.getById("1");
        Optional.ofNullable(ware).map(WarePO::getWare).filter(w -> w <= 0).ifPresent(wi -> {
            throw new RuntimeException("卖光啦！");
        });
        Optional.ofNullable(ware).ifPresent(w -> this.updateById(WarePO.builder().id("1").ware(w.getWare() - 1).build()));
        return AjaxJson.success("成功");
    }
}
```

我们开始测试

往数据库放条数据

![image-20210314185153412](/imgs/oss/picGo/image-20210314185153412.png)

首次调用接口时可以看到订单生成并且库存成功扣减

![image-20210314185243786](/imgs/oss/picGo/image-20210314185243786.png)

![image-20210314185247897](/imgs/oss/picGo/image-20210314185247897.png)

第二次调用发现抛出异常并成功回滚库存服务

至此，成功使用了`seata`实现了分布式事务