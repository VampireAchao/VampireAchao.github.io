---
title: vue-class-component
date: 2022-07-14 13:01:14
tags: 前端
---

> 人的教养不能够靠别人传授，人必须进行自我修养。一切苦修也绝不是文化修养，教育是通过人的主动性来实现的，教育牢牢地钉在主动性上。——费希特

官方文档：https://class-component.vuejs.org/

`class-component`是`vue`官方库之一，其可以让你使用`class`的方式定义、编写组件

再加上[`ts`的装饰器](https://VampireAchao.github.io/2022/06/21/ts%E8%A3%85%E9%A5%B0%E5%99%A8-%E6%B3%A8%E8%A7%A3/)，最终效果如下：

```vue
<template>
  <div>
    <button v-on:click="decrement">-</button>
    {{ count }}
    <button v-on:click="increment">+</button>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

// Define the component in class-style
@Component
export default class Counter extends Vue {
  // Class properties will be component data
  count = 0

  // Methods will be component methods
  increment() {
    this.count++
  }

  decrement() {
    this.count--
  }
}
</script>
```

同样，其可以配合`tsx`使用，这样就越来越像我们的`react`了

```vue
<script lang="tsx">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  count = 0;

  increment() {
    this.count++;
  }

  get twiceTheCounter() {
    return this.count * 2;
  }

  mounted() {
    console.log('mounted')
  }

  // Declare render function
  render() {
    return (
      <div>
        <div>{this.msg}</div>
        <p>You clicked {this.count} times</p>
        <p>{this.twiceTheCounter}</p>
        <button onClick={this.increment}>Click me</button>
      </div>)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
```

