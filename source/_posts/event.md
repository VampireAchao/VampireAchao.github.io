---
title: event
date: 2021-11-27 13:32:44
tags: 前端
---

> 有信仰的人不会孤独。——阿列克谢耶维奇

`vue`[官方文档](https://cn.vuejs.org/v2/api/#v-on)有介绍`$event`

我们在开发中经常这么写来获取事件

```vue
<div class="trigger-me" @click="triggerMe">点我触发</div>
```

方法：

```javascript
	methods: {
		triggerMe(e, name) {
			console.log('e: ', e);
			console.log('name: ', name);
		}
	}
```

然后调用一下

![image-20211127150024769](/imgs/oss/picGo/image-20211127150024769.png)

可以看到打印出了事件，如果我们需要传入其他参数，就可以使用`$event`了

```vue
<div class="trigger-me" @click="triggerMe($event, 'ruben')">点我触发</div>
```

再次触发：

![image-20211127151718735](/imgs/oss/picGo/image-20211127151718735.png)
