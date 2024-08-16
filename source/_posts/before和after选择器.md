---
title: before和after选择器
date: 2021-06-27 21:55:42
tags: 前端
---

> 在科学上没有平坦的大道，只有不畏劳苦，沿着陡峭山路攀登的人，才有希望达到光辉的顶点——马克思

我们可以使用`::before`和`::after`去选择我们节点内部的首项或尾项

例如我这里代码如下

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<style>
			.ruben-parent {
				width: 100%;
				border: 0.1em solid #ababab;
				text-align: center;
			}

			.ruben-parent::before,
			.ruben-parent::after {
				margin: 0 auto;
				content: '';
				display: block;
				width: 1em;
				height: 0.1em;
				background: #76838f;
				transition: 0.5s;
			}
			
			.ruben-parent:hover::before,
			.ruben-parent:hover::after {
				width: 100%;
				height: 1em;
			}
		</style>
	</head>
	<body>
		<div class="ruben-parent">
			<span>ruben</span>
		</div>
	</body>
</html>
```

页面渲染后节点如下，多了一个`::before`和一个`::after`

![image-20210627215852980](/imgs/oss/picGo/image-20210627215852980.png)

我们使用`display: block;`将它设为块级元素后，并使用`content: '';`给它一个空的内容

然后我们再给它宽度、高度、颜色等等样式

最后再加上`hover`事件

![image-20210627220700728](/imgs/oss/picGo/image-20210627220700728.png)

实现的效果如下

![演示beforeAfter](/imgs/oss/picGo/%E6%BC%94%E7%A4%BAbeforeAfter.gif)
