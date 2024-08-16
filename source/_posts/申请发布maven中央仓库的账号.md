---
title: 申请发布maven中央仓库的账号
date: 2023-09-08 14:12:30
tags: 软件及插件
---

> 活着就意味着必须做点什么，请好好努力。——《地下》

上面配置文件提到了中央仓库的账号密码，此处去注册一个，然后提交申请让其为你开通

*如果是使用`dromara`组织，将用户名提供给组织后，组织去操作，用户名就是点头像，这一项*

![](/imgs/oss/picGo/20230907170218.png)

如果是自己的域名，注册完了点新建

![](/imgs/oss/picGo/20230907165943.png)

填写信息

![](/imgs/oss/picGo/20230907170420.png)

注意这里的`GroupId`，如果你没有域名，则使用`[你的githubId].github.io`即可

![](/imgs/oss/picGo/20230907170710.png)

`githubId`是这里的用户名

![](/imgs/oss/picGo/20230907171229.png)

填写完毕就新建

![](/imgs/oss/picGo/20230907171336.png)

工作人员或者机器人会回复你哪些写的不对的，你可以对应调整

![](/imgs/oss/picGo/20230907171447.png)

大概等待几小时或者几天处理完毕后会看到成功消息

![](/imgs/oss/picGo/20230907171549.png)

完成后就会开通管理后台

注意新申请的是这个`s01.oss.sonatype.org`

老项目都是`oss.sonatype.org`例如`dromara.org`等

**后续所有对于这个的配置一定要认准！！！**

发版的操作一般也会通过

https://s01.oss.sonatype.org/#welcome

https://oss.sonatype.org/#welcome

这两个后台网址进行
