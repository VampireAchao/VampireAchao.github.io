---
title: echarts入门
date: 2021-09-04 21:00:02
tags: 前端
---

> 社会犹如一条船,每个人都要有掌舵的准备——易卜生

根据[官方文档](https://echarts.apache.org/zh/tutorial.html#5%20%E5%88%86%E9%92%9F%E4%B8%8A%E6%89%8B%20ECharts)入门`echarts`：

首先我们先引入`cdn`

```html
<script src="https://cdn.jsdelivr.net/npm/echarts@5.2.0/dist/echarts.min.js"></script>
```

然后为 `ECharts` 准备一个具备大小（宽高）的 DOM

```html
<!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
<div id="main" style="width: 600px;height:400px;"></div>
```

然后就是`JavaScript`代码了

先基于准备好的`dom`，初始化`echarts`实例

```javascript
var myChart = echarts.init(document.getElementById('main'));
```

接下来指定图表的配置项和数据

```javascript
// 指定图表的配置项和数据
var option = {
    title: {
        text: 'ECharts 入门示例'
    },
    tooltip: {},
    legend: {
        data: ['销量']
    },
    xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]
};
```

最后使用刚指定的配置项和数据显示图表

```javascript
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
```

最后效果如下

![image-20210904215211788](/imgs/oss/picGo/image-20210904215211788.png)

