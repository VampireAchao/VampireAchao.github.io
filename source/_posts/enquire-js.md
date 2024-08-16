---
title: enquire.js
date: 2023-01-16 20:53:32
tags: 前端
---

> 非我而当者，吾师也；是我而当者，吾友也；谄谀我者，吾贼也——荀子

分享一个在`js`中使用媒体查询的封装：

https://github.com/WickyNilliams/enquire.js

我们只需要安装

```shell
cnpm install enquire.js
```

即可像这样使用：

```javascript
enquire.register("screen and (max-width:1000px)", {

    match : function() {},      // OPTIONAL
                                // If supplied, triggered when the media query transitions
                                // *from an unmatched to a matched state*

    unmatch : function() {},    // OPTIONAL
                                // If supplied, triggered when the media query transitions
                                // *from a matched state to an unmatched state*.
                                // Also may be called when handler is unregistered (if destroy is not available)

    setup : function() {},      // OPTIONAL
                                // If supplied, triggered once immediately upon registration of the handler

    destroy : function() {},    // OPTIONAL
                                // If supplied, triggered when handler is unregistered. Place cleanup code here

    deferSetup : true           // OPTIONAL, defaults to false
                                // If set to true, defers execution the setup function
                                // until the media query is first matched. still triggered just once
});
```

