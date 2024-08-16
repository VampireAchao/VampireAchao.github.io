---
title: gitmodule常见命令
date: 2024-08-16 15:33:22
tags: 软件及插件
---

> 我的悲伤还来不及出发，就已经到站下车。——《第七天》

常用命令如下：

```bash
# 初始化当前仓库中所有已存在的子模块
git submodule init

# 更新子模块到最新版本（初始化时也可使用）
git submodule update

# 初始化并更新所有子模块
git submodule update --init --recursive

# 拉取并更新子模块中最新的代码
git submodule update --remote

# 拉取所有子模块的最新代码
git submodule update --remote --merge

# 添加一个子模块
git submodule add <repository_url> [<path>]

# 克隆一个包含子模块的仓库，并初始化和更新子模块
git clone --recurse-submodules <repository_url>

# 删除一个子模块
git submodule deinit -f <path_to_submodule>
rm -rf .git/modules/<path_to_submodule>
git rm -f <path_to_submodule>

# 显示当前仓库中的所有子模块及其状态
git submodule status

# 列出子模块的URL信息
git config --file .gitmodules --get-regexp path

# 更改子模块的远程URL
git submodule set-url <path_to_submodule> <new_repository_url>

# 在新分支上更新子模块指向的提交
git checkout -b <new_branch>
git submodule update --remote --merge

# 获取子模块的最新变动，并更新到主仓库
git submodule foreach git pull origin master

# 同步子模块配置到远程
git submodule sync

# 重置子模块到特定提交
cd <path_to_submodule>
git checkout <commit_hash>
```

例如`stream-query`里

```bash

```
