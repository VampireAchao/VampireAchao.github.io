---
title: Client does not support authentication protocol requested by server
date: 2021-01-27 19:40:44
tags: 数据库
---

> 宿命论是那些缺乏意志力的弱者的借口。——罗曼·罗兰

今天试了试使用`js`连接数据库，发现报错`Client does not support authentication protocol requested by server; consider upgrading MySQL client`

乍一看，代码好像没问题

```javascript
var mysql = require("mysql");

let connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "789456",
    database: "ruben"
});

connection.connect();

connection.query("select * from user", function (error, results, fields) {
    if (error) throw error;
    console.log(results);
    console.log(fields);
});


connection.end();
```

但我的mysql版本是`8.0.22`

![image-20210127194358584](/imgs/oss/picGo/image-20210127194358584.png)

所以需要执行以下`sql`

```sql
alter user 'root'@'localhost' identified with mysql_native_password by '789456';
flush privileges;
```

然后就可以正常执行了

![image-20210127194735219](/imgs/oss/picGo/image-20210127194735219.png)