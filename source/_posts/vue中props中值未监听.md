---
title: vue中props中值未监听
date: 2022-01-29 12:38:07
tags: 前端
---

> 每段记忆都是零碎的，犹如残破的蛛丝，无声无息的藏在黑暗的角落里——桐华

我今天简短测试了一下：

编写一个组件，给它设置一个`props`属性`user`

这里给它一个默认值`{ age: 21 }`

```vue
<template>
	<div>
		<slot :user="user">默认内容</slot>
	</div>
</template>

<script>
export default {
	props: {
		user: {
			type: Object,
			default: () => ({ age: 21 })
		}
	}
};
</script>
```

然后我们在外部引用该组件并传入该`props`

编写一个方法来改变当前`userInfo`的值

```vue
<template>
	<div>
		<navigation-link ref="navigationLink" :user="userInfo">
			<template #default="{user}">
				<div>user:{{ user }}</div>
				<div>user.name:{{ user.name }}</div>
			</template>
		</navigation-link>
		<button @click="click">userInfo:{{ userInfo }}</button>
	</div>
</template>
<script>
import NavigationLink from '@/components/navigation-link.vue';
export default {
	components: { NavigationLink },
	data() {
		return {
			userInfo: {
				gender: 'MALE'
			}
		};
	},
	methods: {
		click() {
			this.userInfo.name = 'ruben'
			this.$forceUpdate()
		}
	}
};
</script>
```

当前效果如下：

![image-20220129130434431](/imgs/oss/picGo/image-20220129130434431.png)

我们触发该事件，发现使用`$forceUpdate`使外部的`userInfo`成功更新

![image-20220129130544722](/imgs/oss/picGo/image-20220129130544722.png)

但`slot`中的视图并未更新

我们换成`$set`

```javascript
click() {
    this.$set(this.userInfo, 'name', 'ruben');
}
```

再来试试，发现成功绑定

![image-20220129130635810](/imgs/oss/picGo/image-20220129130635810.png)

此处如果我们没有传入名为`user`的`prop`

我们也可以通过`$refs`直接直接绑定

```javascript
click() {
    this.$set(this.$refs.navigationLink.user, 'name', 'ruben');
}
```

效果：

![image-20220129130946646](/imgs/oss/picGo/image-20220129130946646.png)