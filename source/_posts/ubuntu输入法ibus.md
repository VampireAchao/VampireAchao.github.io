---
title: ubuntu输入法ibus
date: 2024-01-01 07:46:25
tags: 软件及插件
---

> 人生的旅程就是这样，用大把时间迷茫，在几个瞬间成长。——瑞卡斯

IBus 全称 Intelligent Input Bus是下一代输入法框架（或者说“平台”）。 项目现托管于 Google Code - https://code.google.com/p/ibus/ 此项目包含了世界多数语言的文字输入需求——由世界多个国家开发者维护。

https://wiki.ubuntu.org.cn/IBus

### 安裝IBus框架：

在终端输入命令:  

```bash
sudo apt-get install ibus ibus-clutter ibus-gtk ibus-gtk3 ibus-qt4
```

### 启用IBus框架：

在终端输入:  

```bash
im-switch -s ibus
```

重新启动X（也可以重启电脑）

### 安装拼音引擎：

在终端输入:  

```bash
sudo apt-get install ibus-pinyin
```

设置ibus-pinyin，在终端输入:  

```bash
/usr/lib/ibus-pinyin/ibus-setup-pinyin
```

安装sunpinyin模块，在终端输入:  

```bash
sudo apt-get install ibus-sunpinyin
```

设置ibus-sunpinyin，在终端输入:  

```bash
/usr/lib/ibus-sunpinyin/ibus-setup-sunpinyin
```

### 安装五笔引擎：

在终端输入:  

```bash
sudo apt-get install ibus-table-wubi
```

### 设置IBus框架：

在终端输入:  

```bash
ibus-setup
```

### Kubuntu下使用IBus：

在终端输入:  

```bash
sudo apt-get install gnome-icon-theme
```

其他同上

### 找回消失的IBus图标：

在终端输入:  

```bash
ibus-daemon -drx
```

### 其他语言输入法：

安装 ibus-m17n 包即可。

```bash
sudo apt-get install ibus-m17n
```

这个软件包包含了几乎所有除了英语，中日韩等的其他输入法，如：阿拉伯语，阿姆哈拉语，阿萨姆语，阿萨帕斯坎诸语，奥杰布瓦语，白俄罗斯语，波斯语，藏语，傣语，丹麦语，迪维希语，俄语，法语，梵语，高棉语，格鲁吉亚语，古典希腊语，古吉拉特语，哈萨克语，捷克语，卡纳达语，克里语，克罗地亚语，克什米尔语，老挝语，马拉提语，马拉雅拉姆语，孟加拉语，缅甸语，尼泊尔语，旁遮普语，普什图语，日语，瑞典语，瑞典，塞尔维亚语，僧加罗语，世界语，斯洛伐克语，四川彝族语，泰卢固语，泰米尔语，泰语，维吾尔语，乌兹别克语，乌尔都语，希伯来语，现代希腊语，信德语，亚美尼亚语，伊努伊特语，依地语，印地语，越南，占语，朝鲜，latex输入特殊符号，input-pad等。

如果您使用的是 fcitx，请安装相应的包。

```bash
sudo apt-get install fcitx-m17n
```
