---
title: Collectors.toMap()
date: 2020-08-05 19:11:23
tags: java
---

把两个表内的数据查出来放进一个`List`，处理对应关系，以前我们的写法是下面这种，用了一个嵌套循环的形式，判断一下`userId`是否相等，如果相等，则赋值

```java
		//查询用户
        List<User> userList = userDao.selectUser();
        //查询用户信息
        List<UserInfo> userInfoList = userInfoDao.selectUserInfo();
        //遍历赋值
        userList = userList.stream().peek(user -> {
            //遍历userInfo
            userInfoList.forEach(userInfo -> {
                //如果user的id和userInfo相等，就赋值
                if (user.getId().equals(userInfo.getUserId())) {
                    user.setUserInfo(userInfo);
                }
            });
        }).collect(Collectors.toList());
        //打印
        userList.forEach(System.out::println);
```

现在用了`toMap`，原先嵌套循环的o(n2)的时间复杂度，现在变成了o(n)。只用循环遍历一次，就能达到我们的效果，非常实用~学会的小伙伴赶紧拿去秀操作吧！

```java
		//查询用户
        List<User> userList = userDao.selectUser();
        //查询用户信息
        List<UserInfo> userInfoList = userInfoDao.selectUserInfo();
        //转换为map，key为userId，value为userInfo
        Map<String, UserInfo> userInfoMap = userInfoList.stream().collect(Collectors.toMap(UserInfo::getUserId, Function.identity(), (key1, key2) -> key2));
        //批量赋值
        userList = userList.stream().peek(user -> {
            //直接赋值
            user.setUserInfo(userInfoMap.get(user.getId()));
        }).collect(Collectors.toList());
        //打印
        userList.forEach(System.out::println);
```

打印结果

```shell
User{id='123', userInfo=UserInfo{userId='123', age=18}, password='password', userName='张三'}
User{id='123', userInfo=UserInfo{userId='123', age=18}, password='password', userName='张三'}
```

这里只是简单模拟了一下，实际场景还得根据实际应用哦