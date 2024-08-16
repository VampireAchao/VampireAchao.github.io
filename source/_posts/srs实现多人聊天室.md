---
title: srs实现多人聊天室
date: 2023-10-08 18:18:37
tags: 软件及插件
---

> 凡是值得思考的事情，没有不是被人思考过的；我们必须做的只是试图重新加以思考而已。——歌德

通过`webrtc`

https://ossrs.net/lts/zh-cn/docs/v5/doc/webrtc

运行起来很简单，修改环境变量`candidate`即可，如果不修改，会导致黑屏，且没有报错。。。

步骤如下：

https://ossrs.net/lts/zh-cn/docs/v5/doc/webrtc#sfu-one-to-one

```bash
# 获取mac当前ip地址，下面\后有个空格
ifconfig en0 | grep inet\ 

achaodeMacBook-Pro:blog achao$ ifconfig en0 | grep inet\  
	inet 192.168.1.106 netmask 0xffffff00 broadcast 192.168.1.255
```

这里我的`CANDIDATE`就是`192.168.1.106`

```bash
export CANDIDATE="192.168.1.106"
docker run --rm --env CANDIDATE=$CANDIDATE \
  -p 1935:1935 -p 8080:8080 -p 1985:1985 -p 8000:8000/udp \
  registry.cn-hangzhou.aliyuncs.com/ossrs/srs:5 \
  objs/srs -c conf/rtc.conf
```

然后需要启动信令，信令`signaling`就是你的`java/go/rust/node`等服务端，用于控制和`srs`服务进行连接，主要做的事例如控制用户进入房间、退出房间、鉴权等等

```bash
docker run --rm -p 1989:1989 registry.cn-hangzhou.aliyuncs.com/ossrs/signaling:1
```

然后都运行好了的话就可以访问

```http
http://localhost:1989/demos/room.html?autostart=true
```

查看效果

![](/imgs/oss/picGo/20231008185427.png)
