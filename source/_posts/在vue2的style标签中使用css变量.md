---
title: 在vue2的style标签中使用css变量
date: 2022-08-13 12:14:57
tags: 前端
---

> 我需要，最狂的风，和最静的海。——顾城《世界和我·第八个早晨》

前两天有一个更换主题需求，想将系统主题包括`hover`颜色都更换

代码如下：

```vue
<template>
  <!-- 需要绑定style -->
  <div class="hello" :style="css">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      themeColor: 'red'
    }
  },
  mounted() {
    setInterval(() => this.themeColor = "rgb(" + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 10) + ')', 100)
  },
  computed: {
    css() {
      const { themeColor } = this
      return {
        '--theme-color': themeColor
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
  transition: color 100ms;
}

a:hover {
  color: var(--theme-color)
}
</style>
```

可以试着把鼠标移动上去，会随机变色

