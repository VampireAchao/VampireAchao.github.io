---
title: vue挂载全局函数
date: 2020-09-06 19:24:20
tags: 前端
---

> 要是生活送了你一个柠檬，那你应该再要点盐与龙蛇兰。

首先在src下面建个`utils`包，创建个`index.js`

然后写上我们的全局函数

```javascript
//获取当前传入参数类型
export function getObjType(obj) {
    var toString = Object.prototype.toString
    var map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    }
    if (obj instanceof Element) {
        return 'element'
    }
    return map[toString.call(obj)]
}
export default { getObjType }
```

然后在`main.js`中引用并挂载全局

```javascript
import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import utils from '@/utils'



Vue.use(ElementUI)

Vue.config.productionTip = false
//挂载全局
Vue.prototype.$utils = utils


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
```

最后就可以使用了

```vue
<!--  -->
<template>
  <div class ref="message" @click="echoObjType">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="一致性 Consistency" name="1">
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </el-collapse-item>
      <el-collapse-item title="反馈 Feedback" name="2">
        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </el-collapse-item>
      <el-collapse-item title="效率 Efficiency" name="3">
        <div>简化流程：设计简洁直观的操作流程；</div>
        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
      </el-collapse-item>
      <el-collapse-item title="可控 Controllability" name="4">
        <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
        <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return { activeName: "1" };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    echoObjType() {
      var type = this.$utils.getObjType(666);
      console.log(type);
      type = this.$utils.getObjType("666");
      console.log(type);
      type = this.$utils.getObjType(["666", "666"]);
      console.log(type);
      type = this.$utils.getObjType({ number: 666 });
      console.log(type);
      type = this.$utils.getObjType(true);
      console.log(type);
      type = this.$utils.getObjType(function () {});
      console.log(type);
      type = this.$utils.getObjType(null);
      console.log(type);
      type = this.$utils.getObjType(undefined);
      console.log(type);
      type = this.$utils.getObjType(new Date());
      console.log(type);
      type = this.$utils.getObjType(/d/);
      console.log(type);
      type = this.$utils.getObjType(this.$refs.message);
      console.log(type);
    },
  },
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

打印结果

![image-20200906192336547](/imgs/oss/picGo/image-20200906192336547.png)

