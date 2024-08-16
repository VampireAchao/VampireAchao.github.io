---
title: uniapp阻止navigator冒泡
date: 2021-07-25 23:30:41
tags: 前端
---

> 作为一个人，要是不经历过人世上的悲欢离合，不跟生活打过交手仗，就不可能懂得人生的意义。——杨朔

代码如下

```vue
<template>
	<view>
		<view class="navigators">
			<view class="parent-navigator" @tap="parentEvent()">
				上层，打印语句
				<navigator class="child-navigator" url="/pages/test/test">内层，回到/pages/test/test页面</navigator>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		parentEvent() {
			console.log('parentEvent');
		}
	}
};
</script>
<style scoped>
.parent-navigator {
	width: 400rpx;
	height: 400rpx;
	background-color: #8e8e8e;
}
.child-navigator {
	width: 200rpx;
	height: 200rpx;
	background-color: #e8e8e8;
}
</style>
```

这里我们点击内层的`navigator`会触发外层的`@tap`事件

![image-20210725233415676](/imgs/oss/picGo/image-20210725233415676.png)

我们可以加一个`catchtap`即可阻止冒泡

```vue
<template>
	<view>
		<view class="navigators">
			<view class="parent-navigator" @tap="parentEvent()">
				上层，打印语句
				<navigator class="child-navigator" catchtap url="/pages/test/test">内层，回到/pages/test/test页面</navigator>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		parentEvent() {
			console.log('parentEvent');
		}
	}
};
</script>
<style scoped>
.parent-navigator {
	width: 400rpx;
	height: 400rpx;
	background-color: #8e8e8e;
}
.child-navigator {
	width: 200rpx;
	height: 200rpx;
	background-color: #e8e8e8;
}
</style>
```

