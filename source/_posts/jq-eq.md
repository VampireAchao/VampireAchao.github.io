---
title: jq eq
date: 2021-12-11 20:12:02
tags: 前端
---

> 要知道对好事的称颂过于夸大，也会招来人们的反感轻蔑和嫉妒。——培根

我们使用`jquery`选择器时如果有多个结果，我们可以使用`eq`函数选择指定下标的元素

例如此处

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<script src="https://www.jq22.com/jquery/jquery-3.3.1.js"></script>
	</head>
	<body>
		<div class="ruben">vampire</div>
		<div class="ruben">ruben</div>
		<script type="text/javascript">

			let ruben = $('.ruben').eq(1)
			console.log(ruben.text())
		</script>
	</body>
</html>
```

我这里选择第二个元素，就使用`eq(1)`

打印结果为：

![image-20211211201603382](/imgs/oss/picGo/image-20211211201603382.png)