---
title: vue深度监听
date: 2021-09-16 19:47:43
tags: 前端
---

>  放纵自己的欲望是最大的祸害；谈论别人的隐私是最大的罪恶；不知自己的过失是最大的病痛——亚里士多德

我们有时使用`vue`的`watch`，可能要对一个对象的多个属性进行监听

这样我们就可以使用深度监听

```vue
<template>
	<view>
	</view>
</template>

<script>
//	11位手机号码正则
const REGEXP_TEL = /^((1[3,5,8,7,9,6][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
export default {
	data() {
		return {
			// 表单数据存储
			formData: {
				username: '',
                password: ''
			}
		};
	},
	watch: {
		formData: {
			handler: 'cutValue',
			deep: true
		}
	},
	methods: {
		// 监听formData
		cutValue() {
			console.log(this.formData);
		}
	}
};
</script>

<style scoped>
</style>

```

当我们的`formData.username`或者`formData.password`发生变化时，就会调用`cutValue`函数，打印我们的`formData`

