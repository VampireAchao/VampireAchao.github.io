---
title: 发布jar到maven中央仓库idea+nexus存储库管理操作流程
date: 2023-09-10 12:28:42
tags: 软件及插件
---

> 无穷的远方，无数的人们，都和我有关。——鲁迅

配置完毕后，执行`mvn deploy`

提示输入密码就输入

![](/imgs/oss/picGo/20230907173136.png)

执行期间可能会遇到`javadoc`校验不通过、网络异常、单元测试不通过、版本号书写不规范等等一系列问题，自行解决即可，有时候已经上传成功但会报网络异常，进入后台查看就行

![](/imgs/oss/picGo/20230907174233.png)

如果和`stream-query`一样用了插件，且显示发布成功就行了，否则需要进入后台手动查看原因，或者手动发版

![](/imgs/oss/picGo/20230907173721.png)

进度或者报错信息可以在这里查看，如果没有`close`，点`close`开始

![](/imgs/oss/picGo/20230907173935.png)

稍等下，期间可以点`Refresh`刷新进度，成功`close`后就`release`

![](/imgs/oss/picGo/20230907174650.png)

描述可写可不写

![](/imgs/oss/picGo/20230907175010.png)

最后如果这里能通过`org.dromara.stream-query`查到，说明发布成功了，等待几小时仓库同步即可引入下载

![](/imgs/oss/picGo/20230907175329.png)

如果是`dromara`组织项目，一般`groupId`为`org.dromara.项目`
