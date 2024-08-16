---
title: webpack资源管理
date: 2022-08-22 12:29:38
tags: 前端
---

> 天分高的人如果懒惰成性，亦即不自努力以发展他的才能，则其成就也不会很大，有时反会不如天分比他低些的人。——茅盾

书接上文，首先对上次的项目进行改造，参考：https://webpack.docschina.org/guides/asset-management/

将`main.js`改为`bundle.js`

`index.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>管理资源</title>
  </head>
  <body>
    <script src="bundle.js"></script>
  </body>
</html>
```

`webpack.config.js`

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

> 为了在 JavaScript 模块中 `import` 一个 CSS 文件，你需要安装 [style-loader](https://webpack.docschina.org/loaders/style-loader) 和 [css-loader](https://webpack.docschina.org/loaders/css-loader)，并在 [`module` 配置](https://webpack.docschina.org/configuration/module) 中添加这些 loader：

```shell
npm install --save-dev style-loader css-loader
```

`webpack.config.js`

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
```

> ###### Tip
>
> webpack 根据正则表达式，来确定应该查找哪些文件，并将其提供给指定的 loader。在这个示例中，所有以 `.css` 结尾的文件，都将被提供给 `style-loader` 和 `css-loader`。
>
> 这使你可以在依赖于此样式的 js 文件中 `import './style.css'`。现在，在此模块执行过程中，含有 CSS 字符串的 `<style>` 标签，将被插入到 html 文件的 `<head>` 中。
>
> 我们尝试一下，通过在项目中添加一个新的 `style.css` 文件，并将其 import 到我们的 `index.js` 中：

`style.css`

```css
.hello {
  color: red;
}
```

`index.js`

```javascript
import _ from 'lodash';
import './style.css';
function component() {
    const element = document.createElement('div');
  
    // lodash 在当前 script 中使用 import 引入
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');
  
    return element;
  }
  
  document.body.appendChild(component());
```

执行

```shell
npm run build
```

![image-20220821130434859](/imgs/oss/picGo/image-20220821130434859.png)

查看页面元素

![image-20220821131155153](/imgs/oss/picGo/image-20220821131155153.png)

接下来轮到`image`了，首先在`webpack.config.js`中，配置`png`、`jpg`等图片格式

```json
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
```

现在，`import MyImage from './my-image.png'`中的图片路径会被识别且替换为`output`后的真正路径

我们加一个图片：

![image-20220821224332350](/imgs/oss/picGo/image-20220821224332350.png)

然后在`index.js`使用

```javascript
import _ from 'lodash';
import './style.css';
import Icon from './icon.png';

function component() {
  const element = document.createElement('div');

  // lodash 在当前 script 中使用 import 引入
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');
  
  // 将图像添加到我们已经存在的 div 中。
  const myIcon = new Image();
  myIcon.src = Icon;

  element.appendChild(myIcon);

  return element;
}

document.body.appendChild(component());
```

`src/style.css`

```css
.hello {
    color: red;
    background: url('./icon.png');
}
```

重新构建

```shell
 npm run build
```

![image-20220821225442580](/imgs/oss/picGo/image-20220821225442580.png)

对于字体

`webpack.config.js`

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
```

然后添加字体文件

![image-20220821232511909](/imgs/oss/picGo/image-20220821232511909.png)

在`style.css`中使用

```css
@font-face {
    font-family: 'MyFont';
    src: url('./my-font.woff2') format('woff2'),
        url('./my-font.woff') format('woff');
    font-weight: 600;
    font-style: normal;
}

.hello {
    color: red;
    font-family: 'MyFont';
    background: url('./icon.png');
}
```

由于我这里是图标，所以顺带我们将图标代码写上

`index.js`

```javascript
import _ from 'lodash';
import './style.css';
import Icon from './icon.png';

function component() {
  const element = document.createElement('div');

  // lodash 在当前 script 中使用 import 引入
  element.innerHTML = _.join(['Hello', 'webpack'], '&#xe6eb; ');
  element.classList.add('hello');

  // 将图像添加到我们已经存在的 div 中。
  const myIcon = new Image();
  myIcon.src = Icon;

  element.appendChild(myIcon);

  return element;
}

document.body.appendChild(component());
```

再次编译

```
npm run build
```

可以看到图标字体生效

![image-20220821232940120](/imgs/oss/picGo/image-20220821232940120.png)

> 此外，可以加载的有用资源还有数据，如 JSON 文件，CSV、TSV 和 XML。类似于 NodeJS，JSON 支持实际上是内置的，也就是说 `import Data from './data.json'` 默认将正常运行。要导入 CSV、TSV 和 XML，你可以使用 [csv-loader](https://github.com/theplatapi/csv-loader) 和 [xml-loader](https://github.com/gisikw/xml-loader)。让我们处理加载这三类文件：

```shell
npm install --save-dev csv-loader xml-loader
```

`webpack.config.js`配置规则

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ['csv-loader'],
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader'],
      },
    ],
  },
};
```

添加数据文件`data.xml`、`data.csv`

`src/data.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<note>
  <to>Mary</to>
  <from>John</from>
  <heading>Reminder</heading>
  <body>Call Cindy on Tuesday</body>
</note>
```

`src/data.csv`

```csv
to,from,heading,body
Mary,John,Reminder,Call Cindy on Tuesday
Zoe,Bill,Reminder,Buy orange juice
Autumn,Lindsey,Letter,I miss you
```

导入文件，会自动处理为`json`

`src/index.js`

```javascript
import _ from 'lodash';
import './style.css';
import Icon from './icon.png';
import Data from './data.xml';
import Notes from './data.csv';

function component() {
  const element = document.createElement('div');

  // lodash 在当前 script 中使用 import 引入
  element.innerHTML = _.join(['Hello', 'webpack'], '&#xe6eb; ');
  element.classList.add('hello');

  // 将图像添加到我们已经存在的 div 中。
  const myIcon = new Image();
  myIcon.src = Icon;

  element.appendChild(myIcon);

  console.log({ Data });
  console.log({ Notes });

  return element;
}

document.body.appendChild(component());
```

编译

```shell
npm run build
```

可以看到控制台成功打印

![image-20220821234941221](/imgs/oss/picGo/image-20220821234941221.png)

> ### 自定义 JSON 模块 parser
>
> 通过使用 [自定义 parser](https://webpack.docschina.org/configuration/module/#ruleparserparse) 替代特定的 webpack loader，可以将任何 `toml`、`yaml` 或 `json5` 文件作为 JSON 模块导入。

新建一个`src/data.toml`

```toml
title = "TOML Example"

[owner]
name = "Tom Preston-Werner"
organization = "GitHub"
bio = "GitHub Cofounder & CEO\nLikes tater tots and beer."
dob = 1979-05-27T07:32:00Z
```

`src/data.yaml`

```yaml
title: YAML Example
owner:
  name: Tom Preston-Werner
  organization: GitHub
  bio: |-
    GitHub Cofounder & CEO
    Likes tater tots and beer.
  dob: 1979-05-27T07:32:00.000Z
```

`src/data.json5`

```json5
{
  // comment
  title: 'JSON5 Example',
  owner: {
    name: 'Tom Preston-Werner',
    organization: 'GitHub',
    bio: 'GitHub Cofounder & CEO\n\
Likes tater tots and beer.',
    dob: '1979-05-27T07:32:00.000Z',
  },
}
```

首先安装对应的`packages`

```shell
npm install toml yamljs json5 --save-dev
```

配置`webpack.config.js`

```javascript
const path = require('path');
const toml = require('toml');
const yaml = require('yamljs');
const json5 = require('json5');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ['csv-loader'],
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader'],
      },
      {
        test: /\.toml$/i,
        type: 'json',
        parser: {
          parse: toml.parse,
        },
      },
      {
        test: /\.yaml$/i,
        type: 'json',
        parser: {
          parse: yaml.parse,
        },
      },
      {
        test: /\.json5$/i,
        type: 'json',
        parser: {
          parse: json5.parse,
        },
      },
    ],
  },
};
```

然后在`src/index.js`中使用

```javascript
import _ from 'lodash';
import './style.css';
import Icon from './icon.png';
import Data from './data.xml';
import Notes from './data.csv';
import toml from './data.toml';
import yaml from './data.yaml';
import json from './data.json5';

console.log({ toml });

console.log({ yaml });

console.log({ json });

function component() {
  const element = document.createElement('div');

  // lodash 在当前 script 中使用 import 引入
  element.innerHTML = _.join(['Hello', 'webpack'], '&#xe6eb; ');
  element.classList.add('hello');

  // 将图像添加到我们已经存在的 div 中。
  const myIcon = new Image();
  myIcon.src = Icon;

  element.appendChild(myIcon);

  console.log({ Data });
  console.log({ Notes });

  return element;
}

document.body.appendChild(component());
```

编译

```shell
npm run build
```

成功解析

![image-20220821235633453](/imgs/oss/picGo/image-20220821235633453.png)

最后是全局资源相关的知识点，简单说就是你可以自定义组件，并将这些资源放到组件文件夹下一期复制过去

最后是回退处理，用于之后的学习

删除以下文件

```shell
   |- data.csv
   |- data.json5
   |- data.toml
   |- data.xml
   |- data.yaml
   |- icon.png
   |- my-font.woff
   |- my-font.woff2
   |- style.css
```

`webpack.config.js`

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

`src/index.js`

```javascript
import _ from 'lodash';

function component() {
  const element = document.createElement('div');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());
```

移除依赖

```shell
npm uninstall css-loader csv-loader json5 style-loader toml xml-loader yamljs
```

