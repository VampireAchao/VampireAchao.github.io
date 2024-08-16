---
title: cargo配置镜像源
date: 2022-02-09 18:02:14
tags: rust
---

> 活着不一定要鲜艳，但一定要有自己的颜色。——张曙光

找到目录`C:\Users\你的用户\.cargo`

下面新建一个文件`config`

![image-20220209181134231](/imgs/oss/picGo/image-20220209181134231.png)

填入以下内容：

```config
[source.crates-io]
registry = "https://github.com/rust-lang/crates.io-index"
replace-with = 'ustc'
[source.ustc]
registry = "git://mirrors.ustc.edu.cn/crates.io-index"
```

![image-20220209181231337](/imgs/oss/picGo/image-20220209181231337.png)

保存即可