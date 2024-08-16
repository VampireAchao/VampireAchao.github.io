---
title: windows文件资源管理器排序
date: 2023-08-01 21:25:35
tags: java
---

> 单独一个人可以灭亡的地方，两个人在一起可能得救。——巴尔扎克

今天做一个需求：按照`windows`文件资源管理器的排序规则进行文件排序

但我在研究过程中，发现了一丝不妙，这玩意儿的规则比我想的复杂

自己之前写了一版

[js文件名排序 | 阿超](https://VampireAchao.github.io/2023/04/14/js%E6%96%87%E4%BB%B6%E5%90%8D%E6%8E%92%E5%BA%8F/)

但是感觉不特别满意，于是到处去搜了搜

发现微软的`vscode`的一个相关的`issue`，指出文件资源管理器和`vscode`中的排序发生了不一致

https://github.com/microsoft/vscode/issues/27759

然后我大概找到了`vscode`里的文件名排序`js`源码：

https://github.com/microsoft/vscode/blob/main/src/vs/base/common/comparers.ts#L157

感觉还行，但我又发现一位朋友曾经写过的`java`版本的，就直接拿来用了

https://github.com/kookob/windows-filename-sort

效果还不错，勉强满足了需求`hh`
