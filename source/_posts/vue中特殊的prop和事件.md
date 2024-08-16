---
title: vue中特殊的prop和事件
date: 2022-04-03 20:46:56
tags: 前端
---

> 懒惰等于将一个人活埋。——泰勒

我们知道`v-model`可以用于`input`等标签，当做语法糖进行绑值

对于我们自定义的组件，其实也可以使用

[官方文档](https://cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model)

例如此处我们可以让`input`改变值时，父组件绑定的值一并改变

```vue
<template>
	<input
      type="checkbox"
      :checked="value"
      @change="$emit('input', $event.target.checked)"
    />
</template>
<script>
    export default{
        props:{
            value:{
                type:Boolean,
                default:()=>false
            }
        }
    }
</script>
```

父组件

```vue
<base-checkbox v-model="lovingVue"></base-checkbox>
```

当 `<base-checkbox>` 触发一个 `change` 事件并附带一个新的值的时候，这个 `lovingVue` 的 property 将会被更新

我们还可以使用`model`给这这个`v-model`绑定的`prop`和事件取别名：

```vue
<template>
	<input
      type="checkbox"
      :checked="checked"
      @change="$emit('change', $event.target.checked)"
    />
</template>
<script>
    export default{
        model: {
    		prop: 'checked',
		    event: 'change'
  		},
        props:{
            value:{
                checked: Boolean,
                default:()=> false
            }
        }
    }
</script>
```

此处用`v-bind:value`一样的效果

```vue
<base-checkbox :value="lovingVue"></base-checkbox>
```

