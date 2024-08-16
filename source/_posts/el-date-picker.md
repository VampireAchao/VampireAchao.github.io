---
title: el-date-picker
date: 2021-03-30 22:22:05
tags: 前端
---

> 但我拒绝！我岸边露伴最喜欢的事情之一，就是向那些自以为是的家伙说，NO！

> 但我拒绝！我岸边露伴最喜欢的事情之一，就是向那些自以为是的家伙说，NO！——岸边露伴

讲讲常用的[`el-date-picker`](https://element.eleme.cn/#/zh-CN/component/date-picker#ri-qi-ge-shi)属性

例如我们禁用今天前的日期，以及不让选择当前时间之前的时间点

```vue
      <el-date-picker
          v-model="date"
          type="datetime"
          @change="disableTime"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期时间"
          :picker-options="{disabledDate:(v)=>v.getTime() < new Date().getTime() - 86400000}"
          default-time="12:00:00">
      </el-date-picker>
```

然后是`data`

```js
data() {
    //这里存放数据
    return {
      date: ""
    }
}
```

以及`methods`

```js
  methods: {
    disableTime() {
      let parseDate = new Date(Date.parse(this.date));
      if (parseDate.getTime() < new Date().getTime()) {
        this.date = new Date()
      }
    }
  }
```

然后这里我们就只能选择当天之后的日期，以及选择时间如果小于当前时间，则会强制改为当前时间，可以根据具体情况自行调整

![image-20210330232221421](/imgs/oss/picGo/image-20210330232221421.png)