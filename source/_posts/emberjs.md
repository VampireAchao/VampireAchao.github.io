---
title: emberjs
date: 2023-11-15 08:49:53
tags: 前端
---

> 合抱之木，生于毫末；九层之台，起于累土；千里之行，始于足下。——老子

分享一个`js`框架

https://emberjs.com/

Ember.js 是一个高效的、经过实战考验的 JavaScript 框架，用于构建现代 Web 应用程序。它包括构建可在任何设备上运行的丰富 UI 所需的一切。

它的语法：

```javascript
import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  async model() {
    return {
      title: 'Grand Old Mansion'
    };
  }
}
```

对应的页面

```hbs
<h1>{{@model.title}}</h1>
```

使用的是`.hbs`后缀的模板文件，语法和`vue`有些异曲同工之妙，是一个很值得学习的库

其`emberjs`约定大于配置，对于大多数场景，只需要按照约定，即可简化配置的设计理念和`vuejs`有本质的区别
