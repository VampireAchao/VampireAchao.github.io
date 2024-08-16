---
title: vue-cropper
date: 2022-10-08 20:29:48
tags: 前端
---

> 青春是一种持续的陶醉，是理智的狂热。——拉罗什富科

分享一个`vue`图片裁剪组件

官网：https://github.xyxiao.cn/vue-cropper/

演示demo：http://github.xyxiao.cn/vue-cropper/example/

还是很不错的

![image-20221008203103687](/imgs/oss/blog/image-20221008203103687.png)

> ### 1. 安装
>
> ```
> # npm 安装
> npm install vue-cropper
> # yarn 安装
> yarn add vue-cropper
> ```
>
> 如果你没有使用 `npm`
>
> [在线例子vue-cropper + vue.2x](https://codepen.io/xyxiao001/pen/wxwKGz)
>
> [在线例子vue-cropper@next + vue.3x](https://codepen.io/xyxiao001/pen/yLooYKg)
>
> 服务器渲染 `nuxt` 解决方案 设置为 `ssr: false`
>
> ```
> module.exports = {
>   ...
>   build: {
>     vendor: [
>       'vue-cropper
>     ...
>     plugins: [
>       { src: '~/plugins/vue-cropper', ssr: false }
>     ]
>   }
> }
> ```
>
> ### 2. 引入 Vue Cropper
>
> `Vue 3` 组件内引入
>
> ```
> npm install vue-cropper@next
> import 'vue-cropper/dist/index.css'
> import { VueCropper }  from "vue-cropper";
> ```
>
> `Vue3` 全局引入
>
> ```
> import VueCropper from 'vue-cropper'; 
> import 'vue-cropper/dist/index.css'
> 
> const app = createApp(App)
> app.use(VueCropper)
> app.mount('#app')
> ```
>
> `Vue3 CDN` 方式引入
>
> ```
> <style type="text/css" src="https://cdn.jsdelivr.net/npm/vue-cropper@1.0.2/dist/index.css"></style> 
> <script src="https://cdn.jsdelivr.net/npm/vue@3.2.1/dist/vue.global.js"></script>
> <script src="https://cdn.jsdelivr.net/npm/vue-cropper@1.0.2/dist/vue-cropper.umd.js"></script>
> const app = Vue.createApp({...});
> app.component('vue-cropper', window['vue-cropper'].VueCropper);
> ```
>
> `Vue2` 组件内引入
>
> ```
> import { VueCropper }  from 'vue-cropper' 
> components: {
>   VueCropper
> }
> ```
>
> `Vue2` 全局引入
>
> ```
> import VueCropper from 'vue-cropper'
> Vue.use(VueCropper)
> ```
>
> `Vue2 CDN` 方式引入
>
> ```
> <script src="//cdn.jsdelivr.net/npm/vue-cropper@0.4.9/dist/index.js"></script>
> Vue.use(window['vue-cropper'].default)
> ```
>
> `nuxt` 引入方式
>
> ```
> if(process.browser) {
>   vueCropper = require('vue-cropper')
>   Vue.use(vueCropper.default)
> }
> ```
>
> ### 3. 代码中使用
>
> > **重要！** 需要关掉本地的 mock 服务， 不然图片转化会报错 **重要！** 需要使用外层容器包裹并设置宽高
>
> ```
> <vueCropper
>   ref="cropper"
>   :img="option.img"
>   :outputSize="option.size"
>   :outputType="option.outputType"
> ></vueCropper>
> ```