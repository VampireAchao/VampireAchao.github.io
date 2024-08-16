---
title: 开源仓库readme对应添加空格
date: 2024-08-03 15:16:12
tags: 小技巧
---

> 俭以寡营可以立身，俭以善施可以济人。——佚名

以`ujcms`仓库举例

先找到仓库对应`readme`地址

[README.md · dromara/ujcms - Gitee.com](https://gitee.com/dromara/ujcms/blob/master/README.md)

点击右上角的原始数据，打开`F12`，将`pre`标签改为`p`标签，然后使用[为什么你们就是不能加个空格呢？](https://chromewebstore.google.com/detail/%E4%B8%BA%E4%BB%80%E4%B9%88%E4%BD%A0%E4%BB%AC%E5%B0%B1%E6%98%AF%E4%B8%8D%E8%83%BD%E5%8A%A0%E4%B8%AA%E7%A9%BA%E6%A0%BC%E5%91%A2%EF%BC%9F/paphcfdffjnbcgkokihcdjliihicmbpd)插件进行添加空格，然后将`p`标签改回`pre`标签，全选复制，回到`readme`页面点击编辑

粘贴进去，提交`pr`，编写标题

```txt
按照《中文文案排版指北》优化排版，对应添加空格
```

描述：

```markdown
按照 [中文文案排版指北](https://github.com/sparanoid/chinese-copywriting-guidelines/blob/master/README.zh-Hans.md) 优化排版，对应添加空格
```
