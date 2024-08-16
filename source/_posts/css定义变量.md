---
title: css定义变量
date: 2021-08-29 22:41:09
tags: 前端
---

> 仁义忠信,乐善不倦,此天爵也 。一一《孟子》

写法如下

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<style type="text/css">
			:root {
				/* 定义变量，需要--开头 */
				--ruben-width: 200px;
				--ruben-height: 200px; 
				--ruben-bg-color: #ff0000;
			}

			.ruben {
				/* 使用变量，需要var(变量名) */
				background-color: var(--ruben-bg-color);
				width: var(--ruben-width);
				height: var(--ruben-height);
			}

			.ruben1 {
				background-color: var(--ruben-bg-color);
				width: var(--ruben-width);
				height: var(--ruben-height);
			}
		</style>
	</head>
	<body>
		<div class="ruben"></div>
		<hr/>
		<div class="ruben1"></div>
	</body>
</html>
```

效果如下：

![img](/imgs/oss/picGo/GE2QCF3QQSXCUGM6%607S%7BJ9Y.png)
