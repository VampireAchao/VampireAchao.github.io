---
title: phpstorm配置php项目debug
date: 2024-05-23 20:16:18
tags: php
---

> 读书人必须不加指导而能独立思考，他必须多多少少是个思想家，而不是模仿者。——塞涅卡

前两天配置 `phpstorm` `debug` 时，发现网上一堆教程都不好使，主要是要注意自己的 `Xdebug` 版本

这是官方的文档：

[Configure Xdebug | PhpStorm Documentation](https://www.jetbrains.com/help/phpstorm/configuring-xdebug.html#i4j90co_74)

然后我们首先查看版本

```bash
GithubIireAchao:open-fortune achao$ php --version
PHP 5.6.40 (cli) (built: Feb 29 2024 21:08:25) 
Copyright (c) 1997-2016 The PHP Group
Zend Engine v2.6.0, Copyright (c) 1998-2016 Zend Technologies
    with Xdebug v2.5.5, Copyright (c) 2002-2017, by Derick Rethans
```

可以看到这里是 `2.5.5` 版本，因此我们需要使用 `2.x` 的配置

我们执行命令查看配置文件路径：

```bash
GithubIireAchao:open-fortune achao$ php --ini
Configuration File (php.ini) Path: /Applications/ServBay/package/etc/php/5.6
Loaded Configuration File:         /Applications/ServBay/package/etc/php/5.6/php.ini
Scan for additional .ini files in: /Applications/ServBay/package/etc/php/5.6/conf.d
Additional .ini files parsed:      /Applications/ServBay/package/etc/php/5.6/conf.d/apcu.ini,
/Applications/ServBay/package/etc/php/5.6/conf.d/memcache.ini,
/Applications/ServBay/package/etc/php/5.6/conf.d/memcached.ini,
/Applications/ServBay/package/etc/php/5.6/conf.d/mongodb.ini,
/Applications/ServBay/package/etc/php/5.6/conf.d/opcache.ini,
/Applications/ServBay/package/etc/php/5.6/conf.d/redis.ini,
/Applications/ServBay/package/etc/php/5.6/conf.d/scws.ini,
/Applications/ServBay/package/etc/php/5.6/conf.d/xdebug.ini

```

直接看到了最后一个有 `xdebug.ini`

我们修改端口号：

```bash
GithubIireAchao:open-fortune achao$ cat /Applications/ServBay/package/etc/php/5.6/conf.d/xdebug.ini
[xdebug]
zend_extension=xdebug.so
xdebug.remote_enable=1
xdebug.remote_host=localhost
xdebug.remote_port=9000
xdebug.log=/Applications/ServBay/logs/xdebug/5.6/xdebug.log
```

主要是这里的端口号 `9000` 然后保存，配置 `phpstorm` 里的 `xdebug` 端口

![](/imgs/oss/blog-img/2024-05-23-20-39-24-image.png)

然后我们配置启动，按下双 `shift`，搜 `Edit Configuration` 进去

![](/imgs/oss/blog-img/2024-05-23-20-46-43-image.png)

我们选 `+`，点 `PHP Web Page`

![](/imgs/oss/blog-img/2024-05-23-20-47-26-image.png)

随便输入 `Name`，然后点这三个点

![](/imgs/oss/blog-img/2024-05-23-20-49-14-image.png)

点 `+` 号，然后填上，注意端口是你服务的端口

![](/imgs/oss/blog-img/2024-05-23-20-50-19-image.png)

`ok` 了以后，可以在外面选上

![](/imgs/oss/blog-img/2024-05-23-20-51-06-image.png)

然后我们打开监听，就是这个电话给它点绿

![](/imgs/oss/blog-img/2024-05-23-20-52-03-image.png)

我们启动项目

```bash
GithubIireAchao:open-fortune achao$ php -S localhost:8080
PHP 5.6.40 Development Server started at Thu May 23 20:52:28 2024
Listening on http://localhost:8080
Document root is /Users/achao/PhpstormProjects/open-fortune
Press Ctrl-C to quit.
```

打开网页即可看到 `debug` 断点生效

![](/imgs/oss/blog-img/2024-05-23-20-53-48-image.png)
