---
title: jenkins凭证管理
date: 2020-07-26 12:39:05
tags: java
---

安装<code>Credentials Binding</code>插件

![插件](/imgs/oss/picGo20200714205248.png)

安装完了回设置页面，发现有了一个<code>Manage Credentials</code>

![凭据插件](/imgs/oss/picGo20200714205555.png)

然后安装<code>Git</code>插件

![Git](/imgs/oss/picGo20200714210250.png)

安装完了去服务器里安装<code>Git</code>

```shell
#yum安装Git
yum install git -y
#安装完了用以下命令查看版本
git --version
```

安装好了我们就开始拉代码吧~

先去到我们的<code>Manage Credentials</code>里

点击全局

![全局](/imgs/oss/picGo20200714210746.png)

然后点击添加凭据

![凭据](/imgs/oss/picGopicGo20200714210816.png)

选择第一个<code>Username with password</code>

![gitlab](/imgs/oss/picGo20200714211126.png)

填写好<code>Gitlab</code>的用户名密码

到我们新建的项目<code>test01</code>的配置里

![test01](/imgs/oss/picGo20200714211428.png)

填写git仓库，然后选择凭据，如果凭据验证通过，就会是我这个样子，否则是报错

点击保存后，再点击左侧的<code>Build Now</code>按钮

<img src="/imgs/oss/picGo20200714211610.png" alt="build now" style="zoom:100%;float:left;" />

这时候，<code>jenkins</code>就去拉代码了

默认是在<code>/var/lib/jenkins/workspace/</code>下

![目录](/imgs/oss/picGo20200714211911.png)

然后是ssh的免密登录秘钥类型

```shell
#先在服务器上生成秘钥(yao!)敲完按回车
ssh-keygen -t rsa
#然后进入目录
cd /root/.ssh
#cat公钥文件
cat id_rsa.pub
```

复制，粘贴到<code>Gitlab</code>

回到<code>Gitlab</code>，点击头像里的<code>Settings</code>

![settings](/imgs/oss/picGo20200714212902.png)

然后到左侧找到<code>SSH Keys</code>，把ssh公钥放到右边的大框

![ssh私钥](/imgs/oss/picGo20200714213141.png)

然后同样

```shell
#打印私钥
cat id_rsa
```

然后添加一个凭证，选择ssh类型的

![私钥](/imgs/oss/picGo20200714214340.png)

然后确定

然后同样创建一个<code>test02</code>

粘贴我们<code>ssh</code>方式的git仓库地址

选择我们配置好的<code>ssh</code>方式的凭证

![ssh方式](/imgs/oss/picGo20200714230524.png)

然后保存，<code>Build Now</code>

发现在我们的<code>/var/lib/jenkins/workspace/</code>目录下，已经有test02了

![test02](/imgs/oss/picGo20200714230652.png)

凭证管理就到这里啦~