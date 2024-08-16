---
title: ics-to-json
date: 2022-10-16 18:23:40
tags: 前端
---

> 我无论作什麽，始终在想着，只要我的精力允许我的话，我就要首先为我的祖国服务。——（苏联）巴甫
>

昨天提到可以订阅`ics`，那能不能将`ics`转`json`呢？可以试试这个`ics-to-json`

github：https://github.com/cwlsn/ics-to-json

使用：

```shell
npm i ics-to-json
// 或者
cnpm i ics-to-json
// 或者
pnpm i ics-to-json
// 或者
yarn add ics-to-json
// 或者
tyarn add ics-to-json
```

我这里通过[browserify](https://VampireAchao.github.io/2022/06/10/browserify/)测试：

```shell
cnpm install -g browserify
```

编写`main.js`

```javascript
const icsToJson = require('ics-to-json')
window.icsToJson = icsToJson.default
```

```shell
browserify main.js -o bundle.js
```

编写页面

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script src="bundle.js"></script>
</body>
</html>
```

浏览器控制台执行：

```javascript
const response = await fetch("https://www.shuyz.com/githubfiles/china-holiday-calender/master/holidayCal.ics")
const text = await response.text()
const data = icsToJson(text)
console.log(data)
```

结果发现少了点东西，我们帮他改改`bug`

![image-20221016185344777](/imgs/oss/blog/image-20221016185344777.png)

将这里

![image-20221016185725532](/imgs/oss/blog/image-20221016185725532.png)

改为

![image-20221016185904724](/imgs/oss/blog/image-20221016185904724.png)

即可

![image-20221016185930167](/imgs/oss/blog/image-20221016185930167.png)
