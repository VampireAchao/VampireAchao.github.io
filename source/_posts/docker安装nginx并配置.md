---
title: docker安装nginx并配置
date: 2021-07-31 23:24:06
tags: 运维
---

> 只要持之以恒，知识丰富了，终能发现其奥秘。——杨振宁

安装`nginx`

```shell
docker pull nginx
# 选择 docker.io/library/nginx:latest
# 创建nginx配置文件存放目录
mkdir -p /server/nginx
# 创建配置文件
touch /server/nginx/nginx.conf
# 编辑配置文件
vim /server/nginx/nginx.conf
```

内容

```conf
events{
    worker_connections  1024;
}

http{
        upstream ruben{
		        server xxx.xxx.xxx.xxx:8080 weight=1;
                server xxx:xxx:xxx:xxx:8081 weight=1;
        }

        server{
        listen 80;
        server_name localhost;
        location / {
                        proxy_pass      http://ruben;
                        proxy_set_header        Host $host;
                        proxy_set_header        X-Real-IP $remote_addr;
                        proxy_set_header        X-Forwarded-Proto https;
                        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
                        proxy_connect_timeout   150;
                        proxy_send_timeout      100;
                        proxy_read_timeout      100;
                        proxy_buffers           4 32k;
                        client_max_body_size    8m;
                        client_body_buffer_size 128;
                }
        location ~ /upload/img/ {
                        root			/;
	        	}
        }
}
```

这里注意第一个`location`是代理到上面负载均衡的其他容器

第二个`location`是映射当前`nginx`容器内的静态资源

启动

```shell
docker run \
  --name nginx80 \
  -d -p 80:80 \
  -v /server/nginx/nginx.conf:/etc/nginx/nginx.conf:ro \
  -v /upload/img/:/upload/img/ \
  nginx
```

第一个`-v`是挂载配置文件

第二个`-v`是挂载静态资源
