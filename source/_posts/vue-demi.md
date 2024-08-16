---
title: vue-demi
date: 2023-08-16 21:49:05
tags: 前端
---

> 事物都是互相妥协的。就是冰山也会时而消融，时而重新凝聚。——爱默生

分享一个`vue`库

https://github.com/vueuse/vue-demi

用来解决编写的代码在`vue2`和`vue3`之间的兼容问题

安装：

```bash
npm i vue-demi
```

然后修改`package.json`，将`vue` 和`@vue/composition-api`添加到`peerDependencies`中

```json
{
  "dependencies": {
    "vue-demi": "latest"
  },
  "peerDependencies": {
    "@vue/composition-api": "^1.0.0-rc.1",
    "vue": "^2.0.0 || >=3.0.0"
  },
  "peerDependenciesMeta": {
    "@vue/composition-api": {
      "optional": true
    }
  },
  "devDependencies": {
    "vue": "^3.0.0" // or "^2.6.0" base on your preferred working environment
  },
}
```

使用时，就从`vue-demi`导

```javascript
import { ref, reactive, defineComponent } from 'vue-demi'
```

例如这个例子：

https://github.com/vueuse/vue-demi/blob/main/examples/%40vue-demi/use-mouse/src/index.ts

```javascript
import { ref, onMounted, onUnmounted } from 'vue-demi'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  const update = (e: MouseEvent) => {
    x.value = e.pageX
    y.value = e.pageY
  }

  onMounted(() => {
    window.addEventListener('mousemove', update)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })

  return {
    x,
    y
  }
}
```
