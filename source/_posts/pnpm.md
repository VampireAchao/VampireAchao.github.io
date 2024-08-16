---
title: pnpm
date: 2022-06-03 13:29:56
tags: 前端
---

> 曾因酒醉鞭名马，生怕情多累美人。——郁达夫

官方网址：https://www.pnpm.cn/

我们在使用`npm`下载前端所需依赖时，会反复下载、重复下载，如果有一款工具，能够缓存起来我们的下载，那就是`pnpm`了

> - 快速
>   pnpm 是同类工具速度的将近 2 倍
>
> - 高效
>   node_modules 中的所有文件均链接自单一存储位置
>
> - 支持单体仓库
>   pnpm 内置了对单个源码仓库中包含多个软件包的支持
>
> - 权限严格
>   pnpm 创建的 node_modules 默认并非扁平结构，因此代码无法对任意软件包进行访问

安装很简单，就像普通安装一个模块一样即可：

```shell
npm i -g pnpm
pnpm -v
```

使用`yarn`

```shell
yarn global add pnpm
pnpm -v
```

