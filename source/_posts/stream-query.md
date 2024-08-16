---
title: stream-query
date: 2022-05-29 09:21:34
tags: java
---

> 

> “春非我春，夏非我夏，秋非我秋，冬非我冬。”——汉乐府《日出入》

弄了好几天，终于成功上传到`maven`中央仓库了

使用方式：

```xml
        <dependency>
            <groupId>io.github.vampireachao</groupId>
            <artifactId>stream-plugin-mybatis-plus</artifactId>
            <version>1.0.5</version>
        </dependency>
        <dependency>
            <groupId>io.github.vampireachao</groupId>
            <artifactId>stream-core</artifactId>
            <version>1.0.5</version>
        </dependency>
```

引入这两个依赖，然后就可以使用啦

[测试用例](https://github.com/VampireAchao/stream-query/tree/master/stream-plugin/stream-plugin-mybatis-plus/src/test/java/io/github/vampireachao/stream/plugin/mybatisplus)

```java
package io.github.vampireachao.stream.plugin.mybatisplus;

import com.baomidou.mybatisplus.test.autoconfigure.MybatisPlusTest;
import io.github.vampireachao.stream.plugin.mybatisplus.pojo.po.UserInfo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

/**
 * 一对一测试
 *
 * @author VampireAchao &lt; achao1441470436@gmail.com &gt;
 */
@MybatisPlusTest
class OneToOneTest {

    @Test
    void testQuery() {
        List<Long> userIds = Arrays.asList(1L, 2L, 3L, 4L, 5L);
        Map<Long, UserInfo> idUserMap = OneToOne.query(userIds, UserInfo::getId);
        Assertions.assertEquals(5, idUserMap.size());

        Map<Long, String> userIdNameMap = OneToOne.query(userIds, UserInfo::getId, UserInfo::getName);
        Assertions.assertEquals(5, userIdNameMap.size());

        userIdNameMap = OneToOne.query(w -> w.le(UserInfo::getAge, 22), userIds, UserInfo::getId, UserInfo::getName);
        Assertions.assertEquals(3, userIdNameMap.size());


        idUserMap = OneToOne.query(1L, UserInfo::getId);
        Assertions.assertEquals(1, idUserMap.size());

        userIdNameMap = OneToOne.query(1L, UserInfo::getId, UserInfo::getName);
        Assertions.assertEquals(1, userIdNameMap.size());

        userIdNameMap = OneToOne.query(w -> w.le(UserInfo::getAge, 22), 1L, UserInfo::getId, UserInfo::getName);
        Assertions.assertEquals(1, userIdNameMap.size());

        Map<Long, Boolean> query = OneToOne.query(w -> w.select(UserInfo::getId, UserInfo::getName), userIds, UserInfo::getId, userInfo -> userInfo.getName() != null && userInfo.getName().contains("a"));
        Assertions.assertEquals(2, query.values().stream().filter(Boolean::booleanValue).count());
    }

}
```

一对多

```java
package io.github.vampireachao.stream.plugin.mybatisplus;

import com.baomidou.mybatisplus.test.autoconfigure.MybatisPlusTest;
import io.github.vampireachao.stream.plugin.mybatisplus.pojo.po.UserInfo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Map;

/**
 * 一对多测试
 *
 * @author VampireAchao &lt; achao1441470436@gmail.com &gt;
 * @since 2022/5/23 13:51
 */
@MybatisPlusTest
class OneToManyTest {
    @Test
    void testQuery() {
        Assertions.assertAll(() -> {
            List<Integer> userAges = Arrays.asList(18, 18, 28, 21, 24);
            Map<Integer, List<UserInfo>> ageUsersMap = OneToMany.query(userAges, UserInfo::getAge);
            Assertions.assertEquals(4, ageUsersMap.size());

            Map<Integer, List<String>> userAgeNameMap = OneToMany.query(userAges, UserInfo::getAge, UserInfo::getName);
            Assertions.assertEquals(4, userAgeNameMap.size());

            userAgeNameMap = OneToMany.query(w -> w.le(UserInfo::getAge, 22), userAges, UserInfo::getAge, UserInfo::getName);
            Assertions.assertEquals(2, userAgeNameMap.size());


            ageUsersMap = OneToMany.query(18, UserInfo::getAge);
            Assertions.assertEquals(1, ageUsersMap.size());

            userAgeNameMap = OneToMany.query(18, UserInfo::getAge, UserInfo::getName);
            Assertions.assertEquals(1, userAgeNameMap.size());

            userAgeNameMap = OneToMany.query(w -> w.le(UserInfo::getAge, 22), 18, UserInfo::getAge, UserInfo::getName);
            Assertions.assertEquals(1, userAgeNameMap.size());

            Map<Integer, List<Boolean>> query = OneToMany.query(w -> w.select(UserInfo::getAge, UserInfo::getName), userAges, UserInfo::getAge, userInfo -> userInfo.getName() != null && userInfo.getName().contains("a"));
            Assertions.assertEquals(2, query.values().stream().flatMap(Collection::stream).filter(Boolean::booleanValue).count());
        });
    }
}
```

一对多对一

```java
package io.github.vampireachao.stream.plugin.mybatisplus;

import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.toolkit.SimpleQuery;
import com.baomidou.mybatisplus.test.autoconfigure.MybatisPlusTest;
import io.github.vampireachao.stream.core.StreamHelper;
import io.github.vampireachao.stream.plugin.mybatisplus.pojo.po.RoleInfo;
import io.github.vampireachao.stream.plugin.mybatisplus.pojo.po.UserInfo;
import io.github.vampireachao.stream.plugin.mybatisplus.pojo.po.UserRole;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * OneToManyToOneTest
 *
 * @author VampireAchao
 * @since 2022/5/23
 */
@MybatisPlusTest
class OneToManyToOneTest {

    @Test
    void testQuery() {
        Assertions.assertAll(() -> {
            List<UserInfo> userInfos = SimpleQuery.selectList(UserInfo.class, Wrappers.lambdaQuery());
            Assertions.assertEquals(5, userInfos.size());
            List<UserRole> userRoles = SimpleQuery.selectList(UserRole.class, Wrappers.lambdaQuery());
            Assertions.assertEquals(10, userRoles.size());
            List<RoleInfo> roleInfos = SimpleQuery.selectList(RoleInfo.class, Wrappers.lambdaQuery());
            Assertions.assertEquals(3, roleInfos.size());

            Set<Long> userIds = StreamHelper.mapToSet(userInfos, UserInfo::getId);

            Set<Long> roleIds = new HashSet<>();
            Map<Long, List<Long>> userIdRoleIdsMap = OneToMany.query(userIds, UserRole::getUserId, UserRole::getRoleId, userRole -> roleIds.add(userRole.getRoleId()));
            Map<Long, RoleInfo> idRoleMap = OneToOne.query(roleIds, RoleInfo::getId);
            Map<Long, List<RoleInfo>> userIdRoleInfosMap = userIdRoleIdsMap.entrySet().stream().collect(Collectors.toMap(Map.Entry::getKey, entry -> entry.getValue().stream().map(idRoleMap::get).collect(Collectors.toList())));
            Assertions.assertEquals(5, userIdRoleInfosMap.size());

            userIdRoleInfosMap = OneToManyToOne.query(userIds, UserRole::getUserId, UserRole::getRoleId, RoleInfo::getId);
            Assertions.assertEquals(5, userIdRoleInfosMap.size());

        });
    }

}
```

