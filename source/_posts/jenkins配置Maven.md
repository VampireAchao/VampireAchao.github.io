---
title: jenkins配置Maven
date: 2020-07-27 22:25:58
tags: java
---

[下载Maven 3.6.3](/imgs/oss/picGoapache-maven-3.6.3-bin.tar.gz)并且上传到<code>centos7</code>

```shell
#解压
tar -zxvf apache-maven-3.6.3-bin.tar.gz 
#建立目录
mkdir /opt/maven
#移动
mv apache-maven-3.6.3/* /opt/maven/
```

最后就是这样

![opt/maven](/imgs/oss/picGo20200715144750.png)

配置环境变量

```shell
vim /etc/profile
#到最下面追加环境变量
export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk
export MAVEN_HOME=/opt/maven
export PATH=$PATH:$JAVA_HOME/bin:$MAVEN_HOME/bin
#使环境变量生效
source /etc/profile
```

![环境变量](/imgs/oss/picGo20200715152539.png)

最后输入

```shell
#查看maven版本
mvn -version
```

就是这个样子

![mvn -version](/imgs/oss/picGo20200715145905.png)

我们回到<code>Jenkins</code>

找到<code>Global Tool Configuration</code>

![Global Tool Configuration](/imgs/oss/picGo20200715152124.png)

开始配置<code>JDK</code>

![jdk](/imgs/oss/picGo20200715152828.png)

配置<code>Maven</code>

![maven](/imgs/oss/picGo20200715152959.png)

然后保存，到我们的系统配置

![系统配置](/imgs/oss/picGo20200715154518.png)

配置<code>jenkins</code>用到的环境变量

```shell
JAVA_HOME
/usr/lib/jvm/java-1.8.0-openjdk
M2_HOME
/opt/maven
PATH+EXTRA
$M2_HOME/bin
```

![环境变量](/imgs/oss/picGo20200715164356.png)

保存

更改<code>maven</code>仓库地址

```shell
#创建仓库目录
mkdir /root/repo
#更改配置文件
vim $MAVEN_HOME/conf/settings.xml
```

更改本地

![123](/imgs/oss/picGo20200715160544.png)

```xml
<!--修改maven仓库地址-->
<localRepository>/root/repo</localRepository>
```

更换远程

![settings.xml](/imgs/oss/picGo20200715160331.png)

```xml
	<mirror>
     <id>aliyunmaven</id>
     <mirrorOf>*</mirrorOf>
     <name>阿里云公共仓库</name>
     <url>https://maven.aliyun.com/repository/public</url>
    </mirror>
     <mirror>
     <id>aliyunmaven</id>
     <mirrorOf>*</mirrorOf>
     <name>阿里云谷歌仓库</name>
     <url>https://maven.aliyun.com/repository/google</url>
    </mirror>
    <mirror>
     <id>aliyunmaven</id>
     <mirrorOf>*</mirrorOf>
     <name>阿里云阿帕奇仓库</name>
     <url>https://maven.aliyun.com/repository/apache-snapshots</url>
    </mirror>
    <mirror>
     <id>aliyunmaven</id>
     <mirrorOf>*</mirrorOf>
     <name>阿里云spring仓库</name>
     <url>https://maven.aliyun.com/repository/spring</url>
    </mirror>
    <mirror>
     <id>aliyunmaven</id>
     <mirrorOf>*</mirrorOf>
     <name>阿里云spring插件仓库</name>
     <url>https://maven.aliyun.com/repository/spring-plugin</url>
    </mirror>
    <mirror>
     <id>alimaven</id>
     <mirrorOf>central</mirrorOf>
     <name>aliyun maven</name>
     <url>https://maven.aliyun.com/nexus/content/groups/public</url>
    </mirror>
```

完成后，回到<code>jenkins</code>的<code>test02</code>项目配置

找到构建->增加构建步骤-><code>Execute shell</code>

![构建](/imgs/oss/picGo20200715163228.png)

然后输入命令

```shell
mvn clean package
```

![保存](/imgs/oss/picGo20200715164453.png)

点击保存，然后点击左侧的<code>Build Now</code>，出现<code>Build success</code>就成功了~

![build success](/imgs/oss/picGo20200715172617.png)

我们可以看到target目录，下面有刚刚打好的jar包

![jar包](/imgs/oss/picGo20200715173305.png)

重复上面的步骤，再打个war包放tomcat上跑

![image-20200715202230881](/imgs/oss/picGo/image-20200715202230881.png)