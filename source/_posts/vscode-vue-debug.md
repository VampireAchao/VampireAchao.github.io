---
title: vscode-vue-debug
date: 2022-03-20 12:00:01
tags: 软件及插件
---

> 睡在哪里都是睡在夜里。——贾平凹《废都》

今天写个node+vue的vscode里对chrome进行debug

首先确保你的路径是项目根目录，懒得踩坑或者去对应配置

我这里用[`vue-cli`](https://cli.vuejs.org/zh/index.html#%E8%B5%B7%E6%AD%A5)创建一个新的`vue`项目

没有`tyarn`或者`cnpm`的话可以安装一个

```shell
npm i -g cnpm yarn tyarn --registry=https://registry.npm.taobao.org
# 查看全局依赖存储路径
yarn global dir
```

![image-20220319155235943](/imgs/oss/blog/image-20220319155235943.png)

然后是配置环境变量

对应路径注意不是在`Data`目录里：

```shell
C:\Users\achao\AppData\Local\Yarn\bin
```

![image-20220319155751405](/imgs/oss/blog/image-20220319155751405.png)

安装：

```shell
cnpm install -g @vue/cli
# OR
tyarn global add @vue/cli
```

创建一个项目：

```shell
vue create simple-vue
# OR
vue ui
```

此处选择`vue2`

创建好了我们用`vscode`打开

路径如下

![image-20220319162804034](/imgs/oss/blog/image-20220319162804034.png)

我们运行一下

```shell
cnpm run serve
# OR
yarn serve
```

这里我编写代码时发现格式化老出问题，我不想让它换行我的标签属性，于是我修改了`vscode`的`settings.json`

```json
{
    "workbench.colorTheme": "One Dark Pro",
    "git.autofetch": true,
    "[jsonc]": {
        "editor.defaultFormatter": "vscode.json-language-features"
    },
    "files.autoSave": "onWindowChange",
    "html.format.enable": true,
    "vetur.format.defaultFormatter.html": "js-beautify-html",
    "vetur.format.defaultFormatterOptions": {
        "js-beautify-html": {
            "wrap_attributes": "aligned-multiple"
        },
    },
    "beautify.config": {
        "brace_style": "collapse,preserve-inline"
    },
    "[javascript]": {
        "editor.defaultFormatter": "HookyQR.beautify"
    }
}
```

然后开始在`/src/components/HelloWorld.vue`组件中写代码：

```vue
<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  created() {
    [...this.someArrays(10)].forEach((i) => {
      console.log(i);
    });
  },
  methods: {
    *someArrays(len) {
      for (const i of Array.from(Array(len), (i, l) => l)) {
        yield i;
      }
    },
  },
};
</script>
```

保存运行一下，可以看到成功输出我们想要的数据

![image-20220319184412731](/imgs/oss/blog/image-20220319184412731.png)

此时如果我们打开控制台查看源码，按`ctrl+p`搜索我们的`HelloWorld.vue`，搜出来的是编译后的页面：

![image-20220319192218779](/imgs/oss/blog/image-20220319192218779.png)

因此我们需要配置下：

到`vue.config.js`

写法可以如下：

```javascript
module.exports = {
    configureWebpack: {
        devtool: "source-map"
    }
}
```

甚至可以这么写，我们顺带配置下启动端口：

```javascript
module.exports = {
    configureWebpack: config => {
        config.devtool = 'source-map'
    },
    devServer: {
        port: 2000
    }
}
```

重新`yarn serve`启动就可以看到我们的页面源码了

![image-20220319192528473](/imgs/oss/blog/image-20220319192528473.png)



下方改依赖的操作是为了稍后和`launch.json`映射上，并没有太过深入研究过`webpack`这块，这是我搞了一整天发现的解决办法



然后去修改一下`package.json`中的依赖：

在`devDependencies`中新增：

```json
"compression-webpack-plugin": "3.1.0"
```

并将`@vue/cli-service`版本改为`^3.3.0`

我这边完整的`devDependencies`为：

```json
 "devDependencies": {
    "@babel/core": "^7.12.16",
    "@babel/eslint-parser": "^7.12.16",
    "@vue/cli-plugin-babel": "~5.0.0",
    "@vue/cli-plugin-eslint": "~5.0.0",
    "@vue/cli-service": "^3.3.0",
    "compression-webpack-plugin": "3.1.0",
    "eslint": "^7.32.0",
    "eslint-plugin-vue": "^8.0.3",
    "vue-template-compiler": "^2.6.14"
  }
```

然后执行一下安装依赖

```shell
cnpm i
# OR
tyarn install
```

重新启动项目





我们此时打两个断点`break pointer`

![image-20220319184458242](/imgs/oss/blog/image-20220319184458242.png)

点击上方的运行`=>`启动调试，选择`Chrome`

![image-20220319184608645](/imgs/oss/blog/image-20220319184608645.png)

![image-20220319184620235](/imgs/oss/blog/image-20220319184620235.png)

然后这里我们可以按照[文档](https://cn.vuejs.org/v2/cookbook/debugging-in-vscode.html)编辑我们的`debug`配置

找不到了的话，在根目录的`.vscode`下面有个`launch.json`

![image-20220320000740836](/imgs/oss/blog/image-20220320000740836.png)

```json
{
    // 使用 IntelliSense 了解相关属性。 
    // 悬停以查看现有属性的描述。
    // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            "request": "launch",
            "name": "vuejs: chrome",
            "url": "http://localhost:2000",
            "webRoot": "${workspaceFolder}/src",
            "breakOnLoad": true,
            "sourceMapPathOverrides": {
                "webpack:///src/*": "${webRoot}/*"
            }
        }
    ]
  }
```

然后再次点击启动调试我们就可以看到断点生效了

此处如果上方`package.json`中的依赖配置正确，则可以对应看到浏览器源码结构为`webpack://`，因此上方配置需要重写`webpack:///src/*`到`${webRoot}/*`

![image-20220320000355530](/imgs/oss/blog/image-20220320000355530.png)

如果没生效，且结构是这样的，依赖版本也不正确，这个甚至还没有`webpack://`下的`src`目录，那么`vue2`可以按照上面修改`package.json`的依赖解决

![image-20220320000449238](/imgs/oss/blog/image-20220320000449238.png)

目前没有找出`vue3`的`debug`更好方案，留个坑在这，解决思路暂时为

- 了解学习`vscode`的`debugger`对应再修改`.vscode/launch.json`配置去重写映射上
- 了解学习`compression-webpack-plugin`这个插件

- 在`chrome`中打断点，`vscode`一样能直观看到变量和调用链



![image-20220319235814351](/imgs/oss/blog/image-20220319235814351.png)

后续操作就和`chrome`中`debug`差不多的了，可以参考我[这篇博客](https://VampireAchao.github.io/2020/12/01/debug%E3%81%AEChrome%E7%AF%87/)
