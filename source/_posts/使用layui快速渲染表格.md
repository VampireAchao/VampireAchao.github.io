---
title: 使用layui快速渲染表格
date: 2021-01-22 22:47:38
tags: 前端
---

> 耳闻之不如目见之，目见之不如足践之。一一刘向《说苑》

我们首先准备一个接口，格式如下

```json
# 请求方法为POST，参数格式为:application/json
{"pageNum":1,"pageSize":10}
# 响应格式如下
{
    "msg": "查询成功！",
    "code": 200,
    "data": {
        "records": [],
        "total": 0,
        "size": 10,
        "current": 1,
        "searchCount": true,
        "pages": 1
    },
    "success": true
}
```

编写`Java`代码

DTO

```java
package com.ruben.pojo.dto;

import lombok.Data;

/**
 * @ClassName: PageDTO
 * @Description: 我还没有写描述
 * @Date: 2021/1/22 0022 22:51
 * *
 * @author: <achao1441470436@gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
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

`PO`

```java
package com.ruben.pojo.po;/**
 * @ClassName: UserDataObject
 * @Date: 2020/11/21 0021 15:55
 * @Description:
 */

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.*;

import java.io.Serializable;

/**
 * @ClassName: UserPO
 * @Description: 我还没有写描述
 * @Date: 2020/11/21 0021 15:55
 * *
 * @author: <achao1441470436@gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
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

`Controller`

```java
@RestController
@RequestMapping("user")
@DependsOn("SpringContextHolder")
public class UserController {

    @Resource
    private UserService userService;

    /**
     * 获取用户列表
     *
     * @return
     */
    @PostMapping("userList")
    public AjaxJson userList(@RequestBody PageDTO pageDTO) {
        IPage<UserPO> page = userService.findList(pageDTO);
        // 过滤密码
        page.setRecords(page.getRecords().stream().peek(userPO -> userPO.setPassword(null)).collect(Collectors.toList()));
        return AjaxJson.success("查询成功！").put("data", page);
    }
    
}
```

`Service`

```java
@Slf4j
@Service
public class UserServiceImpl implements UserService {
    
    @Resource
    private MpUserMapper mpUserMapper;

    @Override
    public IPage<UserPO> findList(PageDTO pageDTO) {
        return mpUserMapper.selectPage(new Page<>(pageDTO.getPageNum(), pageDTO.getPageSize()), Wrappers.lambdaQuery());
    }
    
}
```

然后就可以开始编写前端代码了，这里使用的是[`layui`](https://www.layui.com/doc/modules/table.html)，非常方便好用，这里就只写一个简单的`Demo`啦

```java
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>table</title>
    <link rel="stylesheet" href="layui/css/layui.css" media="all">
</head>
<body onload="refreshList()">
<div class="layui-container">
    <div class="layui-row">
        <div class="layui-col-md12">
            <button class="layui-btn layui-btn-normal layui-btn-fluid" onclick="refreshList()">刷新</button>
        </div>
    </div>
    <div class="layui-row">
        <div class="layui-col-md12">
            <table id="demo" lay-filter="test"></table>
        </div>
    </div>
</div>
<script type="application/javascript" src="js/index.js"></script>
<script src="layui/layui.all.js"></script>
<script>
    function refreshList() {
        let table = layui.table;
        //第一个实例
        table.render({
            elem: '#demo',
            method: 'post',     // 接口http请求类型，默认：get
            url: '/user/userList', //数据接口
            contentType: 'application/json',    // 发送到服务端的内容编码类型
            page: true,         //开启分页
            parseData: function (res) { //res 即为原始返回的数据
                return {
                    "code": res.code, //解析接口状态
                    "msg": res.msg, //解析提示文本
                    "count": res.data.total, //解析数据长度
                    "data": res.data.records //解析数据列表
                };
            },
            request: {
                pageName: 'pageNum' //页码的参数名称，默认：page
                , limitName: 'pageSize' //每页数据量的参数名，默认：limit
            },
            response: {
                "statusCode": 200    //规定成功的状态码，默认：0
            },
            cols: [[ //表头
                {field: 'id', title: 'ID', fixed: 'left'}
                , {field: 'username', title: '用户名'}
            ]]
        });
    }
</script>
</body>
</html>
```

