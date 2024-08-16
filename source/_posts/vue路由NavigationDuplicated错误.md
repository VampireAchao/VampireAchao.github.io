---
title: vue路由NavigationDuplicated错误
date: 2020-11-26 19:50:04
tags: 前端
---

> 

> 有志者，事竟成，破釜沉舟，百二秦关终属楚；苦心人，天不负，卧薪尝胆，三千越甲可吞吴。——蒲松龄

如果遇到了`Uncaught (in promise) NavigationDuplicated: Avoided redundant navigation to current location`异常

![image-20201126195651120](/imgs/oss/picGo/image-20201126195651120.png)

可以在`router`里配置一下

![image-20201126200028440](/imgs/oss/picGo/image-20201126200028440.png)

```javascript
import Vue from 'vue'
import Router from 'vue-router'

// 解决路由重复问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {path: '*', redirect: {name: '404'}},
        {path: '/', redirect: {name: 'home'}},
        {path: '/404', name: '404', component: resolve => require(['../views/common/404.vue'], resolve)},
        {path: '/home', name: 'home', component: resolve => require(['../views/sys/home.vue'], resolve)}
    ]
})
```

