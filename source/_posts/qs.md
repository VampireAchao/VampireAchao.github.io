---
title: qs
date: 2023-08-28 11:19:25
tags: 前端
---

> 与情人的小冲突，常常要靠温存、沉默和忍耐来解决，而说理往往无济于事。——安德烈·莫洛亚

分享一个前端库`qs`

https://github.com/ljharb/qs

主要是用于请求参数和对象的互转

```javascript
var qs = require('qs');
var assert = require('assert');

var obj = qs.parse('a=c');
assert.deepEqual(obj, { a: 'c' });

var str = qs.stringify(obj);
assert.equal(str, 'a=c');
```

![](/imgs/oss/picGo/20230828113249.png)
