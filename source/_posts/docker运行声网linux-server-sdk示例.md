---
title: docker运行声网linux-server-sdk示例
date: 2023-11-20 08:40:55
tags: java
---

> 人类的天性是容易忘记感激别人，所以，如果我们施一点点恩惠都希望别人感激的话，那一定会使我们大为头痛。——戴尔·卡耐基

首先是下载：

[下载 - 云信令（原实时消息） - 文档中心 - 声网Agora](https://docportal.shengwang.cn/cn/Real-time-Messaging/downloads?platform=Linux)

`Agora_RTM_SDK_for_Linux_Java_v1_5_1.zip`其中有个`samples/Agora-RTM-Tutorial-Java`，我们将

`libs/libagora_rtm_sdk.so`

`libs/agora_rtm.jar`

复制到`samples/Agora-RTM-Tutorial-Java/lib`下

然后在`samples/Agora-RTM-Tutorial-Java`下执行命令：

```bash
mvn install:install-file -Dfile=lib/agora_rtm.jar -DgroupId=io.agora.rtm  -DartifactId=agora-rtm-sdk -Dversion=1.0 -Dpackaging=jar
```

然后注意修改代码中的`AppId`和`token`

![](/imgs/oss/blog-img/2023-11-20-08-50-22-image.png)

这里我的`token`采取服务端生成，因此我们还需要这一个`jar`

```xml
        <dependency>
            <groupId>io.agora</groupId>
            <artifactId>authentication</artifactId>
            <version>2.0.0</version>
        </dependency>
```

代码：

```java
String token = new RtmTokenBuilder2().buildToken(appId, appCertificate, userId, 3600);
```

其次是`Dockerfile`，我放在`Agora-RTM-Tutorial-Java`下

```Dockerfile
# 使用基础的Java 8镜像（包含编译工具）作为基础
FROM openjdk:17-jdk

# 设置工作目录
WORKDIR /app

# 复制示例代码和Agora RTM库文件到容器中
COPY . /app

# 暴露所需的端口，如果需要的话
EXPOSE 8080

# 编译示例代码
RUN javac -cp lib/agora_rtm.jar:lib/agora_rtm.jar:lib/authentication-2.0.0.jar:lib/commons-codec-1.11.jar -d . src/main/java/io/agora/RtmJavaDemo.java

# 定义入口命令来运行示例代码
CMD ["java", "-cp", "lib/*:.", "-Djava.library.path=/app/lib", "io.agora.RtmJavaDemo"]
```

然后是构建镜像、运行

```bash
docker build -t agora-rtm-demo:java17 .
docker run -it --rm -p 8080:8080 agora-rtm-demo:java17
```

然后杯具了，不支持`mac`的`AARCH64`架构芯片

```bash
Github-Id-VampireAchao:Agora-RTM-Tutorial-Java achao$ docker build -t agora-rtm-demo:java17 .
[+] Building 1.8s (9/9) FINISHED                                                                                                                                                                                     docker:desktop-linux
 => [internal] load build definition from Dockerfile                                                                                                                                                                                 0.0s
 => => transferring dockerfile: 614B                                                                                                                                                                                                 0.0s
 => [internal] load .dockerignore                                                                                                                                                                                                    0.0s
 => => transferring context: 2B                                                                                                                                                                                                      0.0s
 => [internal] load metadata for docker.io/library/openjdk:17-jdk                                                                                                                                                                    1.7s
 => [1/4] FROM docker.io/library/openjdk:17-jdk@sha256:528707081fdb9562eb819128a9f85ae7fe000e2fbaeaf9f87662e7b3f38cb7d8                                                                                                              0.0s
 => [internal] load build context                                                                                                                                                                                                    0.0s
 => => transferring context: 2.95kB                                                                                                                                                                                                  0.0s
 => CACHED [2/4] WORKDIR /app                                                                                                                                                                                                        0.0s
 => CACHED [3/4] COPY . /app                                                                                                                                                                                                         0.0s
 => CACHED [4/4] RUN javac -cp lib/agora_rtm.jar:lib/hutool-all-5.8.20.jar:lib/agora_rtm.jar:lib/authentication-2.0.0.jar:lib/commons-codec-1.11.jar -d . src/main/java/io/agora/RtmJavaDemo.java                                    0.0s
 => exporting to image                                                                                                                                                                                                               0.0s
 => => exporting layers                                                                                                                                                                                                              0.0s
 => => writing image sha256:499b1a69d4889983fe3da9ad61dbce252495c50f29672f806bf6916faa3a2a81                                                                                                                                         0.0s
 => => naming to docker.io/library/agora-rtm-demo:java17                                                                                                                                                                             0.0s

What's Next?
  1. Sign in to your Docker account → docker login
  2. View a summary of image vulnerabilities and recommendations → docker scout quickview
Github-Id-VampireAchao:Agora-RTM-Tutorial-Java achao$ docker run -it --rm -p 8080:8080 agora-rtm-demo:java17
Exception in thread "main" java.lang.UnsatisfiedLinkError: /app/lib/libagora_rtm_sdk.so: /app/lib/libagora_rtm_sdk.so: cannot open shared object file: No such file or directory (Possible cause: can't load AMD 64 .so on a AARCH64 platform)
        at java.base/jdk.internal.loader.NativeLibraries.load(Native Method)
        at java.base/jdk.internal.loader.NativeLibraries$NativeLibraryImpl.open(NativeLibraries.java:388)
        at java.base/jdk.internal.loader.NativeLibraries.loadLibrary(NativeLibraries.java:232)
        at java.base/jdk.internal.loader.NativeLibraries.loadLibrary(NativeLibraries.java:174)
        at java.base/jdk.internal.loader.NativeLibraries.findFromPaths(NativeLibraries.java:315)
        at java.base/jdk.internal.loader.NativeLibraries.loadLibrary(NativeLibraries.java:287)
        at java.base/java.lang.ClassLoader.loadLibrary(ClassLoader.java:2422)
        at java.base/java.lang.Runtime.loadLibrary0(Runtime.java:818)
        at java.base/java.lang.System.loadLibrary(System.java:1989)
        at io.agora.common.AgoraServiceJNI.ensureNativeInitialized(AgoraServiceJNI.java:26)
        at io.agora.common.AgoraServiceJNI.<clinit>(AgoraServiceJNI.java:21)
        at io.agora.common.Logging.log(Logging.java:26)
        at io.agora.common.Logging.i(Logging.java:50)
        at io.agora.rtm.internal.RtmClientImpl.initRtmService(RtmClientImpl.java:116)
        at io.agora.rtm.internal.RtmClientImpl.<init>(RtmClientImpl.java:101)
        at io.agora.rtm.internal.RtmManager.createRtmInstance(RtmManager.java:16)
        at io.agora.rtm.RtmClient.createInstance(RtmClient.java:64)
        at io.agora.RtmJavaDemo.init(RtmJavaDemo.java:60)
        at io.agora.RtmJavaDemo.main(RtmJavaDemo.java:239)
```

解决方案：[jetbrains-gateway远端开发](https://VampireAchao.github.io/2023/11/19/jetbrains-gateway%E8%BF%9C%E7%AB%AF%E5%BC%80%E5%8F%91/)
