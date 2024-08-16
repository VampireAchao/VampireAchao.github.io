---
title: vue项目配置可选调用链
date: 2022-03-31 13:23:04
tags: 前端
---

> 生活是苦难的，我又划着我的断桨出发了。——博尔赫斯

可选调用链就是`?.`写法

有些`vue`项目没有默认配置，因此只能手动配置

介绍：https://babeljs.io/docs/en/babel-plugin-proposal-optional-chaining

安装：

```shell
cnpm i --save-dev @babel/plugin-proposal-optional-chaining
```

然后配置在根目录下的`babel.config.js`

新增：

```json
{
  "plugins": ["@babel/plugin-proposal-optional-chaining"]
}
```

完整：

````js
module.exports = {
  presets: [
    "@babel/preset-env",
    ['@vue/app',
      { useBuiltIns: 'entry' }]
  ],
  "plugins": ["@babel/plugin-transform-runtime", "@babel/plugin-proposal-optional-chaining",]
}
````

重启之后即可