---
title: mixin
date: 2021-11-14 22:47:51
tags: 前端
---

> 所有智力方面的工作都要依赖于兴趣。——皮亚杰

如果我们需要在各个`vue`页面使用相同的公共元素

我们就可以使用`minxin`

官方文档：https://cn.vuejs.org/v2/guide/mixins.html

我们新建一个`mixin.js`



```javascript
export default {
	data() {
		return {
			name: 'ruben'
		}
	},
	created() {
		console.log('this.name', this.name);
		// 尝试访问调用方属性
		console.log('this.prefix', this.prefix);
	},
	mounted() {
		console.log("mixin mounted");
	},
	methods: {
		hello() {
			console.log("hello");
		}
	}
}
```

![image-20211114225921597](/imgs/oss/picGo/image-20211114225921597.png)

然后我们引用：

```vue
<template>
	<div></div>
</template>

<script>
import mixin from '@/common/mixin.js';
export default {
	mixins: [mixin],
	data() {
		return {
			prefix: 'ruben'
		};
	},
	created() {
        console.log(this.name)
	},
	methods: {
		
	}
};
</script>
```

可以看到输出结果为：

![image-20211114230214495](/imgs/oss/picGo/image-20211114230214495.png)

因此引入`mixin`后，就算在`mixin`中尝试访问调用方的属性，也是能成功访问到的

注意这里它的生命周期`created`同时在`mixin`和调用方声明了，并且分别执行了两个的`created`

