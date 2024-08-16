---
title: git提交大小写问题
date: 2024-02-22 20:20:39
tags: 软件及插件
---

> 不是真正的朋友，再重的礼品也敲不开心扉。——弗·培根

今天发现提交到`git`上的文件名后缀和本地大小写不匹配

原来默认`git`关闭了大小写判定

```bash
git config core.ignorecase false
```

关闭忽略大小写即可
