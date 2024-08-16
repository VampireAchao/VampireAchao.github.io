---
title: nginx配置wss
date: 2021-09-10 19:11:56
tags: 运维
---

> 草木蔓发,青山可望。一一王维

最近接入`websocket`，项目上线了，把`nginx`配置`wss`和`https`分享下

```conf
events {
  worker_connections  1024;  ## Default: 1024
}
http{
upstream websocket {
    server 域名:端口;
}
upstream ruben {
    server 域名:端口;
}

server {
    listen 80;
    server_name api.ruben.com; #需要将yourdomain.com替换成证书绑定的域名。
    rewrite ^(.*)$ https://$host$1; #将所有HTTP请求通过rewrite指令重定向到HTTPS。
    location / {
        proxy_pass http://ruben;
    }
}
# 
server {
    listen 443 ssl;
    #配置HTTPS的默认访问端口为443。
    #如果未在此处配置HTTPS的默认访问端口，可能会造成Nginx无法启动。
    #如果您使用Nginx 1.15.0及以上版本，请使用listen 443 ssl代替listen 443和ssl on。
    server_name api.ruben.com; #需要将yourdomain.com替换成证书绑定的域名。
    root html;
    index index.html index.htm;
    ssl_certificate /证书ruben.com.pem;
    ssl_certificate_key /证书ruben.com.key;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    #表示使用的加密套件的类型。
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2; #表示使用的TLS协议的类型。
    ssl_prefer_server_ciphers on;
    ssl_session_timeout 20m;
    ssl_verify_client off;
    # 这里我websocket对应的是 域名:端口/wss 路径
    location /wss {
        proxy_pass http://websocket;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
    location / {
        proxy_pass http://ruben;
    }
}
}

```

