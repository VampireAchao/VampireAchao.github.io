---
title: 往centos中添加字体
date: 2021-01-07 20:03:01
tags: 运维
---

> 毁掉我们的不是我们所憎恨的东西，而恰恰是我们所热爱的东西，面对眼花缭乱的各种泛娱文化现象，重温和思考这种理性之声很有必要也很有价值。——尼尔

[搬运，亲测有用，原文戳我](https://www.cnblogs.com/architectforest/p/12838300.html)

## 一，fc-list所属的rpm包

```
[root@blog ~]$ whereis fc-list
fc-list: /usr/bin/fc-list /usr/share/man/man1/fc-list.1.gz
[root@blog ~]$ rpm -qf /usr/bin/fc-list
fontconfig-2.13.1-3.el8.x86_64
```

 

如果提示找不到fc-list命令，

可以用dnf来安装:

```
[root@blog ~]# dnf install fontconfig
```

 

说明：刘宏缔的架构森林是一个专注架构的博客，地址：https://www.cnblogs.com/architectforest

​     对应的源码可以访问这里获取： https://github.com/liuhongdi/

说明：作者:刘宏缔 邮箱: 371125307@qq.com

 

## 二，fontconfig包命令使用举例：

1，列出字体列表

```
[root@blog ~]$ fc-list
```

 

在centos8上，字体文件主要包含在两个目录下:

```
/usr/share/fonts
/usr/share/X11/fonts
```

 

2，列出所有中文字体

\#:lang 指定语言

```
[root@blog ~]$ fc-list :lang=zh
/usr/share/fonts/simhei/simhei.ttf: SimHei,黑体:style=Regular
/usr/share/fonts/simsun/simsun.ttc: NSimSun,新宋体:style=Regular
/usr/share/fonts/google-droid/DroidSansFallback.ttf: Droid Sans:style=Regular
/usr/share/fonts/simsun/simsun.ttc: SimSun,宋体:style=Regular
```

列出所有英文字体:

```
[root@blog im4]# fc-list :lang=en
```

 

3，查看一个字体的详情

\#-v: 指定要查看详情的字体名

```
[root@blog ~]$ fc-match -v "SimHei"
```

 

4,建立字体缓存信息

参数：包含字体文件的目录，

fc-cache会扫描目录，创建字体文件的缓存信息

```
[root@blog ~]# fc-cache /usr/share/fonts/simhei/
```

经过扫描后，新添加到目录下的字体文件会出现在 fc-list的列表中

 

5,如何增加一个字体目录?

新建目录，把字体文件复制进去，

然后把目录添加到字体的配置文件中

编辑字体配置文件：

```
[root@blog ~]# vi /etc/fonts/fonts.conf
```

内容

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
<!-- Font directory list -->
        <dir>/usr/share/fonts</dir>
        <dir>/usr/share/X11/fonts/Type1</dir> <dir>/usr/share/X11/fonts/TTF</dir> <dir>/usr/local/share/fonts</dir>
        <dir prefix="xdg">fonts</dir>
        <!-- the following element will be removed in the future -->
        <dir>~/.fonts</dir> 
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

添加到这一段中即可:

例如:

```
<dir>/usr/local/fonts/simhei</dir>
```

添加完成后，执行fc-cache,

把字体添加到fc-list列表中，使系统可以使用

```
[root@blog ~]# fc-cache
```

这样不需要重启系统

 

## 三，例子：在centos8上新安装一种字体

 我们把一个windows中的字体文件安装到centos8上

1,在windows机器上找到字体文件FZLTHK.TTF，上传到centos8

2,创建目录，复制字体文件到目录下

```
[root@blog ~]# mkdir /usr/share/fzfonts
[root@blog ~]# cd /usr/share/fzfonts/
[root@blog fzfonts]# cp /data/dev/think_file/html/im4/FZLTHK.TTF ./
```

 

3,编辑字体配置文件

```
[root@blog fzfonts]# cd /etc/fonts/
[root@blog fonts]# vi fonts.conf
```

增加一行

```
<dir>/usr/share/fzfonts</dir>
```

 

4,建立缓存信息

```
[root@blog fonts]# fc-cache /usr/share/fzfonts/
```

 

5,用fc-list检查字体是否可用

```
[root@blog fonts]# fc-list :lang=zh
/usr/share/fonts/simhei/simhei.ttf: SimHei,黑体:style=Regular
/usr/share/fonts/simsun/simsun.ttc: NSimSun,新宋体:style=Regular
/usr/share/fzfonts/FZLTHK.TTF: FZLanTingHei\-R\-GBK,方正兰亭黑_GBK:style=Regular
/usr/share/fonts/simsun/simsun.ttc: SimSun,宋体:style=Regular 
```

 

也可用fc-match查看详情:

```
[root@blog fonts]#  fc-match -v "FZLanTingHei\-R\-GBK"
```

 

6,检查imagemagick是否可以使用此字体？

```
[root@blog fonts]# convert -list font | grep FZ
```

可以使用

 

## 四，查看centos的版本

```
[root@blog ~]# cat /etc/redhat-release
CentOS Linux release 8.0.1905 (Core)
```