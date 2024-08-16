---
title: gmail绑定apache邮箱
date: 2024-01-16 20:00:39
tags: 小技巧
---

> 回顾得越远，可能前瞻得越远。——丘吉尔

操作参考：

[Committer Email - Apache Infrastructure Website](https://infra.apache.org/committer-email.html)

记录一下操作流程，默认收信是用提名`committer`时填的邮箱，后面也可以去

- Use the [Selfserve app](https://id.apache.org/).
- Use [Whimsy](https://whimsy.apache.org/roster/committer/__self__). Double-click the green "Email forwarded to" label.

进行修改

![](/imgs/oss/blog-img/2024-01-16-21-38-19-image.png)

此处添加

![](/imgs/oss/blog-img/2024-01-16-21-40-02-image.png)

里面的内容是

```bash
Server: mail-relay.apache.org Port: 587 (STARTTLS), 465 (SSL) User/Pass: {Your LDAP credentials}
```

对应填写

![](/imgs/oss/blog-img/2024-01-16-22-00-51-image.png)

以及

![](/imgs/oss/blog-img/2024-01-16-22-01-53-image.png)

即可
