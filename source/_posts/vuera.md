---
title: vuera
date: 2022-07-15 13:30:11
tags: 前端
---

> 微微怪时间不能保存情绪，保存那一切情绪所曾流连的境界。——《你是人间的四月天》

分享一个开源项目：https://github.com/akxcv/vuera

它可以让你在`vue`里写`react`，在`react`里写`vue`

> Use [Vue](https://vuejs.org/) components in your [React](https://facebook.github.io/react) app:
>
> ```react
> import React from 'react'
> import MyVueComponent from './MyVueComponent.vue'
> 
> export default props =>
>   <div>
>     <MyVueComponent message={props.message} handleReset={props.handleReset} />
>   </div>
> ```
>
> Or use [React](https://facebook.github.io/react) components in your [Vue](https://vuejs.org/) app:
>
> ```vue
> <template>
>   <div>
>     <my-react-component :message="message" @reset="reset" />
>   </div>
> </template>
> 
> <script>
>   import MyReactComponent from './MyReactComponent'
> 
>   export default {
>     /* data, methods, etc */
>     components: { 'my-react-component': MyReactComponent },
>   }
> </script>
> ```

安装：

```shell
$ yarn add vuera
# or with npm:
$ npm i -S vuera
```

配置`.babelrc`

```json
{
  "presets": "react",
  "plugins": ["vuera/babel"]
}
```

