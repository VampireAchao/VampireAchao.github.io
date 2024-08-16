---
title: nginx中alias
date: 2022-03-12 14:55:31
tags: 运维
---

> 对未来的真正慷慨，是把一切都献给现在。——加缪

前两天想在本地搭一个`nginx`实现静态资源代理，且访问

```url
http://localhost/static_resources/head_1645512000625.jpg
```

时能映射到下面这个路径

```path
D:\work\static\data\local\head_1645512000625.jpg
```

找了半天，要么是说配置`location /static_resources/ {}`这里不加杠和加杠之类的

我这个`nginx`是官网下的最新版，就是不好使，最后找到了`alias`关键字解决：

配置如下：

```conf
worker_processes  1;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;
    
    keepalive_timeout  65;

    server {
        listen       80;
        server_name  localhost;
	        
        location /static_resources/ {
        		# 如果是OPTIONS请求
                if ($request_method = 'OPTIONS') {
                		# 允许的域名，只能填通配符或者单域名
                    	add_header 'Access-Control-Allow-Origin' $http_origin;
                    	# 允许跨域请求的 http 方法
	                    add_header Access-Control-Allow-Methods 'GET, OPTIONS';
                    	# 标志着当前请求是否包含 cookies 信息不需要则移除该配置
                        add_header 'Access-Control-Allow-Credentials' 'true';
                        # 返回支持的 http 请求头
                        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,token,X-Requested-With,token,If-Modified-Since,Cache-Control,Content-Type,Range';
                        # 缓存时间(s)
                        add_header 'Access-Control-Max-Age' 1728000;
                        add_header 'Content-Type' 'text/plain; charset=utf-8';
                        add_header 'Content-Length' 0;
                        add_header 'Access-Control-Allow-Credentials' 'true';
                        return 204;
    			}
                 add_header Cache-Control no-cache;
                 add_header Access-Control-Allow-Origin $http_origin;
                 add_header Access-Control-Allow-Methods 'GET, OPTIONS';
                 add_header Access-Control-Allow-Credentials "true";
                 add_header Access-Control-Allow-Headers $http_access_control_request_headers;
                 alias D:/work/static/data/local/;
                 # 开启目录浏览功能； 
                 autoindex on;                        
                 # 关闭详细文件大小统计，让文件大小显示MB，GB单位，默认为b； 
                 autoindex_exact_size off;            
                 # 开启以服务器本地时区显示文件修改日期！
                 autoindex_localtime on;              
                 
        }

}
```

