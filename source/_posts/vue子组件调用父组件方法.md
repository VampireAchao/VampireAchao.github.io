---
title: vue子组件调用父组件方法
date: 2021-05-12 13:59:47
tags: 前端
---

> 强迫学习的东西是不会保存在心里的。——《柏拉图论教育》

首先我们在子组件中这样定义

```vue
<template>
	<div>
		<el-button @click="callSuper">123</el-button>
	</div>
</template>

<script>
export default {
	methods: {
		callSuper() {
			this.$emit('parentEvent', '我的');
		}
	}
};
</script>
```

这里的组件就只有一个`el-button`，点击后执行`callSuper`函数

里面这行`this.$emit('parentEvent', '我的');`表示

调用在父组件 引用子组件时 传入的事件

例如我这里调用了`parentEvent`，传入了个“我的”作为参数

然后这样我们在 引用子组件 的时候就需要这样写

```vue
<template>
	<div>
		<hello-world @parentEvent="toYoung"></hello-world>
	</div>
</template>

<script>
import HelloWorld from '../../../components/HelloWorld.vue';
export default {
	components: { HelloWorld },
	methods: {
		toYoung(msg) {
			console.log(msg);
		}
	}
};
</script>
```

这里定义`@parentEvent`事件，然后传入`toYoung`函数作为参数

这样就实现了子组件点击时触发父组件方法

![image-20210513141443518](/imgs/oss/picGo/image-20210513141443518.png)