---
title: el-input-number阻止外层button的冒泡
date: 2021-04-02 22:41:12
tags: 前端
---

> 取法于上，仅得为中；取法于中，故为其下。一一李世民《帝范》

我这里有这样一个按钮

```vue
      <el-button @click="randomChoose" type="success" size="small">
        选择<el-input-number controls-position="right"></el-input-number>个
      </el-button>
```

效果如下

![image-20210402224858066](/imgs/oss/picGo/image-20210402224858066.png)

我们发现点击右边上下去增加减少中间个数的时候，也执行了我们上边按钮绑定的`randomChoose `函数

但我们想要加上[阻止冒泡](https://VampireAchao.github.io/2020/09/08/vue%E9%98%BB%E6%AD%A2%E9%BB%98%E8%AE%A4%E4%BA%8B%E4%BB%B6/)却加不上

这里其实。。需要在外层再加上一个`span`或者`div`标签，再到这个`span`标签上加上阻止冒泡才可以生效

```vue
      <el-button @click="randomChoose" type="success" size="small">
        选择
        <span @click.stop>
          <el-input-number controls-position="right"></el-input-number>
        </span>
        个
      </el-button>
```

这样我们点击上下小箭头的时候就不会触发上面`el-button`应该执行的函数啦！
