---
title: jenkins权限管理
date: 2020-07-25 12:40:34
tags: java
---

首先安装<code>Role-based Authorization Strategy</code>插件

![Role-based Authorization Strategy](/imgs/oss/picGo20200714194741.png)

安装完了来到设置，找到<code>Configure Global Security</code>

![<code>Configure Global Security</code>](/imgs/oss/picGo20200714194950.png)

找到授权策略

![授权策略](/imgs/oss/picGo20200714195122.png)

选择Role-Based Strategy，点击下面的保存

回到设置页面，让我们去添加点用户吧！找到设置里的<code>Manage and Assign Roles</code>

![角色管理](/imgs/oss/picGo20200714195256.png)

选择<code>Manage Roles</code>

![角色管理](/imgs/oss/picGo20200714195351.png)

然后添加角色，赋予权限

![赋权](/imgs/oss/picGo20200714200808.png)

保存后点击设置页面找到<code>Manage Users</code>

![用户管理](/imgs/oss/picGo20200714201054.png)

点击左侧的新建用户

![新建](/imgs/oss/picGo20200714201321.png)

然后输入用户名密码

用户名<code>rubenwei</code>密码<code>123456</code>

用户名<code>achao</code>密码<code>123456</code>

然后是授予角色，回到设置页面，找到<code>Manage and Assign Roles</code>

![分配角色](/imgs/oss/picGo20200714201809.png)

找到分配角色

分配权限，然后保存

![权限](/imgs/oss/picGo20200714202139.png)

配置好了后

<code>role1</code>角色里的<code>rubenwei</code>用户能访问<code>rubenwei</code>前缀的项目

<code>role2</code>角色里的<code>achao</code>用户能访问<code>ruben</code>前缀的项目

然后我们建立两个项目

点击左上角的新建item

<img src="/imgs/oss/picGo20200714202710.png" alt="item" style="zoom:100%;float:left;" />

输入项目名，选择<code>Freestyle project</code>

![新建item](/imgs/oss/picGo20200714202853.png)

再建一个叫<code>rubenwaibi</code>的项目

这时候我们登陆<code>rubenwei</code>>的用户，就只有一个项目了

![ruben](/imgs/oss/picGo20200714203236.png)

权限管理到此结束