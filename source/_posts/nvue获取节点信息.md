---
title: nvue获取节点信息
date: 2021-12-14 20:02:06
tags: 前端
---

> 我们生活在阴沟里，但依然有人仰望星空。——王尔德

在`nvue`中我们获取节点信息就需要如下写法：

```vue
<template>
	<view ref="list-parent" class="ruben">
		<list>
			<cell><view>阿超</view></cell>
		</list>
	</view>
</template>

<script>
const dom = weex.requireModule('dom');
export default {
	data() {
		return { index: 1 };
	},
	mounted() {
		console.log('mounted');
		dom.getComponentRect(this.$refs['list-parent'], res => {
			console.log('list res: ', res);
		});
		dom.getComponentRect('viewport', res => {
			console.log('viewport res: ', res);
		});
	},
	methods: {}
};
</script>

<style scoped>
.ruben {
	height: 200px;
	width: 200px;
}
</style>
```

此处打印结果：

![image-20211214200724405](/imgs/oss/picGo/image-20211214200724405.png)

对应官方文档：

https://uniapp.dcloud.io/nvue-api?id=dom

https://uniapp.dcloud.io/nvue-api?id=getcomponentrect