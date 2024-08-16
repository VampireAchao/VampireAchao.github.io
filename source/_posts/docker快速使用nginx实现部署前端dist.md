---
title: docker快速使用nginx实现部署前端dist
date: 2024-04-24 14:07:16
tags: 运维
---

> 才能不是天生的，可以任其自便的，而要钻研艺术，请教良师，才会成材。——歌德

`mac`、`windows`用客户端可视化工具修改镜像，要是网没问题可以不配置

![](/imgs/oss/blog-img/2024-04-24-14-12-35-image.png)

在这里配置好上海交通大学的镜像

```json
{
  "registry-mirrors": ["https://docker.mirrors.sjtug.sjtu.edu.cn"]
}
```

如果是`linux`下，编辑`/etc/docker/daemon.json`，写入

```json
{
  "registry-mirrors": ["https://docker.mirrors.sjtug.sjtu.edu.cn"]
}
```

然后重启：

```bash
sudo systemctl restart docker
```

然后在`dist`的同层级目录下面新建`Dockerfile`

```dockerfile
FROM nginx
COPY ./dist /usr/share/nginx/html
EXPOSE 80
```

然后构建镜像

```bash
GithubIireAchao:Downloads achao$ docker build -t my-frontend .
[+] Building 16.0s (7/7) FINISHED                          docker:desktop-linux
 => [internal] load build definition from Dockerfile                       0.0s
 => => transferring dockerfile: 473B                                       0.0s
 => [internal] load metadata for docker.io/library/nginx:latest            2.7s
 => [internal] load .dockerignore                                          0.0s
 => => transferring context: 2B                                            0.0s
 => [internal] load build context                                          0.3s
 => => transferring context: 78.95MB                                       0.3s
 => [1/2] FROM docker.io/library/nginx:latest@sha256:c4ac237ad2675ab27ba  12.8s
 => => resolve docker.io/library/nginx:latest@sha256:c4ac237ad2675ab27ba4  0.0s
 => => sha256:50376dc014ca05120de7018b80cbe5b9246e057e8ee 2.30kB / 2.30kB  0.0s
 => => sha256:26070551e657534bdf420d43107e85b972b2e8c21 29.16MB / 29.16MB  6.3s
 => => sha256:c4ac237ad2675ab27ba42390a9b83dbe90b21fe94 10.22kB / 10.22kB  0.0s
 => => sha256:a6ac09e4d8a90af2fac86bcd7508777bee5261c602b 7.02kB / 7.02kB  0.0s
 => => sha256:cd17d01e1374373b563865119c75cffe3b317635 38.45MB / 38.45MB  12.2s
 => => sha256:ef0e643bf248fd199792e3f4e26b98e57266dcfd67d23ad 627B / 627B  0.7s
 => => sha256:87875ca4aaca016e0da735fb4b6785f9fd63a7a77d36f46 955B / 955B  0.9s
 => => sha256:2b81c8fa41500bff2d1f86c318adcf43267e5ce28de9c4d 393B / 393B  1.2s
 => => sha256:e9f795af5c8bcaf56f663d3da89be2eea6694ccc9f6 1.21kB / 1.21kB  1.5s
 => => sha256:ca43e9145418883a65e77568935c5a14133c39959b0 1.40kB / 1.40kB  1.8s
 => => extracting sha256:26070551e657534bdf420d43107e85b972b2e8c212413bbb  0.8s
 => => extracting sha256:cd17d01e1374373b563865119c75cffe3b31763542d9975e  0.5s
 => => extracting sha256:ef0e643bf248fd199792e3f4e26b98e57266dcfd67d23ad4  0.0s
 => => extracting sha256:87875ca4aaca016e0da735fb4b6785f9fd63a7a77d36f46a  0.0s
 => => extracting sha256:2b81c8fa41500bff2d1f86c318adcf43267e5ce28de9c4de  0.0s
 => => extracting sha256:e9f795af5c8bcaf56f663d3da89be2eea6694ccc9f623f98  0.0s
 => => extracting sha256:ca43e9145418883a65e77568935c5a14133c39959b0019cf  0.0s
 => [2/2] COPY ./dist /usr/share/nginx/html                                0.3s
 => exporting to image                                                     0.1s
 => => exporting layers                                                    0.1s
 => => writing image sha256:d228f7df875c6d5e50c022be5193047bc2229f796fedd  0.0s
 => => naming to docker.io/library/my-frontend                             0.0s

What's Next?
  1. Sign in to your Docker account → docker login
  2. View a summary of image vulnerabilities and recommendations → docker scout quickview
```

然后运行：

```bash
GithubIireAchao:Downloads achao$ docker run -d -p 8080:80 my-frontend
68c5d3642ea11965b569cd26fa2fbd66368e60c94cf20ba6ba2918f3050f8299
GithubIireAchao:Downloads achao$ 
```

访问`8080`即可
