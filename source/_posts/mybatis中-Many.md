---
title: mybatis中@Many
date: 2023-03-06 23:09:21
tags: java
---

> 吃饭先喝汤，不用请药方——佚名

之前写了[mybatis中@One](https://VampireAchao.github.io/2023/03/05/mybatis中-One/)

今天写个`@Many`的

首先还是代码：

```java
package com.ruben.mapper;

import com.ruben.pojo.po.UserInfo;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.cursor.Cursor;
import org.apache.ibatis.session.RowBounds;

import java.util.List;

@Mapper
public interface UserMapper {

    @Select("SELECT * FROM user_info")
    @Results({
            @Result(column = "id", property = "id"),
            @Result(column = "name", property = "name"),
            @Result(column = "age", property = "age"),
            @Result(column = "email", property = "email"),
            @Result(property = "userRoles", javaType = List.class, column = "userRole.userId = id",
                    many = @Many(select = "com.ruben.mapper.UserRoleMapper.selectListCursor"))
    })
    List<UserInfo> selectList(RowBounds rowBounds);
}
```

这里的`UserRoleMapper.selectListCursor`还是没动，感觉这里不应该是`userRole.userId`，直接使用`userId`、`roleId`会更好

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.ruben.mapper.UserRoleMapper">
    <resultMap id="userRole" type="com.ruben.pojo.po.UserRole">
        <result column="id" property="id"/>
        <result column="user_id" property="userId"/>
        <result column="role_id" property="roleId"/>
        <association property="role"
                     column="id = role_id"
                     javaType="com.ruben.pojo.po.RoleInfo"
                     select="com.ruben.mapper.RoleMapper.getById"
                     fetchType="lazy"/>
    </resultMap>

    <select id="selectListCursor" resultMap="userRole">
        select *
        from user_role
        <where>
            <if test="userRole.userId != null">
                AND user_id = #{userRole.userId}
            </if>
            <if test="userRole.roleId != null">
                AND role_id = #{userRole.roleId}
            </if>
        </where>
    </select>
</mapper>
```

然后结合之前的代码，这里写个单元测试：

```java
    @Test
    void testMany(@Autowired UserMapper userMapper) {
        List<UserInfo> users = userMapper.selectList(new RowBounds(0, 5));
        Assertions.assertEquals("admin", users.get(0).getUserRoles().get(0).getRole().getRoleName());
        Assertions.assertEquals("user", users.get(0).getUserRoles().get(1).getRole().getRoleName());
    }
```

运行结果：

![image-20230306231317420](/imgs/oss/blog/vampireachao/image-20230306231317420.png)
