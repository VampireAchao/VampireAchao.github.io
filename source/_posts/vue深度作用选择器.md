---
title: vue深度作用选择器
date: 2021-09-25 21:09:51
tags: 前端
---

> 勤劳一日，可得一夜安眠；勤劳一生，可得幸福长眠。——达•芬奇（意大利）

我们首先在`HX`中创建`vue`项目

![image-20210925194214061](/imgs/oss/picGo/image-20210925194214061.png)

跟着[我之前写的博客](https://VampireAchao.github.io/2020/09/03/vue2-0%E9%85%8D%E7%BD%AE%E8%B7%AF%E7%94%B1/)简单配置一下路由

今天简单聊聊`vue`中`css`的作用域

我们知道`vue`中的`style`标签带`scoped`属性时，它的`CSS`只作用于当前组件中的元素

例如我这里的`HelloWorld`组件

```vue
<template>
	<div class="hello">
		<div class="hello-ruben">
			<h1>{{ msg }}</h1>
			<p>
				For a guide and recipes on how to configure / customize this project,
				<br />
				check out the
				<a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>
				.
			</p>
			<h3>Installed CLI Plugins</h3>
			<ul>
				<li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
			</ul>
			<h3>Essential Links</h3>
			<ul>
				<li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
				<li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
				<li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
				<li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
				<li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
			</ul>
			<h3>Ecosystem</h3>
			<ul>
				<li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
				<li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
				<li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
				<li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
				<li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'HelloWorld',
	props: {
		msg: String
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
</style>
```

注意`style`标签是带了`scoped`属性的

如果我们在外面的页面上引用这个组件，可以看到`css`选择器被转换了

![image-20210925205151097](/imgs/oss/picGo/image-20210925205151097.png)

如果我们在外面页面上想改子组件里元素的样式

使用全局`style`标签(就是不带`scoped`属性的标签，会作用于所有页面)还好，但如果我们只想作用于当前页面或组件，使用了`scoped`属性

这时候可以看到我们除了根节点`class`生效，其他的都没有生效

![image-20210925205651414](/imgs/oss/picGo/image-20210925205651414.png)

![image-20210925205821814](/imgs/oss/picGo/image-20210925205821814.png)

如果我们想要让它生效，则可以使用 `>>>` 操作符

![image-20210925210038926](/imgs/oss/picGo/image-20210925210038926.png)

有些像 Sass 之类的预处理器无法正确解析 `>>>`。这种情况下你可以使用 `/deep/` 操作符取而代之——这是一个 `>>>` 的别名，同样可以正常工作

例如：

![image-20210925210206032](/imgs/oss/picGo/image-20210925210206032.png)

当然大家注意到我这里还有个使用`v-html`渲染的标签

其中的富文本是一个带`class`的标签，我们在外面使用对应的`class`选择器失效了，此处我们也可以使用`>>>`操作符去让`v-html`渲染的标签里的元素样式得到准确的变更

![image-20210925210633704](/imgs/oss/picGo/image-20210925210633704.png)

这是[`vue-loader`官方文档](https://vue-loader-v14.vuejs.org/zh-cn/features/scoped-css.html)中学到的内容，我们在使用`vue-cli`创建项目时默认就安装了它

看到这里，对于`vue`中的`css`以后出现无法修改的问题，现在应该知道怎么处理了吧
