---
title: import模块失效
date: 2021-12-21 20:31:37
tags: 前端
---

> 一点浩然气，千里快哉风。——宋•苏轼

昨天公司实习生问我这个`import`为什么一直报错，他代码如下：

![image-20211221205120211](/imgs/oss/picGo/image-20211221205120211.png)

![image-20211221205208783](/imgs/oss/picGo/image-20211221205208783.png)

报错信息如下：

```shell
Uncaught SyntaxError: Cannot use import statement outside a module
```

![image-20211221205246938](/imgs/oss/picGo/image-20211221205246938.png)

实际上是因为`script`标签没有加`type`导致的

```javascript
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<body>
		<script type="module">
			import {ruben} from './js/module.js'
			console.log(ruben)
		</script>
	</body>
</html>
```

![image-20211221205339773](/imgs/oss/picGo/image-20211221205339773.png)

这样就可以了

可以看到正常输出

![image-20211221205401506](/imgs/oss/picGo/image-20211221205401506.png)

当然，我们使用`export default`也是一样的

```javascript
let ruben =  "module"
export default ruben
```

在外部引用

```javascript
		<script type="module">
			import ruben from './js/module.js'
			console.log(ruben)
		</script>
```

![image-20211221205617455](/imgs/oss/picGo/image-20211221205617455.png)