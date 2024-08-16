---
title: vue中新增属性视图问题
date: 2022-01-28 09:58:54
tags: 前端
---

> 计利当计天下利，求名应求万世名——于右任

我们在进行`vue`前端开发的时候，可能会遇到这种情况：

首先我们此处双向绑定了一个变量中的属性

```vue
<template>
	<div>
		<div>{{ myObject.newProperty }}</div>
	</div>
</template>
```

然后下面的`data`只有该对象变量，并无此属性

```vue
<script>
export default {
	data() {
		return {
			myObject: {}
		};
	}
</script>
```

此时我们调用一个方法，给它的新增变量赋值

```javascript
this.myObject.newProperty = 'ruben';
```

可以看到外部是并未监听到，视图没有更新，导致我们页面没渲染上去该变量属性的值

此处我们当然可以使用[`vm.$forceUpdate`](https://cn.vuejs.org/v2/api/#vm-forceUpdate)去强制更新当前页面的视图，更新后固然变量成功绑定

实际上官方文档为我们提供了另一种方法：

[`vm.$set`](https://cn.vuejs.org/v2/api/#Vue-set)

该方法可以实现

> 向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新 property

简单来说，就是能将新增的变量同样给双向绑定

我们试一试：

```javascript
this.$set(this.myObject, 'newProperty', 'ruben');
```

不错，的确更新了视图，完成了新增变量的双向绑定(懒得录制效果做`gif`啦)