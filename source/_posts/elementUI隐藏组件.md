---
title: elementUI隐藏组件
date: 2020-11-24 19:56:27
tags: 前端
---

> 追求使你充实，成功和失败都是伴奏。——史铁生

关于`ElementUI`相信大家只要看过我[这篇博客](https://VampireAchao.github.io/2020/09/05/vue%E7%BB%93%E5%90%88elementUI%E8%BF%9B%E8%A1%8C%E5%BF%AB%E9%80%9F%E5%BC%80%E5%8F%91/)，都能有一定的了解

今天聊聊[`ElementUI`官方文档](https://element.eleme.cn/#/zh-CN)都找不到的一个隐藏组件

那便是滚动条`el-scrollbar`

我们在开发中可能会用到数据量稍微多一点点的情况

例如我这里写的一个`v-for`

```vue
    <div style="width: 20%">
      <div v-for="(item, i) in tableData" :key="i">
        <div v-text="item.name"></div>
        <div v-text="item.name"></div>
        <div v-text="item.name"></div>
        <div v-text="item.name"></div>
        <div v-text="item.name"></div>
      </div>
    </div>
```

`tableData`为

![image-20201124200737876](/imgs/oss/picGo/image-20201124200737876.png)

![image-20201124200646170](/imgs/oss/picGo/image-20201124200646170.png)

如果我们想要加一个滚动条

就可以使用`el-scrollbar`

```vue
    <div style="width: 20%">
      <el-scrollbar style="height: 200px">
        <div v-for="(item, i) in tableData" :key="i">
          <div v-text="item.name"></div>
          <div v-text="item.name"></div>
          <div v-text="item.name"></div>
          <div v-text="item.name"></div>
          <div v-text="item.name"></div>
        </div>
      </el-scrollbar>
    </div>
```

加上后我们可以看到效果

![QQ录屏20201124200908](/imgs/oss/picGo/QQ%E5%BD%95%E5%B1%8F20201124200908.gif)

但下面有一个横着的滚动条，怎么去掉呢？我们可以打开浏览器控制台找到对应的`class`

![image-20201124201334173](/imgs/oss/picGo/image-20201124201334173.png)

可以看到`class`为`el-scrollbar__wrap`

我们就可以在下面使用样式穿透加上`css`样式，样式穿透可以看我[这篇博客](https://VampireAchao.github.io/2020/11/07/%E6%A0%B7%E5%BC%8F%E7%A9%BF%E9%80%8F/)了解

```vue
<style scoped lang="less">
/deep/ .cell {
  background-color: #9a9a9a;
  color: #ffffff;
}
/deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
```

可以看到样式穿透生效后，我们的样式改变了，丑哭的横向滚动条不在了

![image-20201124201600189](/imgs/oss/picGo/image-20201124201600189.png)
