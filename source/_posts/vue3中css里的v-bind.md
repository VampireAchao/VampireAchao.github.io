---
title: vue3中css里的v-bind
date: 2022-07-17 14:20:58
tags: 前端
---

> 一旦别人问起自己想要什么，那一刹那反倒什么都不想要了。——太宰治

官方文档：[状态驱动的动态 CSS](https://v3.cn.vuejs.org/api/sfc-style.html#%E7%8A%B6%E6%80%81%E9%A9%B1%E5%8A%A8%E7%9A%84%E5%8A%A8%E6%80%81-css)

编写一个组件：

```vue
<template>
    <div class="ruben">
        <p>You clicked {{ count }} times</p>
        <button @click="increment">Click me</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            count: 1
        }
    },
    methods: {
        increment() {
            this.count++
        }
    }
}
</script>

<style scoped>
.ruben {
    transform: scale(v-bind(count));
}
</style>
```

测试：

![image-20220717142506112](/imgs/oss/picGo/image-20220717142506112.png)