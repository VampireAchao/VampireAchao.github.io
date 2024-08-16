---
title: brew安装nvm、node及配置
date: 2023-06-29 21:33:17
tags: 软件及插件
---

> 邪恶进攻正直的心灵，从不来不是那么大张旗鼓的，它总是想法子来偷袭，总戴着某种诡辩的面具，还时常披着道德的外衣。——卢俊

用`brew`安装`nvm`

```bash
brew install nvm
```

安装很慢，配置下镜像？`.bash_profile` 

```bash
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.ustc.edu.cn/brew.git"
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.ustc.edu.cn/homebrew-core.git"
export HOMEBREW_API_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles/api"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles/bottles"
```

安装完毕后执行`brew info nvm`

```bash
achaodeMacBook-Pro:~ achao$ brew info nvm
==> nvm: stable 0.39.3 (bottled), HEAD
Manage multiple Node.js versions
https://github.com/nvm-sh/nvm
/opt/homebrew/Cellar/nvm/0.39.3 (9 files, 190.6KB) *
  Poured from bottle using the formulae.brew.sh API on 2023-06-26 at 13:22:48
From: https://github.com/Homebrew/homebrew-core/blob/HEAD/Formula/nvm.rb
License: MIT
==> Options
--HEAD
	Install HEAD version
==> Caveats
Please note that upstream has asked us to make explicit managing
nvm via Homebrew is unsupported by them and you should check any
problems against the standard nvm install method prior to reporting.

You should create NVM's working directory if it doesn't exist:
  mkdir ~/.nvm

Add the following to your shell profile e.g. ~/.profile or ~/.zshrc:
  export NVM_DIR="$HOME/.nvm"
  [ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"  # This loads nvm
  [ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion

You can set $NVM_DIR to any location, but leaving it unchanged from
/usr/local/Cellar/nvm/0.39.3 will destroy any nvm-installed Node installations
upon upgrade/reinstall.

Type `nvm help` for further information.

Bash completion has been installed to:
  /opt/homebrew/etc/bash_completion.d
==> Analytics
install: 18,642 (30 days), 202,744 (90 days), 212,500 (365 days)
install-on-request: 18,642 (30 days), 202,744 (90 days), 212,500 (365 days)
build-error: 0 (30 days)
```

然后叫我们先创建`nvm`的工作目录

```bash
 mkdir ~/.nvm
```

然后添加这一段到 `~/.bash_profile` 或者 `~/.zshrc`（没有就创建）:

```bash
export NVM_DIR="$HOME/.nvm"
  [ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"  # This loads nvm
  [ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion
```

然后我们保存退出，执行`source .bash_profile`

```bash
achaodeMacBook-Pro:~ achao$ nvm -v
0.39.3
```

说明配置`ok`，环境变量生效

接下来配置`nvm`镜像，在`.bash_profile`，添加

```bash
export NVM_NODEJS_ORG_MIRROR=http://mirrors.cloud.tencent.com/nodejs-release/
```

下载最后一个`LTS`版本

```bash
achaodeMacBook-Pro:~ achao$ nvm install --lts
Installing latest LTS version.
Downloading and installing node v18.16.1...
Downloading http://mirrors.cloud.tencent.com/nodejs-release//v18.16.1/node-v18.16.1-darwin-arm64.tar.xz...
######################################################################### 100.0%
Computing checksum with shasum -a 256
Checksums matched!
Now using node v18.16.1 (npm v9.5.1)
achaodeMacBook-Pro:~ achao$ node -v
v18.16.1
```

配置`npm`镜像

```bash
achaodeMacBook-Pro:~ achao$ npm config set registry http://mirrors.cloud.tencent.com/npm/
achaodeMacBook-Pro:~ achao$ npm config get registry
http://mirrors.cloud.tencent.com/npm/
```

## 