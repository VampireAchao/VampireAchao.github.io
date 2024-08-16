---
title: js文件名排序
date: 2023-04-14 22:27:14
tags: 前端
---

> 处人不可任己意，要悉人之情；处事不可任己见，要悉事之理。——吕坤

分享一个今天写的简单的文件名排序

```javascript
function fileNameCompare(a, b) {
    if (a == null || b == null) return 0;
    let na = a.split(/[-_.—, (]/)
    let nb = b.split(/[-_.—, (]/)
    let maxLoop = Math.max(na.length, nb.length)
    for (let i = 0; i < maxLoop; i++) {
        if (!isNaN(Number(na[i])) && !isNaN(Number(nb[i]))) {
            let num = Number(na[i]) - Number(nb[i])
            if (num !== 0) {
                return num
            }
        }
    }
    let ma = a.match(/[0-9]+/)
    let mb = b.match(/[0-9]+/)
    if (ma.length && mb.length) {
        let num = Number(ma[0]) - Number(mb[0])
        if (num !== 0) {
            return num
        }
    }
    return a.localeCompare(b)
}

// 使用:
let arr =
    [
        {name: '28-01_00.jpg'}
        , {name: '28-01_01.jpg'}
        , {name: '28-03_01.jpg'}
        , {name: '28-03_03.jpg'}
        , {name: '28-02_01.jpg'}
        , {name: '文件名1 (1).jpg'}
        , {name: '文件名10.jpg'}
        , {name: '文件名2.jpg'}
        , {name: '文件名1.jpg'}
        , {name: undefined}
        , {name: '文件名1 (1) - 副本.jpg'}
    ].sort((a, b) => fileNameCompare(a.name, b.name))
console.log(arr)
```

效果：

![image-20230414223157956](/imgs/oss/blog/vampireachao/image-20230414223157956.png)