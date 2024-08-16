---
title: introjs
date: 2022-08-24 18:20:09
tags: 前端
---

> 爱情沉默的地方，责任就要起作用——歌德

`introjs`是一个前端指引库

官网：https://introjs.com/

`github`：https://github.com/usablica/intro.js

![image-20220824182155033](/imgs/oss/blog/image-20220824182155033.png)

用法也很简单：

引入：

```shell
npm install intro.js --save
yarn add intro.js
```

或者

```http
https://unpkg.com/intro.js/minified/intro.min.js
https://unpkg.com/intro.js/minified/introjs.min.css
```

使用：

```javascript
introJs().setOptions({
  steps: [{
    intro: "Hello world!"
  }, {
    element: document.querySelector('#login'),
    intro: "Click here to login!"
  }]
}).start();
```

其对非商业项目免费

![image-20220824182442282](/imgs/oss/blog/image-20220824182442282.png)