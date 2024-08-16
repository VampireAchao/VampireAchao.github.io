---
title: teleport
date: 2022-07-12 12:54:56
tags: 前端
---

> 你之前学了啥跟你以后能学啥没有什么本质联系——尤雨溪

顾名思义，`teleport`汉译过来就是传送的意思

官方文档：https://v3.cn.vuejs.org/guide/teleport.html#teleport

它可以将我们的元素传送到指定地点：

例如我们要实现一个挂载在`body`上的模态框，就可以使用`teleport`：

```javascript
const app = Vue.createApp({});

app.component('modal-button', {
  template: `
    <button @click="modalOpen = true">
        Open full screen modal! (With teleport!)
    </button>

    <teleport to="body">
      <div v-if="modalOpen" class="modal">
        <div>
          I'm a teleported modal! 
          (My parent is "body")
          <button @click="modalOpen = false">
            Close
          </button>
        </div>
      </div>
    </teleport>
  `,
  data() {
    return { 
      modalOpen: false
    }
  }
})

app.mount('#app')
```

[在`codepen`中查看](https://codepen.io/team/Vue/pen/gOPNvjR)

我们可以看到模态框是在`body`节点下方：

![image-20220712130007660](/imgs/oss/picGo/image-20220712130007660.png)

不仅仅如此，查看[`API`文档](https://v3.cn.vuejs.org/api/built-in-components.html#teleport)发现使用时可以在`to`传入任意查询选择器或 `HTMLElement`，还有一个默认的`disabled`参数来控制是否移动

> 这将移动实际的 DOM 节点，而不是被销毁和重新创建，并且它还将保持任何组件实例的活动状态。所有有状态的 HTML 元素 (即播放的视频) 都将保持其状态。

哪怕我们是传入`teleport to="head"`：

```vue
<script setup>
import { ref } from 'vue'
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'

const msg = ref('Hello Vue 3 + Vite')
</script>

<template>
  <teleport to="head">
    <title>哇哦</title>
  </teleport>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld v-model:msg.tostring="msg" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

其实际也会作用到`head`标签中