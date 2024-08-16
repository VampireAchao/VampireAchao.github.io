---
title: vueuse
date: 2023-04-15 23:01:16
tags: 前端
---

> 多数人在心底蔑视德，但很少有人轻视荣誉。——沃夫拿格

分享一个`vue`的组合式`api`封装库`vueuse`

`github`：https://github.com/vueuse/vueuse

![image-20230415230706292](/imgs/oss/blog/vampireachao/image-20230415230706292.png)

官档：https://vueuse.org/

![image-20230415230901946](/imgs/oss/blog/vampireachao/image-20230415230901946.png)

大致用法：

```javascript
import { useLocalStorage, useMouse, usePreferredDark } from '@vueuse/core'

export default {
  setup() {
    // tracks mouse position
    const { x, y } = useMouse()

    // is user prefers dark theme
    const isDark = usePreferredDark()

    // persist state in localStorage
    const store = useLocalStorage(
      'my-storage',
      {
        name: 'Apple',
        color: 'red',
      },
    )

    return { x, y, isDark, store }
  },
}
```

一些`Demo`

>- [Vite + Vue 3](https://github.com/vueuse/vueuse-vite-starter)
>- [Nuxt 3 + Vue 3](https://github.com/antfu/vitesse-nuxt3)
>- [Webpack + Vue 3](https://github.com/vueuse/vueuse-vue3-example)
>- [Nuxt 2 + Vue 2](https://github.com/antfu/vitesse-nuxt-bridge)
>- [Vue CLI + Vue 2](https://github.com/vueuse/vueuse-vue2-example)

