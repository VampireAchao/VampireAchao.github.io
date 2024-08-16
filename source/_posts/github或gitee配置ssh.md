---
title: github或gitee配置ssh
date: 2024-02-02 21:47:22
tags: 小技巧
---

> 生命的定义就是拥有明天。——冯骥才

分享一个小技巧，配置`ssh clone`代码

步骤大致如下：

```bash
Last login: Tue Jan 30 15:29:27 on ttys001

The default interactive shell is now zsh.
To update your account to use zsh, please run `chsh -s /bin/zsh`.
For more details, please visit https://support.apple.com/kb/HT208050.
# 我这里为了演示，清除之前配置的ssh
Github-Id-VampireAchao:blog achao$ rm -rf ~/.ssh/*
# 确保配置好了git
Github-Id-VampireAchao:blog achao$ git config --global user.name 'VampireAchao'
Github-Id-VampireAchao:blog achao$ git config --global user.email 'achao@apache.org'
# 生成密钥
Github-Id-VampireAchao:blog achao$ ssh-keygen -t rsa
Generating public/private rsa key pair.
# 按回车
Enter file in which to save the key (/Users/achao/.ssh/id_rsa): 
# 输入git密码
Enter passphrase (empty for no passphrase): 
# 再次输入密码
Enter same passphrase again: 
Your identification has been saved in /Users/achao/.ssh/id_rsa
Your public key has been saved in /Users/achao/.ssh/id_rsa.pub
The key fingerprint is:
SHA256:sBr/Yzu0omaROtsIvP80dXasYVwqdjKw0ZvMkNPOxJw achao@Github-Id-VampireAchao.local
The key's randomart image is:
+---[RSA 3072]----+
|                 |
|      * .        |
|     *.E   .     |
|      %x+ +      |
|    .O.&SO o     |
|.   o+o X +      |
|.. .o+.. o       |
| +.o+ o.=        |
| .+.+o o.+       |
+----[SHA256]-----+
# 打印公钥
Github-Id-VampireAchao:blog achao$ cat ~/.ssh/id_rsa.pub
ssh-rsa AQAAB3NzbC1yc3EAAAADAQABAAABgkDsGR5/3B3C/hk/1U8tGj65SGm9BKZyhZaRQv8vKUc8hIQxb6/
XbcyMjtXhbY3VbaURc2WuV3MLCKXywBO7FRP2Mebvunmf2vbkJX9fhjMg9/RejJKE1wP5KHtiQ3WJbnlWnwLZ8k
1HuKzExmr5GMZYSm9Plcxxyhzm8p2jK54vkXZjRFftIupvlQ218/X2jdSo285V6h6d7qtKm/7ikCxGoYhqB9gmL
UWXMNu8ld2kfwZboN9W42R1bj7uTcERej3+XkVfstDqsClDV5QN/p4gZneOPk/8hmmyi3dFLSLC2uw1tLgtEHdl
RMjzR96krTouBR7jBlkipdY7qRdcjQLv6Ii6VXJJfIjGsUOqIuYwKqSg6dV8tRSOfDLKIW8VWJ4yPhgJVh8i3PL
isaPrIJCmo+/7TmXTlxXYNhX7fmmEMSvZg20X/eJ5UzKRsfjvjCehBjvku3wbEKHm5dtvCdH8WHvb6ttZvESRxd
RuysIM8jrHO+sRxfYWm7ONqmdGqFB/5GuGk=
achao@Github-Id-VampireAchao.local 
```

然后我们复制公钥：

```text
ssh-rsa AQAAB3NzbC1yc3EAAAADAQABAAABgkDsGR5/3B3C/hk/1U8tGj65SGm9BKZyhZaRQv8vKUc8hIQxb6/
XbcyMjtXhbY3VbaURc2WuV3MLCKXywBO7FRP2Mebvunmf2vbkJX9fhjMg9/RejJKE1wP5KHtiQ3WJbnlWnwLZ8k
1HuKzExmr5GMZYSm9Plcxxyhzm8p2jK54vkXZjRFftIupvlQ218/X2jdSo285V6h6d7qtKm/7ikCxGoYhqB9gmL
UWXMNu8ld2kfwZboN9W42R1bj7uTcERej3+XkVfstDqsClDV5QN/p4gZneOPk/8hmmyi3dFLSLC2uw1tLgtEHdl
RMjzR96krTouBR7jBlkipdY7qRdcjQLv6Ii6VXJJfIjGsUOqIuYwKqSg6dV8tRSOfDLKIW8VWJ4yPhgJVh8i3PL
isaPrIJCmo+/7TmXTlxXYNhX7fmmEMSvZg20X/eJ5UzKRsfjvjCehBjvku3wbEKHm5dtvCdH8WHvb6ttZvESRxd
RuysIM8jrHO+sRxfYWm7ONqmdGqFB/5GuGk=
```

`gitee`里配置:

https://gitee.com/profile/sshkeys

直接粘贴点确定即可

![](/imgs/oss/blog-img/2024-02-01-21-53-33-image.png)

`github`里配置：

https://github.com/settings/keys

![](/imgs/oss/blog-img/2024-02-01-21-59-01-image.png)
