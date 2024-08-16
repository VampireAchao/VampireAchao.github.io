---
title: arthas入门
date: 2023-03-02 23:11:03
tags: 运维
---

> 有些人对你恭维不离口，可全都不是患难朋友——莎士比亚

按照官方文档的[快速入门](https://arthas.aliyun.com/doc/quick-start.html)

执行：

```shell
curl -O https://arthas.aliyun.com/math-game.jar
java -jar math-game.jar
```

然后再执行

```shell
curl -O https://arthas.aliyun.com/arthas-boot.jar
java -jar arthas-boot.jar
```

然后问题来了

![image-20230302231540214](/imgs/oss/blog/vampireachao/image-20230302231540214.png)

提示：

```shell
$ java -jar arthas-boot.jar
[INFO] JAVA_HOME: C:\Program Files\Java\jre1.8.0_351
[INFO] arthas-boot version: 3.6.7
[INFO] Can not find java process. Try to run `jps` command lists the instrumented Java HotSpot VMs on the target system.
Please select an available pid.
```

找不到`java`进程，可我明明已经启动，它提示使用`jps`寻找`java`进程

执行`jps`，提示`bash: jps: command not found`

仔细看，我这里是`JAVA_HOME: C:\Program Files\Java\jre1.8.0_351`

这不是`jdk`。。。而是`jre`

修改了环境变量(关掉`bash`窗口后)再次执行`jps`后发现没有`jps: command not found`的报错了

但是仍然没有找到我想要的`java`进程，并且执行`java -jar arthas-boot.jar`后发现仍然是提示`Please select an available pid.`而没有让我选

将所有`bash`全部使用管理员身份打开，再次执行，终于成功！

我们执行一下`dashboard`命令

![image-20230302232042311](/imgs/oss/blog/vampireachao/image-20230302232042311.png)

以及

```shell
thread 1 | grep 'main('
```

![image-20230302232002142](/imgs/oss/blog/vampireachao/image-20230302232002142.png)

还有反编译

```shell
jad demo.MathGame
```

![image-20230302232315035](/imgs/oss/blog/vampireachao/image-20230302232315035.png)

使用`watch`查看返回值

```shell
watch demo.MathGame primeFactors returnObj
```

然后按`ctrl+c`退出，结果直接退出了`arthas`

再次运行`java -jar arthas-boot.jar`提示已经存在

![image-20230302232457790](/imgs/oss/blog/vampireachao/image-20230302232457790.png)

一般我们遇到这种情况直接使用

```shell
taskkill -f -pid 82304
```

但有时候，没有提示出具体的进程`ID`，只有一个端口号，我们则可以使用

```shell
netstat -ano | findstr :3658
```

查询到进程`ID`后即可结束

![image-20230302232628443](/imgs/oss/blog/vampireachao/image-20230302232628443.png)

再次运行`arthas`即可