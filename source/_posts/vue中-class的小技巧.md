---
title: 'vue中:class的小技巧'
date: 2021-05-30 23:19:31
tags: 小技巧
---

> 在快乐时，朋友会认识我们；在患难时，我们会认识朋友。——柯林斯

我们在进行`vue`开发的时候

有时会有根据条件给标签进行不同的`class`配置

我们都知道可以使用`:class`实现动态配置

但如果我们本身需要一些固定的样式，一般是在`:class`中判断的时候加上

例如我这里写一个`div`标签，加了少许样式

```vue
<script>
export default {
	data() {
		return {
			additionalClass: 'red'
		};
	}
};
</script>
<style scoped="scoped">
	.red{
		background: red;
	}
	.big{
		height: 200px;
	}
</style>
```

我们这里使用了[模板字符串](https://VampireAchao.github.io/2020/11/04/%E6%A8%A1%E6%9D%BF%E5%AD%97%E7%AC%A6%E4%B8%B2/)去做

```vue
<div :class="`big ${additionalClass}`">这是一个新的div</div>
```

但其实，我们的`:class`和`class`可以并存

直接简单写成这样

```vue
<div class="big" :class="additionalClass">这是一个新的div</div>
```

效果都是一样的，我们的`class`会自动叠加到后面并为我们拼好空格

![image-20210530232854329](/imgs/oss/picGo/image-20210530232854329.png)

根据实验，`style`标签也是可以叠加的

```vue
<div class="big" :class="additionalClass" style="width: 200px;" :style="additionalStyle">这是一个新的div</div>
```



```vue
	data() {
		return {
			additionalClass: 'red',
			additionalStyle: 'opacity: 0.5;'
		};
	}
```

![image-20210530233219944](/imgs/oss/picGo/image-20210530233219944.png)

但其他的一些不能叠加的则是后面的覆盖前面

例如这里的`type`覆盖了前面的`:type`，`input`框变成了`password`框

如果我们换个位置，把`:type`放在后面，又会变成`text`框

```vue
<el-input :type="'text'" type="password"  v-model="user.name"></el-input>
```

