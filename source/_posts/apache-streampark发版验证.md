---
title: apache-streampark发版验证
date: 2024-04-25 00:07:27
tags: java
---

> 一个人的行走范围，就是他的世界。——《青灯》

安装`svn`

```bash
brew install svn
```

然后验证：

https://streampark.apache.org/zh-CN/community/release/how_to_verify_release/

大概全程如下：

1. `mkdir streampark` - 创建一个名为"streampark"的新文件夹。
2. `cd streampark/` - 进入这个新创建的"streampark"文件夹。
3. `svn co https://dist.apache.org/repos/dist/dev/incubator/streampark/2.1.4-RC1/` - 通过Subversion（svn）从Apache的服务器上检出（下载）版本为"2.1.4-RC1"的streampark项目文件。
4. `curl https://downloads.apache.org/incubator/streampark/KEYS > KEYS` - 使用curl命令下载streampark项目的密钥文件，并将其保存为本地文件"KEYS"。
5. `gpg --import KEYS` - 将下载的密钥文件导入到GPG密钥库中，用于后续的安全验证。
6. `gpg --edit-key lvshaokang` - 打开GPG密钥编辑界面，用于管理名为"lvshaokang"的密钥。
7. `ls` - 列出当前目录中的所有文件。
8. `cd 2.1.4-RC1/` - 进入下载的"2.1.4-RC1"文件夹。
9. `vim verify.sh` - 使用vim文本编辑器创建或编辑一个名为"verify.sh"的脚本文件。
10. `chmod +x verify.sh` - 更改"verify.sh"脚本的权限，使其变为可执行文件。
11. `sudo ./verify.sh` - 以管理员权限执行"verify.sh"脚本，通常用于验证下载文件的完整性和安全性。
12. `brew install coreutils` - 使用Homebrew包管理器安装GNU Core Utilities，这是一组在Unix-like系统上常用的工具集合。
13. 执行脚本

完整过程：

```bash
GithubIireAchao:Downloads achao$ mkdir streampark
GithubIireAchao:Downloads achao$ cd streampark/
GithubIireAchao:streampark achao$ svn co https://dist.apache.org/repos/dist/dev/incubator/streampark/2.1.4-RC1/
A    2.1.4-RC1/apache-streampark-2.1.4-incubating-src.tar.gz
A    2.1.4-RC1/apache-streampark-2.1.4-incubating-src.tar.gz.asc
A    2.1.4-RC1/apache-streampark-2.1.4-incubating-src.tar.gz.sha512
A    2.1.4-RC1/apache-streampark_2.11-2.1.4-incubating-bin.tar.gz
A    2.1.4-RC1/apache-streampark_2.11-2.1.4-incubating-bin.tar.gz.asc
A    2.1.4-RC1/apache-streampark_2.11-2.1.4-incubating-bin.tar.gz.sha512
A    2.1.4-RC1/apache-streampark_2.12-2.1.4-incubating-bin.tar.gz
A    2.1.4-RC1/apache-streampark_2.12-2.1.4-incubating-bin.tar.gz.asc
A    2.1.4-RC1/apache-streampark_2.12-2.1.4-incubating-bin.tar.gz.sha512
取出版本 68745。
GithubIireAchao:streampark achao$ curl  https://downloads.apache.org/incubator/streampark/KEYS > KEYS # 下载KEYS
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 21577  100 21577    0     0  33413      0 --:--:-- --:--:-- --:--:-- 33452
GithubIireAchao:streampark achao$ gpg --import KEYS # 导入KEYS到本地
gpg: 密钥 E7AAF6555AE01B8E：公钥 “benjobs (benjobs apache keys) <benjobs@apache.org>” 已导入
gpg: 密钥 ACFB69E705016886：公钥 “muchunjin (for apache StreamPark release create at 20230501) <muchunjin@apache.org>” 已导入
gpg: 密钥 479E570AE3E3F36B：公钥 “muchunjin (for apache StreamPark release create at 20230621) <muchunjin@apache.org>” 已导入
gpg: 密钥 D5C228A4FAB07811：公钥 “gongzhongqiang (for apache StreamPark release create at 20231024) <gongzhongqiang@apache.org>” 已导入
gpg: 密钥 5C08953040EE71A2：公钥 “wangqingrong (for apache StreamPark release 2.1.3 create at 20240103) <monreid@apache.org>” 已导入
gpg: 密钥 5CEB5ECFD38791FF：公钥 “lvshaokang (for apache StreamPark release create at 20240421) <lvshaokang@apache.org>” 已导入
gpg: 处理的总数：6
gpg:               已导入：6
GithubIireAchao:streampark achao$ gpg --edit-key lvshaokang
gpg (GnuPG/MacGPG2) 2.2.41; Copyright (C) 2022 g10 Code GmbH
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.


pub  rsa4096/5CEB5ECFD38791FF
     创建于：2024-04-21  有效至：永不       可用于：SC  
     信任度：未知        有效性：未知
sub  rsa4096/730E450AC03B374F
     创建于：2024-04-21  有效至：永不       可用于：E   
[ 未知 ] (1). lvshaokang (for apache StreamPark release create at 20240421) <lvshaokang@apache.org>

gpg> trust
pub  rsa4096/5CEB5ECFD38791FF
     创建于：2024-04-21  有效至：永不       可用于：SC  
     信任度：未知        有效性：未知
sub  rsa4096/730E450AC03B374F
     创建于：2024-04-21  有效至：永不       可用于：E   
[ 未知 ] (1). lvshaokang (for apache StreamPark release create at 20240421) <lvshaokang@apache.org>

请决定您对这名用户能否正确地验证其他用户密钥
（通过查看护照，检查不同来源的的指纹等等）的相信程度

  1 = 我不知道或不作答
  2 = 我不相信
  3 = 我勉强相信
  4 = 我完全相信
  5 = 我绝对相信
  m = 回到主菜单

您的决定是什么？ 5
您真的要把这个密钥设置成绝对信任？(y/N) y

pub  rsa4096/5CEB5ECFD38791FF
     创建于：2024-04-21  有效至：永不       可用于：SC  
     信任度：绝对        有效性：未知
sub  rsa4096/730E450AC03B374F
     创建于：2024-04-21  有效至：永不       可用于：E   
[ 未知 ] (1). lvshaokang (for apache StreamPark release create at 20240421) <lvshaokang@apache.org>
请注意，在您重启程序之前，所显示的密钥有效性不一定正确。

gpg> 
gpg: signal Interrupt caught ... exiting
GithubIireAchao:streampark achao$ ls
2.1.4-RC1    KEYS        verify.sh
GithubIireAchao:streampark achao$ cd 2.1.4-RC1/
GithubIireAchao:2.1.4-RC1 achao$ vim verify.sh
GithubIireAchao:2.1.4-RC1 achao$ chmod +x verify.sh
GithubIireAchao:2.1.4-RC1 achao$ sudo ./verify.sh
apache-streampark-2.1.4-incubating-src.tar.gz
gpg: 警告：家目录‘/Users/achao/.gnupg’的所有权不安全
gpg: 签名建立于 一  4/22 00:02:13 2024 CST
gpg:               使用 RSA 密钥 B0AD51795657CF5C303FE79B5CEB5ECFD38791FF
gpg: 完好的签名，来自于 “lvshaokang (for apache StreamPark release create at 20240421) <lvshaokang@apache.org>” [绝对]
apache-streampark_2.11-2.1.4-incubating-bin.tar.gz
gpg: 警告：家目录‘/Users/achao/.gnupg’的所有权不安全
gpg: 签名建立于 一  4/22 00:02:19 2024 CST
gpg:               使用 RSA 密钥 B0AD51795657CF5C303FE79B5CEB5ECFD38791FF
gpg: 完好的签名，来自于 “lvshaokang (for apache StreamPark release create at 20240421) <lvshaokang@apache.org>” [绝对]
apache-streampark_2.12-2.1.4-incubating-bin.tar.gz
gpg: 警告：家目录‘/Users/achao/.gnupg’的所有权不安全
gpg: 签名建立于 一  4/22 00:02:20 2024 CST
gpg:               使用 RSA 密钥 B0AD51795657CF5C303FE79B5CEB5ECFD38791FF
gpg: 完好的签名，来自于 “lvshaokang (for apache StreamPark release create at 20240421) <lvshaokang@apache.org>” [绝对]
GithubIireAchao:2.1.4-RC1 achao$ touch verifysha512hash.sh
GithubIireAchao:2.1.4-RC1 achao$ vim verifysha512hash.sh 
GithubIireAchao:2.1.4-RC1 achao$ chmod +x verifysha512hash.sh 
GithubIireAchao:2.1.4-RC1 achao$ sudo ./verifysha512hash.sh 
Password:
apache-streampark-2.1.4-incubating-src.tar.gz
./verifysha512hash.sh: line 1: sha512sum: command not found
apache-streampark_2.11-2.1.4-incubating-bin.tar.gz
./verifysha512hash.sh: line 1: sha512sum: command not found
apache-streampark_2.12-2.1.4-incubating-bin.tar.gz
./verifysha512hash.sh: line 1: sha512sum: command not found
GithubIireAchao:2.1.4-RC1 achao$ brew install coreutils
HOMEBREW_BREW_GIT_REMOTE set: using https://mirrors.ustc.edu.cn/brew.git as the Homebrew/brew Git remote.
remote: Enumerating objects: 3575, done.
remote: Counting objects: 100% (649/649), done.
remote: Total 3575 (delta 649), reused 649 (delta 649), pack-reused 2926
Receiving objects: 100% (3575/3575), 2.71 MiB | 12.91 MiB/s, done.
Resolving deltas: 100% (2190/2190), completed with 202 local objects.
From https://mirrors.ustc.edu.cn/brew
   4fa7264a52..e3e927f688  master     -> origin/master
 * [new tag]               4.2.16     -> 4.2.16
 * [new tag]               4.2.17     -> 4.2.17
 * [new tag]               4.2.18     -> 4.2.18
 * [new tag]               4.2.19     -> 4.2.19
==> Auto-updating Homebrew...
Adjust how often this is run with HOMEBREW_AUTO_UPDATE_SECS or disable with
HOMEBREW_NO_AUTO_UPDATE. Hide these hints with HOMEBREW_NO_ENV_HINTS (see `man brew`).
==> Auto-updated Homebrew!
Updated 4 taps (jetbrains/utils, homebrew-ffmpeg/ffmpeg, homebrew/core and homebrew/cask).
==> New Formulae
beakerlib                  llvm@17                    policy_sentry
beancount-language-server  logdy                      promptfoo
descope                    manim                      rage
dpcmd                      mantra                     redict
ffmpeg@6                   mdformat                   rustcat
gitu                       morpheus                   superfile
jtbl                       msieve                     sysaidmin
kubecolor                  navidrome                  uni-algo
lexido                     oj                         valkey
liblc3                     overarch                   vfox
libscfg                    parsedmarc
==> New Casks
arctic                     flox                       outfox
arm-performance-libraries  fujifilm-x-raw-studio      phoenix-code
automattic-texts           halloy                     requestly
boltai                     hhkb-studio                starnet2
capcut                     limitless                  toneprint
clearvpn                   metarename                 viable
darkmodebuddy              metavideo                  yandex-music
ente-auth                  obs-backgroundremoval

You have 43 outdated formulae and 1 outdated cask installed.

==> Fetching coreutils
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/coreutils-9
######################################################################### 100.0%
==> Pouring coreutils-9.5.arm64_sonoma.bottle.tar.gz
==> Caveats
Commands also provided by macOS and the commands dir, dircolors, vdir have been installed with the prefix "g".
If you need to use these commands with their normal names, you can add a "gnubin" directory to your PATH with:
  PATH="/opt/homebrew/opt/coreutils/libexec/gnubin:$PATH"
==> Summary
🍺  /opt/homebrew/Cellar/coreutils/9.5: 476 files, 13.5MB
==> Running `brew cleanup coreutils`...
Disable this behaviour by setting HOMEBREW_NO_INSTALL_CLEANUP.
Hide these hints with HOMEBREW_NO_ENV_HINTS (see `man brew`).
==> `brew cleanup` has not been run in the last 30 days, running now...
Disable this behaviour by setting HOMEBREW_NO_INSTALL_CLEANUP.
Hide these hints with HOMEBREW_NO_ENV_HINTS (see `man brew`).
Removing: /Users/achao/Library/Caches/Homebrew/bash-completion@2--2.12.0.arm64_sonoma.bottle.tar.gz... (334.6KB)
Removing: /opt/homebrew/Cellar/ca-certificates/2023-12-12... (3 files, 226.6KB)
Removing: /opt/homebrew/Cellar/dav1d/1.3.0... (15 files, 919.2KB)
Removing: /opt/homebrew/Cellar/dav1d/1.4.0... (15 files, 903.3KB)
Removing: /Users/achao/Library/Caches/Homebrew/dav1d--1.4.0.arm64_sonoma.bottle.tar.gz... (351.8KB)
Removing: /Users/achao/Library/Caches/Homebrew/ffmpeg--6.1.1_4.arm64_sonoma.bottle.tar.gz... (19.3MB)
Removing: /Users/achao/Library/Caches/Homebrew/ffmpeg--6.1.1_6.arm64_sonoma.bottle.tar.gz... (19.3MB)
Removing: /opt/homebrew/Cellar/gettext/0.22.4... (2,042 files, 24.3MB)
Removing: /opt/homebrew/Cellar/ghostscript/10.02.1... (639 files, 151.3MB)
Removing: /Users/achao/Library/Caches/Homebrew/glib--2.80.0.arm64_sonoma.bottle.tar.gz... (7.0MB)
Removing: /Users/achao/Library/Caches/Homebrew/go--1.22.1.arm64_sonoma.bottle.tar.gz... (99.1MB)
Removing: /Users/achao/Library/Caches/Homebrew/harfbuzz--8.3.1.arm64_sonoma.bottle.tar.gz... (2.4MB)
Removing: /opt/homebrew/Cellar/highway/1.0.7... (65 files, 3.3MB)
Removing: /opt/homebrew/Cellar/icu4c/73.2... (268 files, 80.1MB)
Removing: /Users/achao/Library/Caches/Homebrew/imagemagick--7.1.1-29_1.arm64_sonoma.bottle.tar.gz... (10.4MB)
Removing: /opt/homebrew/Cellar/imath/3.1.10... (49 files, 939.7KB)
Removing: /opt/homebrew/Cellar/imath/3.1.9... (49 files, 935.5KB)
Removing: /Users/achao/Library/Caches/Homebrew/jasper--4.2.1.arm64_sonoma.bottle.tar.gz... (465.1KB)
Removing: /opt/homebrew/Cellar/jpeg-turbo/3.0.1... (44 files, 3.4MB)
Removing: /Users/achao/Library/Caches/Homebrew/jpeg-xl--0.10.2.arm64_sonoma.bottle.tar.gz... (1.5MB)
Removing: /Users/achao/Library/Caches/Homebrew/keyring--25.0.0_1.arm64_sonoma.bottle.tar.gz... (172.4KB)
Removing: /opt/homebrew/Cellar/libidn2/2.3.4_1... (79 files, 1MB)
Removing: /Users/achao/Library/Caches/Homebrew/libnghttp2--1.60.0.arm64_sonoma.bottle.tar.gz... (225.0KB)
Removing: /Users/achao/Library/Caches/Homebrew/libomp--18.1.1.arm64_sonoma.bottle.tar.gz... (567.3KB)
Removing: /opt/homebrew/Cellar/libpng/1.6.40... (27 files, 1.3MB)
Removing: /opt/homebrew/Cellar/libpng/1.6.42... (27 files, 1.3MB)
Removing: /opt/homebrew/Cellar/libunibreak/5.1... (17 files, 328.5KB)
Removing: /opt/homebrew/Cellar/libunistring/1.1... (56 files, 5.0MB)
Removing: /opt/homebrew/Cellar/libusb/1.0.26... (22 files, 595KB)
Removing: /Users/achao/Library/Caches/Homebrew/libx11--1.8.8.arm64_sonoma.bottle.tar.gz... (2.1MB)
Removing: /Users/achao/Library/Caches/Homebrew/libxcb--1.16.1.arm64_sonoma.bottle.tar.gz... (973KB)
Removing: /opt/homebrew/Cellar/libxdmcp/1.1.4... (11 files, 130.3KB)
Removing: /opt/homebrew/Cellar/libxext/1.3.5... (87 files, 445.7KB)
Removing: /Users/achao/Library/Caches/Homebrew/license-eye--0.5.0.arm64_sonoma.bottle.1.tar.gz... (6.9MB)
Removing: /Users/achao/Library/Caches/Homebrew/llvm--17.0.6_1.arm64_sonoma.bottle.tar.gz... (456.9MB)
Removing: /Users/achao/Library/Caches/Homebrew/mpg123--1.32.5.arm64_sonoma.bottle.tar.gz... (632.6KB)
Removing: /opt/homebrew/Cellar/openexr/3.2.1... (204 files, 7.8MB)
Removing: /opt/homebrew/Cellar/openexr/3.2.3... (205 files, 8.0MB)
Removing: /Users/achao/Library/Caches/Homebrew/openexr--3.2.3.arm64_sonoma.bottle.tar.gz... (1.9MB)
Removing: /opt/homebrew/Cellar/openjpeg/2.5.0_1... (541 files, 13.9MB)
Removing: /Users/achao/Library/Caches/Homebrew/opus--1.5.1.arm64_sonoma.bottle.tar.gz... (472.3KB)
Removing: /Users/achao/Library/Caches/Homebrew/pango--1.52.1.arm64_sonoma.bottle.tar.gz... (808.7KB)
Removing: /opt/homebrew/Cellar/pcre2/10.42... (230 files, 6.2MB)
Removing: /Users/achao/Library/Caches/Homebrew/poetry--1.8.2.arm64_sonoma.bottle.tar.gz... (7.2MB)
Removing: /Users/achao/Library/Caches/Homebrew/pyenv--2.3.36.arm64_sonoma.bottle.tar.gz... (771.7KB)
Removing: /opt/homebrew/Cellar/python-packaging/23.2_1... (87 files, 609.3KB)
Removing: /Users/achao/Library/Caches/Homebrew/python@3.12--3.12.2_1.arm64_sonoma.bottle.tar.gz... (15.8MB)
Removing: /opt/homebrew/Cellar/readline/8.2.7... (50 files, 1.7MB)
Removing: /Users/achao/Library/Caches/Homebrew/scrcpy--2.4.arm64_sonoma.bottle.tar.gz... (164.2KB)
Removing: /Users/achao/Library/Caches/Homebrew/sdl2--2.30.1.arm64_sonoma.bottle.tar.gz... (1.7MB)
Removing: /Users/achao/Library/Caches/Homebrew/sqlite--3.45.1.arm64_sonoma.bottle.tar.gz... (2.2MB)
Removing: /Users/achao/Library/Caches/Homebrew/sqlite--3.45.2.arm64_sonoma.bottle.tar.gz... (2.2MB)
Removing: /Users/achao/Library/Caches/Homebrew/subversion--1.14.3.arm64_sonoma.bottle.tar.gz... (7.8MB)
Removing: /opt/homebrew/Cellar/svt-av1/1.8.0... (24 files, 3.9MB)
Removing: /Users/achao/Library/Caches/Homebrew/virtualenv--20.25.1.arm64_sonoma.bottle.tar.gz... (4MB)
Removing: /opt/homebrew/Cellar/xorgproto/2023.2... (267 files, 3.9MB)
Removing: /Users/achao/Library/Caches/Homebrew/z3--4.12.6.arm64_sonoma.bottle.tar.gz... (12.2MB)
Removing: /opt/homebrew/Cellar/zstd/1.5.5... (31 files, 2.1MB)
Removing: /Users/achao/Library/Caches/Homebrew/Cask/another-redis-desktop-manager--1.6.3.dmg... (83.8MB)
Removing: /Users/achao/Library/Caches/Homebrew/Cask/android-platform-tools--35.0.0.zip... (11.9MB)
Removing: /Users/achao/Library/Logs/Homebrew/ffmpeg... (3 files, 1.8KB)
Removing: /Users/achao/Library/Logs/Homebrew/python@3.12... (2 files, 2KB)
Removing: /Users/achao/Library/Logs/Homebrew/glib... (64B)
Removing: /Users/achao/Library/Logs/Homebrew/gcc... (64B)
Removing: /Users/achao/Library/Logs/Homebrew/fontconfig... (64B)
Removing: /Users/achao/Library/Logs/Homebrew/openssl@3... (64B)
Removing: /Users/achao/Library/Logs/Homebrew/unbound... (64B)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/__pycache__/__init__.cpython-312.pyc... (363B)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/__pycache__/info.cpython-312.pyc... (3.0KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/__pycache__/report.cpython-312.pyc... (2.3KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/__pycache__/version.cpython-312.pyc... (565B)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/activation/__pycache__/__init__.cpython-312.pyc... (617B)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/activation/__pycache__/activator.cpython-312.pyc... (2.3KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/activation/__pycache__/via_template.cpython-312.pyc... (3.8KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/activation/bash/__pycache__/__init__.cpython-312.pyc... (914B)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/activation/batch/__pycache__/__init__.cpython-312.pyc... (1.4KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/activation/cshell/__pycache__/__init__.cpython-312.pyc... (911B)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/activation/fish/__pycache__/__init__.cpython-312.pyc... (684B)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/activation/nushell/__pycache__/__init__.cpython-312.pyc... (1.2KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/activation/powershell/__pycache__/__init__.cpython-312.pyc... (701B)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/activation/python/__pycache__/__init__.cpython-312.pyc... (1.8KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/app_data/__pycache__/__init__.cpython-312.pyc... (2.1KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/app_data/__pycache__/base.cpython-312.pyc... (3.9KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/app_data/__pycache__/na.cpython-312.pyc... (3.2KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/app_data/__pycache__/read_only.cpython-312.pyc... (2.3KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/app_data/__pycache__/via_disk_folder.cpython-312.pyc... (10.3KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/app_data/__pycache__/via_tempdir.cpython-312.pyc... (1.8KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/config/__pycache__/__init__.cpython-312.pyc... (169B)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/config/__pycache__/convert.cpython-312.pyc... (4.6KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/config/__pycache__/env_var.cpython-312.pyc... (1KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/config/__pycache__/ini.cpython-312.pyc... (4KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/config/cli/__pycache__/__init__.cpython-312.pyc... (173B)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/config/cli/__pycache__/parser.cpython-312.pyc... (7.9KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/create/__pycache__/__init__.cpython-312.pyc... (169B)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/create/__pycache__/creator.cpython-312.pyc... (11.5KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/create/__pycache__/describe.cpython-312.pyc... (6.4KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/create/__pycache__/pyenv_cfg.cpython-312.pyc... (3.7KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/create/via_global_ref/__pycache__/__init__.cpython-312.pyc... (184B)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/create/via_global_ref/__pycache__/api.cpython-312.pyc... (6.2KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/create/via_global_ref/__pycache__/store.cpython-312.pyc... (1.2KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/create/via_global_ref/__pycache__/venv.cpython-312.pyc... (5.9KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/create/via_global_ref/builtin/__pycache__/__init__.cpython-312.pyc... (192B)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/create/via_global_ref/builtin/__pycache__/builtin_way.cpython-312.pyc... (1KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/create/via_global_ref/builtin/__pycache__/ref.cpython-312.pyc... (9.7KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/create/via_global_ref/builtin/__pycache__/via_global_self_do.cpython-312.pyc... (7.4KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/create/via_global_ref/builtin/cpython/__pycache__/__init__.cpython-312.pyc... (200B)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/create/via_global_ref/builtin/cpython/__pycache__/common.cpython-312.pyc... (4.7KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/create/via_global_ref/builtin/cpython/__pycache__/cpython3.cpython-312.pyc... (6.9KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/create/via_global_ref/builtin/cpython/__pycache__/mac_os.cpython-312.pyc... (16.3KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/create/via_global_ref/builtin/pypy/__pycache__/__init__.cpython-312.pyc... (197B)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/create/via_global_ref/builtin/pypy/__pycache__/common.cpython-312.pyc... (3.7KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/create/via_global_ref/builtin/pypy/__pycache__/pypy3.cpython-312.pyc... (3.4KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/discovery/__pycache__/__init__.cpython-312.pyc... (172B)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/discovery/__pycache__/builtin.cpython-312.pyc... (8.7KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/discovery/__pycache__/cached_py_info.cpython-312.pyc... (7.6KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/discovery/__pycache__/discover.cpython-312.pyc... (1.9KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/discovery/__pycache__/py_info.cpython-312.pyc... (31.2KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/discovery/__pycache__/py_spec.cpython-312.pyc... (6.4KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/run/__pycache__/__init__.cpython-312.pyc... (8KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/run/__pycache__/session.cpython-312.pyc... (5.1KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/run/plugin/__pycache__/__init__.cpython-312.pyc... (173B)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/run/plugin/__pycache__/activators.cpython-312.pyc... (4KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/run/plugin/__pycache__/base.cpython-312.pyc... (4.8KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/run/plugin/__pycache__/creators.cpython-312.pyc... (5.5KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/run/plugin/__pycache__/discovery.cpython-312.pyc... (1.9KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/run/plugin/__pycache__/seeders.cpython-312.pyc... (2KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/seed/__pycache__/__init__.cpython-312.pyc... (167B)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/seed/__pycache__/seeder.cpython-312.pyc... (1.8KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/seed/embed/__pycache__/__init__.cpython-312.pyc... (173B)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/seed/embed/__pycache__/base_embed.cpython-312.pyc... (5.7KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/seed/embed/__pycache__/pip_invoke.cpython-312.pyc... (3.7KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/seed/embed/via_app_data/__pycache__/__init__.cpython-312.pyc... (186B)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/seed/embed/via_app_data/__pycache__/via_app_data.cpython-312.pyc... (8KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/seed/embed/via_app_data/pip_install/__pycache__/__init__.cpython-312.pyc... (198B)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/seed/embed/via_app_data/pip_install/__pycache__/base.cpython-312.pyc... (14.5KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/seed/embed/via_app_data/pip_install/__pycache__/copy.cpython-312.pyc... (2.7KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/seed/embed/via_app_data/pip_install/__pycache__/symlink.cpython-312.pyc... (3.8KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/seed/wheels/__pycache__/__init__.cpython-312.pyc... (397B)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/seed/wheels/__pycache__/acquire.cpython-312.pyc... (5.2KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/seed/wheels/__pycache__/bundle.cpython-312.pyc... (2.1KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/seed/wheels/__pycache__/periodic_update.cpython-312.pyc... (20.6KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/seed/wheels/__pycache__/util.cpython-312.pyc... (7.6KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/seed/wheels/embed/__pycache__/__init__.cpython-312.pyc... (1.3KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/util/__pycache__/__init__.cpython-312.pyc... (167B)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/util/__pycache__/error.cpython-312.pyc... (871B)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/util/__pycache__/lock.cpython-312.pyc... (9.3KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/util/__pycache__/zipapp.cpython-312.pyc... (2KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/util/path/__pycache__/__init__.cpython-312.pyc... (523B)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/util/path/__pycache__/_permission.cpython-312.pyc... (1.4KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/util/path/__pycache__/_sync.cpython-312.pyc... (4.4KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/util/path/__pycache__/_win.cpython-312.pyc... (1KB)
Removing: /opt/homebrew/lib/python3.12/site-packages/virtualenv/util/subprocess/__pycache__/__init__.cpython-312.pyc... (1.1KB)
Pruned 0 symbolic links and 62 directories from /opt/homebrew
GithubIireAchao:2.1.4-RC1 achao$ sudo ./verifysha512hash.sh 
apache-streampark-2.1.4-incubating-src.tar.gz
apache-streampark-2.1.4-incubating-src.tar.gz: OK
apache-streampark_2.11-2.1.4-incubating-bin.tar.gz
apache-streampark_2.11-2.1.4-incubating-bin.tar.gz: OK
apache-streampark_2.12-2.1.4-incubating-bin.tar.gz
apache-streampark_2.12-2.1.4-incubating-bin.tar.gz: OK
GithubIireAchao:2.1.4-RC1 achao$ tar -xzvf apache-streampark_2.11-2.1.4-incubating-bin.tar.gz
x apache-streampark_2.11-2.1.4-incubating-bin/bin/.mvn/
x apache-streampark_2.11-2.1.4-incubating-bin/bin/.mvn/wrapper/
x apache-streampark_2.11-2.1.4-incubating-bin/bin/.mvn/wrapper/MavenWrapperHelper$LocalDistribution.class
x apache-streampark_2.11-2.1.4-incubating-bin/bin/.mvn/wrapper/maven-wrapper.properties
x apache-streampark_2.11-2.1.4-incubating-bin/bin/.mvn/wrapper/maven-wrapper.jar
x apache-streampark_2.11-2.1.4-incubating-bin/bin/.mvn/wrapper/MavenWrapperHelper.java
x apache-streampark_2.11-2.1.4-incubating-bin/bin/.mvn/wrapper/MavenWrapperHelper.class
x apache-streampark_2.11-2.1.4-incubating-bin/bin/.mvn/wrapper/MavenWrapperHelper$1.class
x apache-streampark_2.11-2.1.4-incubating-bin/bin/
x apache-streampark_2.11-2.1.4-incubating-bin/bin/jvm_opts.sh
x apache-streampark_2.11-2.1.4-incubating-bin/bin/mvnw.cmd
x apache-streampark_2.11-2.1.4-incubating-bin/bin/streampark.sh
x apache-streampark_2.11-2.1.4-incubating-bin/bin/setclasspath.sh
x apache-streampark_2.11-2.1.4-incubating-bin/bin/startup.sh
x apache-streampark_2.11-2.1.4-incubating-bin/bin/mvnw
x apache-streampark_2.11-2.1.4-incubating-bin/bin/shutdown.sh
x apache-streampark_2.11-2.1.4-incubating-bin/lib/
x apache-streampark_2.11-2.1.4-incubating-bin/lib/streampark-flink-client-core_2.11-2.1.4.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/streampark-flink-shims_flink-1.12_2.11-2.1.4.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/streampark-flink-shims_flink-1.13_2.11-2.1.4.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/streampark-flink-shims_flink-1.14_2.11-2.1.4.jar
x apache-streampark_2.11-2.1.4-incubating-bin/logs/
x apache-streampark_2.11-2.1.4-incubating-bin/logs/.gitkeep
x apache-streampark_2.11-2.1.4-incubating-bin/temp/
x apache-streampark_2.11-2.1.4-incubating-bin/temp/.gitkeep
x apache-streampark_2.11-2.1.4-incubating-bin/client/
x apache-streampark_2.11-2.1.4-incubating-bin/client/.gitkeep
x apache-streampark_2.11-2.1.4-incubating-bin/script/
x apache-streampark_2.11-2.1.4-incubating-bin/script/upgrade/
x apache-streampark_2.11-2.1.4-incubating-bin/script/upgrade/mysql/
x apache-streampark_2.11-2.1.4-incubating-bin/script/upgrade/pgsql/
x apache-streampark_2.11-2.1.4-incubating-bin/script/schema/
x apache-streampark_2.11-2.1.4-incubating-bin/script/data/
x apache-streampark_2.11-2.1.4-incubating-bin/script/upgrade/mysql/2.1.4.sql
x apache-streampark_2.11-2.1.4-incubating-bin/script/upgrade/mysql/1.2.3.sql
x apache-streampark_2.11-2.1.4-incubating-bin/script/upgrade/mysql/2.1.0.sql
x apache-streampark_2.11-2.1.4-incubating-bin/script/upgrade/mysql/2.1.2.sql
x apache-streampark_2.11-2.1.4-incubating-bin/script/upgrade/mysql/2.1.3.sql
x apache-streampark_2.11-2.1.4-incubating-bin/script/upgrade/mysql/2.0.0.sql
x apache-streampark_2.11-2.1.4-incubating-bin/script/upgrade/pgsql/2.1.4.sql
x apache-streampark_2.11-2.1.4-incubating-bin/script/upgrade/pgsql/2.1.0.sql
x apache-streampark_2.11-2.1.4-incubating-bin/script/upgrade/pgsql/2.1.2.sql
x apache-streampark_2.11-2.1.4-incubating-bin/script/upgrade/pgsql/2.1.3.sql
x apache-streampark_2.11-2.1.4-incubating-bin/script/README.md
x apache-streampark_2.11-2.1.4-incubating-bin/script/schema/mysql-schema.sql
x apache-streampark_2.11-2.1.4-incubating-bin/script/schema/pgsql-schema.sql
x apache-streampark_2.11-2.1.4-incubating-bin/script/data/pgsql-data.sql
x apache-streampark_2.11-2.1.4-incubating-bin/script/data/mysql-data.sql
x apache-streampark_2.11-2.1.4-incubating-bin/conf/config.yaml
x apache-streampark_2.11-2.1.4-incubating-bin/conf/logback-spring.xml
x apache-streampark_2.11-2.1.4-incubating-bin/DISCLAIMER
x apache-streampark_2.11-2.1.4-incubating-bin/README.md
x apache-streampark_2.11-2.1.4-incubating-bin/
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/
x apache-streampark_2.11-2.1.4-incubating-bin/LICENSE
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-jakarta.servlet-jakarta.servlet-api.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-xmlenc-xmlenc.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-org.jruby.jcodings-jcodings.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-ch.qos.logback-logback-core.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-org.fusesource.leveldbjni-leveldbjni-all.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-org.eclipse.aether-aether-impl.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-com.esotericsoftware.minlog-minlog.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-org.owasp.encoder-encoder.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-org.ow2.asm-asm.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-org.latencyutils-LatencyUtils.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-io.opentracing-opentracing-noop.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-org.reactivestreams-reactive-streams.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-io.github.classgraph-classgraph.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-com.beachape-enumeratum-macros-2.12.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-aopalliance-aopalliance.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-com.beachape-enumeratum-2.12.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-io.opentracing-opentracing-util.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-asm-asm.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-com.sun.jersey-jersey-core.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-com.microsoft.sqlserver-mssql-jdbc.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-com.h2database-h2.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-org.aspectj-aspectjweaver.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-redis.clients-jedis.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-javax.mail-mail.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-org.influxdb-influxdb-java.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-org.eclipse.aether-aether-spi.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-javax.xml.stream-stax-api.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-com.sun.xml.bind-jaxb-impl.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-org.ow2.asm-asm-analysis.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license--jridgewell-set-array.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-qs.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-source-map-support.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license--babel-parser.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license--vue-compiler-dom.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-pinia.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-ant-design-vue.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license--vue-runtime-core.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-shallow-equal.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license--vue-server-renderer.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-form-data.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-vue.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-lodash-es.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license--simonwep-pickr.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-crypto-js.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/LICENSE
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-function-bind.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-axios.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-source-map.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-sortablejs.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-js-tokens.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-sourcemap-codec.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-nprogress.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-mime-db.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license--zxcvbn-ts-core.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-regenerator-runtime.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license--jridgewell-trace-mapping.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-core-js.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-has.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license--iconify-iconify.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-loose-envify.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-nanoid.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license--jridgewell-sourcemap-codec.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license--iconify-types.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-pinia-node-modules-vue-demi.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license--jridgewell-source-map.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-csstype.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-side-channel.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license--ant-design-colors.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-postcss.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license--vue-reactivity.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license--jridgewell-resolve-uri.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-source-map-js.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-object-inspect.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-buffer-from.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-asynckit.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-dayjs.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-vue-i18n.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license--vueuse-shared-node-modules-vue-demi.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-nanopop.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-terser.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license--vue-compiler-ssr.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license--intlify-devtools-if.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-compute-scroll-into-view.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-dom-align.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-warning.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-sql-formatter.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license--intlify-shared.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license--vue-reactivity-transform.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-sweetalert2.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-ant-design-vue-node-modules-vue-types.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license--types-web-bluetooth.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-ant-design-vue-node-modules-is-plain-object.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-argparse.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-path-to-regexp.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-call-bind.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license--vueuse-shared.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-picocolors.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license--ctrl-tinycolor.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license--vue-reactivity-transform-node-modules-magic-string.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-has-symbols.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license--vue-compiler-sfc.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license--vueuse-core.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license--vue-shared.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license--vueuse-core-node-modules-vue-demi.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license--babel-runtime.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-follow-redirects.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-is-plain-object.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license--jridgewell-source-map-node-modules--jridgewell-gen-mapping.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license--intlify-message-compiler.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-vue-router.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license--vue-compiler-sfc-node-modules-magic-string.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-async-validator.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-combined-stream.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-resize-observer-polyfill.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license--intlify-core-base.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-lodash.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license--vueuse-metadata.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license--vue-runtime-dom.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-mime-types.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-penpal.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-commander.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-scroll-into-view-if-needed.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license--vue-compiler-core.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-delayed-stream.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-acorn.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-fastest-levenshtein.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-monaco-editor.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-vue-types.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-estree-walker.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license--intlify-vue-devtools.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-get-intrinsic.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/ui-licenses/license-proxy-from-env.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-com.google.protobuf-protobuf-java.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-javax.xml.bind-jaxb-api.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-org.eclipse.aether-aether-util.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-com.github.luben-zstd-jni.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-org.hdrhistogram-HdrHistogram.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-com.sun.jersey-jersey-client.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-org.hamcrest-hamcrest-core.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-org.bouncycastle-bcprov-jdk15on.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-org.eclipse.aether-aether-connector-basic.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-org.eclipse.aether-aether-transport-file.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-com.sun.jersey-jersey-server.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-org.ow2.asm-asm-tree.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-org.projectlombok-lombok.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-org.eclipse.aether-aether-transport-http.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-jakarta.annotation-jakarta.annotation-api.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-org.ow2.asm-asm-commons.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-jakarta.websocket-jakarta.websocket-api.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-org.checkerframework-checker-qual.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-org.ow2.asm-asm-util.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-org.eclipse.aether-aether-api.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-ch.qos.logback-logback-classic.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-javax.activation-activation.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-io.opentracing-opentracing-api.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-com.sun.activation-jakarta.activation.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-com.esotericsoftware.kryo-kryo.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-javax.activation-javax.activation-api.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-net.sf.jopt-simple-jopt-simple.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-com.sun.mail-javax.mail.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-junit-junit.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-com.sun.jersey-jersey-json.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-com.jcraft-jsch.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-com.jcraft-jzlib.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-org.postgresql-postgresql.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-org.bouncycastle-bcpkix-jdk15on.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-com.auth0-java-jwt.txt
x apache-streampark_2.11-2.1.4-incubating-bin/licenses/license-org.jruby.joni-joni.txt
x apache-streampark_2.11-2.1.4-incubating-bin/NOTICE
x apache-streampark_2.11-2.1.4-incubating-bin/LICENSE.tpl
x apache-streampark_2.11-2.1.4-incubating-bin/lib/scala-library-2.11.12.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/scala-compiler-2.11.12.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/scala-parser-combinators_2.11-1.0.4.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/scala-reflect-2.11.12.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/scala-xml_2.11-1.3.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/guava-33.1.0-jre.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/failureaccess-1.0.2.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/listenablefuture-9999.0-empty-to-avoid-conflict-with-guava.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/checker-qual-3.42.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/error_prone_annotations-2.26.1.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/j2objc-annotations-3.0.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/commons-compress-1.21.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/commons-net-3.9.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/mail-1.4.7.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/activation-1.1.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/spring-boot-starter-2.7.11.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/spring-boot-2.7.11.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/spring-context-5.3.27.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/spring-boot-autoconfigure-2.7.11.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/jakarta.annotation-api-1.3.5.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/spring-core-5.3.27.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/spring-jcl-5.3.27.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/spring-boot-starter-web-2.7.11.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/spring-boot-starter-json-2.7.11.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/jackson-datatype-jdk8-2.13.5.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/jackson-datatype-jsr310-2.13.5.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/jackson-module-parameter-names-2.13.5.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/spring-web-5.3.27.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/spring-webmvc-5.3.27.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/spring-expression-5.3.27.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/docker-java-core-3.2.13.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/docker-java-api-3.2.13.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/docker-java-transport-3.2.13.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/commons-io-2.6.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/jackson-databind-2.13.5.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/bcpkix-jdk15on-1.64.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/bcprov-jdk15on-1.64.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/docker-java-transport-httpclient5-3.2.13.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/httpclient5-5.1.4.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/httpcore5-5.1.5.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/commons-codec-1.15.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/jna-5.8.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/spring-boot-starter-undertow-2.7.11.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/undertow-core-2.2.24.Final.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/jboss-logging-3.4.3.Final.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/xnio-api-3.8.7.Final.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/wildfly-common-1.5.4.Final.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/wildfly-client-config-1.0.1.Final.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/xnio-nio-3.8.7.Final.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/jboss-threads-3.1.0.Final.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/undertow-servlet-2.2.24.Final.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/undertow-websockets-jsr-2.2.24.Final.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/jakarta.servlet-api-4.0.4.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/jakarta.websocket-api-1.1.2.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/tomcat-embed-el-9.0.74.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/spring-boot-starter-actuator-2.7.11.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/spring-boot-actuator-autoconfigure-2.7.11.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/spring-boot-actuator-2.7.11.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/micrometer-core-1.9.10.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/HdrHistogram-2.1.12.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/LatencyUtils-2.0.3.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/spring-boot-starter-websocket-2.7.11.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/spring-messaging-5.3.27.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/spring-websocket-5.3.27.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/spring-boot-starter-validation-2.7.11.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/hibernate-validator-6.2.5.Final.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/jakarta.validation-api-2.0.2.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/classmate-1.5.1.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/spring-ldap-core-2.4.1.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/spring-beans-5.3.27.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/spring-tx-5.3.27.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/shiro-spring-1.10.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/shiro-core-1.10.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/shiro-lang-1.10.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/shiro-cache-1.10.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/shiro-crypto-hash-1.10.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/shiro-crypto-core-1.10.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/shiro-crypto-cipher-1.10.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/shiro-config-core-1.10.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/shiro-config-ogdl-1.10.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/commons-beanutils-1.9.4.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/shiro-event-1.10.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/shiro-web-1.10.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/encoder-1.2.3.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/spring-boot-starter-cache-2.7.11.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/spring-context-support-5.3.27.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/spring-boot-starter-aop-2.7.11.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/spring-aop-5.3.27.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/aspectjweaver-1.9.7.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/spring-boot-starter-quartz-2.7.11.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/quartz-2.3.2.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/mybatis-plus-boot-starter-3.5.3.1.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/mybatis-plus-3.5.3.1.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/mybatis-plus-extension-3.5.3.1.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/mybatis-plus-core-3.5.3.1.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/mybatis-plus-annotation-3.5.3.1.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/jsqlparser-4.4.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/mybatis-3.5.10.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/mybatis-spring-2.0.7.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/spring-boot-starter-jdbc-2.7.11.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/spring-jdbc-5.3.27.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/p6spy-3.9.1.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/commons-lang3-3.8.1.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/h2-2.1.214.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/postgresql-42.5.1.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/freemarker-2.3.32.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/commons-email-1.5.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/javax.mail-1.5.6.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/java-jwt-4.0.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/caffeine-2.8.6.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/snakeyaml-2.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/xml-apis-1.4.01.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/hadoop-client-api-3.3.4.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/hadoop-client-runtime-3.3.4.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/commons-logging-1.1.3.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/org.eclipse.jgit.ssh.jsch-5.13.3.202401111512-r.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/org.eclipse.jgit-5.13.3.202401111512-r.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/JavaEWAH-1.1.13.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/jsch-0.2.11.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/streampark-common_2.11-2.1.4.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/enumeratum_2.11-1.6.1.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/enumeratum-macros_2.11-1.6.1.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/HikariCP-3.4.5.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/config-1.4.2.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/httpclient-4.5.13.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/httpcore-4.4.16.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/streampark-shaded-slf4j-1.0.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/streampark-shaded-jackson-1.0.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/streampark-flink-shims-base_2.11-2.1.4.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/streampark-flink-client-api_2.11-2.1.4.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/streampark-flink-proxy_2.11-2.1.4.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/streampark-flink-packer_2.11-2.1.4.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/maven-shade-plugin-3.2.4.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/maven-plugin-api-3.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/sisu-inject-plexus-1.4.2.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/sisu-inject-bean-1.4.2.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/sisu-guice-2.1.7-noaop.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/maven-model-3.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/maven-core-3.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/maven-settings-3.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/maven-settings-builder-3.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/plexus-interpolation-1.14.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/plexus-classworlds-2.2.3.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/plexus-sec-dispatcher-1.3.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/plexus-cipher-1.4.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/maven-artifact-3.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/plexus-utils-3.3.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/maven-artifact-transfer-0.12.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/maven-common-artifact-filters-3.0.1.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/maven-shared-utils-3.1.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/asm-8.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/asm-commons-8.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/asm-tree-8.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/asm-analysis-8.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/maven-dependency-tree-3.0.1.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/jdependency-2.4.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/asm-util-8.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/aether-impl-1.1.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/aether-api-1.1.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/aether-spi-1.1.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/aether-util-1.1.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/aether-connector-basic-1.1.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/aether-transport-file-1.1.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/aether-transport-http-1.1.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/jcl-over-slf4j-1.7.36.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/maven-aether-provider-3.3.9.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/maven-model-builder-3.3.9.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/maven-builder-support-3.3.9.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/maven-repository-metadata-3.3.9.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/plexus-component-annotations-1.6.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/streampark-flink-kubernetes_2.11-2.1.4.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/flink-clients_2.11-1.14.4.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/flink-core-1.14.4.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/flink-annotations-1.14.4.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/kryo-2.24.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/minlog-1.2.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/commons-collections-3.2.2.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/flink-shaded-guava-30.1.1-jre-14.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/flink-runtime-1.14.4.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/flink-rpc-core-1.14.4.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/flink-rpc-akka-loader-1.14.4.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/flink-hadoop-fs-1.14.4.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/flink-shaded-netty-4.1.65.Final-14.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/flink-shaded-jackson-2.12.4-14.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/javassist-3.24.0-GA.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/snappy-java-1.1.8.3.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/lz4-java-1.8.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/flink-optimizer-1.14.4.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/flink-java-1.14.4.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/commons-math3-3.5.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/commons-cli-1.5.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/flink-streaming-java_2.11-1.14.4.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/flink-scala_2.11-1.14.4.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/chill_2.11-0.7.6.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/chill-java-0.7.6.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/jsr305-1.3.9.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/flink-kubernetes_2.11-1.14.4.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/httpclient5-fluent-5.1.4.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/streampark-flink-core_2.11-2.1.4.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/jackson-module-scala_2.11-2.13.5.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/jackson-core-2.13.5.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/jackson-annotations-2.13.5.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/paranamer-2.8.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/springdoc-openapi-ui-1.6.9.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/springdoc-openapi-webmvc-core-1.6.9.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/swagger-ui-4.11.1.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/webjars-locator-core-0.50.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/classgraph-4.8.147.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/knife4j-openapi3-spring-boot-starter-4.0.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/knife4j-core-4.0.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/knife4j-openapi3-ui-4.0.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/springdoc-openapi-common-1.6.9.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/swagger-core-2.2.0.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/jackson-dataformat-yaml-2.13.5.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/swagger-annotations-2.2.2.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/swagger-models-2.2.2.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/jakarta.xml.bind-api-2.3.3.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/jakarta.activation-api-1.2.2.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/objenesis-3.2.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/slf4j-api-1.7.32.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/log4j-over-slf4j-1.7.32.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/logback-classic-1.2.11.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/logback-core-1.2.12.jar
x apache-streampark_2.11-2.1.4-incubating-bin/lib/streampark-console-service-2.1.4.jar
x apache-streampark_2.11-2.1.4-incubating-bin/client/streampark-flink-sqlclient_2.11-2.1.4.jar
GithubIireAchao:2.1.4-RC1 achao$ tar -xzvf apache-streampark_2.12-2.1.4-incubating-bin.tar.gz
x apache-streampark_2.12-2.1.4-incubating-bin/bin/.mvn/
x apache-streampark_2.12-2.1.4-incubating-bin/bin/.mvn/wrapper/
x apache-streampark_2.12-2.1.4-incubating-bin/bin/.mvn/wrapper/MavenWrapperHelper$LocalDistribution.class
x apache-streampark_2.12-2.1.4-incubating-bin/bin/.mvn/wrapper/maven-wrapper.properties
x apache-streampark_2.12-2.1.4-incubating-bin/bin/.mvn/wrapper/maven-wrapper.jar
x apache-streampark_2.12-2.1.4-incubating-bin/bin/.mvn/wrapper/MavenWrapperHelper.java
x apache-streampark_2.12-2.1.4-incubating-bin/bin/.mvn/wrapper/MavenWrapperHelper.class
x apache-streampark_2.12-2.1.4-incubating-bin/bin/.mvn/wrapper/MavenWrapperHelper$1.class
x apache-streampark_2.12-2.1.4-incubating-bin/bin/
x apache-streampark_2.12-2.1.4-incubating-bin/bin/jvm_opts.sh
x apache-streampark_2.12-2.1.4-incubating-bin/bin/mvnw.cmd
x apache-streampark_2.12-2.1.4-incubating-bin/bin/streampark.sh
x apache-streampark_2.12-2.1.4-incubating-bin/bin/setclasspath.sh
x apache-streampark_2.12-2.1.4-incubating-bin/bin/startup.sh
x apache-streampark_2.12-2.1.4-incubating-bin/bin/mvnw
x apache-streampark_2.12-2.1.4-incubating-bin/bin/shutdown.sh
x apache-streampark_2.12-2.1.4-incubating-bin/lib/
x apache-streampark_2.12-2.1.4-incubating-bin/lib/streampark-flink-client-core_2.12-2.1.4.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/streampark-flink-shims_flink-1.15_2.12-2.1.4.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/streampark-flink-shims_flink-1.12_2.12-2.1.4.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/streampark-flink-shims_flink-1.13_2.12-2.1.4.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/streampark-flink-shims_flink-1.14_2.12-2.1.4.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/streampark-flink-shims_flink-1.16_2.12-2.1.4.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/streampark-flink-shims_flink-1.19_2.12-2.1.4.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/streampark-flink-shims_flink-1.18_2.12-2.1.4.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/streampark-flink-shims_flink-1.17_2.12-2.1.4.jar
x apache-streampark_2.12-2.1.4-incubating-bin/logs/
x apache-streampark_2.12-2.1.4-incubating-bin/logs/.gitkeep
x apache-streampark_2.12-2.1.4-incubating-bin/temp/
x apache-streampark_2.12-2.1.4-incubating-bin/temp/.gitkeep
x apache-streampark_2.12-2.1.4-incubating-bin/client/
x apache-streampark_2.12-2.1.4-incubating-bin/client/.gitkeep
x apache-streampark_2.12-2.1.4-incubating-bin/script/
x apache-streampark_2.12-2.1.4-incubating-bin/script/upgrade/
x apache-streampark_2.12-2.1.4-incubating-bin/script/upgrade/mysql/
x apache-streampark_2.12-2.1.4-incubating-bin/script/upgrade/pgsql/
x apache-streampark_2.12-2.1.4-incubating-bin/script/schema/
x apache-streampark_2.12-2.1.4-incubating-bin/script/data/
x apache-streampark_2.12-2.1.4-incubating-bin/script/upgrade/mysql/2.1.4.sql
x apache-streampark_2.12-2.1.4-incubating-bin/script/upgrade/mysql/1.2.3.sql
x apache-streampark_2.12-2.1.4-incubating-bin/script/upgrade/mysql/2.1.0.sql
x apache-streampark_2.12-2.1.4-incubating-bin/script/upgrade/mysql/2.1.2.sql
x apache-streampark_2.12-2.1.4-incubating-bin/script/upgrade/mysql/2.1.3.sql
x apache-streampark_2.12-2.1.4-incubating-bin/script/upgrade/mysql/2.0.0.sql
x apache-streampark_2.12-2.1.4-incubating-bin/script/upgrade/pgsql/2.1.4.sql
x apache-streampark_2.12-2.1.4-incubating-bin/script/upgrade/pgsql/2.1.0.sql
x apache-streampark_2.12-2.1.4-incubating-bin/script/upgrade/pgsql/2.1.2.sql
x apache-streampark_2.12-2.1.4-incubating-bin/script/upgrade/pgsql/2.1.3.sql
x apache-streampark_2.12-2.1.4-incubating-bin/script/README.md
x apache-streampark_2.12-2.1.4-incubating-bin/script/schema/mysql-schema.sql
x apache-streampark_2.12-2.1.4-incubating-bin/script/schema/pgsql-schema.sql
x apache-streampark_2.12-2.1.4-incubating-bin/script/data/pgsql-data.sql
x apache-streampark_2.12-2.1.4-incubating-bin/script/data/mysql-data.sql
x apache-streampark_2.12-2.1.4-incubating-bin/conf/config.yaml
x apache-streampark_2.12-2.1.4-incubating-bin/conf/logback-spring.xml
x apache-streampark_2.12-2.1.4-incubating-bin/DISCLAIMER
x apache-streampark_2.12-2.1.4-incubating-bin/README.md
x apache-streampark_2.12-2.1.4-incubating-bin/
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/
x apache-streampark_2.12-2.1.4-incubating-bin/LICENSE
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-jakarta.servlet-jakarta.servlet-api.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-xmlenc-xmlenc.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-org.jruby.jcodings-jcodings.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-ch.qos.logback-logback-core.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-org.fusesource.leveldbjni-leveldbjni-all.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-org.eclipse.aether-aether-impl.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-com.esotericsoftware.minlog-minlog.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-org.owasp.encoder-encoder.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-org.ow2.asm-asm.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-org.latencyutils-LatencyUtils.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-io.opentracing-opentracing-noop.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-org.reactivestreams-reactive-streams.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-io.github.classgraph-classgraph.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-com.beachape-enumeratum-macros-2.12.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-aopalliance-aopalliance.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-com.beachape-enumeratum-2.12.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-io.opentracing-opentracing-util.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-asm-asm.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-com.sun.jersey-jersey-core.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-com.microsoft.sqlserver-mssql-jdbc.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-com.h2database-h2.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-org.aspectj-aspectjweaver.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-redis.clients-jedis.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-javax.mail-mail.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-org.influxdb-influxdb-java.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-org.eclipse.aether-aether-spi.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-javax.xml.stream-stax-api.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-com.sun.xml.bind-jaxb-impl.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-org.ow2.asm-asm-analysis.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license--jridgewell-set-array.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-qs.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-source-map-support.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license--babel-parser.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license--vue-compiler-dom.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-pinia.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-ant-design-vue.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license--vue-runtime-core.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-shallow-equal.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license--vue-server-renderer.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-form-data.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-vue.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-lodash-es.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license--simonwep-pickr.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-crypto-js.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/LICENSE
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-function-bind.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-axios.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-source-map.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-sortablejs.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-js-tokens.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-sourcemap-codec.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-nprogress.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-mime-db.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license--zxcvbn-ts-core.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-regenerator-runtime.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license--jridgewell-trace-mapping.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-core-js.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-has.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license--iconify-iconify.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-loose-envify.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-nanoid.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license--jridgewell-sourcemap-codec.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license--iconify-types.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-pinia-node-modules-vue-demi.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license--jridgewell-source-map.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-csstype.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-side-channel.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license--ant-design-colors.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-postcss.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license--vue-reactivity.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license--jridgewell-resolve-uri.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-source-map-js.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-object-inspect.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-buffer-from.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-asynckit.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-dayjs.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-vue-i18n.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license--vueuse-shared-node-modules-vue-demi.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-nanopop.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-terser.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license--vue-compiler-ssr.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license--intlify-devtools-if.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-compute-scroll-into-view.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-dom-align.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-warning.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-sql-formatter.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license--intlify-shared.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license--vue-reactivity-transform.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-sweetalert2.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-ant-design-vue-node-modules-vue-types.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license--types-web-bluetooth.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-ant-design-vue-node-modules-is-plain-object.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-argparse.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-path-to-regexp.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-call-bind.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license--vueuse-shared.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-picocolors.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license--ctrl-tinycolor.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license--vue-reactivity-transform-node-modules-magic-string.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-has-symbols.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license--vue-compiler-sfc.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license--vueuse-core.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license--vue-shared.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license--vueuse-core-node-modules-vue-demi.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license--babel-runtime.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-follow-redirects.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-is-plain-object.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license--jridgewell-source-map-node-modules--jridgewell-gen-mapping.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license--intlify-message-compiler.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-vue-router.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license--vue-compiler-sfc-node-modules-magic-string.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-async-validator.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-combined-stream.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-resize-observer-polyfill.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license--intlify-core-base.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-lodash.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license--vueuse-metadata.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license--vue-runtime-dom.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-mime-types.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-penpal.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-commander.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-scroll-into-view-if-needed.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license--vue-compiler-core.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-delayed-stream.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-acorn.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-fastest-levenshtein.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-monaco-editor.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-vue-types.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-estree-walker.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license--intlify-vue-devtools.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-get-intrinsic.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/ui-licenses/license-proxy-from-env.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-com.google.protobuf-protobuf-java.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-javax.xml.bind-jaxb-api.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-org.eclipse.aether-aether-util.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-com.github.luben-zstd-jni.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-org.hdrhistogram-HdrHistogram.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-com.sun.jersey-jersey-client.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-org.hamcrest-hamcrest-core.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-org.bouncycastle-bcprov-jdk15on.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-org.eclipse.aether-aether-connector-basic.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-org.eclipse.aether-aether-transport-file.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-com.sun.jersey-jersey-server.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-org.ow2.asm-asm-tree.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-org.projectlombok-lombok.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-org.eclipse.aether-aether-transport-http.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-jakarta.annotation-jakarta.annotation-api.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-org.ow2.asm-asm-commons.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-jakarta.websocket-jakarta.websocket-api.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-org.checkerframework-checker-qual.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-org.ow2.asm-asm-util.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-org.eclipse.aether-aether-api.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-ch.qos.logback-logback-classic.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-javax.activation-activation.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-io.opentracing-opentracing-api.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-com.sun.activation-jakarta.activation.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-com.esotericsoftware.kryo-kryo.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-javax.activation-javax.activation-api.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-net.sf.jopt-simple-jopt-simple.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-com.sun.mail-javax.mail.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-junit-junit.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-com.sun.jersey-jersey-json.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-com.jcraft-jsch.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-com.jcraft-jzlib.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-org.postgresql-postgresql.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-org.bouncycastle-bcpkix-jdk15on.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-com.auth0-java-jwt.txt
x apache-streampark_2.12-2.1.4-incubating-bin/licenses/license-org.jruby.joni-joni.txt
x apache-streampark_2.12-2.1.4-incubating-bin/NOTICE
x apache-streampark_2.12-2.1.4-incubating-bin/LICENSE.tpl
x apache-streampark_2.12-2.1.4-incubating-bin/lib/scala-library-2.12.8.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/scala-compiler-2.12.8.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/scala-reflect-2.12.8.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/scala-xml_2.12-1.3.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/guava-33.1.0-jre.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/failureaccess-1.0.2.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/listenablefuture-9999.0-empty-to-avoid-conflict-with-guava.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/checker-qual-3.42.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/error_prone_annotations-2.26.1.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/j2objc-annotations-3.0.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/commons-compress-1.21.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/commons-net-3.9.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/mail-1.4.7.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/activation-1.1.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/spring-boot-starter-2.7.11.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/spring-boot-2.7.11.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/spring-context-5.3.27.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/spring-boot-autoconfigure-2.7.11.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/jakarta.annotation-api-1.3.5.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/spring-core-5.3.27.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/spring-jcl-5.3.27.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/spring-boot-starter-web-2.7.11.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/spring-boot-starter-json-2.7.11.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/jackson-datatype-jdk8-2.13.5.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/jackson-datatype-jsr310-2.13.5.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/jackson-module-parameter-names-2.13.5.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/spring-web-5.3.27.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/spring-webmvc-5.3.27.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/spring-expression-5.3.27.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/docker-java-core-3.2.13.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/docker-java-api-3.2.13.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/docker-java-transport-3.2.13.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/commons-io-2.6.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/jackson-databind-2.13.5.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/bcpkix-jdk15on-1.64.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/bcprov-jdk15on-1.64.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/docker-java-transport-httpclient5-3.2.13.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/httpclient5-5.1.4.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/httpcore5-5.1.5.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/commons-codec-1.15.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/jna-5.8.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/spring-boot-starter-undertow-2.7.11.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/undertow-core-2.2.24.Final.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/jboss-logging-3.4.3.Final.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/xnio-api-3.8.7.Final.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/wildfly-common-1.5.4.Final.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/wildfly-client-config-1.0.1.Final.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/xnio-nio-3.8.7.Final.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/jboss-threads-3.1.0.Final.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/undertow-servlet-2.2.24.Final.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/undertow-websockets-jsr-2.2.24.Final.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/jakarta.servlet-api-4.0.4.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/jakarta.websocket-api-1.1.2.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/tomcat-embed-el-9.0.74.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/spring-boot-starter-actuator-2.7.11.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/spring-boot-actuator-autoconfigure-2.7.11.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/spring-boot-actuator-2.7.11.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/micrometer-core-1.9.10.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/HdrHistogram-2.1.12.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/LatencyUtils-2.0.3.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/spring-boot-starter-websocket-2.7.11.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/spring-messaging-5.3.27.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/spring-websocket-5.3.27.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/spring-boot-starter-validation-2.7.11.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/hibernate-validator-6.2.5.Final.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/jakarta.validation-api-2.0.2.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/classmate-1.5.1.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/spring-ldap-core-2.4.1.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/spring-beans-5.3.27.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/spring-tx-5.3.27.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/shiro-spring-1.10.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/shiro-core-1.10.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/shiro-lang-1.10.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/shiro-cache-1.10.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/shiro-crypto-hash-1.10.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/shiro-crypto-core-1.10.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/shiro-crypto-cipher-1.10.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/shiro-config-core-1.10.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/shiro-config-ogdl-1.10.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/commons-beanutils-1.9.4.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/shiro-event-1.10.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/shiro-web-1.10.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/encoder-1.2.3.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/spring-boot-starter-cache-2.7.11.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/spring-context-support-5.3.27.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/spring-boot-starter-aop-2.7.11.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/spring-aop-5.3.27.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/aspectjweaver-1.9.7.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/spring-boot-starter-quartz-2.7.11.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/quartz-2.3.2.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/mybatis-plus-boot-starter-3.5.3.1.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/mybatis-plus-3.5.3.1.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/mybatis-plus-extension-3.5.3.1.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/mybatis-plus-core-3.5.3.1.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/mybatis-plus-annotation-3.5.3.1.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/jsqlparser-4.4.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/mybatis-3.5.10.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/mybatis-spring-2.0.7.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/spring-boot-starter-jdbc-2.7.11.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/spring-jdbc-5.3.27.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/p6spy-3.9.1.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/commons-lang3-3.8.1.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/h2-2.1.214.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/postgresql-42.5.1.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/freemarker-2.3.32.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/commons-email-1.5.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/javax.mail-1.5.6.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/java-jwt-4.0.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/caffeine-2.8.6.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/snakeyaml-2.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/xml-apis-1.4.01.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/hadoop-client-api-3.3.4.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/hadoop-client-runtime-3.3.4.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/commons-logging-1.1.3.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/org.eclipse.jgit.ssh.jsch-5.13.3.202401111512-r.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/org.eclipse.jgit-5.13.3.202401111512-r.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/JavaEWAH-1.1.13.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/jsch-0.2.11.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/streampark-common_2.12-2.1.4.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/enumeratum_2.12-1.6.1.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/enumeratum-macros_2.12-1.6.1.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/HikariCP-3.4.5.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/config-1.4.2.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/httpclient-4.5.13.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/httpcore-4.4.16.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/streampark-shaded-slf4j-1.0.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/streampark-shaded-jackson-1.0.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/streampark-flink-shims-base_2.12-2.1.4.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/streampark-flink-client-api_2.12-2.1.4.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/streampark-flink-proxy_2.12-2.1.4.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/streampark-flink-packer_2.12-2.1.4.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/maven-shade-plugin-3.2.4.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/maven-plugin-api-3.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/sisu-inject-plexus-1.4.2.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/sisu-inject-bean-1.4.2.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/sisu-guice-2.1.7-noaop.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/maven-model-3.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/maven-core-3.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/maven-settings-3.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/maven-settings-builder-3.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/plexus-interpolation-1.14.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/plexus-classworlds-2.2.3.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/plexus-sec-dispatcher-1.3.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/plexus-cipher-1.4.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/maven-artifact-3.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/plexus-utils-3.3.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/maven-artifact-transfer-0.12.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/maven-common-artifact-filters-3.0.1.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/maven-shared-utils-3.1.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/asm-8.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/asm-commons-8.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/asm-tree-8.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/asm-analysis-8.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/maven-dependency-tree-3.0.1.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/jdependency-2.4.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/asm-util-8.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/aether-impl-1.1.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/aether-api-1.1.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/aether-spi-1.1.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/aether-util-1.1.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/aether-connector-basic-1.1.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/aether-transport-file-1.1.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/aether-transport-http-1.1.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/jcl-over-slf4j-1.7.36.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/maven-aether-provider-3.3.9.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/maven-model-builder-3.3.9.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/maven-builder-support-3.3.9.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/maven-repository-metadata-3.3.9.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/plexus-component-annotations-1.6.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/streampark-flink-kubernetes_2.12-2.1.4.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/flink-clients_2.12-1.14.4.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/flink-core-1.14.4.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/flink-annotations-1.14.4.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/kryo-2.24.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/minlog-1.2.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/commons-collections-3.2.2.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/flink-shaded-guava-30.1.1-jre-14.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/flink-runtime-1.14.4.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/flink-rpc-core-1.14.4.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/flink-rpc-akka-loader-1.14.4.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/flink-hadoop-fs-1.14.4.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/flink-shaded-netty-4.1.65.Final-14.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/flink-shaded-jackson-2.12.4-14.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/javassist-3.24.0-GA.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/snappy-java-1.1.8.3.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/lz4-java-1.8.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/flink-optimizer-1.14.4.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/flink-java-1.14.4.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/commons-math3-3.5.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/commons-cli-1.5.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/flink-streaming-java_2.12-1.14.4.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/flink-scala_2.12-1.14.4.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/chill_2.12-0.7.6.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/chill-java-0.7.6.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/jsr305-1.3.9.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/flink-kubernetes_2.12-1.14.4.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/httpclient5-fluent-5.1.4.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/streampark-flink-core_2.12-2.1.4.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/jackson-module-scala_2.12-2.13.5.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/jackson-core-2.13.5.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/jackson-annotations-2.13.5.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/paranamer-2.8.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/springdoc-openapi-ui-1.6.9.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/springdoc-openapi-webmvc-core-1.6.9.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/swagger-ui-4.11.1.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/webjars-locator-core-0.50.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/classgraph-4.8.147.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/knife4j-openapi3-spring-boot-starter-4.0.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/knife4j-core-4.0.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/knife4j-openapi3-ui-4.0.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/springdoc-openapi-common-1.6.9.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/swagger-core-2.2.0.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/jackson-dataformat-yaml-2.13.5.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/swagger-annotations-2.2.2.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/swagger-models-2.2.2.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/jakarta.xml.bind-api-2.3.3.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/jakarta.activation-api-1.2.2.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/objenesis-3.2.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/slf4j-api-1.7.32.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/log4j-over-slf4j-1.7.32.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/logback-classic-1.2.11.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/logback-core-1.2.12.jar
x apache-streampark_2.12-2.1.4-incubating-bin/lib/streampark-console-service-2.1.4.jar
x apache-streampark_2.12-2.1.4-incubating-bin/client/streampark-flink-sqlclient_2.12-2.1.4.jar
GithubIireAchao:2.1.4-RC1 achao$ open
Usage: open [-e] [-t] [-f] [-W] [-R] [-n] [-g] [-h] [-s <partial SDK name>][-b <bundle identifier>] [-a <application>] [-u URL] [filenames] [--args arguments]
Help: Open opens files from a shell.
      By default, opens each file using the default application for that file.  
      If the file is in the form of a URL, the file will be opened as a URL.
Options: 
      -a                    Opens with the specified application.
      --arch ARCH           Open with the given cpu architecture type and subtype.
      -b                    Opens with the specified application bundle identifier.
      -e                    Opens with TextEdit.
      -t                    Opens with default text editor.
      -f                    Reads input from standard input and opens with TextEdit.
      -F  --fresh           Launches the app fresh, that is, without restoring windows. Saved persistent state is lost, excluding Untitled documents.
      -R, --reveal          Selects in the Finder instead of opening.
      -W, --wait-apps       Blocks until the used applications are closed (even if they were already running).
          --args            All remaining arguments are passed in argv to the application's main() function instead of opened.
      -n, --new             Open a new instance of the application even if one is already running.
      -j, --hide            Launches the app hidden.
      -g, --background      Does not bring the application to the foreground.
      -h, --header          Searches header file locations for headers matching the given filenames, and opens them.
      -s                    For -h, the SDK to use; if supplied, only SDKs whose names contain the argument value are searched.
                            Otherwise the highest versioned SDK in each platform is used.
      -u, --url URL         Open this URL, even if it matches exactly a filepath
      -i, --stdin  PATH     Launches the application with stdin connected to PATH; defaults to /dev/null
      -o, --stdout PATH     Launches the application with /dev/stdout connected to PATH; 
          --stderr PATH     Launches the application with /dev/stderr connected to PATH to
          --env    VAR      Add an enviroment variable to the launched process, where VAR is formatted AAA=foo or just AAA for a null string value.
GithubIireAchao:2.1.4-RC1 achao$ pwd
/Users/achao/Downloads/streampark/2.1.4-RC1
GithubIireAchao:2.1.4-RC1 achao$ find . -type f \( -name '*.a' -o -name '*.so' -o -name '*.dll' -o -name '*.exe' \)
GithubIireAchao:2.1.4-RC1 achao$ cd 
.DS_Store
.idea/
.svn/
apache-streampark-2.1.4-incubating-src.tar.gz
apache-streampark-2.1.4-incubating-src.tar.gz.asc
apache-streampark-2.1.4-incubating-src.tar.gz.sha512
apache-streampark_2.11-2.1.4-incubating-bin/
apache-streampark_2.11-2.1.4-incubating-bin.tar.gz
apache-streampark_2.11-2.1.4-incubating-bin.tar.gz.asc
apache-streampark_2.11-2.1.4-incubating-bin.tar.gz.sha512
apache-streampark_2.12-2.1.4-incubating-bin/
apache-streampark_2.12-2.1.4-incubating-bin.tar.gz
apache-streampark_2.12-2.1.4-incubating-bin.tar.gz.asc
apache-streampark_2.12-2.1.4-incubating-bin.tar.gz.sha512
verify.sh
verifysha512hash.sh
GithubIireAchao:2.1.4-RC1 achao$ cd apache-streampark_2.12-2.1.4-incubating-bin/
GithubIireAchao:apache-streampark_2.12-2.1.4-incubating-bin achao$ find . -type f \( -name '*.a' -o -name '*.so' -o -name '*.dll' -o -name '*.exe' \)
GithubIireAchao:apache-streampark_2.12-2.1.4-incubating-bin achao$ cd ..
GithubIireAchao:2.1.4-RC1 achao$ cd apache-streampark_2.11-2.1.4-incubating-bin/ 
GithubIireAchao:apache-streampark_2.11-2.1.4-incubating-bin achao$ find . -type f \( -name '*.a' -o -name '*.so' -o -name '*.dll' -o -name '*.exe' \)
GithubIireAchao:apache-streampark_2.11-2.1.4-incubating-bin achao$ 
```
