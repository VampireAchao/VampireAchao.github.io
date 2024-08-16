---
title: jenkins构建触发器
date: 2020-08-01 12:06:56
tags: java
---

#### 访问接口形式触发

首先看第一种，访问接口形式触发

先到我们的项目设置，选择构建触发器

![image-20200721195419401](/imgs/oss/picGo/image-20200721195419401.png)

选择触发远程构建

设置<code>token</code>

然后保存，访问输入框下面的<code>URL</code>

```http
http://121.89.163.191:8090/job/web_demo_pipeline/build?token=rubenweicowbeer
```

然后发现我们的项目已经开始构建了

![image-20200721195647446](/imgs/oss/picGo/image-20200721195647446.png)

#### 在其他项目构建后触发

第二种是在其他项目构建后触发

我们先创建一个前置工程

![image-20200721200452598](/imgs/oss/picGo/image-20200721200452598.png)

这个工程很简单，就输入一句话

![image-20200721200541497](/imgs/oss/picGo/image-20200721200541497.png)

然后回到之前项目，选择<code>Build after other projects are built</code>

![image-20200721200714737](/imgs/oss/picGo/image-20200721200714737.png)

输入前置工程后保存，构建**前置工程**

![image-20200721200831006](/imgs/oss/picGo/image-20200721200831006.png)

我们发现我们的前置工程构建后<code>web_demo_pipeline</code>工程也跟着构建了

![image-20200721200928687](/imgs/oss/picGo/image-20200721200928687.png)

#### 定时构建

第三种是定时构建

首先是语法

```shell
* * * * *
分 时 天 月 周
第一个*表示分钟，取值0~59
第二个*表示小时，取值0~23
第三个*表示一个月的第几天，取值1~31
第四个*表示第几月，取值1~12
第五个*表示一周中的第几天，取值0~7，其中0和7代表的都是周日
```

一些常用的表达式

```shell
#每隔5分钟构建一次
H/5 * * * *
#每两小时构建一次
H H/2 * * *
#每天中午12点定时构建一次
H 12 * * *
#每天凌晨6点/下午6点定时构建一次
H 6,18 * * *
#在每个小时的前半个小时内的每10分钟
H(0-29)/10 * * * *
#每两小时45分钟，从上午9:45开始，每天下午3:45结束
45 9-16/2 * * 1-5
#每两小时一次，每个工作日上午9点到下午5点(也许是上午10:38，下午12:38，下午2:38，下午4:38)
H H(9-16)/2 * * 1-5
```

那么我们这次选择<code>Build periodically</code>

![image-20200721202554880](/imgs/oss/picGo/image-20200721202554880.png)

保存，五分钟后发现已经在构建了

![image-20200721203116558](/imgs/oss/picGo/image-20200721203116558.png)

#### 轮询<code>SCM</code>

轮询是在定时去查看远程仓库有无更新，有则构建，无则放弃

![image-20200721203428778](/imgs/oss/picGo/image-20200721203428778.png)

#### Hook触发构建

首先安装插件

![image-20200721211028072](/imgs/oss/picGo/image-20200721211028072.png)

然后就会发现构建触发器多了一种，我们把<code>url</code>复制下来

<code>Build when a change is pushed to GitLab. GitLab webhook URL: http://121.89.163.191:8090/project/web_demo_pipeline</code>

![image-20200722185353919](/imgs/oss/picGo/image-20200722185353919.png)

然后点击保存

首先，到<code>GitLab</code>上勾选<code>Allow requests to the local network from web hooks and services</code>

![image-20200722190215043](/imgs/oss/picGo/image-20200722190215043.png)

然后到项目下面的<code>Settings</code>点击<code>Integrations</code>

![image-20200722190342693](/imgs/oss/picGo/image-20200722190342693.png)

然后粘贴我们刚刚复制的<code>url</code>

![image-20200722190514960](/imgs/oss/picGo/image-20200722190514960.png)

点击<code>Add webhook</code>之后就是这样子啦

![image-20200722190625841](/imgs/oss/picGo/image-20200722190625841.png)

但我们还得配置一下<code>Jenkins</code>

![image-20200722190837425](/imgs/oss/picGo/image-20200722190837425.png)

取消选中

![image-20200722191023880](/imgs/oss/picGo/image-20200722191023880.png)

然后我们进行一下测试

![image-20200722191106045](/imgs/oss/picGo/image-20200722191106045.png)

成功之后会显示

![image-20200722191843202](/imgs/oss/picGo/image-20200722191843202.png)也可以看到我们的<code>Jenkins</code>开始了构建

之后我们push代码，就会自动构建了

#### 参数化构建

首先，勾选<code>This project is parameterized</code>

![image-20200722202704375](/imgs/oss/picGo/image-20200722202704375.png)

然后点击<code>Build with Parameters</code>

![image-20200722202414502](/imgs/oss/picGo/image-20200722202414502.png)

然后编辑我们的<code>Jenkinsfile</code>

![image-20200722202537061](/imgs/oss/picGo/image-20200722202537061.png)

把原来![image-20200722202549892](/imgs/oss/picGo/image-20200722202549892.png)

的地方替换为![image-20200722202724501](/imgs/oss/picGo/image-20200722202724501.png)

创建分支，push代码

![image-20200722203029420](/imgs/oss/picGo/image-20200722203029420.png)

然后输入<code>dev</code>分支名称

![image-20200722203232773](/imgs/oss/picGo/image-20200722203232773.png)