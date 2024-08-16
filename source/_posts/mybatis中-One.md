---
title: mybatis中@One
date: 2023-03-05 22:08:34
tags: java
---

> 不要放纵你的爱情，不要让欲望的利剑把你射中——莎士比亚

前两天写了[mybatis一对多查询](https://VampireAchao.github.io/2023/03/01/mybatis一对多查询/)

今天写一下在代码中如何使用`@One`实现一对一的关联查询

这里的`@One`注解类名`org.apache.ibatis.annotations.One`

代码如下：

```java
    @Select("<script>" +
            "select *" +
            "        from user_role\n" +
            "        <where>" +
            "            <if test=\"userId != null\">" +
            "                AND user_id = #{userId}" +
            "            </if>" +
            "            <if test=\"roleId != null\">" +
            "                AND role_id = #{roleId}" +
            "            </if>" +
            "        </where>" +
            "</script>")
    @Results({
            @Result(property = "id", column = "id"),
            @Result(property = "userId", column = "user_id"),
            @Result(property = "roleId", column = "role_id"),
            @Result(property = "role", javaType = RoleInfo.class, column = "role_id",
                    one = @One(select = "com.ruben.mapper.RoleMapper.getById"))
    })
    List<UserRole> selectList(UserRole userRole);
```

然后执行单元测试：

```java
    @Test
    void testOne(@Autowired UserRoleMapper userRoleMapper) {
        List<UserRole> userRoles = userRoleMapper.selectList(new UserRole() {{
            setUserId(1L);
        }});
        Assertions.assertEquals("admin", userRoles.get(0).getRole().getRoleName());
        Assertions.assertEquals("user", userRoles.get(1).getRole().getRoleName());
    }
```

结果：

![image-20230305223622356](/imgs/oss/blog/vampireachao/image-20230305223622356.png)

完整代码：

https://gitee.com/VampireAchao/simple-mybatis.git
