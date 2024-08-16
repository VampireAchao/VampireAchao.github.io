---
title: 学习uni-app官方教程
date: 2021-04-13 22:51:24
tags: 前端
---

> 生命是一条奔流不息的河，我们都是那个过河的人。——席慕蓉

[官网](https://uniapp.dcloud.io/resource)

![image-20210413225232207](/imgs/oss/picGo/image-20210413225232207.png)

我们直接实战

创建两个项目

![image-20210413225257447](/imgs/oss/picGo/image-20210413225257447.png)

![image-20210413225437389](/imgs/oss/picGo/image-20210413225437389.png)

从`hello-uniapp`中复制`common`文件夹以及`static`下面的`uni.ttf`文件到`news`项目同目录下

![image-20210413225553284](/imgs/oss/picGo/image-20210413225553284.png)

然后是复制`App.vue`中的样式库

```vue
<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* #ifndef APP-PLUS-NVUE */
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import './common/uni.css';

	/* H5 兼容 pc 所需 */
	/* #ifdef H5 */
	@media screen and (min-width: 768px) {
		body {
			overflow-y: scroll;
		}
	}

	/* 顶栏通栏样式 */
	/* .uni-top-window {
	    left: 0;
	    right: 0;
	} */

	uni-page-body {
		background-color: #F5F5F5 !important;
		min-height: 100% !important;
		height: auto !important;
	}

	.uni-top-window uni-tabbar .uni-tabbar {
		background-color: #fff !important;
	}

	.uni-app--showleftwindow .hideOnPc {
		display: none !important;
	}

	/* #endif */

	/* 以下样式用于 hello uni-app 演示所需 */
	page {
		background-color: #efeff4;
		height: 100%;
		font-size: 28rpx;
		line-height: 1.8;
	}

	.fix-pc-padding {
		padding: 0 50px;
	}

	.uni-header-logo {
		padding: 30rpx;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 10rpx;
	}

	.uni-header-image {
		width: 100px;
		height: 100px;
	}

	.uni-hello-text {
		color: #7A7E83;
	}

	.uni-hello-addfile {
		text-align: center;
		line-height: 300rpx;
		background: #FFF;
		padding: 50rpx;
		margin-top: 10px;
		font-size: 38rpx;
		color: #808080;
	}

	/* #endif*/
</style>
```

新闻列表页面代码`index.vue`

![image-20210414214020469](/imgs/oss/picGo/image-20210414214020469.png)

```vue
<template>
	<view class="content">
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in news" :key="index">
				<!-- <navigator url="../info/info"> -->
				<view @tap="openInfo" :data-newsid="item.post_id" class="uni-list-cell">
					<image class="uni-media-list-logo" :src="item.author_avatar"></image>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{item.title}}</view>
						<view class="uni-media-list-text-bottom uni-ellipsis">{{item.created_at}}</view>
					</view>
				</view>
				<!-- </navigator> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				news: []
			}
		},
		onLoad() {
			uni.showLoading({
				title: '加载中...'
			});
			uni.request({
				url: 'https://unidemo.dcloud.net.cn/api/news',
				method: 'GET',
				data: {},
				success: res => {
					console.log(res)
					this.news = res.data
					uni.hideLoading()
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods: {
			openInfo(e) {
				var newsid = e.currentTarget.dataset.newsid;
				console.log(newsid);
				uni.navigateTo({
					url: '../info/info?newsid=' + newsid
				});
			}
		}
	}
</script>

<style>
	.uni-media-list-body {
		height: auto;
	}

	.uni-media-list-text-top {
		list-style: 1.6em;
	}
</style>
```

然后在`pages`下新建详情页

![image-20210413230629772](/imgs/oss/picGo/image-20210413230629772.png)

![image-20210413230650523](/imgs/oss/picGo/image-20210413230650523.png)

然后编写`info.vue`

```vue
<template>
	<view class="content">
		<view class="title">{{title}}</view>
		<view class="art-content">
			<rich-text class="richText" :nodes="strings"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				strings: ''
			}
		},
		onLoad: function(e) {
			uni.showLoading({
				title: '加载中...'
			});
			uni.request({
				url: 'https://unidemo.dcloud.net.cn/api/news/36kr/' + e.newsid,
				method: 'GET',
				data: {},
				success: res => {
					console.log(res)
					this.title = res.data.title
					this.strings = res.data.content
					uni.hideLoading()
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		padding: 10upx 2%;
		width: 96%;
		flex-wrap: wrap;
	}

	.title {
		line-height: 2em;
		font-weight: 700;
		font-size: 38upx;
	}

	.art-content {
		list-style: 2em;
	}
</style>
```

最后

![image-20210413230839110](/imgs/oss/picGo/image-20210413230839110.png)

效果

![image-20210413230911621](/imgs/oss/picGo/image-20210413230911621.png)

详情

![image-20210413230939595](/imgs/oss/picGo/image-20210413230939595.png)