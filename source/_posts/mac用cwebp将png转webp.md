---
title: mac用cwebp将png转webp
date: 2024-04-27 20:04:56
tags: 软件及插件
---

> 春天不播种，夏天就不能生长，秋天就不能收割，冬天就不能品尝。——海涅

其实也就是安装

```bash
brew install cwebp
```

使用：

```bash
cwebp qianglu.png -o qianglu.webp
```

完整过程如下：

```bash
GithubIireAchao:Downloads achao$ brew install cwebp
HOMEBREW_BREW_GIT_REMOTE set: using https://mirrors.ustc.edu.cn/brew.git as the Homebrew/brew Git remote.
remote: Enumerating objects: 109, done.
remote: Counting objects: 100% (38/38), done.
remote: Total 109 (delta 38), reused 38 (delta 38), pack-reused 71
Receiving objects: 100% (109/109), 166.66 KiB | 4.50 MiB/s, done.
Resolving deltas: 100% (50/50), completed with 9 local objects.
From https://mirrors.ustc.edu.cn/brew
   e3e927f688..a47c45dbda  master     -> origin/master
==> Auto-updating Homebrew...
Adjust how often this is run with HOMEBREW_AUTO_UPDATE_SECS or disable with
HOMEBREW_NO_AUTO_UPDATE. Hide these hints with HOMEBREW_NO_ENV_HINTS (see `man brew`).
==> Auto-updated Homebrew!
Updated 1 tap (homebrew/cask).
==> New Casks
wljs-notebook

You have 46 outdated formulae and 1 outdated cask installed.

Warning: No available formula with the name "cwebp". Did you mean cweb or webp?
==> Searching for similarly named formulae and casks...
==> Formulae
cweb                                     webp ✔

To install cweb, run:
  brew install cweb

==> Casks
vlc-webplugin

To install vlc-webplugin, run:
  brew install --cask vlc-webplugin
GithubIireAchao:Downloads achao$ brew install webp
webp 1.3.2 is already installed but outdated (so it will be upgraded).
==> Fetching dependencies for webp: giflib and xz
==> Fetching giflib
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/giflib-5.2.
######################################################################### 100.0%
==> Fetching xz
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/xz-5.4.6.ar
######################################################################### 100.0%
==> Fetching webp
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/webp-1.4.0.
######################################################################### 100.0%
==> Upgrading webp
  1.3.2 -> 1.4.0 
==> Installing dependencies for webp: giflib and xz
==> Installing webp dependency: giflib
==> Pouring giflib-5.2.2.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/giflib/5.2.2: 19 files, 544.3KB
==> Installing webp dependency: xz
==> Pouring xz-5.4.6.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/xz/5.4.6: 163 files, 2.6MB
==> Installing webp
==> Pouring webp-1.4.0.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/webp/1.4.0: 63 files, 2.5MB
==> Running `brew cleanup webp`...
Disable this behaviour by setting HOMEBREW_NO_INSTALL_CLEANUP.
Hide these hints with HOMEBREW_NO_ENV_HINTS (see `man brew`).
Removing: /opt/homebrew/Cellar/webp/1.3.2... (63 files, 2.3MB)
==> Upgrading 15 dependents of upgraded formulae:
Disable this behaviour by setting HOMEBREW_NO_INSTALLED_DEPENDENTS_CHECK.
Hide these hints with HOMEBREW_NO_ENV_HINTS (see `man brew`).
aom 3.8.2 -> 3.9.0, libarchive 3.7.2 -> 3.7.3, libheif 1.17.6 -> 1.17.6_1, openblas 0.3.26 -> 0.3.27, python@3.12 3.12.2_1 -> 3.12.3, harfbuzz 8.3.1 -> 8.4.0, imagemagick 7.1.1-29_1 -> 7.1.1-31, keyring 25.0.0_1 -> 25.1.0, llvm 17.0.6_1 -> 18.1.4, pango 1.52.1 -> 1.52.2, ffmpeg 6.1.1_6 -> 7.0, poetry 1.8.2 -> 1.8.2_2, qemu 8.2.1 -> 9.0.0, scrcpy 2.4 -> 2.4_1, virtualenv 20.25.1 -> 20.26.0
==> Fetching libarchive
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/libarchive-
######################################################################### 100.0%
==> Fetching openblas
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/openblas-0.
######################################################################### 100.0%
==> Fetching dependencies for python@3.12: openssl@3 and sqlite
==> Fetching openssl@3
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/openssl%403
######################################################################### 100.0%
==> Fetching sqlite
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/sqlite-3.45
######################################################################### 100.0%
==> Fetching python@3.12
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/python%403.
######################################################################### 100.0%
==> Fetching dependencies for llvm: z3
==> Fetching z3
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/z3-4.13.0.a
######################################################################### 100.0%
==> Fetching llvm
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/llvm-18.1.4
######################################################################### 100.0%
==> Fetching dependencies for harfbuzz: libxcb and libx11
==> Fetching libxcb
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/libxcb-1.17
######################################################################### 100.0%
==> Fetching libx11
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/libx11-1.8.
######################################################################### 100.0%
==> Fetching harfbuzz
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/harfbuzz-8.
######################################################################### 100.0%
==> Fetching aom
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/aom-3.9.0.a
######################################################################### 100.0%
==> Fetching dependencies for libheif: x265
==> Fetching x265
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/x265-3.6.ar
######################################################################### 100.0%
==> Fetching libheif
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/libheif-1.1
######################################################################### 100.0%
==> Fetching dependencies for imagemagick: jasper and libomp
==> Fetching jasper
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/jasper-4.2.
######################################################################### 100.0%
==> Fetching libomp
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/libomp-18.1
######################################################################### 100.0%
==> Fetching imagemagick
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/imagemagick
######################################################################### 100.0%
==> Fetching keyring
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/keyring-25.
######################################################################### 100.0%
==> Fetching pango
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/pango-1.52.
######################################################################### 100.0%
==> Fetching dependencies for ffmpeg: libnghttp2, mbedtls, librist, snappy, tbb, opus, mpg123 and sdl2
==> Fetching libnghttp2
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/libnghttp2-
######################################################################### 100.0%
==> Fetching mbedtls
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/mbedtls-3.6
######################################################################### 100.0%
==> Fetching librist
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/librist-0.2
######################################################################### 100.0%
==> Fetching snappy
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/snappy-1.2.
######################################################################### 100.0%
==> Fetching tbb
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/tbb-2021.12
######################################################################### 100.0%
==> Fetching opus
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/opus-1.5.2.
######################################################################### 100.0%
==> Fetching mpg123
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/mpg123-1.32
######################################################################### 100.0%
==> Fetching sdl2
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/sdl2-2.30.2
######################################################################### 100.0%
==> Fetching ffmpeg
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/ffmpeg-7.0.
######################################################################### 100.0%
==> Fetching poetry
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/poetry-1.8.
######################################################################### 100.0%
==> Fetching qemu
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/qemu-9.0.0.
curl: (22) The requested URL returned error: 404

Warning: Bottle missing, falling back to the default domain...
==> Downloading https://ghcr.io/v2/homebrew/core/qemu/manifests/9.0.0
######################################################################### 100.0%
==> Downloading https://ghcr.io/v2/homebrew/core/qemu/blobs/sha256:8a28629a57bbf
######################################################################### 100.0%
==> Fetching scrcpy
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/scrcpy-2.4_
######################################################################### 100.0%
==> Fetching virtualenv
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/virtualenv-
######################################################################### 100.0%
==> Upgrading libarchive
  3.7.2 -> 3.7.3 
==> Pouring libarchive-3.7.3.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/libarchive/3.7.3: 64 files, 3.8MB
==> Running `brew cleanup libarchive`...
Removing: /opt/homebrew/Cellar/libarchive/3.7.2... (64 files, 4.0MB)
==> Upgrading openblas
  0.3.26 -> 0.3.27 
==> Pouring openblas-0.3.27.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/openblas/0.3.27: 23 files, 47.2MB
==> Running `brew cleanup openblas`...
Removing: /opt/homebrew/Cellar/openblas/0.3.26... (23 files, 47MB)
==> Upgrading python@3.12
  3.12.2_1 -> 3.12.3 
==> Installing dependencies for python@3.12: openssl@3 and sqlite
==> Installing python@3.12 dependency: openssl@3
==> Pouring openssl@3-3.3.0.arm64_sonoma.bottle.1.tar.gz
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/api/formula.jws.jso
#=#=#                                                                          
🍺  /opt/homebrew/Cellar/openssl@3/3.3.0: 6,976 files, 32.4MB
==> Installing python@3.12 dependency: sqlite
==> Pouring sqlite-3.45.3.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/sqlite/3.45.3: 11 files, 4.8MB
==> Installing python@3.12
==> Pouring python@3.12-3.12.3.arm64_sonoma.bottle.tar.gz
==> /opt/homebrew/Cellar/python@3.12/3.12.3/bin/python3.12 -Im ensurepip
==> /opt/homebrew/Cellar/python@3.12/3.12.3/bin/python3.12 -Im pip install -v --
🍺  /opt/homebrew/Cellar/python@3.12/3.12.3: 3,271 files, 65.7MB
==> Running `brew cleanup python@3.12`...
Removing: /opt/homebrew/Cellar/python@3.12/3.12.1_1... (3,225 files, 65.3MB)
Removing: /opt/homebrew/Cellar/python@3.12/3.12.2_1... (3,239 files, 65.5MB)
==> Upgrading llvm
  17.0.6_1 -> 18.1.4 
==> Installing dependencies for llvm: z3
==> Installing llvm dependency: z3
==> Pouring z3-4.13.0.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/z3/4.13.0: 119 files, 31.1MB
==> Installing llvm
==> Pouring llvm-18.1.4.arm64_sonoma.bottle.tar.gz
==> Caveats
To use the bundled libc++ please add the following LDFLAGS:
  LDFLAGS="-L/opt/homebrew/opt/llvm/lib/c++ -Wl,-rpath,/opt/homebrew/opt/llvm/lib/c++"

llvm is keg-only, which means it was not symlinked into /opt/homebrew,
because macOS already provides this software and installing another version in
parallel can cause all kinds of trouble.

If you need to have llvm first in your PATH, run:
  echo 'export PATH="/opt/homebrew/opt/llvm/bin:$PATH"' >> /Users/achao/.bash_profile

For compilers to find llvm you may need to set:
  export LDFLAGS="-L/opt/homebrew/opt/llvm/lib"
  export CPPFLAGS="-I/opt/homebrew/opt/llvm/include"
==> Summary
🍺  /opt/homebrew/Cellar/llvm/18.1.4: 7,721 files, 1.8GB
==> Running `brew cleanup llvm`...
Removing: /opt/homebrew/Cellar/llvm/17.0.6_1... (7,207 files, 1.7GB)
==> Upgrading harfbuzz
  8.3.1 -> 8.4.0 
==> Installing dependencies for harfbuzz: libxcb and libx11
==> Installing harfbuzz dependency: libxcb
==> Pouring libxcb-1.17.0.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/libxcb/1.17.0: 2,497 files, 7.5MB
==> Installing harfbuzz dependency: libx11
==> Pouring libx11-1.8.9.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/libx11/1.8.9: 1,042 files, 7.0MB
==> Installing harfbuzz
==> Pouring harfbuzz-8.4.0.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/harfbuzz/8.4.0: 76 files, 9.5MB
==> Running `brew cleanup harfbuzz`...
Removing: /opt/homebrew/Cellar/harfbuzz/8.3.1... (76 files, 9.5MB)
==> Upgrading aom
  3.8.2 -> 3.9.0 
==> Pouring aom-3.9.0.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/aom/3.9.0: 23 files, 10MB
==> Running `brew cleanup aom`...
Removing: /opt/homebrew/Cellar/aom/3.8.2... (23 files, 9.9MB)
Removing: /Users/achao/Library/Caches/Homebrew/aom--3.8.2.arm64_sonoma.bottle.tar.gz... (3.7MB)
==> Upgrading libheif
  1.17.6 -> 1.17.6_1 
==> Installing dependencies for libheif: x265
==> Installing libheif dependency: x265
==> Pouring x265-3.6.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/x265/3.6: 11 files, 12MB
==> Installing libheif
==> Pouring libheif-1.17.6_1.arm64_sonoma.bottle.tar.gz
==> /opt/homebrew/opt/shared-mime-info/bin/update-mime-database /opt/homebrew/sh
🍺  /opt/homebrew/Cellar/libheif/1.17.6_1: 29 files, 3.7MB
==> Running `brew cleanup libheif`...
Removing: /opt/homebrew/Cellar/libheif/1.17.6... (29 files, 3.7MB)
==> Upgrading imagemagick
  7.1.1-29_1 -> 7.1.1-31 
==> Installing dependencies for imagemagick: jasper and libomp
==> Installing imagemagick dependency: jasper
==> Pouring jasper-4.2.3.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/jasper/4.2.3: 44 files, 1.6MB
==> Installing imagemagick dependency: libomp
==> Pouring libomp-18.1.4.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/libomp/18.1.4: 8 files, 1.7MB
==> Installing imagemagick
==> Pouring imagemagick-7.1.1-31.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/imagemagick/7.1.1-31: 808 files, 32.3MB
==> Running `brew cleanup imagemagick`...
Removing: /opt/homebrew/Cellar/imagemagick/7.1.1-29_1... (809 files, 31.3MB)
==> Upgrading keyring
  25.0.0_1 -> 25.1.0 
==> Pouring keyring-25.1.0.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/keyring/25.1.0: 154 files, 654.8KB
==> Running `brew cleanup keyring`...
Removing: /opt/homebrew/Cellar/keyring/25.0.0_1... (153 files, 654.4KB)
==> Upgrading pango
  1.52.1 -> 1.52.2 
==> Pouring pango-1.52.2.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/pango/1.52.2: 68 files, 3.4MB
==> Running `brew cleanup pango`...
Removing: /opt/homebrew/Cellar/pango/1.52.1... (68 files, 3.4MB)
==> Upgrading ffmpeg
  6.1.1_6 -> 7.0 
==> Installing dependencies for ffmpeg: libnghttp2, mbedtls, librist, snappy, tbb, opus, mpg123 and sdl2
==> Installing ffmpeg dependency: libnghttp2
==> Pouring libnghttp2-1.61.0.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/libnghttp2/1.61.0: 13 files, 804.5KB
==> Installing ffmpeg dependency: mbedtls
==> Pouring mbedtls-3.6.0.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/mbedtls/3.6.0: 198 files, 13.2MB
==> Installing ffmpeg dependency: librist
==> Pouring librist-0.2.10_1.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/librist/0.2.10_1: 28 files, 794.9KB
==> Installing ffmpeg dependency: snappy
==> Pouring snappy-1.2.0.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/snappy/1.2.0: 18 files, 167.6KB
==> Installing ffmpeg dependency: tbb
==> Pouring tbb-2021.12.0.arm64_sonoma.bottle.1.tar.gz
🍺  /opt/homebrew/Cellar/tbb/2021.12.0: 177 files, 2.7MB
==> Installing ffmpeg dependency: opus
==> Pouring opus-1.5.2.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/opus/1.5.2: 15 files, 1MB
==> Installing ffmpeg dependency: mpg123
==> Pouring mpg123-1.32.6.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/mpg123/1.32.6: 33 files, 2.0MB
==> Installing ffmpeg dependency: sdl2
==> Pouring sdl2-2.30.2.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/sdl2/2.30.2: 93 files, 6.5MB
==> Installing ffmpeg
==> Pouring ffmpeg-7.0.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/ffmpeg/7.0: 286 files, 51.9MB
==> Running `brew cleanup ffmpeg`...
Removing: /opt/homebrew/Cellar/ffmpeg/6.1.1_6... (284 files, 50.2MB)
==> Upgrading poetry
  1.8.2 -> 1.8.2_2 
==> Pouring poetry-1.8.2_2.arm64_sonoma.bottle.tar.gz
==> Caveats
Bash completion has been installed to:
  /opt/homebrew/etc/bash_completion.d
==> Summary
🍺  /opt/homebrew/Cellar/poetry/1.8.2_2: 1,352 files, 17.8MB
==> Running `brew cleanup poetry`...
Removing: /opt/homebrew/Cellar/poetry/1.8.2... (1,419 files, 17.8MB)
==> Upgrading qemu
  8.2.1 -> 9.0.0 
==> Pouring qemu--9.0.0.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/qemu/9.0.0: 163 files, 577.4MB
==> Running `brew cleanup qemu`...
Removing: /opt/homebrew/Cellar/qemu/8.2.1... (162 files, 562MB)
==> Upgrading scrcpy
  2.4 -> 2.4_1 
==> Pouring scrcpy-2.4_1.arm64_sonoma.bottle.tar.gz
==> Caveats
At runtime, adb must be accessible from your PATH.

You can install adb from Homebrew Cask:
  brew install --cask android-platform-tools
==> Summary
🍺  /opt/homebrew/Cellar/scrcpy/2.4_1: 10 files, 357.0KB
==> Running `brew cleanup scrcpy`...
Removing: /opt/homebrew/Cellar/scrcpy/2.4... (10 files, 356.8KB)
==> Upgrading virtualenv
  20.25.1 -> 20.26.0 
==> Pouring virtualenv-20.26.0.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/virtualenv/20.26.0: 173 files, 5.2MB
==> Running `brew cleanup virtualenv`...
Removing: /opt/homebrew/Cellar/virtualenv/20.25.1... (180 files, 5.1MB)
==> Checking for dependents of upgraded formulae...
==> No broken dependents found!
==> Caveats
==> llvm
To use the bundled libc++ please add the following LDFLAGS:
  LDFLAGS="-L/opt/homebrew/opt/llvm/lib/c++ -Wl,-rpath,/opt/homebrew/opt/llvm/lib/c++"

llvm is keg-only, which means it was not symlinked into /opt/homebrew,
because macOS already provides this software and installing another version in
parallel can cause all kinds of trouble.

If you need to have llvm first in your PATH, run:
  echo 'export PATH="/opt/homebrew/opt/llvm/bin:$PATH"' >> /Users/achao/.bash_profile

For compilers to find llvm you may need to set:
  export LDFLAGS="-L/opt/homebrew/opt/llvm/lib"
  export CPPFLAGS="-I/opt/homebrew/opt/llvm/include"
==> poetry
Bash completion has been installed to:
  /opt/homebrew/etc/bash_completion.d
==> scrcpy
At runtime, adb must be accessible from your PATH.

You can install adb from Homebrew Cask:
  brew install --cask android-platform-tools
GithubIireAchao:Downloads achao$ cd /Users/achao/IdeaProjects/dromara.github.io/src/.vuepress/public/assets/img/members/qianglu.png
-bash: cd: /Users/achao/IdeaProjects/dromara.github.io/src/.vuepress/public/assets/img/members/qianglu.png: Not a directory
GithubIireAchao:Downloads achao$ cd /Users/achao/IdeaProjects/dromara.github.io/src/.vuepress/public/assets/img/members/
GithubIireAchao:members achao$ cwebp qianglu.png 
No output file specified (no -o flag). Encoding will
be performed, but its results discarded.

File:      qianglu.png
Dimension: 400 x 400 (with alpha)
Output:    11186 bytes Y-U-V-All-PSNR 43.00 46.53 47.23   43.95 dB
           (0.56 bpp)
block count:  intra4:        223  (35.68%)
              intra16:       402  (64.32%)
              skipped:       329  (52.64%)
bytes used:  header:            138  (1.2%)
             mode-partition:   1125  (10.1%)
             transparency:     4450 (99.0 dB)
 Residuals bytes  |segment 1|segment 2|segment 3|segment 4|  total
    macroblocks:  |       1%|       8%|      20%|      71%|     625
      quantizer:  |      36 |      34 |      30 |      23 |
   filter level:  |      11 |       7 |       5 |      20 |
Lossless-alpha compressed size: 4449 bytes
  * Header size: 70 bytes, image data size: 4379
  * Precision Bits: histogram=5 transform=5 cache=0
  * Palette size:   255
GithubIireAchao:members achao$ cwebp qianglu.png -o qianglu.webp
Saving file 'qianglu.webp'
File:      qianglu.png
Dimension: 400 x 400 (with alpha)
Output:    11186 bytes Y-U-V-All-PSNR 43.00 46.53 47.23   43.95 dB
           (0.56 bpp)
block count:  intra4:        223  (35.68%)
              intra16:       402  (64.32%)
              skipped:       329  (52.64%)
bytes used:  header:            138  (1.2%)
             mode-partition:   1125  (10.1%)
             transparency:     4450 (99.0 dB)
 Residuals bytes  |segment 1|segment 2|segment 3|segment 4|  total
    macroblocks:  |       1%|       8%|      20%|      71%|     625
      quantizer:  |      36 |      34 |      30 |      23 |
   filter level:  |      11 |       7 |       5 |      20 |
Lossless-alpha compressed size: 4449 bytes
  * Header size: 70 bytes, image data size: 4379
  * Precision Bits: histogram=5 transform=5 cache=0
  * Palette size:   255
GithubIireAchao:members achao$ cwebp acbox-liu.png -o acbox-liu.webp
Saving file 'acbox-liu.webp'
File:      acbox-liu.png
Dimension: 400 x 400 (with alpha)
Output:    12274 bytes Y-U-V-All-PSNR 42.82 44.62 44.28   43.30 dB
           (0.61 bpp)
block count:  intra4:        292  (46.72%)
              intra16:       333  (53.28%)
              skipped:       297  (47.52%)
bytes used:  header:            134  (1.1%)
             mode-partition:   1496  (12.2%)
             transparency:     4552 (99.0 dB)
 Residuals bytes  |segment 1|segment 2|segment 3|segment 4|  total
    macroblocks:  |       3%|      12%|      28%|      56%|     625
      quantizer:  |      36 |      34 |      29 |      21 |
   filter level:  |      11 |       7 |      31 |       4 |
Lossless-alpha compressed size: 4551 bytes
  * Header size: 63 bytes, image data size: 4488
  * Precision Bits: histogram=5 transform=5 cache=0
  * Palette size:   254
GithubIireAchao:members achao$ 
```
