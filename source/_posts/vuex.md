---
title: vuex
date: 2021-11-22 18:11:27
tags: 前端
---

> 人之贤不肖譬如鼠矣，在所自处耳！――《李斯列传》

聊聊`vuex`，官方文档：https://vuex.vuejs.org/zh/

介绍就不赘述了，直接上使用

安装：

```shell
cnpm install vuex --save
```

![image-20211122183023983](/imgs/oss/picGo/image-20211122183023983.png)

我们新建一个`store`，再创建一个`index.js`

再新建一个`modules`目录，里面放上` value.js`

![image-20211122183125626](/imgs/oss/picGo/image-20211122183125626.png)

在`main.js`中我们写入

![image-20211122183205337](/imgs/oss/picGo/image-20211122183205337.png)

```javascript
import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store';

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
```

挂载完毕后，我们编写`main.js`和`value.js`

`main.js`

```javascript
// 页面路径：store/index.js
import Vue from 'vue';
import Vuex from 'vuex';

// vue的插件机制
Vue.use(Vuex);

import ruben from '@/store/modules/value.js' 
//Vuex.Store 构造器选项
export default new Vuex.Store({
	modules: {
		// 模块
		ruben
	}
});
```

`value.js`

```java
// vuex module
// 在外部使用`vuex`，可以如下引用
// import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
export default {
	// namespaced:true,
	// `state` 在外部访问可以使用 `mapState`
	// computed: {
	//	...mapState({
	//		value: state => state.ruben.value
	//	}),
	// }
	// 配置了`mapState`就可以使用 `this.value` 代替 `this.$store.state.ruben.value`
	state: {
		value: 'hello'
	},
	// `getters` 在外部访问可以使用 `MapGetters`
	// computed: {
	// 	...mapGetters(['getValue']) 
	// }
	// 配置了`MapGetters`就可以使用 `getValue` 代替 `this.$store.getters.getValue`
	// 取别名: 把 `this.getVuexValue` 映射为 `this.$store.getters.getValue`
	//	...mapGetters({getVuexValue:'getValue'})
	getters: {
		getValue: state => state.value
	},
	// `mutations` 在外部访问可以使用 `mapMutations`
	// methods:{
	// 	...mapMutations(['setValue'])
	// }
	// 配置了`mapMutations`就可以使用 `setValue(value)` 代替 `this.$store.commit('setValue', value)`
	// 取别名: 把 `this.setVuexValue(value)` 映射为 `this.$store.commit('setValue', value)`
	//	...mapMutations({setVuexValue:'setValue'})
	mutations: {
		setValue(state, value) {
			state.value = value
		}
	},
	// `actions` 在外部访问可以使用 `mapActions`
	// methods:{
	// 	...mapActions(['submitValue'])
	// }
	// 配置了`mapActions`就可以使用 `submitValue()` 代替 `this.$store.dispatch('submitValue', value)`
	// 取别名: 把 `this.submitVuexValue(value)` 映射为 `this.$store.dispatch('submitValue', value)`
	//	...mapMutations({submitVuexValue:'setValue'})
	actions: {
		submitValue(context, value) {
			console.log("context: ", context);
			return new Promise((resolve, reject) => setTimeout(() => {
				context.commit('setValue', value);
				resolve(value);
			}, 1000))
		}
	}
}
```

去掉注释长这样：

```javascript
export default {
	state: {
		value: 'hello'
	},
	getters: {
		getValue: state => state.value
	},
	mutations: {
		setValue(state, value) {
			state.value = value
		}
	},
	actions: {
		submitValue(context, value) {
			console.log("context: ", context);
			return new Promise((resolve, reject) => setTimeout(() => {
				context.commit('setValue', value);
				resolve(value);
			}, 1000))
		}
	}
}
```

然后我们找个页面引用一下

```vue
<template></template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
export default {
	computed: {
		...mapState({
			value: state => state.ruben.value
		}),
		...mapGetters(['getValue'])
	},
	methods: {
		...mapMutations(['setValue']),
		...mapActions(['submitValue'])
	},
	created() {
		console.log('this: ', this);
		
		// state
		console.log('this.value: ', this.value);
		console.log('this.$store.state.value: ', this.$store.state.ruben.value);
		
		// mutations
		this.setValue('ruben');
		this.$store.commit('setValue', 'ruben');
		
		// getters
		console.log('this.getValue: ', this.getValue);
		console.log('this.$store.getters.getValue: ', this.$store.getters.getValue);
		
		// actions
		this.submitValue('achao').then(console.log);
		this.$store.dispatch('submitValue','achao').then(console.log);
	}
};
</script>

<style></style>
```

我们看输出结果

![image-20211122194025725](/imgs/oss/picGo/image-20211122194025725.png)
