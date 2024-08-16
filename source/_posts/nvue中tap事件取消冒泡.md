---
title: nvue中tap事件取消冒泡
date: 2021-12-01 19:35:51
tags: 前端
---

> 青春是一种持续的陶醉，是理智的狂热。——拉罗什富科

`nvue`中`@tap.stop`阻止冒泡失效了

代码如下：

```vue
<view @tap="parentEvent"><view @tap.stop="childEvent">触发触发</view></view>
```

大概有两种方案，第一种是改事件，改为`@touchend`事件

```vue
<view @tap="parentEvent"><view @touchend="childEvent">触发触发</view></view>
```

不过还有另一种方式

```javascript
parentEvent(e) {
	console.log('parentEvent');
},
childEvent(e) {
	console.log('childEvent');
	e.stopPropagation();
}
```

