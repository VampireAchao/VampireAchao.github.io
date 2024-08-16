---
title: jquery根据属性选择
date: 2021-11-28 17:56:48
tags: 前端
---

> 有信仰的人不会孤独。——阿列克谢耶维奇

分享一个`jquery`选择器的小技巧

我们可以通过自定义属性键值选中一个元素

例如如下元素：

```html
<div ruben="vampire">阿超</div>
```

然后我们通过`ruben=vampire`选中这个`div`

就可以如下写法：

```html
let vampire = $('div[ruben="vampire"]')
```

我们可以简单测试一下输出里面的内容

```html
		<div ruben="vampire">阿超</div>
		<script type="text/javascript">
			let vampire = $('div[ruben="vampire"]')
			console.log("vampire: ", vampire.text());
		</script>
```

效果

![image-20211128181110150](/imgs/oss/picGo/image-20211128181110150.png)