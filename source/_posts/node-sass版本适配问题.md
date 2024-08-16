---
title: node-sass版本适配问题
date: 2023-12-15 00:52:21
tags: 前端
---

> 一个人几乎可以在任何他怀有无限热忱的事情上成功。 ——查尔斯·史考伯

今天发现`node14`安装不上`node-sass`

原来是有个更新日志对照表，针对`mac`，版本号对照如下：

https://github.com/sass/node-sass/releases/tag/v4.14.1

> ### Community
> 
> - Add GitHub Actions for Alpine CI ([@nschonni](https://github.com/nschonni), [#2823](https://github.com/sass/node-sass/pull/2823))
> 
> ### Fixes
> 
> - Bump sass-graph@2.2.5 ([@xzyfer](https://github.com/xzyfer), [#2912](https://github.com/sass/node-sass/issues/2912))
> 
> ## Supported Environments
> 
> | OS           | Architecture | Node                                                                         |
> | ------------ | ------------ | ---------------------------------------------------------------------------- |
> | Windows      | x86 & x64    | 0.10, 0.12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14                    |
> | OSX          | x64          | 0.10, 0.12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14                    |
> | Linux*       | x86 & x64    | 0.10, 0.12, 1, 2, 3, 4, 5, 6, 7, 8**, 9**, 10**^, 11**^, 12**^, 13**^, 14**^ |
> | Alpine Linux | x64          | 6, 8, 10, 11, 12, 13, 14                                                     |
> | FreeBSD      | i386 amd64   | 10, 12, 13                                                                   |
> 
> *Linux support refers to Ubuntu, Debian, and CentOS 5+  
> ** Not available on CentOS 5  
> ^ Only available on x64
