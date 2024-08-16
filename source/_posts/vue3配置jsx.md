---
title: vue3配置jsx
date: 2022-07-10 16:06:23
tags: 前端
---

> 正如自然忌讳真空一样，人类是讨厌平等的。——《我是猫》

首先按照官方文档创建项目：

```shell
npm init vite hello-vue3 -- --template vue # 或 yarn create vite hello-vue3 --template vue
```

然后我们安装`jsx`插件：https://github.com/vuejs/babel-plugin-jsx

```shell
npm install @vue/babel-plugin-jsx -D
```

然后配置`vite.config.js`

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuejsx from "@vue/babel-plugin-jsx"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vuejsx({})],
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsxInject: "import { h } from 'vue';"
  }
})
```

编写代码：

```vue
<script lang="tsx">
interface Props {
  msg: string;
}
import { ref, Ref, } from 'vue'
export default {
  props: {
    msg: {
      type: String
    }
  },
  setup(props: Props, { expose }) {
    const count: Ref<number> = ref(0)
    const increment = (event: MouseEvent) => ++count.value
    expose({
      increment
    })
    return () => (
      <div>
        <div>{props.msg}</div>
        <p>You clicked {count.value} times</p>
        <button onClick={increment}>Click me</button>
      </div>
    )
  }
}
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
```

查看效果：

![image-20220710172025713](/imgs/oss/picGo/image-20220710172025713.png)