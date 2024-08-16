---
title: 配置HX模板
date: 2021-10-28 18:25:07
tags: 软件及插件
---

> 如果一条船不知道它要驶向哪个码头，那么任何风都不会是顺风。——塞涅卡

`HX`就是`HBuilder X`的缩写，它配置自定义模板在[官方文档](https://hx.dcloud.net.cn/Tutorial/Language/Snippets)中也有介绍

这里配置一个简单的`uniapp`列表页的模板

![image-20211028182728452](/imgs/oss/picGo/image-20211028182728452.png)

然后写入我们的自定义模板：

```json
{
	// 注意：本文档仅支持单行注释，并且'//'前不能有任何非空字符！！！
	//
	// HBuilderX使用json扩展代码块，兼容vscode的代码块格式
	// 本文档修改完毕，保存即可生效，无需重启。
	// 本文档用于用户自定义vue代码块。
	// 每个配置项的说明如下：
	// 'key'    ：代码块显示名称，显示在代码助手列表中的名字，以下例子中'console.log'就是一个key。
	// 'prefix' ：代码块的触发字符，就是敲什么字母匹配这个代码块。
	// 'body'   ：代码块的内容。内容中有如下特殊格式
	//          $1 表示代码块输入后光标的所在位置。如需要多光标，就在多个地方配置$1,如该位置有预置数据，则写法是${1:foo1}。多选项即下拉候选列表使用${1:foo1/foo2/foo3}
	//          $2 表示代码块输入后再次按tab后光标的切换位置tabstops（代码块展开后按tab可以跳到下一个tabstop）
	//          $0代表代码块输入后最终光标的所在位置（也可以按回车直接跳过去）。
	//          双引号使用\\'转义
	//          换行使用多个数组表示，每个行一个数组，用双引号包围，并用逗号分隔
	//          缩进需要用\\t表示，不能直接输入缩进！
	// 'triggerAssist' ：为true表示该代码块输入到文档后立即在第一个tabstop上触发代码提示，拉出代码助手，默认为false。
	// 每个代码块以key为主键，多个代码块需要逗号分隔。
	// 如果json语法不合法，底部会弹出错误信息，请注意修正。
	// 例子:
	// "console.log": {
	//  "prefix": "logtwo",
	//  "body": [
	//      "console.log('$1');",
	// 	    "\tconsole.log('$2');"
	// 	],
	// 	"triggerAssist": false,
	// 	"description": "Log output to console twice"
	// }
	"simple-uni-page": {
		"prefix": "simple-uni-page",
		"body": ["<template>",
			" 	<view>",
			" 		<view>",
			" 			<view v-for='(item, index) in dataList'>",
			" 			</view>",
			" 		</view>",
			" 	</view>",
			" </template>",
			" ",
			" <script>",
			" export default {",
			" 	data() {",
			" 		return {",
			" 			current: 1,",
			" 			size: 10,",
			" 			dataList: [],",
			" 			noMore: false,",
			" 			noData: false,",
			" 			loading: false",
			" 		};",
			" 	},",
			" 	created() {",
			" 		this.loadList(true);",
			" 	},",
			" 	onPullDownRefresh() {",
			" 		this.loadList(true);",
			" 	},",
			" 	onReachBottom() {",
			" 		if (this.noMore || this.noData) {",
			" 			return;",
			" 		}",
			" 		this.loadList();",
			" 	},",
			" 	methods: {",
			" 		loadList(refresh) {",
			" 			if (this.loading) {",
			" 				return;",
			" 			}",
			" 			this.loading = true;",
			" 			if (refresh) {",
			" 				this.current = 1;",
			" 				this.dataList = [];",
			" 			}",
			" 			setTimeout(() => (this.loading = false), 5000);",
			" 			let { current, size } = this;",
			" 			uni.gRequest.request('', { current, size }, null, res => {",
			" 				let dataList = res.data.records;",
			" 				this.dataList = this.dataList.concat(dataList);",
			" 				this.current++;",
			" 				this.noData = Boolean(this.dataList.length);",
			" 				this.noMore = dataList.length < size;",
			" 				this.loading = false",
			" 			});",
			" 		}",
			" 	}",
			" };",
			" </script>",
			" ",
			" <style scoped>",
			" 	",
			" </style>"
		],
		"triggerAssist": false,
		"description": "just a simple page"
	},
	"simple-request": {
		"prefix": "simple-request",
		"body": [
			" 		loadList(refresh) {",
			" 			if (this.loading) {",
			" 				return;",
			" 			}",
			" 			this.loading = true;",
			" 			if (refresh) {",
			" 				this.current = 1;",
			" 				this.dataList = [];",
			" 			}",
			" 			setTimeout(() => (this.loading = false), 5000);",
			" 			let { current, size } = this;",
			" 			uni.gRequest.request('', { current, size }, null, res => {",
			" 				let dataList = res.data.records;",
			" 				this.dataList = this.dataList.concat(dataList);",
			" 				this.current++;",
			" 				this.noData = Boolean(this.dataList.length);",
			" 				this.noMore = dataList.length < size;",
			" 				this.loading = false",
			" 			});",
			" 		}"
		],
		"triggerAssist": false,
		"description": "just a simple request"
	}
}
```

然后保存

![image-20211028182841002](/imgs/oss/picGo/image-20211028182841002.png)

这里我的`prefix`写的`simple-uni-page`和`simple-request`，所以只需要输入`sim`开头就可以出现候选

![image-20211028182941879](/imgs/oss/picGo/image-20211028182941879.png)

选择`simple-uni-page`

可以看到成功生效

![image-20211028183048811](/imgs/oss/picGo/image-20211028183048811.png)
