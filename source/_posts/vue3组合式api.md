---
title: vue3组合式api
date: 2022-07-11 13:51:05
tags: 前端
---

> 自由自由，多少罪恶假汝之名以行。——罗兰夫人

这个思想上有点类似流程控制框架，将一个组件中的多个关注点分离、抽取，然后能进一步复用、编排

官方文档：https://v3.cn.vuejs.org/guide/composition-api-introduction.html#%E4%BB%8B%E7%BB%8D

使用上来讲，就是编写的`api`方式变了，举个例子：

下面是我实际写的一个小组件

```vue
<script lang="tsx">
interface Props {
  msg: string;
  msgModifiers: {
    [key: string]: boolean;
  };
}
import { computed, onMounted, ref, Ref, toRefs, watch, } from 'vue'
export default {
  props: {
    msg: {
      type: String
    }
  },
  // 新的 setup 选项在组件被创建之前执行，一旦 props 被解析完成，它就将被作为组合式 API 的入口。
  setup(props: Props, { expose, emit }) {
    // ref 接收参数并将其包裹在一个带有 value property 的对象中返回，然后可以使用该 property 访问或更改响应式变量的值：
    const count: Ref<number> = ref(0)
	// 使用 `toRefs` 创建对 `props` 中的 `msg` property 的响应式引用
    const { msg } = toRefs(props)
    // 定义方法
    const increment = (event: MouseEvent) => ++count.value
    // 生命周期mounted
    onMounted(() => {
      console.log('mounted', { count })
    })
    // 监听
    watch(count, (newValue) => {
      if (count.value > 10) {
        count.value = 0
      }
      console.log('count changed', { newValue })
    })
    // 计算
    const twiceTheCounter = computed(() => count.value * 2)
    // 暴露方法，其中定义的 property 将可以被外部组件实例访问
    expose({
      increment
    })
    // setup 还可以返回一个渲染函数，该函数可以直接使用在同一作用域中声明的响应式状态：
    return () => (
      <div>
        <div>{msg.value}</div>
        <p>You clicked {count.value} times</p>
        <p>{twiceTheCounter.value}</p>
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



