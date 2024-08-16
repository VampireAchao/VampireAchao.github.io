---
title: js日期库moment
date: 2024-07-24 18:15:52
tags: 前端
---

> 健全的身体比金子还珍贵，强壮的体魄比享用不尽的财富还有价值。——佚名

https://github.com/moment/moment

用于解析、验证、操作和格式化日期的 JavaScript 日期库。

文档：

[Moment.js | Docs](https://momentjs.com/docs/)

使用非常简单

```
npm install moment
```

```javascript
var moment = require('moment'); // require
moment().format(); 
```

或者

```javascript
import moment from 'moment';
moment().format();
```

解析时间

```javascript
var day = moment("1995-12-25");
```

格式化时间：

```javascript
moment("12-25-1995", "MM-DD-YYYY");
```
