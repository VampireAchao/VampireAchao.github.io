---
title: h2database
date: 2021-12-27 20:24:00
tags: 数据库
---

> 走的慢的人，只要他不丧失目标，也比漫无目的徘徊的人走得快。——莱辛

首先新建一个项目，勾选`MP`和`H2`

![image-20211227203143747](/imgs/oss/picGo/image-20211227203143747.png)

编写配置文件

```yaml
# DataSource Config
spring:
  datasource:
    driver-class-name: org.h2.Driver
    schema: classpath:db/schema-h2.sql
    data: classpath:db/data-h2.sql
    url: jdbc:h2:mem:test
    username: root
    password: test

# Logger Config
logging:
  level:
    com.baomidou.mybatisplus.samples.quickstart: debug
mybatis-plus:
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
```

然后是数据表结构以及数据文件：

![image-20211227205651250](/imgs/oss/picGo/image-20211227205651250.png)

`schema-h2.sql`

```sql
DROP TABLE IF EXISTS user;

CREATE TABLE user
(
	id BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
	name VARCHAR(30) NULL DEFAULT NULL COMMENT '姓名',
	age INT(11) NULL DEFAULT NULL COMMENT '年龄',
	email VARCHAR(50) NULL DEFAULT NULL COMMENT '邮箱',
	version INT(8) NULL COMMENT '版本',
	PRIMARY KEY (id)
);
```

`data-h2.sql`

```sql
DELETE FROM user;

INSERT INTO user (id, name, age, email,version) VALUES
(1, 'Jone', 18, 'test1@baomidou.com',1),
(2, 'Jack', 20, 'test2@baomidou.com',1),
(3, 'Tom', 28, 'test3@baomidou.com',1),
(4, 'Sandy', 21, 'test4@baomidou.com',1),
(5, 'Billie', 24, 'test5@baomidou.com',1);
```

![image-20211227205839340](/imgs/oss/picGo/image-20211227205839340.png)

然后是对应的用户类：

```java
package com.ruben.simpleh2database.entity;


import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.Version;

import java.io.Serializable;

/**
 * @author achao
 */
public class User implements Serializable {

    private static final long serialVersionUID = -7219188882388819210L;
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;
    private String name;
    private Integer age;
    private String email;
    @Version
    private Integer version;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }
}
```

以及`Mapper`

```java
package com.ruben.simpleh2database.mapper;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.ruben.simpleh2database.entity.User;

/**
 * @author achao
 */
public interface UserMapper extends BaseMapper<User> {

}
```

别忘了再加一点点小注解

```java
@MapperScan("com.ruben.*.mapper")
```

![image-20211227205930423](/imgs/oss/picGo/image-20211227205930423.png)

编写测试类，尝试查询列表

```java
package com.ruben.simpleh2database;

import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.ruben.simpleh2database.mapper.UserMapper;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

@SpringBootTest
class SimpleH2databaseApplicationTests {

    @Resource
    private UserMapper userMapper;

    @Test
    void contextLoads() {
        userMapper.selectList(Wrappers.lambdaQuery());
    }

}
```

运行，成功查询到数据

![image-20211227210023680](/imgs/oss/picGo/image-20211227210023680.png)