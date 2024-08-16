---
title: uniapp清除缓存
date: 2021-08-14 19:33:54
tags: 前端
---

> 每一幅作品，都是艺术家对自己生命的延伸。——灵遁者

清楚缓存的函数为`uni.clearStorage();`

[文档](https://uniapp.dcloud.io/api/storage/storage?id=clearstorage)

以及还有计算缓存大小的函数

```vue
uni.getStorageInfo({
    success: function (res) {
        console.log(res.keys);
        console.log(res.currentSize);
        console.log(res.limitSize);
    }
});
```

**success 返回参数说明**

| 参数        | 类型            | 说明                         |
| :---------- | :-------------- | :--------------------------- |
| keys        | Array＜String＞ | 当前 storage 中所有的 key    |
| currentSize | Number          | 当前占用的空间大小, 单位：kb |
| limitSize   | Number          | 限制的空间大小, 单位：kb     |

[文档](https://uniapp.dcloud.io/api/storage/storage?id=getstorageinfo)

