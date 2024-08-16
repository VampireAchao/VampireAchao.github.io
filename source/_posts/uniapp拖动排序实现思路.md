---
title: uniapp拖动排序实现思路
date: 2021-10-13 18:13:15
tags: 前端
---

> 没有哪一个聪明人会否定痛苦与忧愁的锻炼价值。——赫胥黎

找到下载量最多这个组件

https://ext.dcloud.net.cn/plugin?id=1372

![image-20211013181445670](/imgs/oss/picGo/image-20211013181445670.png)

导入，不多说

![image-20211013181528611](/imgs/oss/picGo/image-20211013181528611.png)

文档示例：

> ## 使用示例
>
> 页面:
>
> ```
> 复制代码<template>
>     <view class="content">
>         <HM-dragSorts :list="list" :isLongTouch="true" :rowHeight="55" @change="change" @confirm="confirm" @onclick="onclick">
>             <template slot="rowContent" slot-scope="{ row }">
>                 <view class="row">
>                     <image v-if="row.icon" class="icon" :src="row.icon"></image>
>                     <text class="text">{{row.name}}</text>
>                 </view>
>             </template>
>         </HM-dragSorts> 
>     </view>
> </template>
> <style lang="scss" scoped>
>     //scoped css只在当前页生效 不影响子组件
>     page {background-color: #efeff4;}
>     @media (prefers-color-scheme: dark){page {background-color: #000000;} }
>     .content {.row{display: flex;flex-direction: row;align-items: center;.icon{width: 30px;border-radius: 6px;margin-right: 13px;}.text{font-size: 13px;}}}
> </style>
> ```
>
> script:
>
> ```
> 复制代码    import dragSorts from '@/uni_modules/components/HM-dragSorts/HM-dragSorts.vue' // 组件符合easycom规范，默认这个可以不写
>     export default {
>         components: {'HM-dragSorts':dragSorts},// 组件符合easycom规范，默认这个可以不写
>         data() {
>             return {
>                 list:[
>                     {"name": "花呗", "icon": "/static/img/1.png"},
>                     {"name": "余额宝","icon": "/static/img/2.png"},
>                     {"name": "账户余额","icon": "/static/img/3.png"},
>                     {"name": "交通银行信用卡(0001)""icon": "/static/img/4.png"},
>                     {"name": "中国建设银行信用卡(4401)","icon": "/static/img/5.png"},
>                     {"name": "网商储蓄卡(7223)","icon": "/static/img/6.png"}
>                 ]
>             }
>         },
>         methods: {
>             onclick(e){
>                 console.log('=== onclick start ===');
>                 console.log("被点击行: " + JSON.stringify(e.value));
>                 console.log("被点击下标: " + JSON.stringify(e.index));
>                 console.log('=== onclick end ===');
>             },
>             change(e){
>                 console.log('=== change start ===');
>                 console.log("被拖动行: " + JSON.stringify(e.moveRow));
>                 console.log('原始下标：',e.index);
>                 console.log('移动到：',e.moveTo);
>                 console.log('=== change end ===');
>             },
>             confirm(e){
>                 console.log('=== confirm start ===');
>                 console.log("被拖动行: " + JSON.stringify(e.moveRow));
>                 console.log('原始下标：',e.index);
>                 console.log('移动到：',e.moveTo);
>                 console.log('=== confirm end ===');
>             }
>         }
>     }
> ```

注意要稍微处理一下，找到它`drag.wxs`源码中隐藏列表对应行的位置，给它加一个`if`

![image-20211013181721460](/imgs/oss/picGo/image-20211013181721460.png)

否则在一些情况下会报错`hasClass`找不到

我们如果是开发对应功能，排序后还要将数组按照排好序的顺序进行修改

我们在`confirm`函数下写入如下代码：

```vue
			console.log('=== confirm start ===');
			console.log('被拖动行：' + JSON.stringify(e.moveRow));
			console.log('原始下标：', e.index);
			console.log('移动到：', e.moveTo);
			// 首先需要移除掉当前元素
			this.list.splice(e.index, 1);
			// 然后将当前元素给插入到对应的下标，splice函数yyds
			this.list.splice(e.moveTo, 0, e.moveRow);
			console.log('调整后的数据：' + JSON.stringify(this.list));
			// 赋值序号，保存到后端服务器
			/* this.batchSave(
				this.list.map((item, index) => {
					item.sort = index;
					return item;
				})
			); */
			console.log('=== confirm end ===');
```

这里用到的是[`splice`](https://VampireAchao.github.io/2021/05/15/splice/)函数，之前写的博客写漏了当第二个参数为`0`的情况
