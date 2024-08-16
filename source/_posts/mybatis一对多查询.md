---
title: mybatis一对多查询
date: 2023-03-01 22:37:05
tags: java
---

> 想认识人，解剖自己就好——杜克罗

[官方文档](https://mybatis.org/mybatis-3/zh/sqlmap-xml.html#%E9%9B%86%E5%90%88%E7%9A%84%E5%B5%8C%E5%A5%97%E7%BB%93%E6%9E%9C%E6%98%A0%E5%B0%84)

书接上文：[mybatis流式查询](https://VampireAchao.github.io/2022/05/14/mybatis流式查询/)

分享`mybatis`的结果映射配置的一对多查询方式：

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.ruben.mapper.UserMapper">
    <resultMap id="userInfo" type="com.ruben.pojo.po.UserInfo">
        <collection property="userRoles"
                    column="userRole.userId=id"
                    javaType="arraylist"
                    select="com.ruben.mapper.UserRoleMapper.selectListCursor"
                    fetchType="lazy"/>
    </resultMap>

    <select id="selectPageCursor" resultMap="userInfo">
        select *
        from user_info
    </select>
</mapper>
```

然后是`UserRoleMapper`对应的`xml`

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

以及`RoleMapper`的

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.ruben.mapper.RoleMapper">
    <resultMap id="roleInfo" type="com.ruben.pojo.po.RoleInfo">
        <result column="id" property="id"/>
        <result column="role_name" property="roleName"/>
    </resultMap>

    <select id="getById" resultMap="roleInfo">
        select *
        from role_info
        where id = #{id}
    </select>
</mapper>
```

直接执行：

```java
    @Test
    @SneakyThrows
    void sqlSessionWay() {
        Assertions.assertAll(() -> {
            try (SqlSession session = sqlSessionFactory.openSession(); Cursor<UserInfo> userCursor = session.getMapper(UserMapper.class).selectPageCursor(new RowBounds(0, 5))) {
                StreamSupport.stream(userCursor.spliterator(), true).forEach(System.out::println);
            }
        });
    }
```

输出：

![image-20230301224444879](/imgs/oss/blog/vampireachao/image-20230301224444879.png)

完整代码：

https://gitee.com/VampireAchao/simple-mybatis.git

