---
title: 报错Enter passphrase for key ‘/Users/achao/.ssh/id_rsa‘
date: 2024-07-04 22:02:38
tags: 软件及插件
---

> 家庭整体的完整和团结一致时一个良好教育的一个基本条件。——马卡连柯

如题，在拉取代码时候老是提示

```bash
Enter passphrase for key ‘/Users/achao/.ssh/id_rsa‘
```

然后要求输入密码

原因是生成密钥时设置了密码，我们只需要重新设置一遍，在输入新密码时候按回车跳过即可

```bash
ssh-keygen -p -f ~/.ssh/id_rsa
```
