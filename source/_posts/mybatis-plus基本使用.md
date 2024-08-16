---
title: mybatis-plus基本使用
date: 2020-11-21 16:43:29
tags: java
---

> 如果一个人不知道他要驶向哪个码头，那么任何风都不会是顺风。——小塞涅卡

[上回](https://VampireAchao.github.io/2020/11/20/vue%E5%B0%81%E8%A3%85axios%E8%AF%B7%E6%B1%82%E5%B7%A5%E5%85%B7%E7%B1%BB/)我们写到封装了`axios`的工具类

今天我把`OSS`上传文件接了，可以去项目目录自取

前端项目：https://gitee.com/VampireAchao/my-vue-app.git

后端项目：https://gitee.com/VampireAchao/simple-springboot.git

传统代码以点到为止，所以这里就不再多聊OSS，想了解可以看[这篇博客](https://VampireAchao.github.io/2020/06/04/%E9%98%BF%E9%87%8C%E4%BA%91OSS%E4%B8%B4%E6%97%B6%E5%87%AD%E8%AF%81%E5%89%8D%E5%90%8E%E7%AB%AF%E9%85%8D%E5%90%88%E4%B8%8A%E4%BC%A0%E6%96%87%E4%BB%B6/)

然后我们聊聊`mybatis-plus`的基本使用

首先引入依赖，这个没什么好说的

```xml
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
            <version>3.1.0</version>
        </dependency>
```

然后我们按照之前创的表去对应新建一个DO

因为之前我们的表结构为这样【Tips：用的SQLite】【[创建库表](https://VampireAchao.github.io/2020/10/11/SQLite%E5%85%A5%E9%97%A8%E3%81%AEjava%E5%88%9B%E5%BB%BA%E5%BA%93%E8%A1%A8/)】【[整合进项目](https://VampireAchao.github.io/2020/10/13/Springboot-Mybatis-SQLite/)】

![image-20201121161149524](/imgs/oss/picGo/image-20201121161149524.png)

所以我们的DO长这样

```java
package com.ruben.pojo.dataObject;/**
 * @ClassName: UserDataObject
 * @Date: 2020/11/21 0021 15:55
 * @Description:
 */

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.ruben.pojo.UserInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * @ClassName: UserDataObject
 * @Description: 我还没有写描述
 * @Date: 2020/11/21 0021 15:55
 * *
 * @author: <achao1441470436@gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TableName("user")
public class UserDataObject implements Serializable {
    private static final long serialVersionUID = -1891465370283313432L;
    private Integer id;
    private String username;
    private String password;
    @TableField(exist = false)
    private UserInfo userInfo;
}
```

注意，这里的`@TableName`是指定表名的意思

以及我们如果字段名称不对应的话需要使用`@TableField`注解，这个注解中，可以指定`value`为我们的表字段名；如果字段不存在与表中，可以指定`exist=false`

然后我们再新建一个`mapper`

```java
package com.ruben.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.ruben.pojo.dataObject.UserDataObject;
import org.apache.ibatis.annotations.Mapper;

/**
 * @ClassName: MpUserMapper
 * @Date: 2020/11/21 0021 15:54
 * @Description:
 */
@Mapper
public interface MpUserMapper extends BaseMapper<UserDataObject> {
}
```

编写测试类测试

```java
package com.ruben;/**
 * @ClassName: MybatisPlusDemo
 * @Date: 2020/11/9 0009 20:51
 * @Description:
 */

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.api.R;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.ruben.dao.MpUserMapper;
import com.ruben.pojo.User;
import com.ruben.pojo.dataObject.UserDataObject;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.DependsOn;

import javax.annotation.Resource;
import java.io.Serializable;
import java.util.function.Function;

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
public class MybatisPlusDemo {

    @Resource
    private MpUserMapper mpUserMapper;
    
    @Test
    public void test() {
        IPage<UserDataObject> page = mpUserMapper.selectPage(new Page<>(1, 2), Wrappers.lambdaQuery(UserDataObject.builder().build()));
        System.out.println(page);
    }
    
}
```

这里我没大意，顺便把`springboot-test-starter`的依赖放出来

```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>
```

我们运行后[`debug`](https://VampireAchao.github.io/2020/10/14/debug%E3%81%AEidea%E7%AF%87/)可以看到查询出来了我们想要的数据

![image-20201121162321089](/imgs/oss/picGo/image-20201121162321089.png)

我们再来一个

例如我们需要根据多个`ID`查询，并且 名字里有`achao` 或者 `Achao`

```java
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
```

很容易就写好了，查询结果，但我们发现这里分页有问题，返回的`total`为0

![image-20201121163826999](/imgs/oss/picGo/image-20201121163826999.png)

我们需要写个`mybatis-plus`的配置类

```java
package com.ruben.config;

import com.baomidou.mybatisplus.extension.plugins.PaginationInterceptor;
import com.baomidou.mybatisplus.extension.plugins.pagination.optimize.JsqlParserCountOptimize;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @ClassName: MybatisPlusConfig
 * @Description: 我还没有写描述
 * @Date: 2020/11/21 0021 16:34
 * *
 * @author: <achao1441470436@gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
@Configuration
@MapperScan("com.ruben.dao.mapper*")
public class MybatisPlusConfig {
    @Bean
    public PaginationInterceptor paginationInterceptor() {
        PaginationInterceptor paginationInterceptor = new PaginationInterceptor();
        return paginationInterceptor;
    }
}
```

然后我们的分页问题就解决了

![image-20201121163932404](/imgs/oss/picGo/image-20201121163932404.png)

最后放上[`mybatis-plus`官网](https://baomidou.com/)：https://mybatis.plus/

