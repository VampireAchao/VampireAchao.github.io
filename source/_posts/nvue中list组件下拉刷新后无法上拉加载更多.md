---
title: nvue中list组件下拉刷新后无法上拉加载更多
date: 2021-12-08 20:43:50
tags: 前端
---

> 倘能生存，我当然仍要学习。——鲁迅

组件官网地址：https://uniapp.dcloud.io/component/list

今天在使用`list`组件时，发现下拉刷新一次后，就不能上拉加载更多了

最后发现官方文档：

> - `loadmore` 事件 如果列表滚动到底部将会立即触发这个事件，你可以在这个事件的处理函数中加载下一页的列表项。 如果未触发，请检查是否设置了loadmoreoffset的值，建议此值设置大于0
> - 如何重置 loadmore
>
> ```html
> <template>
>   <list ref="list">
>     <cell v-for="num in lists">
>       <text>{{num}}</text>
>     </cell>
>   </list>
> </template>
> 
> <script>
>   export default {
>     data () {
>       return {
>         lists: ['A', 'B', 'C', 'D', 'E']
>       }
>     },
>     methods: {
>         // 重置 loadmore
>         resetLoadMore() {
>             this.$refs["list"].resetLoadmore();
>         }
>     }
>   }
> </script>
> ```

这里有一句重置`loadmore`

尝试过调用`resetLoadmore`函数后就可以继续上拉加载更多了