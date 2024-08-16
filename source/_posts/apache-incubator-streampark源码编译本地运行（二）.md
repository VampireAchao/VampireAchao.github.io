---
title: apache-incubator-streampark源码编译本地运行（二）
date: 2023-05-07 12:20:00
tags: java
---

> 多做一些好事情，不图报酬，还可以使我们短短的生命很体面和有价值，这本身就可以算是一种报酬。——马克·吐温

书接上文[apache-incubator-streampark源码编译本地运行](https://VampireAchao.github.io/2023/04/09/apache-incubator-streampark源码编译本地运行/)

时隔今日，`streampark`又发生了一些变化

执行（因为我本机仍然没有配置`mvnw`，所以干脆用命令）：

```shell
mvn -Pscala-2.12,shaded,dist -DskipTests clean package
```

![image-20230507122627678](/imgs/oss/blog/vampireachao/image-20230507122627678.png)

剩下的步骤就不再赘述，在开头的链接，上次已经提过了

但是期间如果提示`spotless:check`的报错，可以使用

```shell
mvn spotless:apply
```

让代码格式化一下即可

重新执行

```shell
mvn -Pscala-2.12,shaded,dist -DskipTests clean package
```

重新刷新下依赖

![image-20230507141525626](/imgs/oss/blog/vampireachao/image-20230507141525626.png)

如果报错`ApplicationType is already defined as Java enum ApplicationType`

![image-20230507142407869](/imgs/oss/blog/vampireachao/image-20230507142407869.png)

这个貌似是因为不小心设置了下`scala`环境就搞坏了，我换了台电脑就好了

![image-20230507144415718](/imgs/oss/blog/vampireachao/image-20230507144415718.png)

但是原来的电脑里还是坏的，我删除了本地项目目录，重新拉了一下代码

```shell
git clone -c core.longpaths=true https://github.com/VampireAchao/incubator-streampark.git
```

执行`mvn -Pscala-2.12,shaded,dist -DskipTests clean package`时一直报错（未解决）

![image-20230507145512839](/imgs/oss/blog/vampireachao/image-20230507145512839.png)

删除掉`maven`本地库里`streampark`文件夹重新拉代码也不行

重新执行发现拉取不到`org.apache.streampark:streampark-shaded-slf4j`

![image-20230507145741086](/imgs/oss/blog/vampireachao/image-20230507145741086.png)

在`streampark-shaded`下面的`pom.xml`右键

![image-20230507122426851](/imgs/oss/blog/vampireachao/image-20230507122426851.png)

选择`Add as Maven Project`

然后选择`streampark-shaded`执行

```shell
mvn -Pscala-2.12,shaded,dist -DskipTests clean install
```

这里`dist`其实可以去掉

![image-20230507151048213](/imgs/oss/blog/vampireachao/image-20230507151048213.png)

然后再回到项目目录执行

```sh
mvn -Pscala-2.12,shaded,dist -DskipTests clean package
```

![image-20230507151458709](/imgs/oss/blog/vampireachao/image-20230507151458709.png)

如果启动时编译报错

![image-20230507123301161](/imgs/oss/blog/vampireachao/image-20230507123301161.png)

解决办法：首先右键`pom.xml`选择`Unlink Maven Projects`

![image-20230507141152824](/imgs/oss/blog/vampireachao/image-20230507141152824.png)

然后删除项目下的`.idea`并重新打开项目

![image-20230507141418402](/imgs/oss/blog/vampireachao/image-20230507141418402.png)

重新执行编译命令即可正常启动
