---
title: layui数据表格
date: 2021-08-20 19:11:29
tags: 前端
---

> 一个能思想的人，才真是一个力量无边的人。——巴尔扎克

使用`layui`进行数据表格对接的时候，要注意数据请求和返回的格式

一定要多看文档

https://www.layui.com/doc/modules/table.html

例如我这里

```html
<!-- 表格 -->
<table class="layui-hide" id="test-table-toolbar" lay-filter="test-table-toolbar"></table>

<script id="test-table-toolbar-toolbarDemo" type="text/html">
                        <!-- 头部工具栏 -->
                        <a class="layui-btn layui-btn-normal layui-btn-xs" lay-event="add">新增</a>
                    </script>
                    <script id="test-table-toolbar-barDemo" type="text/html">
                        <!-- 操作栏 -->
                        <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
                        <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
                    </script>
                    <script class="table-cover-img" id="cover" type="text/html">
                        <!-- 封面列 -->
                        <img class="layedit-tool-image" alt="" src="{{d.cover}}"/>
                    </script>
                    <script class="table-category" id="row-category" type="text/html">
                        <!-- 分类列 -->
                        <a class="layui-btn layui-btn-primary" lay-event="chooseCategory">
                            <text id="coll-category">{{d.category?d.category:'请选择'}}</text>
                            <i class="layui-icon layui-icon-down"></i></a>
                    </script>
```

我们渲染成数据表格

```javascript
layui.use(() => {
    var $ = layui.jquery
    , table = layui.table
    , dropdown = layui.dropdown
    , form = layui.form;

		table.render({
            elem: '#test-table-toolbar'
            , url: '/articleInfo/page'
            , parseData: function (res) { //res 即为原始返回的数据
                console.log(res)
                return {
                    "code": res.code, //解析接口状态
                    "msg": res.data.records.length ? res.msg : '暂无数据', //解析提示文本
                    "total": res.data.total, //解析数据长度
                    "data": res.data.records //解析数据列表
                };
            }
            , request: {		// 请求分页用的参数名
                pageName: 'page' //页码的参数名称，默认：page
                , limitName: 'size' //每页数据量的参数名，默认：limit
            }
            , response: {		// 数据响应格式
                statusName: 'code' //规定数据状态的字段名称，默认：code
                , statusCode: 200 //规定成功的状态码，默认：0
                , msgName: 'msg' //规定状态信息的字段名称，默认：msg
                , countName: 'total' //规定数据总数的字段名称，默认：count
                , dataName: 'data' //规定数据列表的字段名称，默认：data
            }
            // 额外附加参数
            , where: {orders: JSON.stringify([{column: 'gmt_create', asc: false}]), category: true}	
            , autoSort: false		// 禁用前端排序，使用后端排序
            , initSort: {			// 初始化前端显示排序状态
                field: 'gmtCreate' //排序字段，对应 cols 设定的各字段名
                , type: 'desc' //排序方式  asc: 升序、desc: 降序、null: 默认排序
            }
            , toolbar: '#test-table-toolbar-toolbarDemo'	// 顶部工具栏
            , title: '资讯列表'
            , cols: [
                [{
                    field: 'id',
                    title: 'ID',
                    width: 80,
                    hide: true				// 初始默认隐藏
                }, {
                    field: 'cover'			// 字段名
                    , title: '封面'			// 表头
                    , templet: '#cover'		// 指定自定义模板
                    , width: 70				// 宽度
                }, {
                    field: 'title',
                    title: '标题',
                    edit: 'text'			// 能直接在表格内编辑
                }, {
                    field: 'type'
                    , title: '类型'
                    , width: 60
                }, {
                    field: 'category',
                    title: '分组',
                    toolbar: '#row-category',		// 自定义工具栏
                    width: 140
                }, {
                    field: 'gmtCreate'
                    , title: '创建时间'
                    , width: 160
                    , sort: true
                }, {
                    field: 'gmtModified'
                    , title: '修改时间'
                    , width: 160
                    , sort: true				// 启用排序
                    , hide: true				// 初始隐藏
                }, {
                    title: '操作',
                    toolbar: '#test-table-toolbar-barDemo',		// 自定义工具栏
                    width: 150
                }]
            ],
            page: true				// 开启分页
        });
})
```

最后实现的效果为：

![image-20210820192147744](/imgs/oss/picGo/image-20210820192147744.png)

注意请求和响应数据格式，如果和`layui`规定的格式不一致，一定要进行手动配置`parseData`、`request`和`response`

