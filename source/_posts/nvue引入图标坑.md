---
title: nvue引入图标坑
date: 2021-10-29 19:17:49
tags: 前端
---

> 强本而节用，则天不能贫。——荀况

今天把原来的`vue`页面改为`nvue`

发现之前的图标怎么都引不进去，搞了半天，后来通过`debug`发现，我引入的方式是使用添加对应的`class`给它加了个`::before`伪元素

![image-20211029192024215](/imgs/oss/picGo/image-20211029192024215.png)

知道了这个就很简单了，我们按照[官方文档引入字体](https://uniapp.dcloud.io/nvue-api?id=addrule)

首先我在`App.vue`中写入`css`代码：

```css
/* 加载图标字体 - 条件编译模式 */
/* #ifdef APP-PLUS-NVUE */
.my-iconfont {
	font-family: myIconfont;
}
/* #endif */
```

然后在对应的`nvue`页面中，在`beforeCreate`生命周期里调用`addRule`

```javascript
	beforeCreate() {
		// #ifdef APP-PLUS-NVUE
		const domModule = uni.requireNativePlugin('dom');
		domModule.addRule('fontFace', {
			fontFamily: 'myIconfont',
			src: "url('/iconfont/iconfont.ttf')"
		});
		// #endif
	},
```

然后最重要的就是我们引入的`icon`需要是这样写：

```vue
<text class="my-iconfont">&#xe7b3;</text>
```

说实话，感觉`nvue`坑好多。。。
