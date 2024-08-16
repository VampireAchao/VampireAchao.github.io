---
title: nginxproxymanager
date: 2024-05-14 21:07:50
tags: 软件及插件
---

> 开成花灾的玫瑰不是灿烂，而是荒凉。——严歌苓

https://nginxproxymanager.com/

该项目作为预构建的 docker 映像提供，使您能够轻松转发到在家或其他地方运行的网站，包括免费的 SSL，而无需了解太多有关 Nginx 或 Letsencrypt 的信息。

-   [快速设置](https://nginxproxymanager.com/guide/#quick-setup)

-   [完整设置](https://nginxproxymanager.com/setup/)

-   [截图](https://nginxproxymanager.com/screenshots/)

- 基于 Tabler 的美观且安全的管理界面

- 无需了解 Nginx 即可轻松创建转发域、重定向、流和 404 主机

- 使用 Let's Encrypt 免费 SSL 或提供您自己的自定义 SSL 证书

- 主机的访问列表和基本 HTTP 身份验证

- 超级用户可用的高级 Nginx 配置

- 用户管理、权限和审核日志

## 快速设置[​](https://nginxproxymanager.com/guide/#quick-setup)

1. 安装 Docker 和 Docker-Compose
- [Docker 安装文档](https://docs.docker.com/get-docker/)

- [Docker-Compose 安装文档](https://docs.docker.com/compose/install/)
2. 创建一个与此类似的 docker-compose.yml 文件：

yml

```
version: '3.8'
services:
  app:
    image: 'jc21/nginx-proxy-manager:latest'
    restart: unless-stopped
    ports:
      - '80:80'
      - '81:81'
      - '443:443'
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
```

这是所需的最低配置。请参阅文档了解更多信息。

3. 通过运行调出你的堆栈

 巴什

```
docker-compose up -d

# If using docker-compose-plugin
docker compose up -d
```

4. 登录管理界面

当您的 Docker 容器正在运行时，通过端口 `81` 连接到它以获取管理界面。有时，由于密钥的熵，这可能需要一点时间。

[http://127.0.0.1:81](http://127.0.0.1:81/)

 默认管理员用户：

```
Email:    admin@example.com
Password: changeme
```

使用此默认用户登录后，系统会立即要求您修改您的详细信息并更改您的密码。



我的博客即将同步至腾讯云开发者社区，邀请大家一同入驻：https://cloud.tencent.com/developer/support-plan?invite_code=1fq814kgd2kbt
