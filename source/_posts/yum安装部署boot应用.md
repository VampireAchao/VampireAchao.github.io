---
title: yum安装部署boot应用
date: 2021-11-08 18:05:55
tags: 运维
---

> 躬自厚而薄责于人，则远怨矣。——《论语》

安装`java`

```shell
yum install java
```

安装`nginx`

```shell
# 安装
yum install nginx
# 查看位置
whereis nginx
# 编辑配置文件
vim /etc/nginx/nginx.conf
```

`nginx.conf`

```conf
# For more information on configuration, see:
#   * Official English Documentation: http://nginx.org/en/docs/
#   * Official Russian Documentation: http://nginx.org/ru/docs/

user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

# Load dynamic modules. See /usr/share/doc/nginx/README.dynamic.
include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 1024;
}

http {
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile            on;
    tcp_nopush          on;
    tcp_nodelay         on;
    keepalive_timeout   65;
    types_hash_max_size 4096;

    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;

    # Load modular configuration files from the /etc/nginx/conf.d directory.
    # See http://nginx.org/en/docs/ngx_core_module.html#include
    # for more information.
    include /etc/nginx/conf.d/*.conf;

    server {
        listen       80;
        listen       [::]:80;
        server_name  _;
        root         /usr/share/nginx/html;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        error_page 404 /404.html;
        location = /404.html {
        }

        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
        }
    }

# Settings for a TLS enabled server.

    server {
        listen       443 ssl http2;
        listen       [::]:443 ssl http2;
        server_name  _;
        root         /usr/share/nginx/html;

        ssl_certificate /server/nginx/www.ruben.com.pem;
        ssl_certificate_key /server/nginx/www.ruben.com.key;
        ssl_session_cache shared:SSL:1m;
        ssl_session_timeout  10m;
        ssl_ciphers HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers on;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        error_page 404 /404.html;
            location = /40x.html {
        }

        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
        }
    }

}
```

启动，访问测试域名`https://www.ruben.com/`

下载`yum`源

```shell
wget https://dev.mysql.com/get/mysql80-community-release-el7-1.noarch.rpm
```

安装`yum`源

```shell
yum localinstall mysql80-community-release-el7-1.noarch.rpm
```

查看可用`mysql`版本

```shell
yum repolist all | grep mysql
```

没有的话可以使用如下命令更新`yum`源

```shell
yum clean all
yum makecache
```

可以看到`8.0`处于启用状态

![image-20211108154006910](/imgs/oss/picGo/image-20211108154006910.png)

安装：

```shell
yum install mysql-community-server
```

注意这里是`8.0`

![image-20211108141556426](/imgs/oss/picGo/image-20211108141556426.png)

然后查看初始密码：

```shell
cat /var/log/mysqld.log | grep password
```

启动`mysql`服务

```shell
systemctl start mysqld
```

登录

```shell
mysql -uroot -p
```

然后修改`root`密码

```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY '密码';
```

新增用户

```sql
CREATE USER '用户名'@'%' IDENTIFIED WITH mysql_native_password BY '密码';
```

刷新权限

```sql
GRANT ALL PRIVILEGES ON *.* TO '用户名'@'%';
```

配置`nginx`

```conf
events {
  worker_connections  1024;  ## Default: 1024
}
http{
	upstream websocket {
	    server IP:端口;
	}
	upstream ruben {
	    server IP:端口;
	}

	server {
	    listen 80;
    	server_name www.ruben.com; #需要将yourdomain.com替换成证书绑定的域名。
	    rewrite ^(.*)$ https://$host$1; #将所有HTTP请求通过rewrite指令重定向到HTTPS。
	    location / {
	        proxy_pass http://ruben;
	    }
	}
 
	server {
    	listen 443 ssl;
	    # 配置HTTPS的默认访问端口为443。
	    # 如果未在此处配置HTTPS的默认访问端口，可能会造成Nginx无法启动。
	    # 如果您使用Nginx 1.15.0及以上版本，请使用listen 443 ssl代替listen 443和ssl on。
	    server_name www.ruben.com; #需要将yourdomain.com替换成证书绑定的域名。
	    root html;
	    index index.html index.htm;
	    ssl_certificate /server/nginx/www.ruben.com.pem;
	    ssl_certificate_key /server/nginx/www.ruben.com.key;
	    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
	    # 表示使用的加密套件的类型。
	    ssl_protocols TLSv1 TLSv1.1 TLSv1.2; #表示使用的TLS协议的类型。
	    ssl_prefer_server_ciphers on;
	    ssl_session_timeout 20m;
	    ssl_verify_client off;
	    # 这里我websocket对应的是 域名:端口/rubenws 路径
	    location /rubenws {
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

测试`nginx`

```shell
nginx -t
```

重新加载`nginx`

```shell
nginx -s reload
```

启动服务

```shell
nohup java -jar /server/jar/ruben.jar > /server/jar/log.txt 2>&1 &
```

查看日志

```shell
tail -f /server/jar/ruben.txt
```

