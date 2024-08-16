---
title: srs实现合流
date: 2023-10-17 08:30:49
tags: java
---

> 伸出你的手去援助别人，而不是伸出你的脚去绊倒他们。——戴尔·卡耐基

文档：

https://ossrs.net/lts/zh-cn/docs/v5/doc/webrtc#room-to-live

合流需要打开配置文件的配置，主要是`rtc`的

```roboconf
vhost __defaultVhost__ {
    http_hooks {
            enabled         on;
            on_publish      http://host.docker.internal:8001/im-signaling-service/srs_callback/on_publish;
            on_unpublish    http://host.docker.internal:8001/im-signaling-service/srs_callback/on_unPublish;
            on_play         http://host.docker.internal:8001/im-signaling-service/srs_callback/on_play;
            on_stop         http://host.docker.internal:8001/im-signaling-service/srs_callback/on_stop;
            on_dvr          http://host.docker.internal:8001/im-signaling-service/srs_callback/on_dvr;
            on_hls          http://host.docker.internal:8001/im-signaling-service/srs_callback/on_hls;
            on_hls_notify   http://host.docker.internal:8001/im-signaling-service/srs_callback/on_notify/[server_id]/[app]/[stream]/[ts_url][param];
    }
    rtc {
        enabled     on;
        # @see https://ossrs.net/lts/zh-cn/docs/v4/doc/webrtc#rtmp-to-rtc
        rtmp_to_rtc on;
        # @see https://ossrs.net/lts/zh-cn/docs/v4/doc/webrtc#rtc-to-rtmp
        rtc_to_rtmp on;
    }
    http_remux {
        enabled     on;
        mount       [vhost]/[app]/[stream].flv;
    }
}
```

我们这里是多人合流，于是使用`ffmpeg`，此处`71a8de7`是房间号，`1～10`是设备标识

```bash
ffmpeg \
-i rtmp://192.168.1.114/71a8de7/1 \
-i rtmp://192.168.1.114/71a8de7/2 \
-i rtmp://192.168.1.114/71a8de7/3 \
-i rtmp://192.168.1.114/71a8de7/4 \
-i rtmp://192.168.1.114/71a8de7/5 \
-i rtmp://192.168.1.114/71a8de7/6 \
-i rtmp://192.168.1.114/71a8de7/7 \
-i rtmp://192.168.1.114/71a8de7/8 \
-i rtmp://192.168.1.114/71a8de7/9 \
-i rtmp://192.168.1.114/71a8de7/10 \
-vf "scale=854:480" -r 24 \
-filter_complex "
[0:v][1:v][2:v]hstack=inputs=3[Row1];
[3:v][4:v][5:v]hstack=inputs=3[Row2];
[6:v][7:v][8:v]hstack=inputs=3[Row3];
[9:v]scale=960:-1[Row4];
[Row1][Row2][Row3][Row4]vstack=inputs=4[Final]" \
-map "[Final]" \
-c:v h264_videotoolbox -profile:v high -b:v 1000k -q:v 23 \
-f flv rtmp://192.168.1.114/live/merge
```

然后播放

```bash
ffplay rtmp://192.168.1.114/live/merge
```

效果如下：

![](/imgs/oss/blog-img/2023-10-17-08-51-31-image.png)
