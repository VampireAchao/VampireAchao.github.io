---
title: 在uniapp中引入地图
date: 2021-07-26 22:15:31
tags: 前端
---

> 在我的后园，可以看见墙外有两株树，一株是枣树，还有一株也是枣树。这上面的夜的天空，奇怪而高，我生平没有见过这样奇怪而高的天空，他仿佛要离开人间而去，使人们仰面不再看见。——鲁迅《秋夜》

直接使用`uniapp`自带的`map`组件即可

文档：https://uniapp.dcloud.io/component/map

代码如下

```vue
<template>
	<view>
		<view class="map-parent"><map style="width: 100%; height: 300px;" :latitude="latitude" :longitude="longitude" :markers="covers"></map></view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			latitude: 39.909,
			longitude: 116.39742,
			covers: [
				{
					latitude: 39.909,
					longitude: 116.39742,
					iconPath: '/static/images/location.png',
					width: 40,
					height: 40
				}
			]
		};
	}
};
</script>
```

我这里包含一个图片

![image-20210726221742400](/imgs/oss/picGo/image-20210726221742400.png)

放到这里啦

![123](/imgs/oss/picGo/location.png)

最终效果如下

![image-20210726221849977](/imgs/oss/picGo/image-20210726221849977.png)
