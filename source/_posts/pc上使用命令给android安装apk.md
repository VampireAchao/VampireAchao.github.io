---
title: pc上使用命令给android安装apk
date: 2024-02-23 21:22:01
tags: android
---

> 不守人之功，不鄙人之能。——晏子

`adb install` 命令用于通过 Android Debug Bridge (ADB) 将应用程序（通常是 APK 文件）安装到连接的 Android 设备或模拟器上。这是 Android 应用开发和测试过程中常用的命令，允许开发者直接从开发环境将应用安装到设备上。

### 使用方法

基本语法：

```
adb install [options] <path_to_apk>
```

其中 `<path_to_apk>` 是 APK 文件在计算机上的路径。

### 参数（Options）

`adb install` 命令支持多个选项，可以修改安装行为：

- `-l`: 将应用安装到保护目录下。
- `-r`: 重新安装现有应用，保留其数据。
- `-t`: 允许安装测试 APK。
- `-s`: 将应用安装到 SD 卡。
- `-d`: 允许降级覆盖安装。
- `-g`: 授予所有运行时权限。
- `--abi <ABI>`: 强制使用指定的 ABI 进行安装。这在你的 APK 支持多种 ABI，但设备支持的 ABI 不是 APK 的默认 ABI 时很有用。
- `--instant`: 将应用作为 Instant App 安装。
- `--no-streaming`: 通过 USB 安装大 APK 时不使用流式传输。
- `--fastdeploy`: 使用 Fast Deploy 更新应用。
- `--incremental`: 使用增量更新安装 APK。
- `--force-agent`: 使用 Fast Deploy 强制使用安装代理，即使 APK 没有改变。
- `--no-restart`: 安装 APK 后不重启应用。
- `--no-cache`: 安装应用时不使用安装器缓存。
- `--force-queryable`: 安装不可查询的应用。
- `--wait`: 安装完成后等待，直到设备准备就绪。

### 示例

安装 APK：

```bash
adb install /App/MyApp.apk
```

重新安装 APK 并保留数据：

```bash
adb install -r MyApp.apk
```

安装 APK 并授予所有权限：

```bash
adb install -g MyApp.apk
```
