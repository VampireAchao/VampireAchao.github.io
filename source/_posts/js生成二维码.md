---
title: js生成二维码
date: 2022-01-06 19:08:53
tags: 前端
---

> 我们飞得越高，我们在那些不能飞的人眼中的形象就越渺小。——尼采《查拉图斯特拉如是说》

我们使用`qrcodejs`生成：https://github.com/davidshimjs/qrcodejs

下载这个`js`并引用

![image-20220106161113105](/imgs/oss/picGo/image-20220106161113105.png)

不知道怎么下载的可以直接到这个链接下按`ctrl+s`另存为

https://raw.githubusercontent.com/davidshimjs/qrcodejs/master/qrcode.min.js

然后编写代码：

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<script src="./js/qrcode.min.js" type="text/javascript"></script>
	</head>
	<body>
		<div id="qrcode"></div>
		<script type="text/javascript">
		var qrcode = new QRCode(document.getElementById("qrcode"), {
			text: "https://VampireAchao.github.io/",
			width: 128,
			height: 128,
			colorDark : "#000000",
			colorLight : "#ffffff",
			correctLevel : QRCode.CorrectLevel.H
		});
		</script>
	</body>
</html>
```

就可以了

![image-20220106161439316](/imgs/oss/picGo/image-20220106161439316.png)

但如果我们需要设置`logo`，就可以往上面二维码正中放一个图片就可以了：

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<script src="./js/qrcode.min.js" type="text/javascript"></script>
		<style type="text/css">
			#qrcode {
				position: relative;
			}

			#qrcode::after {
				content: '';
				display: block;
				width: 50px;
				height: 50px;
				background: url(/imgs/oss/2020-06-01/head.jpg) no-repeat;
				background-size: 50px 50px;
				border-radius: 5px;
				box-shadow: 1px 1px 10px #000;
				position: absolute;
				top: 106px;
				left: 102px;
			}
		</style>
	</head>
	<body>
		<div id="qrcode">

		</div>

		<script type="text/javascript">
			var qrcode = new QRCode(document.getElementById("qrcode"), {
				text: "https://VampireAchao.github.io/",
				width: 256,
				height: 256,
				colorDark: "#000000",
				colorLight: "#ffffff",
				correctLevel: QRCode.CorrectLevel.H
			});
		</script>
	</body>
</html>
```

效果如下：

![image-20220106162852541](/imgs/oss/picGo/image-20220106162852541.png)

有时扫不出来可能是二维码周围没有白边或者白边太少，导致相机识别失败，这个时候加一个白边就好了

