---
title: apache-incubator-streampark源码编译本地运行（六）
date: 2023-09-06 14:32:38
tags: java
---

> 天行健，君子以自强不息。——《周易》

欢迎收看大型连续剧《apache-incubator-streampark源码编译本地运行》，介绍我的踩坑史

[apache-incubator-streampark源码编译本地运行](https://VampireAchao.github.io/2023/04/09/apache-incubator-streampark%E6%BA%90%E7%A0%81%E7%BC%96%E8%AF%91%E6%9C%AC%E5%9C%B0%E8%BF%90%E8%A1%8C/)

[apache-incubator-streampark源码编译本地运行（二）](https://VampireAchao.github.io/2023/05/07/apache-incubator-streampark%E6%BA%90%E7%A0%81%E7%BC%96%E8%AF%91%E6%9C%AC%E5%9C%B0%E8%BF%90%E8%A1%8C%EF%BC%88%E4%BA%8C%EF%BC%89/)

[apache-incubator-streampark源码编译本地运行（三）](https://VampireAchao.github.io/2023/05/14/apache-incubator-streampark%E6%BA%90%E7%A0%81%E7%BC%96%E8%AF%91%E6%9C%AC%E5%9C%B0%E8%BF%90%E8%A1%8C%EF%BC%88%E4%B8%89%EF%BC%89/)

[apache-incubator-streampark源码编译本地运行（四）](https://VampireAchao.github.io/2023/07/23/apache-incubator-streampark%E6%BA%90%E7%A0%81%E7%BC%96%E8%AF%91%E6%9C%AC%E5%9C%B0%E8%BF%90%E8%A1%8C%EF%BC%88%E5%9B%9B%EF%BC%89/)

[apache-incubator-streampark源码编译本地运行（五）](https://VampireAchao.github.io/2023/07/25/apache-incubator-streampark%E6%BA%90%E7%A0%81%E7%BC%96%E8%AF%91%E6%9C%AC%E5%9C%B0%E8%BF%90%E8%A1%8C%EF%BC%88%E4%BA%94%EF%BC%89/)

今天更新到第六集

直接启动项目报错：

```bash
/Users/achao/IdeaProjects/incubator-streampark/streampark-console/streampark-console-service/src/main/java/org/apache/streampark/console/core/controller/ApplicationBuildPipelineController.java:113:2
`)' expected but eof found.
}
```

![](/imgs/oss/picGo/20230906144318.png)

解决办法很简单，首先注释掉/删除掉，启动项目

然后是类似的报错

```bash
/Users/achao/IdeaProjects/incubator-streampark/streampark-console/streampark-console-service/src/main/java/org/apache/streampark/console/core/controller/ApplicationController.java:439:2
`)' expected but eof found.
}
```

![](/imgs/oss/picGo/20230906144828.png)

同样先注释或者删掉，直接启动项目，发现编译成功！

当然，熟悉的报错

```shell
2023-09-06 14:49:18 | ERROR | main | org.springframework.boot.SpringApplication:821] Application run failed
java.lang.ExceptionInInitializerError: [StreamPark] System initialization check failed, The system initialization check failed. If started local for development and debugging, please ensure the -Dapp.home parameter is clearly specified, more detail: https://streampark.apache.org/docs/user-guide/deployment
```

在配置中加上

```bash
-Dapp.home=streampark-console/streampark-console-service/target/apache-streampark-2.2.0-SNAPSHOT-incubating-bin/apache-streampark_2.12-2.2.0-SNAPSHOT-incubating-bin
```

![](/imgs/oss/picGo/20230906145047.png)

再解除注释或者`ctrl+alt+z`回滚过来，再次启动项目

![](/imgs/oss/picGo/20230906144644.png)

成功！！！

![](/imgs/oss/picGo/20230906145130.png)
