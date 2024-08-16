---
title: jenkins配置之Tomcat篇
date: 2020-07-28 19:46:01
tags: java
---

### 配置Tomcat

下载链接：/imgs/oss/picGo/apache-tomcat-8.5.57.tar.gz

然后上传到服务器，解压

```shell
tar -zxvf apache-tomcat-8.5.57.tar.gz 
#创建目录
mkdir /opt/tomcat
#移动文件
mv apache-tomcat-8.5.57/* /opt/tomcat/
```

检测8080端口是否被占用

```shell
netstat -ntpl
#查看指定端口
netstat -lnp|grep 8080
#解除占用
kill -9 [端口号]
```

![image-20200715204016725](/imgs/oss/picGo/image-20200715204016725.png)

```shell
#运行tomcat8
/opt/tomcat/bin/startup.sh
#查看日志
tail -f /opt/tomcat/logs/catalina.out 
```

![image-20200715213809891](/imgs/oss/picGo/image-20200715213809891.png)

访问

![image-20200715223444771](/imgs/oss/picGo/image-20200715223444771.png)

注意。。。我这里是改了<code>Gitlab</code>的端口，否则会导致端口占用，要么<code>tomcat</code>启动不了，要么<code>Gitlab</code>502

```shell
#更改gitlab配置文件
vim /etc/gitlab/gitlab.rb
#找到
# unicorn['port'] = 8080
#改成
unicorn['port'] = 7534
#然后重载配置
gitlab-ctl reconfigure
#重启
gitlab-ctl restart
#如果还是502
vim /etc/gitlab/gitlab.rb
#输入
dd if=/dev/zero of=/mnt/swap bs=512 count=8388616
mkswap /mnt/swap
vim /etc/sysctl.conf
#然后修改
vm.swappiness = 60
#继续执行
swapon /mnt/swap
echo "/data/swap swap swap defaults 0 0" >> /etc/fstab
```

添加<code>tomcat</code>角色

```
vim /opt/tomcat/conf/tomcat-users.xml 
```

在<code>tomcat-users</code>标签下添加

```xml
<role rolename="tomcat"/>
<role rolename="role1"/>
<role rolename="manager-status"/>
<role rolename="manager-script"/>
<role rolename="manager-gui"/>
<role rolename="admin-script"/>
<role rolename="admin-gui"/>
<user username="tomcat" password="tomcat" roles="manager-gui,manager-script,tomcat,admin-gui,admin-script"/>
```

![image-20200715223349810](/imgs/oss/picGo/image-20200715223349810.png)

然后进入这个文件

```shell
vim /opt/tomcat/webapps/manager/META-INF/context.xml 
```

注释这段配置文件

![image-20200715223755471](/imgs/oss/picGo/image-20200715223755471.png)

重启

```shell
/opt/tomcat/bin/shutdown.sh 
/opt/tomcat/bin/startup.sh 
```

如果我们访问<code>tomcat</code>，点击<code>manager webapp</code>

![image-20200715223956908](/imgs/oss/picGo/image-20200715223956908.png)

会弹出一个框，这样说明配置生效了

![image-20200715224118576](/imgs/oss/picGo/image-20200715224118576.png)

输入我们配置的用户名<code>tomcat</code>和密码<code>tomcat</code>

进到这个页面说明大功告成！

![image-20200715224257352](/imgs/oss/picGo/image-20200715224257352.png)