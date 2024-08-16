---
title: vue2配置vite
date: 2022-06-27 13:18:03
tags: 前端
---

> 天可补，海可填，南山可移。日月既往，不可复追。——曾国藩

本篇博客针对新`vue2`项目，老项目就先不说了哈哈(坑太多)

首先新建一个`vue2`项目

```shell
vue create simple-vue2-vite
```

选择`Default ([Vue 2] babel, eslint)`

```shell
success Saved lockfile.
Done in 3.92s.
⚓  Running completion hooks...

📄  Generating README.md...

🎉  Successfully created project simple-vue2-vite.
👉  Get started with the following commands:

 $ cd simple-vue2-vite
 $ yarn serve
```

安装完毕后我们进入，执行

```shell
 cd simple-vue2-vite
 yarn serve
```

可以看到正常运行：

![image-20220627135249200](/imgs/oss/picGo/image-20220627135249200.png)

我们首先安装`vite`

```shell
pnpm i -D vite vite-plugin-vue2
```

根目录新建一个`vite.config.js`

```javascript
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'

export default defineConfig({
  plugins: [
    createVuePlugin({
      jsx: true
    })
  ]
})
```

然后把`public`目录里的`index.html`放到外面根目录

![image-20220627135629065](/imgs/oss/picGo/image-20220627135629065.png)

进入`index.html`，加上`script`

```html
<script type="module" src="/src/main.js"></script>
```

然后去掉或者更改所有的`<%=  %>`格式

最后效果：

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <link rel="icon" href="/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Vite App</title>
</head>

<body>
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>

</html>
```

启动

```shell
vite --port 3004
```

![image-20220627140020029](/imgs/oss/picGo/image-20220627140020029.png)

成功：

![image-20220627140027605](/imgs/oss/picGo/image-20220627140027605.png)