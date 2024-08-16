---
title: vue中属性简写
date: 2021-09-27 05:13:40
tags: 前端
---

> 任何职业都不简单，如果只是一般地完成任务当然不太困难，但要真正事业有所成就，给社会做出贡献，就不是那么容易的，所以，搞各行各业都需要树雄心大志，有了志气，才会随时提高标准来要求自己。 —— 谢觉哉

我们可以在包含`vue-loader`的`vue`项目中如下写法

```vue
<div :class="[{ active: active }, isButton ? prefix + '-button' : null]"></div>
<!-- 简写 -->
<div :class="{ active, [`${prefix}-button`]: isButton }"></div>
```

这里三个值：

```vue
export default {
	data() {
		return {
			active: true,
			isButton: true,
			prefix: 'ruben'
		};
	}
};
</script>
```

渲染结果：

![image-20210928051743080](/imgs/oss/picGo/image-20210928051743080.png)

这里第一个缩写是变量结构，将`{ active: active }`缩写为`active`

第二个缩写为模板字符串，将`prefix`直接渲染到字符串中

第三个缩写就是`isButton`的缩写，当`isButton`为`true`的时候

```vue
[`${prefix}-button`]
```

才会生效

甚至我们还可以这么写：

```vue
<div :class="[{ button: isButton }, { circle: isCircle }]"></div>
```

如果`isButton`或者`isCircle`任何一个为`true`，对应的`class`才会加上对应的值

![image-20210928052911043](/imgs/oss/picGo/image-20210928052911043.png)

