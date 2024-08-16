---
title: 安卓usb控制scrcpy
date: 2024-02-10 17:22:39
tags: android
---

> 食不过绝，欲不过多，冬不及温，夏不及凉。——葛洪

分享一下开源项目`scrcpy`

[GitHub - Genymobile/scrcpy: Display and control your Android device](https://github.com/Genymobile/scrcpy)

它可以用电脑显示和控制您的 Android 设备

通过 USB 或 TCP/IP 连接的 Android 设备（视频和音频），并允许使用计算机的键盘和鼠标控制设备。它不需要任何root访问权限。适用于 Linux、Windows 和 macOS

我们安装一下

- [Linux Linux目录](https://github.com/Genymobile/scrcpy/blob/master/doc/linux.md)
- [Windows 窗户](https://github.com/Genymobile/scrcpy/blob/master/doc/windows.md)
- [macOS 苹果操作系统](https://github.com/Genymobile/scrcpy/blob/master/doc/macos.md)

我这里是`mac`，所以

```bash
Github-Id-VampireAchao:~ achao$ brew install scrcpy
HOMEBREW_BREW_GIT_REMOTE set: using https://mirrors.ustc.edu.cn/brew.git as the Homebrew/brew Git remote.
remote: Enumerating objects: 1236, done.
remote: Counting objects: 100% (259/259), done.
Receiving objects:   9% (112/1236)
remote: Total 1236 (delta 259), reused 259 (delta 259), pack-reused 977
Receiving objects: 100% (1236/1236), 1.43 MiB | 5.87 MiB/s, done.
Resolving deltas: 100% (688/688), completed with 82 local objects.
From https://mirrors.ustc.edu.cn/brew
   3707c90ce1..73f986908c  master     -> origin/master
 * [new tag]               4.2.7      -> 4.2.7
Running `brew update --auto-update`...
==> Auto-updated Homebrew!
Updated 2 taps (homebrew/core and homebrew/cask).
==> New Formulae
asmfmt             deadfinder         helm-docs          kubetui            sui
autobrr            flowpipe           ignite             magic-wormhole.rs
cekit              g-ls               kin                mtm
==> New Casks
hancom-docs             lunarbar                mumuplayer              nrfutil

You have 14 outdated formulae installed.

==> Fetching dependencies for scrcpy: imath, libpng, aribb24, libidn2, openssl@3, glib, libbluray, cjson, libmicrohttpd, mbedtls, librist, libsoxr, libvidstab, opencore-amr, isl, mpfr, libmpc, gcc, openblas, numpy, pugixml, hwloc, tbb, openvino, rav1e, libsamplerate, flac, mpg123, libsndfile, rubberband, sdl2, speex, srt, svt-av1, leptonica, libb2, libarchive, pango, tesseract, xvid, libsodium, zeromq, zimg, ffmpeg and libusb
==> Fetching imath
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/imath-3.1.10.arm64_sonoma
####################################################################################### 100.0%
==> Fetching libpng
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/libpng-1.6.42.arm64_sonom
####################################################################################### 100.0%
==> Fetching aribb24
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/aribb24-1.0.4.arm64_sonom
####################################################################################### 100.0%
==> Fetching libidn2
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/libidn2-2.3.7.arm64_sonom
####################################################################################### 100.0%
==> Fetching openssl@3
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/openssl%403-3.2.1.arm64_s
####################################################################################### 100.0%
==> Fetching glib
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/glib-2.78.4.arm64_sonoma.
####################################################################################### 100.0%
==> Fetching libbluray
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/libbluray-1.3.4.arm64_son
####################################################################################### 100.0%
==> Fetching cjson
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/cjson-1.7.17.arm64_sonoma
####################################################################################### 100.0%
==> Fetching libmicrohttpd
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/libmicrohttpd-1.0.0.arm64
####################################################################################### 100.0%
==> Fetching mbedtls
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/mbedtls-3.5.2.arm64_sonom
####################################################################################### 100.0%
==> Fetching librist
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/librist-0.2.10.arm64_sono
####################################################################################### 100.0%
==> Fetching libsoxr
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/libsoxr-0.1.3.arm64_sonom
####################################################################################### 100.0%
==> Fetching libvidstab
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/libvidstab-1.1.1.arm64_so
####################################################################################### 100.0%
==> Fetching opencore-amr
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/opencore-amr-0.1.6.arm64_
####################################################################################### 100.0%
==> Fetching isl
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/isl-0.26.arm64_sonoma.bot
####################################################################################### 100.0%
==> Fetching mpfr
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/mpfr-4.2.1.arm64_sonoma.b
####################################################################################### 100.0%
==> Fetching libmpc
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/libmpc-1.3.1.arm64_sonoma
####################################################################################### 100.0%
==> Fetching gcc
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/gcc-13.2.0.arm64_sonoma.b
####################################################################################### 100.0%
==> Fetching openblas
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/openblas-0.3.26.arm64_son
####################################################################################### 100.0%
==> Fetching numpy
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/numpy-1.26.4.arm64_sonoma
####################################################################################### 100.0%
==> Fetching pugixml
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/pugixml-1.14.arm64_sonoma
####################################################################################### 100.0%
==> Fetching hwloc
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/hwloc-2.10.0.arm64_sonoma
####################################################################################### 100.0%
==> Fetching tbb
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/tbb-2021.11.0.arm64_sonom
####################################################################################### 100.0%
==> Fetching openvino
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/openvino-2023.3.0.arm64_s
####################################################################################### 100.0%
==> Fetching rav1e
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/rav1e-0.7.1.arm64_sonoma.
####################################################################################### 100.0%
==> Fetching libsamplerate
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/libsamplerate-0.2.2.arm64
####################################################################################### 100.0%
==> Fetching flac
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/flac-1.4.3.arm64_sonoma.b
####################################################################################### 100.0%
==> Fetching mpg123
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/mpg123-1.32.4.arm64_sonom
####################################################################################### 100.0%
==> Fetching libsndfile
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/libsndfile-1.2.2.arm64_so
####################################################################################### 100.0%
==> Fetching rubberband
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/rubberband-3.3.0.arm64_so
####################################################################################### 100.0%
==> Fetching sdl2
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/sdl2-2.30.0.arm64_sonoma.
####################################################################################### 100.0%
==> Fetching speex
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/speex-1.2.1.arm64_sonoma.
####################################################################################### 100.0%
==> Fetching srt
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/srt-1.5.3.arm64_sonoma.bo
####################################################################################### 100.0%
==> Fetching svt-av1
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/svt-av1-1.8.0.arm64_sonom
####################################################################################### 100.0%
==> Fetching leptonica
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/leptonica-1.84.1.arm64_so
####################################################################################### 100.0%
==> Fetching libb2
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/libb2-0.98.1.arm64_sonoma
####################################################################################### 100.0%
==> Fetching libarchive
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/libarchive-3.7.2.arm64_so
####################################################################################### 100.0%
==> Fetching pango
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/pango-1.50.14.arm64_sonom
####################################################################################### 100.0%
==> Fetching tesseract
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/tesseract-5.3.4.arm64_son
####################################################################################### 100.0%
==> Fetching xvid
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/xvid-1.3.7.arm64_sonoma.b
####################################################################################### 100.0%
==> Fetching libsodium
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/libsodium-1.0.19.arm64_so
####################################################################################### 100.0%
==> Fetching zeromq
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/zeromq-4.3.5_1.arm64_sono
####################################################################################### 100.0%
==> Fetching zimg
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/zimg-3.0.5.arm64_sonoma.b
####################################################################################### 100.0%
==> Fetching ffmpeg
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/ffmpeg-6.1.1_3.arm64_sono
####################################################################################### 100.0%
==> Fetching libusb
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/libusb-1.0.27.arm64_sonom
####################################################################################### 100.0%
==> Fetching scrcpy
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/scrcpy-2.3.1.arm64_sonoma
####################################################################################### 100.0%
==> Installing dependencies for scrcpy: imath, libpng, aribb24, libidn2, openssl@3, glib, libbluray, cjson, libmicrohttpd, mbedtls, librist, libsoxr, libvidstab, opencore-amr, isl, mpfr, libmpc, gcc, openblas, numpy, pugixml, hwloc, tbb, openvino, rav1e, libsamplerate, flac, mpg123, libsndfile, rubberband, sdl2, speex, srt, svt-av1, leptonica, libb2, libarchive, pango, tesseract, xvid, libsodium, zeromq, zimg, ffmpeg and libusb
==> Installing scrcpy dependency: imath
==> Pouring imath-3.1.10.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/imath/3.1.10: 49 files, 939.7KB
==> Installing scrcpy dependency: libpng
==> Pouring libpng-1.6.42.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/libpng/1.6.42: 27 files, 1.3MB
==> Installing scrcpy dependency: aribb24
==> Pouring aribb24-1.0.4.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/aribb24/1.0.4: 14 files, 219.8KB
==> Installing scrcpy dependency: libidn2
==> Pouring libidn2-2.3.7.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/libidn2/2.3.7: 80 files, 1MB
==> Installing scrcpy dependency: openssl@3
==> Pouring openssl@3-3.2.1.arm64_sonoma.bottle.tar.gz

🍺  /opt/homebrew/Cellar/openssl@3/3.2.1: 6,874 files, 32MB
==> Installing scrcpy dependency: glib
==> Pouring glib-2.78.4.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/glib/2.78.4: 456 files, 22.4MB
==> Installing scrcpy dependency: libbluray
==> Pouring libbluray-1.3.4.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/libbluray/1.3.4: 21 files, 1MB
==> Installing scrcpy dependency: cjson
==> Pouring cjson-1.7.17.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/cjson/1.7.17: 23 files, 253.8KB
==> Installing scrcpy dependency: libmicrohttpd
==> Pouring libmicrohttpd-1.0.0.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/libmicrohttpd/1.0.0: 25 files, 1.5MB
==> Installing scrcpy dependency: mbedtls
==> Pouring mbedtls-3.5.2.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/mbedtls/3.5.2: 192 files, 12MB
==> Installing scrcpy dependency: librist
==> Pouring librist-0.2.10.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/librist/0.2.10: 28 files, 794.9KB
==> Installing scrcpy dependency: libsoxr
==> Pouring libsoxr-0.1.3.arm64_sonoma.bottle.1.tar.gz
🍺  /opt/homebrew/Cellar/libsoxr/0.1.3: 29 files, 323.8KB
==> Installing scrcpy dependency: libvidstab
==> Pouring libvidstab-1.1.1.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/libvidstab/1.1.1: 25 files, 187.7KB
==> Installing scrcpy dependency: opencore-amr
==> Pouring opencore-amr-0.1.6.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/opencore-amr/0.1.6: 17 files, 657.7KB
==> Installing scrcpy dependency: isl
==> Pouring isl-0.26.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/isl/0.26: 73 files, 7.6MB
==> Installing scrcpy dependency: mpfr
==> Pouring mpfr-4.2.1.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/mpfr/4.2.1: 30 files, 3MB
==> Installing scrcpy dependency: libmpc
==> Pouring libmpc-1.3.1.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/libmpc/1.3.1: 12 files, 487.8KB
==> Installing scrcpy dependency: gcc
==> Pouring gcc-13.2.0.arm64_sonoma.bottle.2.tar.gz
🍺  /opt/homebrew/Cellar/gcc/13.2.0: 1,489 files, 364.3MB
==> Installing scrcpy dependency: openblas
==> Pouring openblas-0.3.26.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/openblas/0.3.26: 23 files, 47MB
==> Installing scrcpy dependency: numpy
==> Pouring numpy-1.26.4.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/numpy/1.26.4: 1,708 files, 33.3MB
==> Installing scrcpy dependency: pugixml
==> Pouring pugixml-1.14.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/pugixml/1.14: 15 files, 487.3KB
==> Installing scrcpy dependency: hwloc
==> Pouring hwloc-2.10.0.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/hwloc/2.10.0: 967 files, 10.5MB
==> Installing scrcpy dependency: tbb
==> Pouring tbb-2021.11.0.arm64_sonoma.bottle.1.tar.gz
🍺  /opt/homebrew/Cellar/tbb/2021.11.0: 203 files, 3.2MB
==> Installing scrcpy dependency: openvino
==> Pouring openvino-2023.3.0.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/openvino/2023.3.0: 1,036 files, 99.2MB
==> Installing scrcpy dependency: rav1e
==> Pouring rav1e-0.7.1.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/rav1e/0.7.1: 14 files, 45.5MB
==> Installing scrcpy dependency: libsamplerate
==> Pouring libsamplerate-0.2.2.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/libsamplerate/0.2.2: 32 files, 3MB
==> Installing scrcpy dependency: flac
==> Pouring flac-1.4.3.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/flac/1.4.3: 284 files, 6.9MB
==> Installing scrcpy dependency: mpg123
==> Pouring mpg123-1.32.4.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/mpg123/1.32.4: 33 files, 2.0MB
==> Installing scrcpy dependency: libsndfile
==> Pouring libsndfile-1.2.2.arm64_sonoma.bottle.1.tar.gz
🍺  /opt/homebrew/Cellar/libsndfile/1.2.2: 53 files, 1MB
==> Installing scrcpy dependency: rubberband
==> Pouring rubberband-3.3.0.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/rubberband/3.3.0: 13 files, 1.7MB
==> Installing scrcpy dependency: sdl2
==> Pouring sdl2-2.30.0.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/sdl2/2.30.0: 93 files, 6.5MB
==> Installing scrcpy dependency: speex
==> Pouring speex-1.2.1.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/speex/1.2.1: 25 files, 854.8KB
==> Installing scrcpy dependency: srt
==> Pouring srt-1.5.3.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/srt/1.5.3: 20 files, 4.6MB
==> Installing scrcpy dependency: svt-av1
==> Pouring svt-av1-1.8.0.arm64_sonoma.bottle.1.tar.gz
🍺  /opt/homebrew/Cellar/svt-av1/1.8.0: 24 files, 3.9MB
==> Installing scrcpy dependency: leptonica
==> Pouring leptonica-1.84.1.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/leptonica/1.84.1: 56 files, 7.0MB
==> Installing scrcpy dependency: libb2
==> Pouring libb2-0.98.1.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/libb2/0.98.1: 8 files, 126.3KB
==> Installing scrcpy dependency: libarchive
==> Pouring libarchive-3.7.2.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/libarchive/3.7.2: 64 files, 4.0MB
==> Installing scrcpy dependency: pango
==> Pouring pango-1.50.14.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/pango/1.50.14: 68 files, 3.4MB
==> Installing scrcpy dependency: tesseract
==> Pouring tesseract-5.3.4.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/tesseract/5.3.4: 73 files, 32.8MB
==> Installing scrcpy dependency: xvid
==> Pouring xvid-1.3.7.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/xvid/1.3.7: 10 files, 1.2MB
==> Installing scrcpy dependency: libsodium
==> Pouring libsodium-1.0.19.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/libsodium/1.0.19: 77 files, 1MB
==> Installing scrcpy dependency: zeromq
==> Pouring zeromq-4.3.5_1.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/zeromq/4.3.5_1: 84 files, 6.2MB
==> Installing scrcpy dependency: zimg
==> Pouring zimg-3.0.5.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/zimg/3.0.5: 27 files, 1.1MB
Error: ffmpeg is already installed from homebrew-ffmpeg/ffmpeg!
Please `brew uninstall ffmpeg` first."
Github-Id-VampireAchao:~ achao$ brew uninstall ffmpeg
Uninstalling /opt/homebrew/Cellar/ffmpeg/6.1-with-options_3... (283 files, 48.6MB)
Github-Id-VampireAchao:~ achao$ brew install scrcpy
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/api/formula.jws.json
#=#=-#                                                                                       
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/api/cask.jws.json

==> Fetching dependencies for scrcpy: ffmpeg and libusb
==> Fetching ffmpeg
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/ffmpeg-6.1.1_3.arm64_sono
Already downloaded: /Users/achao/Library/Caches/Homebrew/downloads/91f7e7bb794aef87b7e09c4233c600cf8107e4c7a3ccec635615b23f5cac64e1--ffmpeg-6.1.1_3.arm64_sonoma.bottle.tar.gz
==> Fetching libusb
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/libusb-1.0.27.arm64_sonom
Already downloaded: /Users/achao/Library/Caches/Homebrew/downloads/72d9a224af0e0d710eae3568e678bb6dbd03287eb9ea2bd4974b7af7b23ecda1--libusb-1.0.27.arm64_sonoma.bottle.tar.gz
==> Fetching scrcpy
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/scrcpy-2.3.1.arm64_sonoma
Already downloaded: /Users/achao/Library/Caches/Homebrew/downloads/fef74da37ce3e6e6193bcdf98c8e30dd30bf2d07fe7b57422764fdd12232032b--scrcpy-2.3.1.arm64_sonoma.bottle.tar.gz
==> Installing dependencies for scrcpy: ffmpeg and libusb
==> Installing scrcpy dependency: ffmpeg
==> Pouring ffmpeg-6.1.1_3.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/ffmpeg/6.1.1_3: 284 files, 50.2MB
==> Installing scrcpy dependency: libusb
==> Pouring libusb-1.0.27.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/libusb/1.0.27: 22 files, 617.8KB
==> Installing scrcpy
==> Pouring scrcpy-2.3.1.arm64_sonoma.bottle.tar.gz
==> Caveats
At runtime, adb must be accessible from your PATH.

You can install adb from Homebrew Cask:
  brew install --cask android-platform-tools
==> Summary
🍺  /opt/homebrew/Cellar/scrcpy/2.3.1: 10 files, 349.4KB
==> Running `brew cleanup scrcpy`...
Disable this behaviour by setting HOMEBREW_NO_INSTALL_CLEANUP.
Hide these hints with HOMEBREW_NO_ENV_HINTS (see `man brew`).
==> Upgrading 2 dependents of upgraded formulae:
Disable this behaviour by setting HOMEBREW_NO_INSTALLED_DEPENDENTS_CHECK.
Hide these hints with HOMEBREW_NO_ENV_HINTS (see `man brew`).
qemu 8.2.0 -> 8.2.1, lima 0.20.0 -> 0.20.1
==> Fetching qemu
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/qemu-8.2.1.arm64_sonoma.b
####################################################################################### 100.0%
==> Fetching lima
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/lima-0.20.1.arm64_sonoma.
####################################################################################### 100.0%
==> Upgrading qemu
  8.2.0 -> 8.2.1 

==> Pouring qemu-8.2.1.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/qemu/8.2.1: 162 files, 562MB
==> Running `brew cleanup qemu`...
Removing: /opt/homebrew/Cellar/qemu/8.2.0... (162 files, 562.5MB)
Removing: /Users/achao/Library/Caches/Homebrew/qemu--8.2.0.arm64_sonoma.bottle.tar.gz... (102.3MB)
==> Upgrading lima
  0.20.0 -> 0.20.1 

==> Pouring lima-0.20.1.arm64_sonoma.bottle.tar.gz
==> Caveats
Bash completion has been installed to:
  /opt/homebrew/etc/bash_completion.d
==> Summary
🍺  /opt/homebrew/Cellar/lima/0.20.1: 107 files, 170.3MB
==> Running `brew cleanup lima`...
Removing: /opt/homebrew/Cellar/lima/0.20.0... (107 files, 170.3MB)
Removing: /Users/achao/Library/Caches/Homebrew/lima--0.20.0.arm64_sonoma.bottle.tar.gz... (50MB)
==> Checking for dependents of upgraded formulae...
==> No broken dependents found!
==> Caveats
==> scrcpy
At runtime, adb must be accessible from your PATH.

You can install adb from Homebrew Cask:
  brew install --cask android-platform-tools
==> lima
Bash completion has been installed to:
  /opt/homebrew/etc/bash_completion.d
Github-Id-VampireAchao:~ achao$ brew install android-platform-tools
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/api/formula.jws.json
####################################################################################### 100.0%
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/api/cask.jws.json
####################################################################################### 100.0%
Warning: Not upgrading android-platform-tools, the latest version is already installed
Github-Id-VampireAchao:~ achao$ sudo port install scrcpy
Password:
sudo: port: command not found
Github-Id-VampireAchao:~ achao$ scrcpy
scrcpy 2.3.1 <https://github.com/Genymobile/scrcpy>
ERROR: Multiple (2) ADB devices:
ERROR:     -->   (usb)  C7Y6R19923000299                device  HLK_AL00
ERROR:     -->   (usb)  JR8XY9EEIJGQQSJV                device  RMX3350
ERROR: Select a device via -s (--serial), -d (--select-usb) or -e (--select-tcpip)
ERROR: Server connection failed
Github-Id-VampireAchao:~ achao$ scrcpy -s C7Y6R19923000299
scrcpy 2.3.1 <https://github.com/Genymobile/scrcpy>
INFO: ADB device found:
INFO:     -->   (usb)  C7Y6R19923000299                device  HLK_AL00
INFO:           (usb)  JR8XY9EEIJGQQSJV                device  RMX3350
/opt/homebrew/Cellar/scrcpy/2.3.1/share/scrcpy/scrcpy-server: 1 file pushed, 0 skipped. 102.1 MB/s (66007 bytes in 0.001s)
[server] INFO: Device: [HUAWEI] HONOR HLK-AL00 (Android 10)
[server] WARN: Audio disabled: it is not supported before Android 11
[server] ERROR: Encoding error: android.media.MediaCodec$CodecException: Error 0xfffffc0e
[server] INFO: Retrying with -m1920...
[server] INFO: Retrying...
INFO: Renderer: metal
WARN: Demuxer 'audio': stream explicitly disabled by the device
INFO: Texture: 1080x2336
INFO: Texture: 888x1920
```

然后

![](/imgs/oss/blog-img/2024-02-10-19-07-18-image.png)
