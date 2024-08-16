---
title: js的Object.assign坑
date: 2021-04-19 20:39:11
tags: 前端
---

> 志当存高远。——诸葛亮

今天遇到一个坑

```vue
<template>
  <div>
    <el-form>
      <el-form-item>
        <el-input v-model="user.name"></el-input>
        <el-input v-model="user.age"></el-input>
        <el-input v-model="user.gender"></el-input>
        <el-button type="primary" @click="toYoung">点我</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {name: "achao", age: 20},
      info: {name: "ruben", age: 18, gender: "男"}
    }
  },
  created() {
    console.log(this.$route)
  },
  methods: {
    toYoung() {
      Object.assign(this.user, {name: "ruben", age: 18, gender: "男"})
      console.log(this.user)
    }
  },
}
</script>
```

这里可以看到

我们点击按钮后调用`toYoung`

里面执行了`Object.assign(this.user, {name: "ruben", age: 18, gender: "男"})`

这个函数是用后面的参数填充前面的参数

我们执行前页面如下

![image-20210419204318898](/imgs/oss/picGo/image-20210419204318898.png)

执行后

![image-20210419204329549](/imgs/oss/picGo/image-20210419204329549.png)

表面看上去好像`OK`

实际上我们在第三个`user.gender`的`input`框中输入值时发现输入不了！

这个`BUG`解决办法也很简单

改成这种方式就可以啦

```vue
      this.user = {
        ...this.user,
        ...{name: "ruben", age: 18, gender: "男"}
      }
```

