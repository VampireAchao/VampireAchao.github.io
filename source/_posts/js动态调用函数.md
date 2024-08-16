---
title: js动态调用函数
date: 2021-06-03 00:08:21
tags: 前端
---

> 兵无常势，水无常形，能因敌变化而取胜者，谓之神。——孙子

我们可以使用`变量名['函数名']()`去调用一个函数

```javascript
	<script>
		var ruben = {
			run() {
				console.log("ruben中的run被调用啦！")
			}
		}
		ruben['run']()
	</script>
```

可以用于动态调用函数场景

![image-20210604001247959](/imgs/oss/picGo/image-20210604001247959.png)
