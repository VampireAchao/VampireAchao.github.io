---
title: springbootTest坑
date: 2020-12-22 20:28:26
tags: java
---

> 人一能之，己百之；人十能之，己千之。——《中庸》

今天踩到一个坑，使用`springboot`单元测试时插入数据回滚了

最后发现原来需要在测试类上面加上`@Rollback(false)`就可以了



![image-20201222204220181](/imgs/oss/picGo/image-20201222204220181.png)

```java
package com.ruben;/**
 * @ClassName: MybatisPlusDemo
 * @Date: 2020/11/9 0009 20:51
 * @Description:
 */

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.ruben.dao.MpUserMapper;
import com.ruben.pojo.dataObject.UserDataObject;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.util.SimpleIdGenerator;

import javax.annotation.Resource;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * @ClassName: MybatisPlusDemo
 * @Description: 我还没有写描述
 * @Date: 2020/11/9 0009 20:51
 * *
 * @author: <achao1441470436@gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
@SpringBootTest
@Rollback(false)
public class MybatisPlusDemo {

    @Resource
    private MpUserMapper mpUserMapper;

    @Test
    public void insert() {
        mpUserMapper.insert(UserDataObject.builder().id(new SimpleIdGenerator().generateId().variant()).username("Jack").password(UUID.randomUUID().toString()).build());
    }

    @Test
    public void test() {
        IPage<UserDataObject> page = mpUserMapper.selectPage(new Page<>(1, 2), Wrappers.lambdaQuery(UserDataObject.builder().build()));
        System.out.println(page);
        LambdaQueryWrapper<UserDataObject> wrapper = Wrappers.lambdaQuery(UserDataObject.builder().build());
        // 取得用户ids
        List<Integer> userIds = page.getRecords().stream().map(UserDataObject::getId).collect(Collectors.toList());
        // 根据ids用IN查询
        wrapper.in(UserDataObject::getId, userIds)
                // 并且
                .and(w -> w.like(UserDataObject::getUsername, "achao").or(wr -> wr.like(UserDataObject::getUsername, "Achao")));
        page = mpUserMapper.selectPage(new Page<>(1, 2), wrapper);
        System.out.println(page);
    }

}

```



