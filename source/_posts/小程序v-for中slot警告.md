---
title: 小程序v-for中slot警告
date: 2022-01-17 20:16:08
tags: 前端
---

> 她把左手的命运交给了右手，右手犹豫了一下，还是接住了。——宫白云

今天用了这样一个组件：

```vue
<template>
	<div>
		<div v-for="(item, index) in list">
			<slot :item="item" />
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: {
		list: {
			type: Array,
			default: []
		}
	}
};
</script>

<style></style>
```

这里在`v-for`中放了`slot`

所以我在另一个页面使用的时候，小程序警告

```shell
VM1103 WAService.js:2 [Component] slot "" duplication is found under a single shadow root. The first one was accepted.
```

![image-20220117202902380](/imgs/oss/picGo/image-20220117202902380.png)

最后不得不降级基础版本库才去除警告。。。

![image-20220117203148922](/imgs/oss/picGo/image-20220117203148922.png)

改到`2.18.0`以下即可

![image-20220117203309221](/imgs/oss/picGo/image-20220117203309221.png)

然后就没有刚才那个警告了

![image-20220117203614948](/imgs/oss/picGo/image-20220117203614948.png)

剩下的警告和报错

```shell
[WXML Runtime warning] ./components/tabbar/tabbar.wxml
 Now you can provide attr `wx:key` for a `wx:for` to improve performance.
> 1 | <view class="_div"><block wx:for="{{$root.l0}}" wx:for-item="item" wx:for-index="index"><view class="_div"><slot></slot><scoped-slots-default item="{{item.$orig}}" class="scoped-ref" bind:__l="__l"></scoped-slots-default></view></block></view>
    |         
```

这个可以在`v-for`上加一个`key`，就可以去掉了

![image-20220117203831724](/imgs/oss/picGo/image-20220117203831724.png)

剩下的报错是因为没有配置`appId`