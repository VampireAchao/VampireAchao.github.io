---
title: apache-incubator-streampark源码编译本地运行（三）
date: 2023-05-14 20:05:26
tags: java
---

> 宁可光明磊落地死，不能卑鄙无耻地活。——佚名

如果我们需要直接将`streampark`源码编译成产物部署，则可以使用

```shell
mvn -Pscala-2.12,shaded,dist,webapp -DskipTests -X clean install
```

但是这里的`install-node-and-pnpm`插件出了毛病

![image-20230514205648189](/imgs/oss/blog/vampireachao/image-20230514205648189.png)

即便网络环境`ok`，下载下来的`node`如果在`windows`系统也是`32`位的，根本无法执行下一步操作

刚好我本机有`node v17`以及自己安装了`pnpm`

![image-20230514210025273](/imgs/oss/blog/vampireachao/image-20230514210025273.png)

那我这里就跳过下载`node`和`pnpm`的脚本

![image-20230514205904373](/imgs/oss/blog/vampireachao/image-20230514205904373.png)

这里报`node`找不到，我们直接复制过去即可

![image-20230514210638260](/imgs/oss/blog/vampireachao/image-20230514210638260.png)

![image-20230514230051727](/imgs/oss/blog/vampireachao/image-20230514230051727.png)

要是没有的，可以去官网下载：https://nodejs.org

然后`copy`到项目目录

```shell
G:\opensource\incubator-streampark\streampark-console\streampark-console-webapp\node
```

![image-20230515004747846](/imgs/oss/blog/vampireachao/image-20230515004747846.png)

执行

```shell
G:\opensource\incubator-streampark\streampark-console\streampark-console-webapp\node>npm i pnpm
```

然后重新`maven`编译即可
