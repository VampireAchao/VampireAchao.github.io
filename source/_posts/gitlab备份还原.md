---
title: gitlab备份还原
date: 2023-11-18 17:36:21
tags: 软件及插件
---

> 你所不理解的东西是你无法占有的。——歌德

首先进入`Gitlab`所在`Docker`容器

```bash
docker exec -it <gitlab-container-name> /bin/bash
```

执行：

```bash
gitlab-backup create
```

然后退出容器、拷贝

```bash
docker cp <gitlab-container-name>:/var/opt/gitlab/backups /path/to/host/machine
```

还原的命令也很简单：

先停止

```bash
gitlab-ctl stop unicorn
gitlab-ctl stop sidekiq
```

再还原

```bash
gitlab-backup restore BACKUP=timestamp_of_backup
```

例如

```bash
gitlab-backup restore BACKUP=1549251062_2019_02_04_11.8.1
```

然后重启即可

```bash
gitlab-ctl reconfigure
gitlab-ctl restart
```
