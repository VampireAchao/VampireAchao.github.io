---
title: vue3侦听器
date: 2024-06-22 19:31:52
tags: 前端
---

> 君子不责人所不及，不强人所不能，不苦人所不好。——王通

官方文档

[侦听器 | Vue.js](https://cn.vuejs.org/guide/essentials/watchers.html)

写法有点不同

```vue
<script setup>
import { ref, watch } from 'vue'

const question = ref('')
const answer = ref('Questions usually contain a question mark. ;-)')
const loading = ref(false)

// 可以直接侦听一个 ref
watch(question, async (newQuestion, oldQuestion) => {
  if (newQuestion.includes('?')) {
    loading.value = true
    answer.value = 'Thinking...'
    try {
      const res = await fetch('https://yesno.wtf/api')
      answer.value = (await res.json()).answer
    } catch (error) {
      answer.value = 'Error! Could not reach the API. ' + error
    } finally {
      loading.value = false
    }
  }
})
</script>

<template>
  <p>
    Ask a yes/no question:
    <input v-model="question" :disabled="loading" />
  </p>
  <p>{{ answer }}</p>
</template>

```

这里如果是想侦听组件的`props`，则需要转换为`ref`

```javascript
import {ref, toRef, watch} from 'vue';

const props = defineProps({
	visible: Boolean,
});

let visible = toRef(props, 'visible');

watch(visible, async (newVisible, oldVisible) => {
	// 这里执行侦听后的结果
})
```
