---
title: vue查看组件
date: 2024-06-07 20:23:26
tags: 前端
---

> 人死像熟透的梨，离树而落，梨者，离也。——《活着》

最近在折腾 Vue.js，发现了一个挺有意思的东西，叫 `Vue.options.components`。先来个大概的解释，这货就是 Vue.js 用来存储全局组件的一个对象。每次你注册个全局组件，它就会乖乖地跑到 `Vue.options.components` 里去。

#### 什么是 Vue.options.components？

简单说，`Vue.options.components` 就是 Vue.js 全局组件的家。你每次用 `Vue.component` 注册个组件，它就会被扔进这个家里，然后你在任何地方都能用到它。感觉像是个全局变量，不过是专门为组件准备的。

#### 全局注册组件

先来个全局注册组件的例子吧，感觉这个比较好理解：

```javascript
Vue.component('my-component', {
  template: '<div>这是一个自定义组件！</div>'
});
```

这个时候，你可以通过 `Vue.options.components` 看到你刚才注册的组件：

```javascript
console.log(Vue.options.components);
// 输出：{ my-component: { ... } }
```

#### 用全局组件

全局组件注册好了，当然得用啊，不然白注册了。来看看怎么用：

```html
<div id="app">
  <my-component></my-component>
</div>

<script>
new Vue({
  el: '#app'
});
</script>
```

简单吧？就这么用。

#### 局部注册组件

当然，你也可以选择局部注册，这样不会污染全局命名空间：

```javascript
const MyComponent = {
  template: '<div>这是一个局部组件！</div>'
};

new Vue({
  el: '#app',
  components: {
    'my-component': MyComponent
  }
});
```

这种方式下，`Vue.options.components` 是看不到这个组件的，因为它只是局部的。

#### 动态获取和使用组件

有时候，可能需要动态获取全局组件，这个时候就可以直接从 `Vue.options.components` 拿：

```javascript
const componentName = 'my-component';
const MyComponent = Vue.options.components[componentName];

new Vue({
  el: '#app',
  components: {
    [componentName]: MyComponent
  }
});
```

这样就可以动态使用了。

#### 使用场景

- **插件开发**：如果你在开发 Vue.js 插件，用 `Vue.options.components` 可以检查和注册全局组件。
- **动态组件系统**：构建动态组件系统时，通过 `Vue.options.components` 可以动态加载和渲染组件。

#### 小结

总结一下，`Vue.options.components` 其实就是个全局组件仓库，让你可以方便地注册和使用全局组件。搞清楚它的用法之后，会发现很多时候开发起来方便多了。

---

更多内容请访问我的 [博客](https://vampireachao.github.io/)。

#### 参考资料

- [Vue.js 官方文档 - 组件注册](https://vuejs.org/v2/guide/components-registration.html)
- [MDN 文档 - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
