---
title: js as关键字
date: 2023-06-08 20:53:08
tags: 前端
---

> 统治别人，一定要为别人谋幸福。——莫泊桑

分享一个在`export`以及 `import`使用的 `as`关键字

https://es6.ruanyifeng.com/#docs/module#export-%E5%91%BD%E4%BB%A4

https://es6.ruanyifeng.com/#docs/module#import-%E5%91%BD%E4%BB%A4

这里就不多多赘述简单使用，介绍一个特别的场景：

例如这里有一个`js`文件

```javascript
export function myFunc()

export function yourFunc()
```

针对这个`js`文件`export`的两个方法，由于没有`export default`

因此不能使用

```javascript
import MyJs from 'my.js'
```

而是只能使用

```javascript
import { myFunc, yourFunc } from 'my.js'
```

但是通过`as`关键字，则可以

```javascript
import * as MyJs from 'my.js'
```

然后就可以使用`Myjs.myFunc()`调用啦

