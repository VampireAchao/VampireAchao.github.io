---
title: layui模块入门
date: 2021-12-18 18:33:28
tags: 前端
---

> 天才绝不应鄙视勤奋。—— 小普林尼

今天写了写`layui`自定义模块

```javascript
layui.define(['layer'], (exports) => { // 需确保您的 layui.js 是引入的构建后的版本（即官网下载或 git 平台的发行版）
	//直接可得到各种内置模块
	var layer = layui.layer
	//…
	layer.msg('Hello World');

	exports('ruben', {}); //注意，这里是模块输出的核心，模块名必须和 use 时的模块名一致
});
```

然后引用自己写的自定义模块

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<link rel="stylesheet" type="text/css" href="layui/css/layui.css" />
	</head>
	<div id="div1"></div>
	<body>
		<script type="text/javascript" src="layui/layui.js"></script>
		<script src="js/ruben.js" type="text/javascript"></script>
		<script type="text/javascript">
			layui.use(() => {
				var ruben = layui.ruben;
				console.log(ruben)
			})
		</script>
	</body>
</html>
```

运行

![image-20211218183549317](/imgs/oss/picGo/image-20211218183549317.png)

控制台也输出了我们导出的空对象

![image-20211218183635259](/imgs/oss/picGo/image-20211218183635259.png)

