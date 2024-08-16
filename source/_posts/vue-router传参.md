---
title: vue-router传参
date: 2021-04-17 19:49:31
tags: 前端
---

> 生命是一张弓，那弓弦是梦想。——罗曼·罗兰

[官网](https://router.vuejs.org/zh/)

[之前我们配置过路由](https://VampireAchao.github.io/2020/09/03/vue2-0%E9%85%8D%E7%BD%AE%E8%B7%AF%E7%94%B1/)，这里就不多赘述如何配置了

我们聊聊如何传参

我们之前使用方式如下

```vue
this.$router.push(page);
```

这里`page`为`path`，值为我们在`router`的`index.js`中配的`/message/message`

![image-20210417202522258](/imgs/oss/picGo/image-20210417202522258.png)

我们如果需要传参

则可以使用下面这种方式

```vue
				this.$router.push({
					name: pageName,
					params: {
						userId: '123'
					},
					query: {
						plan: 'private'
					}
				});
```

注意这里`pageName`是我们在路由中配置的`name`而不再是`path`了，因为`path`和`params`一起用会导致`params`为空对象

![image-20210417202810296](/imgs/oss/picGo/image-20210417202810296.png)

按照我们上面写的，我们跳转到`message`页面去了

```vue
<template>
	<div>
		{{$route.params.userId}}
		{{$route.query.plan}}
	</div>
</template>

<script>
	export default {
		created() {
			console.log(this.$route)
		}
	}
</script>

<style>
</style>
```

我们看一下`message`页面

![image-20210417203104613](/imgs/oss/picGo/image-20210417203104613.png)
