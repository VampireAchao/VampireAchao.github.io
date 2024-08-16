---
title: jpom更新版本
date: 2023-02-13 21:29:12
tags: 运维
---

> 多行不义必自毙——左丘明

一般`jpom`小版本可以直接在线更新，但一些不兼容的版本更新，需要手动/半自动升级

文档地址：https://jpom.top/pages/upgrade/2.9.x-to-2.10.x/

我们可以手动备份`/jpom-server/data`以及`/jpom-agent/data`目录

```shell
cp -r /usr/local/jpom-server/data /backup/jpom-server/data
```

注意下方是半自动升级，由于我没看文档目录，跟着手动方式升级完了才发现还有半自动升级方式...

> ## 推荐升级方式二（linux-半自动）
>
> ### [#](https://jpom.top/pages/upgrade/2.9.x-to-2.10.x/#插件端-2)插件端-2
>
> > 此方式仅限于使用 linux 环境下使用并且所在服务器能下载远程文件（公网）
>
> #### [#](https://jpom.top/pages/upgrade/2.9.x-to-2.10.x/#_1-脚本自动升级)1. 脚本自动升级
>
> 使用提醒
>
> 需要到插件端的安装目录里执行下面命令
>
> ```shell
> curl -fsSL https://jpom.top/docs/upgrade2.9.x.sh | bash -s agent
> ```
>
> 1
>
> #### [#](https://jpom.top/pages/upgrade/2.9.x-to-2.10.x/#_2-手动合并配置文件)2. 手动合并配置文件
>
> 使用该方式脚本自动将 `extConfig.yml` 移动到 `conf/extConfig.yml` 目录下
>
> 小提示
>
> 如果您安装 Jpom 插件端未修改任何配置属性，均使用默认配置可以忽略此步骤
>
> #### [#](https://jpom.top/pages/upgrade/2.9.x-to-2.10.x/#_3-清理旧文件数据)3. 清理旧文件数据
>
> 使用该方式脚本自动将 `log`、`lib`、`agent.log`、`Agent.bat`、`Agent.sh`、 移动到 `upgrade_backup` 目录下
>
> 您可以跟进自己的情况来判断升级是否成功，升级成功后可以将该目录手动删除
>
> ### [#](https://jpom.top/pages/upgrade/2.9.x-to-2.10.x/#服务端-2)服务端-2
>
> > 此方式仅限于使用 linux 环境下使用并且所在服务器能下载远程文件（公网）
>
> #### [#](https://jpom.top/pages/upgrade/2.9.x-to-2.10.x/#_1-脚本自动升级-2)1. 脚本自动升级
>
> 使用提醒
>
> 需要到服务端的安装目录里执行下面命令
>
> ```shell
> curl -fsSL https://jpom.top/docs/upgrade2.9.x.sh | bash -s server
> ```
>
> 1
>
> #### [#](https://jpom.top/pages/upgrade/2.9.x-to-2.10.x/#_2-手动合并配置文件-2)2. 手动合并配置文件
>
> 使用该方式脚本自动将 `extConfig.yml` 移动到 `conf/extConfig.yml` 目录下
>
> 小提示
>
> 如果您安装 Jpom 服务端未修改任何配置属性，均使用默认配置可以忽略此步骤
>
> #### [#](https://jpom.top/pages/upgrade/2.9.x-to-2.10.x/#_3-清理旧文件数据-2)3. 清理旧文件数据
>
> 使用该方式脚本自动将 `log`、`lib`、`server.log`、`Server.bat`、`Server.sh`、 移动到 `upgrade_backup` 目录下
>
> 您可以跟进自己的情况来判断升级是否成功，升级成功后可以将该目录手动删除