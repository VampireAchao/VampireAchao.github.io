---
title: uniapp播放音频
date: 2021-12-02 20:41:34
tags: 前端
---

> 人们不太看重自己的力量——这就是他们软弱的原因。——高尔基

播放音频的代码很简单：

```vue
const innerAudioContext = uni.createInnerAudioContext();
		innerAudioContext.src = '/imgs/oss/picGo/kuangstudy9664a946-42a5-4111-80e7-65e735932ef7.wav';
		innerAudioContext.play();
```

官方文档：

https://uniapp.dcloud.io/api/media/audio-context

除了播放、暂停、停止等也都能实现

完整代码：

```vue
<template>
	<view class="content">
		<image :class="{ widther: play }" class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{ title }}</text>
		</view>
		<navigator :class="{ widther: play }" url="/pages-user/list">user-list</navigator>
		<navigator :class="{ widther: play }" url="/pages-news/list">news-list</navigator>
		<view>{{ val }}</view>

		<view @tap="parentEvent"><view @tap.stop="childEvent">触发触发</view></view>
		<view @tap="parentEvent"><view @touchend="childEvent">触发触发</view></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: 'Hello',
			play: false,
			val: 0
		};
	},
	onLoad() {
		const innerAudioContext = uni.createInnerAudioContext();
		innerAudioContext.src = '/imgs/oss/picGo/kuangstudy9664a946-42a5-4111-80e7-65e735932ef7.wav';
		innerAudioContext.play();
		setTimeout(() => (this.play = true), 1000);
		uni.$on('add', this.add);
	},
	methods: {
		add(e) {
			console.log('主页的add被触发了！: ', e);
			this.val += e.data;
		},
		parentEvent(e) {
			console.log('parentEvent');
		},
		childEvent(e) {
			console.log('childEvent');
			e.stopPropagation();
		}
	}
};
</script>

<style>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.logo {
	height: 0;
	width: 0;
	/* #ifndef APP-PLUS-NVUE */
	transition: all 1s;
	/* #endif */
	/* #ifdef APP-PLUS-NVUE */
	transition: width, height 1s;
	/* #endif */
}

.text-area {
	display: flex;
	justify-content: center;
}

.title {
	font-size: 36rpx;
	color: #8f8f94;
}
.widther {
	width: 200rpx;
	height: 200rpx;
}
</style>
```

