---
title: mybatis-plus测试
date: 2022-05-26 12:49:39
tags: java
---

> 生命，那是自然付给人类去雕琢的宝石。——诺贝尔

`mybatis-plus`快速测试，文档：https://baomidou.com/pages/b7dae0/

首先添加依赖

```xml
        <!-- 测试依赖 -->
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter-test</artifactId>
            <version>3.5.1</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.24</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <version>1.4.200</version>
            <scope>test</scope>
        </dependency>
```

然后配置：

![image-20220526125301997](/imgs/oss/picGo/image-20220526125301997.png)

```yaml
spring:
  datasource:
    driver-class-name: org.h2.Driver
    schema: classpath:schema.sql
    data: classpath:data.sql
    url: jdbc:h2:mem:test

logging:
  level:
    root: DEBUG
```

`schema.sql`：

```sql
drop table if exists user_info;
create table if not exists user_info
(
    id    BIGINT(20) AUTO_INCREMENT NOT NULL COMMENT '主键ID',
    name  VARCHAR(30) NULL DEFAULT NULL COMMENT '姓名',
    age   INT(11)     NULL DEFAULT NULL COMMENT '年龄',
    email VARCHAR(50) NULL DEFAULT NULL COMMENT '邮箱',
    PRIMARY KEY (id)
);
```

`data.sql`：

```sql
DELETE
FROM user_info;

INSERT INTO user_info (id, name, age, email)
VALUES (1, 'Jone', 18, 'test1@baomidou.com'),
       (2, 'Jack', 18, 'test2@baomidou.com'),
       (3, 'Tom', 28, 'test3@baomidou.com'),
       (4, 'Sandy', 21, 'test4@baomidou.com'),
       (5, 'Billie', 24, 'test5@baomidou.com');
```

主启动类：

```java
package io.github.vampireachao.stream.plugin.mybatisplus;

import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * MybatisPlusTestApplication
 *
 * @author VampireAchao
 * @since 2022/5/21
 */
@SpringBootApplication
public class MybatisPlusTestApplication {
}
```

`PO`：

```java
package io.github.vampireachao.stream.plugin.mybatisplus.pojo.po;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

/**
 * UserInfo
 *
 * @author VampireAchao
 * @since 2022/5/21
 */
@Data
public class UserInfo {

    private static final long serialVersionUID = -7219188882388819210L;
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;
    private String name;
    private Integer age;
    private String email;
}
```

然后是`mapper`

```java
package io.github.vampireachao.stream.plugin.mybatisplus.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import io.github.vampireachao.stream.plugin.mybatisplus.pojo.po.UserInfo;
import org.apache.ibatis.annotations.Mapper;

/**
 * UserInfoMapper
 *
 * @author VampireAchao
 * @since 2022/5/21
 */
@Mapper
public interface UserInfoMapper extends BaseMapper<UserInfo> {
}
```

测试类：

```java
@MybatisPlusTest
class MybatisPlusSampleTest {

    @Autowired
    private UserInfoMapper userInfoMapper;

    @Test
    void testInsert() {
        UserInfo userInfo = new UserInfo();
        userInfoMapper.insert(userInfo);
        Assertions.assertThat(userInfo.getId()).isNotNull();
    }
}
```

