---
title: shaun中在不需要安全拦截的接口获取用户信息
date: 2021-09-09 19:42:34
tags: java
---

> 我将仇恨写在冰上，然后期待太阳的升起。——加西亚马尔克斯

这里`Opt`用的是之前博客提到的复制修改过的`Optional`：

https://VampireAchao.github.io/2021/07/19/%E6%96%B0%E7%89%88Optional/

`shaun`我之前也稍微写过：https://VampireAchao.github.io/2021/09/02/shaun/

代码很简单：

```java
    /**
     * 获取用户信息
     *
     * @return com.baomidou.shaun.core.profile.TokenProfile
     * @author <achao1441470436@gmail.com>
     * @since 2021/9/9 10:33
     */
    public static Opt<TokenProfile> getProfile() {
        final JEEContext context = WebUtil.getJEEContext(false);
        return Opt.ofNullable(CORE_CONFIG.getProfileTokenManager().getProfile(context));
    }
```

参考的是`shaun`源码中`com.baomidou.shaun.core.filter`中的写法

