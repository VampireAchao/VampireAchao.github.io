---
title: srs的http回调
date: 2023-10-11 08:58:25
tags: java
---

> 建筑在美貌上的爱情，一旦美貌消失，它也会随之消失。——堂恩

昨天说到 [srs信令java版](https://VampireAchao.github.io/2023/10/10/srs%E4%BF%A1%E4%BB%A4java%E7%89%88/)

今天按照官方文档实现`http`回调：

https://ossrs.net/lts/zh-cn/docs/v5/doc/http-callback

完整配置文件：

```java
# WebRTC streaming config for SRS.
# @see full.conf for detail config.

listen              1935;
max_connections     1000;
daemon              off;
srs_log_tank        console;

http_server {
    enabled         on;
    listen          8080;
    dir             ./objs/nginx/html;
}

http_api {
    enabled         on;
    listen          1985;
}
stats {
    network         0;
}
rtc_server {
    enabled on;
    listen 8000; # UDP port
    # @see https://ossrs.net/lts/zh-cn/docs/v4/doc/webrtc#config-candidate
    candidate $CANDIDATE;
}

vhost __defaultVhost__ {
    http_hooks {
            enabled         on;
            on_publish      http://host.docker.internal:1989/api/v1/streams http://host.docker.internal:1989/api/v1/streams;
            on_unpublish    http://host.docker.internal:1989/api/v1/streams http://host.docker.internal:1989/api/v1/streams;
            on_play         http://host.docker.internal:1989/api/v1/sessions http://host.docker.internal:1989/api/v1/sessions;
            on_stop         http://host.docker.internal:1989/api/v1/sessions http://host.docker.internal:1989/api/v1/sessions;
            on_dvr          http://host.docker.internal:1989/api/v1/dvrs http://host.docker.internal:1989/api/v1/dvrs;
            on_hls          http://host.docker.internal:1989/api/v1/hls http://host.docker.internal:1989/api/v1/hls;
            on_hls_notify   http://host.docker.internal:1989/api/v1/hls/[server_id]/[app]/[stream]/[ts_url][param];
    }
    rtc {
        enabled     on;
        # @see https://ossrs.net/lts/zh-cn/docs/v4/doc/webrtc#rtmp-to-rtc
        rtmp_to_rtc off;
        # @see https://ossrs.net/lts/zh-cn/docs/v4/doc/webrtc#rtc-to-rtmp
        rtc_to_rtmp off;
    }
    http_remux {
        enabled     on;
        mount       [vhost]/[app]/[stream].flv;
    }
}
```

对应的`docker`命令：

```bash
docker run --rm --env CANDIDATE=$CANDIDATE -p 1935:1935 -p 8080:8080 -p 1985:1985 -p 8000:8000/udp -v /Users/achao/IdeaProjects/srs/trunk/conf/rtc.conf:/usr/local/srs/conf/rtc.conf registry.cn-hangzhou.aliyuncs.com/ossrs/srs:5 objs/srs -c /usr/local/srs/conf/rtc.conf
```

然后我们的回调实现

```java
package com.example.simplesrssignaling;

import lombok.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * /**
 * <pre>
 * <code>
 * http_hooks {
 *     enabled         on;
 *     on_publish      http://host.docker.internal:1989/api/v1/streams http://host.docker.internal:1989/api/v1/streams;
 *     on_unpublish    http://host.docker.internal:1989/api/v1/streams http://host.docker.internal:1989/api/v1/streams;
 *     on_play         http://host.docker.internal:1989/api/v1/sessions http://host.docker.internal:1989/api/v1/sessions;
 *     on_stop         http://host.docker.internal:1989/api/v1/sessions http://host.docker.internal:1989/api/v1/sessions;
 *     on_dvr          http://host.docker.internal:1989/api/v1/dvrs http://host.docker.internal:1989/api/v1/dvrs;
 *     on_hls          http://host.docker.internal:1989/api/v1/hls http://host.docker.internal:1989/api/v1/hls;
 *     on_hls_notify   http://host.docker.internal:1989/api/v1/hls/[server_id]/[app]/[stream]/[ts_url][param];
 * }
 * </code>
 * </pre>
 * use: docker run --rm --env CANDIDATE=$CANDIDATE -p 1935:1935 -p 8080:8080 -p 1985:1985 -p 8000:8000/udp -v /Users/achao/IdeaProjects/srs/trunk/conf/rtc.conf:/usr/local/srs/conf/rtc.conf registry.cn-hangzhou.aliyuncs.com/ossrs/srs:5 objs/srs -c /usr/local/srs/conf/rtc.conf
 */
@RestController
@CrossOrigin
@RequestMapping("/api/v1")
public class SRSController {

    @PostMapping("/streams")
    public ResponseEntity<Response> handlePublishAndUnpublish(@RequestBody HookData data) {
        // Handle the on_publish and on_unpublish actions
        return ResponseEntity.ok(new Response(0));
    }

    @PostMapping("/sessions")
    public ResponseEntity<Response> handlePlayAndStop(@RequestBody HookData data) {
        // Handle the on_play and on_stop actions
        return ResponseEntity.ok(new Response(0));
    }

    @PostMapping("/dvrs")
    public ResponseEntity<Response> handleDVR(@RequestBody HookData data) {
        // Handle the on_dvr action
        return ResponseEntity.ok(new Response(0));
    }

    @PostMapping("/hls")
    public ResponseEntity<Response> handleHLS(@RequestBody HookData data) {
        // Handle the on_hls action
        return ResponseEntity.ok(new Response(0));
    }

    @Data
    public static class HookData {
        private String action;
        private String client_id;
        private String ip;
        private String vhost;
        private String app;
        private String stream;
        private String param;
    }

    @Data
    public static class Response {
        private Integer code;
        private String msg;

        public Response(int code) {
            this.code = code;
            this.msg = "ok";
        }
    }
}
```
