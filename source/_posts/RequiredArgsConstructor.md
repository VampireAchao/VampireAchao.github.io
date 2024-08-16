---
title: RequiredArgsConstructor
date: 2022-06-01 13:35:19
tags: java
---

> “世间事，除了生死，哪一件不是闲事。”——仓央嘉措《地空》。

分享一个`lombok`注解`@RequiredArgsConstructor`

同样和`@AllArgsConstructor`支持`onConstructor`参数

区别在于，`@RequiredArgsConstructor`只针对`final`的字段生成带参构造器

例如：

```java
package com.ruben.simplescaffold.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ruben.simplescaffold.entity.UserDetail;
import com.ruben.simplescaffold.manager.JsonManager;
import com.ruben.simplescaffold.mapper.UserDetailMapper;
import com.ruben.simplescaffold.service.IUserDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author <achao1441470436@gmail.com>
 * @since 2021/7/30 10:31
 */
@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class UserDetailServiceImpl extends ServiceImpl<UserDetailMapper, UserDetail> implements IUserDetailService {
    private final JsonManager jsonManager;


    /**
     * 获取jsonManager
     *
     * @return jsonManager
     */
    @Override
    public JsonManager getJsonManager() {
        return jsonManager;
    }

}
```

生成后结果：

```java
//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.ruben.simplescaffold.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ruben.simplescaffold.entity.UserDetail;
import com.ruben.simplescaffold.manager.JsonManager;
import com.ruben.simplescaffold.mapper.UserDetailMapper;
import com.ruben.simplescaffold.service.IUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(
    rollbackFor = {Exception.class}
)
public class UserDetailServiceImpl extends ServiceImpl<UserDetailMapper, UserDetail> implements IUserDetailService {
    private final JsonManager jsonManager;

    public JsonManager getJsonManager() {
        return this.jsonManager;
    }

    @Autowired
    public UserDetailServiceImpl(JsonManager jsonManager) {
        this.jsonManager = jsonManager;
    }
}
```

如果有循环依赖，我们再加一个`@Lazy`即可

就像这样：

```java
package com.ruben.simplescaffold.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ruben.simplescaffold.entity.UserDetail;
import com.ruben.simplescaffold.manager.JsonManager;
import com.ruben.simplescaffold.mapper.UserDetailMapper;
import com.ruben.simplescaffold.service.IUserDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author <achao1441470436@gmail.com>
 * @since 2021/7/30 10:31
 */
@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor(onConstructor = @__({@Autowired,@Lazy}))
public class UserDetailServiceImpl extends ServiceImpl<UserDetailMapper, UserDetail> implements IUserDetailService {
    private final JsonManager jsonManager;
    private final IUserDetailService userDetailService;


    /**
     * 获取jsonManager
     *
     * @return jsonManager
     */
    @Override
    public JsonManager getJsonManager() {
        return jsonManager;
    }

}
```

实际：

```java
//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.ruben.simplescaffold.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ruben.simplescaffold.entity.UserDetail;
import com.ruben.simplescaffold.manager.JsonManager;
import com.ruben.simplescaffold.mapper.UserDetailMapper;
import com.ruben.simplescaffold.service.IUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(
    rollbackFor = {Exception.class}
)
public class UserDetailServiceImpl extends ServiceImpl<UserDetailMapper, UserDetail> implements IUserDetailService {
    private final JsonManager jsonManager;
    private final IUserDetailService userDetailService;

    public JsonManager getJsonManager() {
        return this.jsonManager;
    }

    @Autowired
    @Lazy
    public UserDetailServiceImpl(JsonManager jsonManager, IUserDetailService userDetailService) {
        this.jsonManager = jsonManager;
        this.userDetailService = userDetailService;
    }
}
```

