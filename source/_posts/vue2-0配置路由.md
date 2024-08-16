---
title: vue2.0配置路由
date: 2020-09-03 19:26:02
tags: 前端
---

> 古希腊哲学家芝诺的学生问他：“老师，难道你有不懂得的东西吗？”芝诺风趣地回答：“如果用小圆代表你们学到的知识，用大圆代表我学到的知识，那么大圆的面积是多一点；但两圆之外的空白，都是我们的无知面，圆越大，其圆周接触的无知面就越多。”

先说下端口配置吧

项目根目录下新建一个文件叫`vue.config.js`

![image-20200831220344053](/imgs/oss/picGo/image-20200831220344053.png)

```javascript
module.exports = {
    devServer: {
        port: 3000
    }
}
```

然后`npm run serve`运行项目，可以看到端口号变了

![image-20200831220433852](/imgs/oss/picGo/image-20200831220433852.png)

然后再配置个路由吧

```shell
cnpm i vue-router
```

![image-20200902214549843](/imgs/oss/picGo/image-20200902214549843.png)

在`main.js`中引入

```javascript
import Vue from 'vue'
import App from './App.vue'
import router from '@/router'



Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
```

![image-20200902221002438](/imgs/oss/picGo/image-20200902221002438.png)

然后在`src`下建一个`router`目录，里面再放一个`index.js`

![image-20200902221023015](/imgs/oss/picGo/image-20200902221023015.png)

```javascript
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        { path: '*', redirect: { name: '404' } },
        { path: '/', redirect: { name: 'home' } },
        { path: '/404', name: '404', component: resolve => require(['../views/common/404.vue'], resolve) },
        { path: '/home', name: 'home', component: resolve => require(['../views/sys/home.vue'], resolve) }
    ]
})
```

然后创建两个页面

![image-20200902221057303](/imgs/oss/picGo/image-20200902221057303.png)



主页面

```vue
<!--  -->
<template>
  <div class>Home</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
/* @import url(); 引入公共css类 */
</style>
```

以及`404`页面

```vue
<!--  -->
<template>
  <div>404</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
/* @import url(); 引入公共css类 */
</style>
```

然后修改App.vue

```vue
<template>
  <transition v-bind:css="false" name="fade">
    <router-view></router-view>
  </transition>
</template>

<script>
export default {};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
```

输入`npm run serve`运行

可以看到我们的路由生效了

访问`http://localhost:3000/`

可以看到跳转到了`http://localhost:3000/home`

![image-20200902221428425](/imgs/oss/picGo/image-20200902221428425.png)

访问不存在的页面`http://localhost:3000/ruben`

可以看到跳转到`404`页面了

![image-20200902221510328](/imgs/oss/picGo/image-20200902221510328.png)

路由配置就是这么简单啦