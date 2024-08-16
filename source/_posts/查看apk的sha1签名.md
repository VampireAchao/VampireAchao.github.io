---
title: 查看apk的sha1签名
date: 2021-09-11 22:36:44
tags: android
---

> 在逆风里把握方向，做暴风雨中的海燕，做不改颜色的孤星。——余光中

首先解压`apk`

![image-20210911225805623](/imgs/oss/picGo/image-20210911225805623.png)

找到`META-INF`

![image-20210911230424615](/imgs/oss/picGo/image-20210911230424615.png)

执行命令：

```shell
keytool -printcert -file CERT.RSA
```

![image-20210911232246633](/imgs/oss/picGo/image-20210911232246633.png)

即可
