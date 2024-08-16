---
title: gitlab迁移后报错OpenL::cipher::CipherError
date: 2023-11-29 08:53:54
tags: 运维
---

> 大言必自招尤，小心终是寡过。——弘一大师

![](/imgs/oss/blog-img/2023-11-29-08-57-11-image.png)

每次一点`gitlab`里的保存就`500`

![](/imgs/oss/blog-img/2023-11-29-08-58-11-image.png)

弄了半天，总算弄好了，方式是采用重置命令

```bash
~] gitlab-rails console
> ApplicationSetting.first.delete
> ApplicationSetting.first
=> nill
```

![](/imgs/oss/blog-img/2023-11-29-08-59-31-image.png)
