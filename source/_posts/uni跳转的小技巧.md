---
title: uni跳转的小技巧
date: 2021-05-28 18:45:04
tags: 前端
---

> 青春啊，难道你始终囚禁在狭小圈子里？你得撕破老年的蛊惑人心的网。——泰戈尔

从[官网](https://uniapp.dcloud.io/api/router?id=redirectto)看到

我们使用`uni.navigate()`跳转

```vue
uni.navigateTo({
    url: 'test?id=1&name=uniapp'
});
```

这里我们的`url`我们如果直接写`test`

那么我们会跳转到当前页面的`test`

然而我们如果想跳转到`tabBar`上的页面

则需要使用`uni.switchTab()`

```vue
uni.switchTab({
    url: '/pages/index/index'
});
```

这里要注意的是，需要在路径前加`/`表示一个根路径

否则会跳转不到想要的页面

而且`switchTab`并不支持`url`传参

而我们需要使用别的方式，例如[setStorage](https://uniapp.dcloud.io/api/storage/storage?id=setstorage)

