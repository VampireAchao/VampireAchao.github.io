---
title: webpack
date: 2022-08-21 17:57:57
tags: 前端
---

> 细砂般数不尽的星，有颗向我眨眼睛。——芥川龙之介《侏儒的话》
>
> > 摘自芥川龙之介的《侏儒的话》。

首先是官方文档：https://webpack.docschina.org/

> 本质上，**webpack** 是一个用于现代 JavaScript 应用程序的 *静态模块打包工具*。当 webpack 处理应用程序时，它会在内部从一个或多个入口点构建一个 [依赖图(dependency graph)](https://webpack.docschina.org/concepts/dependency-graph/)，然后将你项目中所需的每一个模块组合成一个或多个 *bundles*，它们均为静态资源，用于展示你的内容。

接下来我们跟着快速上手一下，将一个普通的`html`文件使用`webpack`改造

https://webpack.docschina.org/guides/getting-started

创建目录，安装依赖

```shell
mkdir webpack-demo
cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev
```

新建`index.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>起步</title>
    <script src="https://unpkg.com/lodash@4.17.20"></script>
  </head>
  <body>
    <script src="./src/index.js"></script>
  </body>
</html>
```

`src/index.js`

```javascript
function component() {
  const element = document.createElement('div');

  // lodash（目前通过一个 script 引入）对于执行这一行是必需的
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());
```

![image-20220820181204253](/imgs/oss/picGo/image-20220820181204253.png)

我们打开页面试试

![image-20220820180905477](/imgs/oss/picGo/image-20220820180905477.png)

正常运行，开始改造，首先在`package.json`中申明`"private": true`并移除` "main": "index.js",`

```json
{
  "name": "simple-webpack",
  "version": "1.0.0",
  "description": "",
  "private": true,
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^5.74.0",
    "webpack-cli": "^4.10.0"
  }
}
```

然后将`index.html`放入新建的`dist`目录下

![image-20220820181244162](/imgs/oss/picGo/image-20220820181244162.png)

然后我们需要将`index.html`里引入的`lodash`从`<script>`方式引入改为本地打包引入

先安装

```shell
npm install --save lodash
```

然后修改`src/index.js`

```javascript
import _ from 'lodash';
function component() {
    const element = document.createElement('div');
  
    // lodash 在当前 script 中使用 import 引入
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  
    return element;
  }
  
  document.body.appendChild(component());
```

然后是`index.html`

```java
 <!DOCTYPE html>
 <html>
   <head>
     <meta charset="utf-8" />
     <title>起步</title>
   </head>
   <body>
    <script src="main.js"></script>
   </body>
 </html>
```

执行:

```shell
npx webpack
```

再次尝试用浏览器打开`dist/index.html`

成功改造

![image-20220820181650846](/imgs/oss/picGo/image-20220820181650846.png)

新建配置文件`webpack.config.js`

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

通过新的配置文件再次构建

```shell
npx webpack --config webpack.config.js
```

我们在`package.json`中新建一个脚本

```json
{
  "name": "simple-webpack",
  "version": "1.0.0",
  "description": "",
  "private": true,
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^5.74.0",
    "webpack-cli": "^4.10.0"
  },
  "dependencies": {
    "lodash": "^4.17.21"
  }
}
```

就可以使用

```shell
npm run build
```

代替之前的`npx`啦

![image-20220820182211119](/imgs/oss/picGo/image-20220820182211119.png)

