---
title: brew安装docker
date: 2023-07-09 22:45:12
tags: 软件及插件
---

> 正如自然忌讳真空一样，人类是讨厌平等的。——《我是猫》

```bash
192:~ achao$ brew install --cask docker
==> Downloading https://raw.githubusercontent.com/Homebrew/homebrew-cask/c3a1ea1
Already downloaded: /Users/achao/Library/Caches/Homebrew/downloads/e5410bc154f2c9d59222a695cbd58b44e78c91e002bf5d82d0f67dc99f4b8326--docker.rb
==> Downloading https://desktop.docker.com/mac/main/arm64/114176/Docker.dmg
######################################################################### 100.0%
==> Installing Cask docker
==> Moving App 'Docker.app' to '/Applications/Docker.app'
==> Linking Binary 'docker' to '/usr/local/bin/docker'
Password:
==> Linking Binary 'docker-compose' to '/usr/local/bin/docker-compose'
==> Linking Binary 'docker-compose' to '/usr/local/bin/docker-compose-v1'
==> Linking Binary 'docker-credential-desktop' to '/usr/local/bin/docker-credent
==> Linking Binary 'docker-credential-ecr-login' to '/usr/local/bin/docker-crede
==> Linking Binary 'docker-credential-osxkeychain' to '/usr/local/bin/docker-cre
==> Linking Binary 'docker-index' to '/usr/local/bin/docker-index'
==> Linking Binary 'hub-tool' to '/usr/local/bin/hub-tool'
==> Linking Binary 'kubectl' to '/usr/local/bin/kubectl.docker'
==> Linking Binary 'docker.bash-completion' to '/opt/homebrew/etc/bash_completio
==> Linking Binary 'docker-compose.bash-completion' to '/opt/homebrew/etc/bash_c
==> Linking Binary 'docker.zsh-completion' to '/opt/homebrew/share/zsh/site-func
==> Linking Binary 'docker-compose.zsh-completion' to '/opt/homebrew/share/zsh/s
==> Linking Binary 'docker.fish-completion' to '/opt/homebrew/share/fish/vendor_
==> Linking Binary 'docker-compose.fish-completion' to '/opt/homebrew/share/fish
==> Linking Binary 'com.docker.vpnkit' to '/usr/local/bin/vpnkit'
==> Linking Binary 'com.docker.cli' to '/usr/local/bin/com.docker.cli'
🍺  docker was successfully installed!
192:~ achao$ docker -v
Docker version 24.0.2, build cb74dfc
```

打开后进行配置

![](/imgs/oss/picGo/20230704184434.png)

配置完后可以看到终端里已经有`compose`

```bash
192:~ achao$ docker compose version
Docker Compose version v2.19.1
```
