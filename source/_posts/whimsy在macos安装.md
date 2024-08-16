---
title: whimsy在macos安装
date: 2024-08-11 17:42:43
tags: java
---

> 大厦之成，非一木之材也；大海之润，非一流之归也。——《东周列国志》

方式很简单：

https://github.com/apache/whimsy/blob/master/SETUPMYMAC.md

如下：

```bash
GithubIireAchao:IdeaProjects achao$ git clone git@github.com:apache/whimsy.git
Cloning into 'whimsy'...
remote: Enumerating objects: 55847, done.
remote: Counting objects: 100% (3194/3194), done.
remote: Compressing objects: 100% (547/547), done.
remote: Total 55847 (delta 2790), reused 2990 (delta 2628), pack-reused 52653
Receiving objects: 100% (55847/55847), 9.23 MiB | 3.66 MiB/s, done.
Resolving deltas: 100% (41962/41962), done.
GithubIireAchao:IdeaProjects achao$ whimsy/config/setupmymac

$ brew update
HOMEBREW_BREW_GIT_REMOTE set: using https://mirrors.ustc.edu.cn/brew.git as the Homebrew/brew Git remote.
remote: Enumerating objects: 4765, done.
remote: Counting objects: 100% (935/935), done.
remote: Total 4765 (delta 935), reused 935 (delta 935), pack-reused 3830
Receiving objects: 100% (4765/4765), 2.22 MiB | 18.02 MiB/s, done.
Resolving deltas: 100% (2843/2843), completed with 119 local objects.
From https://mirrors.ustc.edu.cn/brew
 * [new branch]            install-network-block -> origin/install-network-block
 * [new branch]            load-internal-cask-json-v3 -> origin/load-internal-cask-json-v3
   3aeef5aef2..102dec893b  master                -> origin/master
 * [new branch]            more-public-apis-sorbet-strict -> origin/more-public-apis-sorbet-strict
 * [new branch]            rubocop-avoid-fileutils-rmrf -> origin/rubocop-avoid-fileutils-rmrf
 * [new branch]            sandbox-chmod         -> origin/sandbox-chmod
 * [new branch]            srb-strict-utils      -> origin/srb-strict-utils
 * [new tag]               4.3.10                -> 4.3.10
 * [new tag]               4.3.11                -> 4.3.11
 * [new tag]               4.3.12                -> 4.3.12
 * [new tag]               4.3.13                -> 4.3.13
 * [new tag]               4.3.14                -> 4.3.14
 * [new tag]               4.3.9                 -> 4.3.9
==> Updating Homebrew...
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/bottles-portable-ruby/portable-ruby-3.3.4_1.arm64_big_sur.bottle.tar.gz
######################################################################### 100.0%
==> Pouring portable-ruby-3.3.4_1.arm64_big_sur.bottle.tar.gz
Updated 5 taps (jetbrains/utils, homebrew-ffmpeg/ffmpeg, hmarr/tap, homebrew/core and homebrew/cask).
==> New Formulae
aider               ipsw                mysql@8.4           soapyhackrf
clang-uml           kaskade             nerdfetch           sq
clangql             kubehound           onion-location      stellar-cli
cortexso            libassuan@2         openbao             tabiew
cotila              libgedit-gfls       oxker               tdb
epoll-shim          libgit2@1.7         packetry            terrahash
frizbee             libmps              progressline        terramaid
ftnchek             libxpresent         pug                 usage
ghc@9.8             litmusctl           ryelang             uvw
h26forge            mako                safety              wcurl
iowow               mysql-client@8.4    serpl
==> New Casks
airdash                                  k8studio
avbeam                                   kando
ball                                     lazycat
bbackupp                                 longplay
blip                                     meta-quest-developer-hub
boosteroid                               monarch
brightvpn                                nextcloud-vfs
cables                                   notchnook
cork                                     orka-desktop
crashplan                                pearcleaner
dataflare                                pia
dockdoor                                 plugdata@nightly
duplicateaudiofinder                     positron
ea                                       processspy
find-my-ports                            productive
font-afacad-flux                         quickwhisper
font-genkigothic                         replit
font-goorm-sans                          retroarch-metal@nightly
font-goorm-sans-code                     roblox
font-satoshi                             robloxstudio
font-sixtyfour-convergence               sq-mixpad
geoda                                    teamspeak-client@beta
gitkraken-on-premise-serverless          treeviewer
inkdown                                  twingate
istat-menus@6                            wd-security
ivacy                                    x32-edit
jagex                                    zipic
==> Outdated Formulae
automake            go                  libxml2             qemu
bash                harfbuzz            lua                 qodana
ca-certificates     hwloc               mpg123              ruby
certifi             imagemagick         numpy               scrcpy
cffi                keyring             nvm                 sdl2
curl                kubernetes-cli      openldap            tbb
ffmpeg              libass              openvino            tree
gcc                 libheif             p11-kit             unar
git-filter-repo     libssh              pyenv               xz
glib                libx11              python-packaging
==> Outdated Casks
android-platform-tools

You have 39 outdated formulae and 1 outdated cask installed.
You can upgrade them with brew upgrade
or list them with brew outdated.

$ brew install n
==> Fetching n
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/n-9.2.3.arm
######################################################################### 100.0%
==> Pouring n-9.2.3.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/n/9.2.3: 7 files, 83.8KB
==> Running `brew cleanup n`...
Disable this behaviour by setting HOMEBREW_NO_INSTALL_CLEANUP.
Hide these hints with HOMEBREW_NO_ENV_HINTS (see `man brew`).
==> `brew cleanup` has not been run in the last 30 days, running now...
Disable this behaviour by setting HOMEBREW_NO_INSTALL_CLEANUP.
Hide these hints with HOMEBREW_NO_ENV_HINTS (see `man brew`).
Removing: /Users/achao/Library/Caches/Homebrew/apr--1.7.4.arm64_sonoma.bottle.tar.gz... (394.3KB)
Removing: /Users/achao/Library/Caches/Homebrew/apr-util--1.6.3_1.arm64_sonoma.bottle.tar.gz... (243.8KB)
Removing: /Users/achao/Library/Caches/Homebrew/bash--5.2.26.arm64_sonoma.bottle.tar.gz... (3.2MB)
Removing: /Users/achao/Library/Caches/Homebrew/bison--3.8.2.arm64_sonoma.bottle.tar.gz... (1MB)
Removing: /Users/achao/Library/Caches/Homebrew/ca-certificates--2024-03-11.all.bottle.tar.gz... (129.4KB)
Removing: /Users/achao/Library/Caches/Homebrew/certifi--2024.6.2.arm64_sonoma.bottle.tar.gz... (5KB)
Removing: /Users/achao/Library/Caches/Homebrew/cffi--1.16.0_1.arm64_sonoma.bottle.1.tar.gz... (334.9KB)
Removing: /Users/achao/Library/Caches/Homebrew/cocoapods--1.15.2.arm64_sonoma.bottle.tar.gz... (9.6MB)
Removing: /Users/achao/Library/Caches/Homebrew/coreutils--9.5.arm64_sonoma.bottle.tar.gz... (4.4MB)
Removing: /Users/achao/Library/Caches/Homebrew/ffmpeg--7.0.1.arm64_sonoma.bottle.tar.gz... (20MB)
Removing: /Users/achao/Library/Caches/Homebrew/gettext--0.22.5.arm64_sonoma.bottle.tar.gz... (10.2MB)
Removing: /Users/achao/Library/Caches/Homebrew/git-filter-repo--2.38.0.all.bottle.2.tar.gz... (79.4KB)
Removing: /Users/achao/Library/Caches/Homebrew/glib--2.80.3.arm64_sonoma.bottle.tar.gz... (8.5MB)
Removing: /Users/achao/Library/Caches/Homebrew/gnutls--3.8.4.arm64_sonoma.bottle.tar.gz... (3.0MB)
Removing: /Users/achao/Library/Caches/Homebrew/grep--3.11.arm64_sonoma.bottle.1.tar.gz... (347.6KB)
Removing: /Users/achao/Library/Caches/Homebrew/harfbuzz--8.5.0.arm64_sonoma.bottle.tar.gz... (2.5MB)
Removing: /Users/achao/Library/Caches/Homebrew/icu4c--74.2.arm64_sonoma.bottle.tar.gz... (28.9MB)
Removing: /Users/achao/Library/Caches/Homebrew/imagemagick--7.1.1-34.arm64_sonoma.bottle.tar.gz... (10.7MB)
Removing: /Users/achao/Library/Caches/Homebrew/imath--3.1.11.arm64_sonoma.bottle.tar.gz... (185.0KB)
Removing: /Users/achao/Library/Caches/Homebrew/keyring--25.2.1.arm64_sonoma.bottle.tar.gz... (176.0KB)
Removing: /Users/achao/Library/Caches/Homebrew/libass--0.17.2.arm64_sonoma.bottle.tar.gz... (231.2KB)
Removing: /Users/achao/Library/Caches/Homebrew/libheif--1.17.6_1.arm64_sonoma.bottle.tar.gz... (1.6MB)
Removing: /Users/achao/Library/Caches/Homebrew/libmicrohttpd--1.0.1.arm64_sonoma.bottle.tar.gz... (470.6KB)
Removing: /Users/achao/Library/Caches/Homebrew/libpng--1.6.43.arm64_sonoma.bottle.tar.gz... (448.7KB)
Removing: /Users/achao/Library/Caches/Homebrew/libunibreak--6.1.arm64_sonoma.bottle.tar.gz... (63.4KB)
Removing: /Users/achao/Library/Caches/Homebrew/libunistring--1.2.arm64_sonoma.bottle.tar.gz... (1.6MB)
Removing: /Users/achao/Library/Caches/Homebrew/libxdmcp--1.1.5.arm64_sonoma.bottle.tar.gz... (35.7KB)
Removing: /Users/achao/Library/Caches/Homebrew/libxext--1.3.6.arm64_sonoma.bottle.tar.gz... (105.6KB)
Removing: /Users/achao/Library/Caches/Homebrew/mpg123--1.32.6.arm64_sonoma.bottle.tar.gz... (632.6KB)
Removing: /Users/achao/Library/Caches/Homebrew/openexr--3.2.4.arm64_sonoma.bottle.tar.gz... (1.9MB)
Removing: /Users/achao/Library/Caches/Homebrew/openjpeg--2.5.2.arm64_sonoma.bottle.tar.gz... (2MB)
Removing: /Users/achao/Library/Caches/Homebrew/qemu--9.0.1.arm64_sonoma.bottle.tar.gz... (104.4MB)
Removing: /Users/achao/Library/Caches/Homebrew/qodana--2024.1.5.tar.gz... (11.8MB)
Removing: /Users/achao/Library/Caches/Homebrew/readline--8.2.10.arm64_sonoma.bottle.tar.gz... (575.1KB)
Removing: /Users/achao/Library/Caches/Homebrew/scrcpy--2.5.arm64_sonoma.bottle.tar.gz... (172.4KB)
Removing: /Users/achao/Library/Caches/Homebrew/sdl2--2.30.4.arm64_sonoma.bottle.tar.gz... (1.8MB)
Removing: /Users/achao/Library/Caches/Homebrew/utf8proc--2.9.0.arm64_sonoma.bottle.tar.gz... (176.9KB)
Removing: /Users/achao/Library/Caches/Homebrew/wget--1.24.5.arm64_sonoma.bottle.tar.gz... (1.5MB)
Removing: /Users/achao/Library/Caches/Homebrew/xorgproto--2024.1.arm64_sonoma.bottle.tar.gz... (699.7KB)
Removing: /Users/achao/Library/Caches/Homebrew/xz--5.4.6.arm64_sonoma.bottle.tar.gz... (674.9KB)
Removing: /Users/achao/Library/Caches/Homebrew/zstd--1.5.6.arm64_sonoma.bottle.tar.gz... (758.6KB)
Removing: /Users/achao/Library/Caches/Homebrew/krb5--1.21.2.arm64_sonoma.bottle.tar.gz... (1.3MB)
Removing: /Users/achao/Library/Caches/Homebrew/libavif--1.0.4.arm64_sonoma.bottle.tar.gz... (168.5KB)
Removing: /Users/achao/Library/Caches/Homebrew/libpq--16.3.arm64_sonoma.bottle.tar.gz... (6.6MB)
Removing: /Users/achao/Library/Caches/Homebrew/Cask/vitals--0.9.zip... (391.4KB)
Removing: /Users/achao/Library/Caches/Homebrew/Cask/android-platform-tools--35.0.1.zip... (11.9MB)
Password:

$ sudo mkdir /usr/local/n

$ sudo chown -R 501:20 /usr/local/n

$ sudo mkdir /var/whimsy

$ sudo chown 501:20 /var/whimsy

$ sudo touch /etc/synthetic.conf

$ sudo edit /etc/synthetic.conf
/etc/synthetic.conf updated; reboot machine and rerun this script

Press "y" to reboot now, anything else to exit

GithubIireAchao:IdeaProjects achao$ 
```
