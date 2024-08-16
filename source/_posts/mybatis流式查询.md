---
title: mybatis流式查询
date: 2022-05-14 13:24:13
tags: java
---

> 所谓浮躁，也就是时时刻刻，希望以最短的时间，博取最多的存在感、优越感和自我认同。——张佳玮

分享一个`mybatis`流式查询

用法很简单：

```java
package com.ruben;

import com.ruben.mapper.UserMapper;
import com.ruben.pojo.po.UserPO;
import lombok.SneakyThrows;
import org.apache.ibatis.cursor.Cursor;
import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionTemplate;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.stream.StreamSupport;

@SpringBootTest
class SimpleMybatisApplicationTests {

    @Resource
    private SqlSessionFactory sqlSessionFactory;
    @Resource
    private TransactionTemplate transactionTemplate;
    @Resource
    private UserMapper userMapper;

    @Test
    @SneakyThrows
    void sqlSessionWay() {
        Assertions.assertAll(() -> {
            try (SqlSession session = sqlSessionFactory.openSession(); Cursor<UserPO> userCursor = session.getMapper(UserMapper.class).selectPageCursor(new RowBounds(0, 5))) {
                StreamSupport.stream(userCursor.spliterator(), true).forEach(System.out::println);
            }
        });
    }

    @Test
    void transactionTemplateWay() {
        Assertions.assertAll(() -> transactionTemplate.executeWithoutResult(transactionStatus -> {
            try (Cursor<UserPO> userCursor = userMapper.selectPageCursor(new RowBounds(0, 5))) {
                StreamSupport.stream(userCursor.spliterator(), true).forEach(System.out::println);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }));
    }

    @Test
    @Transactional
    void transactionalWay() {
        Assertions.assertAll(() -> {
            try (Cursor<UserPO> userCursor = userMapper.selectPageCursor(new RowBounds(0, 5))) {
                StreamSupport.stream(userCursor.spliterator(), true).forEach(System.out::println);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
    }


}
```

注意这里返回的`Cursor`需要关闭，可以用

```java
StreamSupport.stream(userCursor.spliterator(), false);
```

将其转换为`Stream`流

`Mapper`：

```java
package com.ruben.mapper;

import com.ruben.pojo.po.UserPO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.cursor.Cursor;
import org.apache.ibatis.session.RowBounds;

/**
 * 用户Mapper
 *
 * @author VampireAchao
 */
@Mapper
public interface UserMapper {
    /**
     * 流式分页查询用户
     *
     * @param rowBounds 分页条件
     * @return 用户流
     */
    Cursor<UserPO> selectPageCursor(RowBounds rowBounds);

}
```

`xml`

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.ruben.mapper.UserMapper">
    <select id="selectPageCursor" resultType="com.ruben.pojo.po.UserPO">
        select *
        from User
    </select>
</mapper>
```

`po`：

```java
package com.ruben.pojo.po;

import lombok.Data;

import java.io.Serializable;

/**
 * 用户PO
 *
 * @author VampireAchao
 */
@Data
public class UserPO implements Serializable {

    private static final long serialVersionUID = -7219188882388819210L;
    private Long id;
    private String name;
    private Integer age;
    private String email;
    private Integer version;
}
```

执行以下测试用例：

![image-20220514133319228](/imgs/oss/picGo/image-20220514133319228.png)

完整代码：

https://gitee.com/VampireAchao/simple-mybatis.git