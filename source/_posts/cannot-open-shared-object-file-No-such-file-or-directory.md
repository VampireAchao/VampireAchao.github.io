---
title: 'cannot open shared object file: No such file or directory'
date: 2023-11-28 17:34:28
tags: 运维
---

> 偿付能力，完全是个调节问题，不是收入问题。——洛根·史密斯



今天集成声网`native rtc-linux-server-sdk`的时候，遇到报错：

```bash
Caused by: java.lang.UnsatisfiedLinkError: /usr/java/packages/lib/libbinding.so: libagora_rtc_sdk.so: cannot open shared object file: No such file or directory
 at java.base/jdk.internal.loader.NativeLibraries.load(Native Method) ~[na:na]
 at java.base/jdk.internal.loader.NativeLibraries$NativeLibraryImpl.open(NativeLibraries.java:388) ~[na:na]
 at java.base/jdk.internal.loader.NativeLibraries.loadLibrary(NativeLibraries.java:232) ~[na:na]
 at java.base/jdk.internal.loader.NativeLibraries.loadLibrary(NativeLibraries.java:174) ~[na:na]
 at java.base/jdk.internal.loader.NativeLibraries.findFromPaths(NativeLibraries.java:315) ~[na:na]
 at java.base/jdk.internal.loader.NativeLibraries.loadLibrary(NativeLibraries.java:287) ~[na:na]
```

解决方式

配置环境变量

```bash
[root@dev ~]# vim ~/.bash_profile 
# .bash_profile

# Get the aliases and functions
if [ -f ~/.bashrc ]; then
        . ~/.bashrc
fi

# User specific environment and startup programs

PATH=$PATH:$HOME/bin

export PATH

export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/java/packages/lib
```

主要是

```bash
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/java/packages/lib
```

这里的`/usr/java/packages/lib`就是放我们存放`so`文件的地方

```bash
[root@dev lib]# ll /usr/java/packages/lib/
总用量 36392
-rwxr-xr-x 1 root root   143088 11月 17 15:10 agora_rtm.jar
-rwxr-xr-x 1 root root    60532 11月 17 15:10 authentication-2.0.0.jar
-rwxr-xr-x 1 root root   335042 11月 17 15:10 commons-codec-1.11.jar
-rwxr-xr-x 1 root root  2510096 11月 17 15:10 hutool-all-5.8.20.jar
-rwxr-xr-x 1 root root   739728 11月 28 15:15 libagora-fdkaac.so
-rwxr-xr-x 1 root root  3472144 11月 28 15:15 libagora-ffmpeg.so
-rwxr-xr-x 1 root root 17865952 11月 28 15:15 libagora_rtc_sdk.so
-rwxr-xr-x 1 root root 10569400 11月 17 15:10 libagora_rtm_sdk.so
-rwxr-xr-x 1 root root  1556224 11月 28 15:15 libbinding.so
-rwxr-xr-x 1 root root       34 11月 17 15:10 PLACEHOLDER
```

然后是这个文件`/etc/ld.so.conf`

```bash
[root@dev lib]# vim /etc/ld.so.conf
include ld.so.conf.d/*.conf

/usr/java/packages/lib
[root@dev ldconfig
```

添加`/usr/java/packages/lib`到末尾

然后执行

```bash
[root@dev lib]# ldconfig
```
