---
title: docker-desktop配置腾讯云镜像
date: 2024-08-05 18:08:11
tags: 小技巧
---

> 积累资本有两种方法，增加收入，减少消费。——大卫·李嘉图

很简单，在这里，这个就是`docker`的腾讯云镜像`https://mirror.ccs.tencentyun.com`

![](/imgs/oss/blog-img/2024-08-05-18-11-34-image.png)

内容：

```json
{
  "builder": {
    "features": {
      "buildkit": true
    },
    "gc": {
      "defaultKeepStorage": "20GB",
      "enabled": true
    }
  },
  "experimental": false,
  "registry-mirrors": [
    "https://docker.mirrors.sjtug.sjtu.edu.cn",
    "https://mirror.ccs.tencentyun.com",
    "https://mirror.baidubce.com"
  ]
}
```
