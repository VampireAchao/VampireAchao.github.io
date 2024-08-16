---
title: codeFlask
date: 2021-12-23 22:00:01
tags: 前端
---

> 猝然死去本无甚苦痛，长期累死倒真难以忍受。——佚名

`codeFlask`是一个在线代码编辑器：

![image-20211223220912373](/imgs/oss/picGo/image-20211223220912373.png)
官方文档：https://kazzkiq.github.io/CodeFlask/

`github`：https://github.com/kazzkiq/CodeFlask

代码也很简单：

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<script type="text/javascript" src="https://unpkg.com/codeflask/build/codeflask.min.js"></script>
	</head>
	<body>
		<div id="editor"></div>
		<script type="application/javascript">
			const editorElem = document.getElementById('editor');
			const flask = new CodeFlask(editorElem, {
				language: 'js',
				lineNumbers: true,
				styleParent: this.shadowRoot
			});
			flask.addLanguage('JavaScript', Prism.languages['JavaScript']);
			flask.onUpdate((code) => {
				// do something with code here.
				// this will trigger whenever the code
				// in the editor changes.
				console.log(code)
			});
			// flask.updateCode('哈哈');
			// This will also trigger .onUpdate()
			flask.updateCode(`<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title></title>
    </head>
	<page>
	</page>
</html>`);

			const currentCode = flask.getCode();
			console.log({
				currentCode
			})
		</script>
	</body>
</html>
```

这里`page`本来应该是`body`，但由于`HbuilderX`自带的`LiveReload`会把我的`</body>`替换掉，所以我就换成`page`了，如果不是用`HbuilderX`运行自动刷新，则不用担心这个问题