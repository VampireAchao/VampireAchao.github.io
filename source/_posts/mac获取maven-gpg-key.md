---
title: mac获取maven-gpg-key
date: 2023-09-07 18:48:45
tags: 软件及插件
---

> 真正的友谊从来不会平静无波。——赛维涅夫人

本机安装`gpg`工具：

[GnuPG - Download](https://www.gnupg.org/download/)

下载对应版本，`windows`下载`Gpg4win`就行

![](/imgs/oss/picGo/20230907162016.png)

windows上可以将下载的`Kleopatra.exe`打开，也是类似的界面

mac直接安装即可

![](/imgs/oss/picGo/20230907162358.png)

新建`key`

![](/imgs/oss/picGo/20230907162811.png)

`mac`上创建完毕一直下一步就自动上传完毕了

![](/imgs/oss/picGo/20230907162933.png)

如果没有自动上传，可以手动上传：

![](/imgs/oss/picGo/20230907163232.png)

`windows`上需要手动右键导出

![](/imgs/oss/picGo/20230907164145.png)

然后点[https://keys.openpgp.org](https://keys.openpgp.org)页面中的`Upload`进入[keys.openpgp.org/upload](https://keys.openpgp.org/upload)

上传你导出的文件

![](/imgs/oss/picGo/20230907164307.png)

上传完毕去自己的邮箱点击验证链接

验证后可以填入邮箱点[https://keys.openpgp.org](https://keys.openpgp.org)的`search`去验证一下：

![](/imgs/oss/picGo/20230907163507.png)

如果提示找到了，说明上传成功

![](/imgs/oss/picGo/20230907164357.png)

然后复制下来这里的`ID`

![](/imgs/oss/picGo/20230907164939.png)

粘贴到你本地`maven`仓库配置文件，例如`.m2`下的`settings.xml`里这个位置：

![](/imgs/oss/picGo/20230907165151.png)
