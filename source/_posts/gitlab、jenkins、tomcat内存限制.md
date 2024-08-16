---
title: gitlab、jenkins、tomcat内存限制
date: 2020-08-03 20:15:43
tags: 运维
---

我发现我的服务器配置有点低。。。装的东西有点多，于是我进行了一次限制内存占用

`Gitlab`限制内存：

```shell
vim /etc/gitlab/gitlab.rb 
```

># /etc/gitlab/gitlab.rb
>
>unicorn['worker_timeout'] = 60
>###! Minimum worker_processes is 2 at this moment
>###! See https://gitlab.com/gitlab-org/gitlab-foss/issues/18771
>unicorn['worker_processes'] = 2

![image-20200728210513469](/imgs/oss/picGo/image-20200728210513469.png)

然后重启

```shell
gitlab-ctl reconfigure
```

然后是`jenkins`内存限制

```shell
vim /etc/sysconfig/jenkins
```

>JENKINS_JAVA_OPTIONS="-Djava.awt.headless=true -XX:MaxPermSize=512m -Djava.awt.headless=true"

![image-20200728210633968](/imgs/oss/picGo/image-20200728210633968.png)

重启`jenkins`

```shell
systemctl restart jenkins
```

然后是`tomcat`内存限制

```shell
vim /opt/tomcat/bin/catalina.sh 
```

加上

>JAVA_OPTS="-Xms256m -Xmx512m -Xss1024K -XX:PermSize=128m -XX:MaxPermSize=256m"

![image-20200728210933743](/imgs/oss/picGo/image-20200728210933743.png)

重启`tomcat`

```shell
/opt/tomcat/bin/shutdown.sh
/opt/tomcat/bin/startup.sh
```

