---
title: nginx代理静态资源404坑
date: 2021-07-30 23:32:00
tags: 运维
---

> 与其在绝望和挣扎中苟活，不如在希冀和盼望中死亡。——纪伯伦

今天配置`nginx`做静态资源反向代理的时候配置文件如下

```conf
events{
	worker_connections  1024;
}
http{
        server{
        listen 80;
        server_name localhost;
        location ~ /upload/img/ {
                        root			/upload/img/;
	        	}
        }
}
```

本来我是想配置请求`/upload/img/`，然后获取到`/upload/img/`下面的静态资源

但我没有注意到`location`中配置的`/upload/img/`路径会自动和`root`下的路径相加。。。

因此我们应该修改为如下

```conf
events{
	worker_connections  1024;
}
http{
        server{
        listen 80;
        server_name localhost;
        location ~ /upload/img/ {
                        root			/;
	        	}
        }
}
```

然后就能成功代理到啦！
