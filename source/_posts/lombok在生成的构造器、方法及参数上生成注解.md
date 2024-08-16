---
title: lombok在生成的构造器、方法及参数上生成注解
date: 2022-03-30 13:43:56
tags: java
---

> 冷眼观人，冷耳听语，冷情当感，冷心思理。——洪应明《菜根谭》

我们可以在`lombok`生成的构造器、方法、参数上再附带注解，参考：

https://projectlombok.org/features/experimental/onX

例如下面代码：

指定构造器上新增`@Autowired`、`@Lazy(true)`

`getter`上新增`@Id`、` @JsonIgnore(true)`

`setter`上新增`@NonNull`

```java
package com.ruben.simplescaffold.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.annotation.Id;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Component
@AllArgsConstructor(onConstructor = @__({@Autowired, @Lazy(true)}))
public class SpringBean {

    @Getter(onMethod_ = {@Id, @JsonIgnore(true)})
    @Setter(onParam_ = {@NonNull})
    private JdbcTemplate jdbcTemplate;
}
```

会生成

```java
//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.ruben.simplescaffold.component;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.annotation.Id;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

@Component
public class SpringBean {
    private JdbcTemplate jdbcTemplate;

    @Autowired
    @Lazy(true)
    public SpringBean(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Id
    @JsonIgnore(true)
    public JdbcTemplate getJdbcTemplate() {
        return this.jdbcTemplate;
    }

    public void setJdbcTemplate(@NonNull JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
}
```

可谓是非常的好用，但是`idea`会爆红警告我们

![image-20220330134752136](/imgs/oss/picGo/image-20220330134752136.png)

即便它仍然能完成编译和运行