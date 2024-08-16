---
title: psd脚本坑
date: 2023-07-28 22:09:12
tags: 前端
---

> 爱情可意会，不可言传——佚名

[psd的js脚本 | 阿超](https://VampireAchao.github.io/2023/07/24/psd%E7%9A%84js%E8%84%9A%E6%9C%AC/)

问题出在我在编写一个执行`psd`脚本的脚本时

大概代码如下：

```javascript
for (var i = 0; i < files.length; i++) {
    $.evalFile(files[i])
}
```

问题来了，这里的`i`在`files[i]`对应这个脚本里也用到了`i`变量

结果等我`debug`发现，其变量收到了污染。。。

`i`等执行完毕这个脚本后变成了循环预期外的值

换个变量即可
