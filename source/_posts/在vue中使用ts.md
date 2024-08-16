---
title: 在vue中使用ts
date: 2022-01-03 11:57:09
tags: 前端
---

> 诚实的生活方式其实是按照自己身体的意愿行事，饿的时候才吃饭，爱的时候不必撒谎。——马尔克斯《霍乱时期的爱情》

官方文档：https://www.typescriptlang.org/docs/handbook/intro.html


首先找到中文文档：https://www.tslang.cn/samples/index.html

寻找到`vue.js`

![image-20220103120155111](/imgs/oss/picGo/image-20220103120155111.png)

跳转过去后就是教程，我们跟着教程一步一步来

首先新建一个空项目

![image-20220103121442100](/imgs/oss/picGo/image-20220103121442100.png)

然后新建`src`目录和`components`目录

```dir
typescript-vue-tutorial/
├─ dist/
└─ src/
   └─ components/
```

输入命令下载依赖

```shell
D:\file\projects\vue-ts-demo>cnpm install --save-dev typescript webpack webpack-cli ts-loader css-loader vue vue-loader vue-template-compiler
```

很快就下载完毕

![image-20220103121921145](/imgs/oss/picGo/image-20220103121921145.png)

然后初始化`ts`环境

```shell
tsc --init
```

可以看到多出了`ts`配置文件

![image-20220103122054083](/imgs/oss/picGo/image-20220103122054083.png)

我们可以在这里看到全部配置，我们可以手动对齐进行更改

也可以直接使用官方提供的配置

```json
{
    "compilerOptions": {
        "outDir": "./built/",
        "sourceMap": true,
        "strict": true,
        "noImplicitReturns": true,
        "module": "es2015",
        "moduleResolution": "node",
        "target": "es5"
    },
    "include": [
        "./src/**/*"
    ]
}
```

![image-20220103122317184](/imgs/oss/picGo/image-20220103122317184.png)

然后我们再新建一个`webpack.config.js`到根目录下：

```json
var path = require('path')
var webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin()
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
```

再到`package.json`中添加构建配置

```json
{
	"devDependencies": {
		"css-loader": "^6.5.1",
		"ts-loader": "^9.2.6",
		"typescript": "^4.5.4",
		"vue": "^2.6.14",
		"vue-loader": "^15.9.8",
		"vue-template-compiler": "^2.6.14",
		"webpack": "^5.65.0",
		"webpack-cli": "^4.9.1"
	},
	"scripts": {
		"build": "webpack",
		"test": "echo \"Error: no test specified\" && exit 1"
	}
}
```

我尝试构建，但发现以下错误

![image-20220103124616317](/imgs/oss/picGo/image-20220103124616317.png)

报错日常了属于是，仔细看，它说：

```shell
D:\file\projects\vue-ts-demo>cnpm run build

> @ build D:\file\projects\vue-ts-demo
> webpack

[webpack-cli] 无效的 配置 对象. Webpack 已经 被 序列化了 使用 一个 配置 类 为 并 不 匹配 它的 API 模式.
 - configuration.devtool 应该 满足 表达式 "^(inline-|hidden-|eval-)?(nosources-)?(cheap-(module-)?)?source-map$".
   突破 变更 自从 webpack 5: 这个 devtool 选项 变得 更加 严格.
   Please strictly follow the order of the keywords in the pattern.
npm ERR! code ELIFECYCLE
npm ERR! errno 2
npm ERR! @ build: `webpack`
npm ERR! Exit status 2
npm ERR!
npm ERR! Failed at the @ build script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\achao\AppData\Roaming\npm-cache\_logs\2022-01-03T04_44_20_952Z-debug.log
```

所以我们将`webpack.config.js`中的`configuration.devtool`改为表达式中的`eval-nosources-cheap-module-source-map`

![image-20220103130312281](/imgs/oss/picGo/image-20220103130312281.png)

再来，发现报错变了

它说是找不到这个文件

![image-20220103130410439](/imgs/oss/picGo/image-20220103130410439.png)

那我们新建一个，这就是我们的主要`ts`文件

```typescript
// src/index.ts

import Vue from "vue";

let v = new Vue({
    el: "#app",
    template: `
    <div>
        <div>Hello {{name}}!</div>
        Name: <input v-model="name" type="text">
    </div>`,
    data: {
        name: "World"
    }
});
```

![image-20220103130518049](/imgs/oss/picGo/image-20220103130518049.png)

添加完成之后我们再次构建，发现成功构建啦！

```shell
# 编译
cnpm run build
# 编译并热更新
npm run build -- --watch
```

![image-20220103130607639](/imgs/oss/picGo/image-20220103130607639.png)

这里还有个警告，说我们缺少了`mode`属性

我们顺便加上

![image-20220103131136245](/imgs/oss/picGo/image-20220103131136245.png)

![image-20220103131145898](/imgs/oss/picGo/image-20220103131145898.png)

警告消失

![image-20220103131207600](/imgs/oss/picGo/image-20220103131207600.png)

接下来我们添加一个组件到`src/components`下

![image-20220103131332747](/imgs/oss/picGo/image-20220103131332747.png)

```typescript
// src/components/Hello.ts

import Vue from "vue";

export default Vue.extend({
    template: `
        <div>
            <div>Hello {{name}}{{exclamationMarks}}</div>
            <button @click="decrement">-</button>
            <button @click="increment">+</button>
        </div>
    `,
    props: ['name', 'initialEnthusiasm'],
    data() {
        return {
            enthusiasm: this.initialEnthusiasm,
        }
    },
    methods: {
        increment() { this.enthusiasm++; },
        decrement() {
            if (this.enthusiasm > 1) {
                this.enthusiasm--;
            }
        },
    },
    computed: {
        exclamationMarks(): string {
            return Array(this.enthusiasm + 1).join('!');
        }
    }
});
```

在`index.ts`中引用

```typescript
// src/index.ts

import Vue from "vue";
import HelloComponent from "./components/Hello";

let v = new Vue({
    el: "#app",
    template: `
    <div>
        Name: <input v-model="name" type="text">
        <hello-component :name="name" :initialEnthusiasm="5" />
    </div>
    `,
    data: { name: "World" },
    components: {
        HelloComponent
    }
});
```

注意到此为止我们都是使用`ts`文件进行编写`vue`代码，如果我们需要使用`vue`文件，则需要在`src`下新建`vue-shims.d.ts`

```typescript
// src/vue-shims.d.ts

declare module "*.vue" {
    import Vue from "vue";
    export default Vue;
}
```

我们的组件就可以改为`Hello.vue`

```vue
<!-- src/components/Hello.vue -->

<template>
    <div>
        <div class="greeting">Hello {{name}}{{exclamationMarks}}</div>
        <button @click="decrement">-</button>
        <button @click="increment">+</button>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: ['name', 'initialEnthusiasm'],
    data() {
        return {
            enthusiasm: this.initialEnthusiasm,
        }
    },
    methods: {
        increment() { this.enthusiasm++; },
        decrement() {
            if (this.enthusiasm > 1) {
                this.enthusiasm--;
            }
        },
    },
    computed: {
        exclamationMarks(): string {
            return Array(this.enthusiasm + 1).join('!');
        }
    }
});
</script>

<style>
.greeting {
    font-size: 20px;
}
</style>
```

![image-20220103131804180](/imgs/oss/picGo/image-20220103131804180.png)

`index.ts`中`HelloComponent`我再给个后缀

```typescript
// src/index.ts

import Vue from "vue";
import HelloComponent from "./components/Hello.vue";

let v = new Vue({
    el: "#app",
    template: `
    <div>
        Name: <input v-model="name" type="text">
        <hello-component :name="name" :initialEnthusiasm="5" />
    </div>
    `,
    data: { name: "World" },
    components: {
        HelloComponent
    }
});
```

我们使用`cnpm run build`生成的`build.js`我们可以放到一个`html`中使用一下，看看效果

![image-20220103133436616](/imgs/oss/picGo/image-20220103133436616.png)

```html
<!doctype html>
<html>

<body>
    <div id="app"></div>
</body>

<script src="./dist/build.js"></script>

</html>
```

效果如下：

![image-20220103133838475](/imgs/oss/picGo/image-20220103133838475.png)

但这和我们一般`vue`开发还有点差别，我们开发时应该还有热重载...

我们去修改下`webpack.config.js`

![image-20220103134439850](/imgs/oss/picGo/image-20220103134439850.png)

然后重新运行`cnpm run build -- --watch`

然后我们打开页面`http://127.0.0.1:8848/vue-ts-demo/index.html`

我们修改后再次保存，就可以实时更新了

