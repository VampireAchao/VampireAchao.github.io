---
title: DTO、TO、VO、PO、DO、BO、AO、DAO、POJO
date: 2021-01-23 23:43:40
tags: java
---

> 人的一生，应当像这美丽的花，自己无所求，而却给人间以美。——杨沫

之前一直有朋友问我`Java`中`DTO`、`TO`、`VO`、`PO`、`DO`、`BO`、`AO`、`DAO`、`POJO`这么多`O`到底是什么意思，看博客看不懂，有没有实际的例子

当然，这些`O`是出自《阿里`Java`开发手册》

> 7. POJO（Plain Ordinary Java Object）: 在本规约中，POJO 专指只有 setter/getter/toString 的
>
> 简单类，包括 DO/DTO/BO/VO 等。
>
> 8. AO（Application Object）: 阿里巴巴专指 Application Object，即在 Service 层上，极为贴近
>
> 业务的复用代码。

我就说说我的理解吧，顺带写点例子

这里就写个根据用户名、分页参数查询用户列表的例子吧

**DTO(Data Transfer Object)数据传输对象**

首先我们接口接参可以使用`DTO`，简单来说就是`Controller`中函数的参数,例如下面的`PageDTO`

```java
@Data
public class PageDTO {
    /**
     * 页数
     */
    private Integer pageNum;
    /**
     * 当前页数据条数
     */
    private Integer pageSize;
    /**
     * 关键字
     */
    private String keywords;
    /**
     * 编号
     */
    private String id;
}
```

然后我们需要调用`service`层，这个时候就轮到我们的`TO`出场了

**TO(Transfer Object)传输对象**

我们使用`TO`去作为`service`层函数的参数,返回值也可以继续使用`TO`

```java
@Data
public class UserTO implements Serializable {
    private static final long serialVersionUID = -2637904684735473209L;
    /**
     * 检索字段：用户名
     */
    private String username;
    /**
     * 页数
     */
    private Integer pageNum;
    /**
     * 当前页数据条数
     */
    private Integer pageSize;
    /**
     * 数据总条数
     */
    private Long total;
    /**
     * 返回BO数据
     */
    private List<UserBO> dataList;

}
```

接下里封装返回需要的`VO`

**VO(View Object)展示层对象**

用来返回给前端显示渲染的对象

```java
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserVO implements Serializable {
    private static final long serialVersionUID = -5090933297201171908L;
    /**
     * 编号
     */
    private Integer id;
    /**
     * 用户名
     */
    private String username;
    /**
     * 手机号
     */
    private String phoneNumber;
}
```

```java
    @PostMapping("findUserList")
    public AjaxJson findUserList(@RequestBody PageDTO pageDTO) {
        // DTO转换为TO，用于向service层传输
        UserTO param = new UserTO();
        param.setPageNum(pageDTO.getPageNum());
        param.setPageSize(pageDTO.getPageSize());
        param.setUsername(pageDTO.getKeywords());
        UserTO result = userService.findUserList(param);
        // TO转换成VO，用于向页面展示
        List<UserVO> userVOList = result.getDataList().stream().map(data -> UserVO.builder().id(data.getUser().getId()).username(data.getUser().getUsername()).phoneNumber(data.getUserInfo().getPhoneNumber()).build()).collect(Collectors.toList());
        return AjaxJson.success().put("total", result.getTotal()).put("pageNum", result.getPageNum()).put("pageSize", result.getPageSize()).put("data", userVOList);
    }
```

然后是`findUserList`内部

**PO(Persistant Object)持久层对象/DO(Domain Object)领域对象**

这两个一般和数据库表的字段一一对应

```
@Data
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@TableName("user")
public class UserPO implements Serializable {
    private static final long serialVersionUID = -1891465370283313432L;
    private Integer id;
    private String username;
    private String password;

}
```

```java
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoPO implements Serializable {
    private static final long serialVersionUID = -4811520466138197276L;
    private Integer id;
    private String phoneNumber;
    private String address;
    private String qqNumber;
    private String wxNumber;
    private String weiboNumber;
}
```

**BO(Business Object)业务对象**

一般包含多个对象，和业务关系有关，例如这里就是一个`User`对应一个`UserInfo`

```java
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserBO implements Serializable {
    private static final long serialVersionUID = -8368935565931556343L;
    private UserPO user;
    private UserInfoPO userInfo;
}
```

`findUserList`函数

```java
    @Resource
    private MpUserMapper mpUserMapper;
    @Resource
    private MpUserInfoMapper mpUserInfoMapper;

    @Override
    public UserTO findUserList(UserTO param) {
        // 这里查询条件使用PO传输
        IPage<UserPO> userPage = mpUserMapper.selectPage(new Page<>(param.getPageNum(), param.getPageSize()),
                Wrappers.lambdaQuery(UserPO.builder().username(param.getUsername()).build()));
        // 获取用户ids
        List<Integer> userIds = userPage.getRecords().stream().map(UserPO::getId).collect(Collectors.toList());
        Map<Integer, UserInfoPO> userInfoMap = new HashMap<>(userIds.size());
        if (!userIds.isEmpty()) {
            // 查询userInfo并放入userInfoMap，key为id，value为它本身
            List<UserInfoPO> userInfoList = mpUserInfoMapper.selectList(Wrappers.lambdaQuery(UserInfoPO.builder().build()).in(UserInfoPO::getId, userIds));
            if (!userInfoList.isEmpty()) {
                userInfoMap.putAll(userInfoList.stream().collect(Collectors.toMap(UserInfoPO::getId, Function.identity())));
            }
        }
        // 封装BO
        List<UserBO> userBOList = userPage.getRecords().stream().map(user -> {
            UserInfoPO userInfo = userInfoMap.getOrDefault(user.getId(), new UserInfoPO());
            return UserBO.builder().user(user).userInfo(userInfo).build();
        }).collect(Collectors.toList());
        param.setTotal(userPage.getTotal());
        param.setDataList(userBOList);
        return param;
    }
```

然后是**AO（Application Object）**

`AO`在我认为就是`service`层的这个类，例如`UserService`就是一个`AO`

**DAO(Data Access Object)**对应上面的`Mapper`,例如`MpUserMapper`就是一个`DAO`

**POJO（Plain Ordinary Java Object）**专指只有 setter/getter/toString 的简单类，包括 DO/DTO/BO/VO 等。

这就是我对`DTO、TO、VO、PO、DO、BO、AO、DAO、POJO`的理解了

其实在不同的公司，不同的技术经理会定好，或者公司内部有相关文档等，这上面也只是我当前公司沿用的，仅供参考，如有争议也欢迎与我探讨

