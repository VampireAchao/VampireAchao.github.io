---
title: node版本管理工具nvm
date: 2022-05-31 13:55:04
tags: 前端
---

> 凡心所向，素履所往，生如逆旅，一苇以航。——『尘曲』

我们经常需要多个`node`版本切换的场景，`nvm`可以做到这一切

代码地址：https://github.com/nvm-sh/nvm

我们这里用的是`windows`，因此`windows`仓库地址：https://github.com/coreybutler/nvm-windows

首先是下载：https://github.com/coreybutler/nvm-windows/releases/tag/1.1.7

![image-20220531135844488](/imgs/oss/picGo/image-20220531135844488.png)

下载`zip`包后安装即可

注意这里是`1.1.7`版本，而且安装目录尽量放在`D`盘新建的目录等没有空格、中文、乱七八糟的权限干扰的目录

然后选择`node`路径时同理

完成后即可使用

```shell
$ nvm use 16
Now using node v16.9.1 (npm v7.21.1)
$ node -v
v16.9.1
$ nvm use 14
Now using node v14.18.0 (npm v6.14.15)
$ node -v
v14.18.0
$ nvm install 12
Now using node v12.22.6 (npm v6.14.5)
$ node -v
v12.22.6
```

可以通过`nvm list`查看所有版本

同理`nvm uninstall`是卸载

```shell
C:\Users\achao>nvm

Running version 1.1.7.

Usage:

  nvm arch                     : Show if node is running in 32 or 64 bit mode.
  nvm install <version> [arch] : The version can be a node.js version or "latest" for the latest stable version.
                                 Optionally specify whether to install the 32 or 64 bit version (defaults to system arch).
                                 Set [arch] to "all" to install 32 AND 64 bit versions.
                                 Add --insecure to the end of this command to bypass SSL validation of the remote download server.
  nvm list [available]         : List the node.js installations. Type "available" at the end to see what can be installed. Aliased as ls.
  nvm on                       : Enable node.js version management.
  nvm off                      : Disable node.js version management.
  nvm proxy [url]              : Set a proxy to use for downloads. Leave [url] blank to see the current proxy.
                                 Set [url] to "none" to remove the proxy.
  nvm node_mirror [url]        : Set the node mirror. Defaults to https://nodejs.org/dist/. Leave [url] blank to use default url.
  nvm npm_mirror [url]         : Set the npm mirror. Defaults to https://github.com/npm/cli/archive/. Leave [url] blank to default url.
  nvm uninstall <version>      : The version must be a specific version.
  nvm use [version] [arch]     : Switch to use the specified version. Optionally specify 32/64bit architecture.
                                 nvm use <arch> will continue using the selected version, but switch to 32/64 bit mode.
  nvm root [path]              : Set the directory where nvm should store different versions of node.js.
                                 If <path> is not set, the current root will be displayed.
  nvm version                  : Displays the current running version of nvm for Windows. Aliased as v.
```

