---
title: jenkins安装
date: 2020-07-24 22:19:53
tags: 运维
---

<code>jenkins</code>安装

```shell
yum install -y java-1.8.0-openjdk && \
wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat/jenkins.repo && \
rpm --import https://pkg.jenkins.io/redhat/jenkins.io.key &&\
yum clean all && yum makecache && \
yum install -y jenkins
```

修改配置文件

```shell
vim /etc/sysconfig/jenkins

#修改默认用户
JENKINS_USER="root"
#修改端口
JENKINS_PORT="8090"
```

启动

```shell
systemctl start jenkins
```

防火墙添加端口

```shell
firewall-cmd --permanent --zone=public --add-port=8090/tcp
#重启防火墙
systemctl restart firewalld
```

我的挂掉了，于是卸载...

```shell
service jenkins stop
 
yum clean all
 
yum -y remove jenkins
```

rpm卸载方式

```shell
1、rpm卸载
rpm -e jenkins
 
2、检查是否卸载成功
rpm -ql jenkins 
 
3、彻底删除残留文件：
find / -iname jenkins | xargs -n 1000 rm -rf
```

然后查询密码

```shell
cat /var/lib/jenkins/secrets/initialAdminPassword
```

把复制到的密码粘贴，访问

这个时候有两个选项，一个是<code>Install suggested plugins</code>安装推荐的插件

另一个是<code>Select plugins to install</code>自己安装插件

我们选择第一个的话。。。可能会等了很久后到后面发现一片红（安装插件失败）

所以我们先选第二个

然后选择<code>None</code>（無），选安装

创建管理员账户密码<code>ruben</code>密码<code>123456</code>

然后一直下一步，到jenkins控制台

![这里](/imgs/oss/picGo20200714172359.png)

点击齿轮进入页面（管理jenkins或者是Manage Jenkins）

点击拼图进入插件页面

这时候，我们先别急着下载插件，先去改地址

```shell
#进入目录
cd /var/lib/jenkins/updates
#修改地址
sed -i 's/http:\/\/updates.jenkins-ci.org\/download/https:\/\/mirrors.tuna.tsinghua.edu.cn\/jenkins/g' default.json && sed -i 's/http:\/\/www.google.com/https:\/\/www.baidu.com/g' default.json
```

![就是这样](/imgs/oss/picGo20200714173817.png)

对了，顺便一提，这个json文件可以打印看看~

输入<code>cat default.json</code>就行

<img src="/imgs/oss/picGoB5AE15259734E4DA3ADDCF751DC56A15.gif" alt="嘿嘿" style="zoom:25%;" />

然后点击进阶(Advanced)

![](/imgs/oss/picGo20200714174420.png)

更换插件更新地址为

```shell
https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json
```

![插件地址](/imgs/oss/picGo20200714174642.png)

然后重启

```shell
#命令行重启
systemctl restart jenkins
#或者直接访问
http://121.89.163.191:8090/restart
```

安装中文插件，在这里搜索locale plugin安装

![插件列表](/imgs/oss/picGo20200714191318.png)

安装完了去设置里找到locale，更改为<code>zh_CN</code>就行了

<img src="/imgs/oss/picGo20200714191444.png" alt="locale" style="zoom:100%;" />