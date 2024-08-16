---
title: flex布局
date: 2021-12-19 20:17:09
tags: 前端
---

> 他想给M打一个电话，告诉她，他要回家了。不再回来了。最后他只是发了短信道：“M，我不爱你，从来没有爱过，因为我心里装着别人。”窗外掠过的景，就好像他的泪一样，总是一闪而过。——灵遁者

`flex`布局是开发中最常用的布局之一

[阮一峰的`flex`布局教程](https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

下方摘自`uniapp`官方文档[`flex`布局](https://uniapp.dcloud.io/nvue-css?id=flexbox)一栏

> ## [Flexbox](https://uniapp.dcloud.io/nvue-css?id=flexbox)
>
> ### [Flex 容器](https://uniapp.dcloud.io/nvue-css?id=flex-容器)
>
> Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。
>
> nvue布局模型基于 CSS Flexbox，以便所有页面元素的排版能够一致可预测，同时页面布局能适应各种设备或者屏幕尺寸。Flexbox 包含 flex 容器和 flex 成员项。如果一个nvue元素可以容纳其他元素，那么它就成为 flex 容器。
>
> > 文档中未说明的 flexbox 属性**均不支持**：如 `order`、`flex-grow` 、`flex-shrink` 、 `flex-basis`、`align-content`、`align-self` 等。
>
> **在 nvue中，Flexbox 是默认且唯一的布局模型，所以你不需要手动为元素添加 `display: flex;` 属性。**
>
> ### [flex-direction](https://uniapp.dcloud.io/nvue-css?id=flex-direction)
>
> 定义了 flex 容器中 flex 成员项的排列方向，默认值为 `column`
>
> | 可选值         | 描述                                            |
> | -------------- | ----------------------------------------------- |
> | column         | 竖排，从上到下排列                              |
> | column-reverse | 反向竖排，排布方向与`flex-direction:column`相反 |
> | row            | 横排，从左到右排布                              |
> | row-reverse    | 反向横排，排布方向与`flex-direction:row`相反    |
>
> ### [flex-wrap](https://uniapp.dcloud.io/nvue-css?id=flex-wrap)
>
> 决定了 flex 成员项在一行还是多行分布，默认值为`nowrap`
>
> | 可选值       | 描述                                                         |
> | ------------ | ------------------------------------------------------------ |
> | nowrap       | 不换行，flex 成员项在一行排布，排布的开始位置由direction指定 |
> | wrap         | 换行，第一行在上方，flex 成员项在多行排布，排布的开始位置由direction指定 |
> | wrap-reverse | 换行，第一行在下方，行为类似于`wrap`，排布方向与其相反       |
>
> ### [justify-content](https://uniapp.dcloud.io/nvue-css?id=justify-content)
>
> 定义了 flex 容器中 flex 成员项在主轴方向上如何排列以处理空白部分。默认值为 `flex-start`
>
> | 可选值        | 描述                                                         |
> | ------------- | ------------------------------------------------------------ |
> | flex-start    | 左对齐，所有的 flex 成员项都排列在容器的前部                 |
> | flex-end      | 右对齐，则意味着成员项排列在容器的后部                       |
> | center        | 居中，即中间对齐，成员项排列在容器中间、两边留白             |
> | space-between | 两端对齐，空白均匀地填充到 flex 成员项之间                   |
> | space-around  | 表示 flex 成员项两侧的间隔相等，所以，成员项之间的间隔比成员项与边框的间隔大一倍 |
>
> ![图片描述文字](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-dc-site/9610d190-2f17-11eb-97b7-0dc4655d6e68.png)
>
> ### [align-items](https://uniapp.dcloud.io/nvue-css?id=align-items)
>
> 定义了 flex 容器中 flex 成员项在纵轴方向上如何排列以处理空白部分。默认值为 stretch。
>
> | 可选值     | 描述                                 |
> | ---------- | ------------------------------------ |
> | stretch    | 即拉伸高度至 flex 容器的大小         |
> | flex-start | 上对齐，所有的成员项排列在容器顶部   |
> | flex-end   | 下对齐，所有的成员项排列在容器底部   |
> | center     | 中间对齐，所有成员项都垂直地居中显示 |
>
> ![图片描述文字](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-dc-site/ad305030-2f17-11eb-b680-7980c8a877b8.png)
>
> ### [flex](https://uniapp.dcloud.io/nvue-css?id=flex)
>
> flex 属性定义了 flex 成员项可以占用容器中剩余空间的大小。 flex {number}：值为 number 类型。
>
> - 如果所有的成员项设置相同的值 flex: 1，它们将平均分配剩余空间。
> - 经常用作自适应布局，将父容器的display：flex，侧边栏大小固定后，将内容区flex：1，内容区则会自动放大占满剩余空间。
> - 如果一个成员项设置的值为 flex: 2，其它的成员项设置的值为 flex: 1，那么这个成员项所占用的剩余空间是其它成员项的 2 倍。
>
> **注意**
>
> **Flex 成员项暂不支持 `flex-shrink` 、 `flex-basis`、`align-content` 属性**。
>
> **该属性不支持 flex: flex-grow | flex-shrink | flex-basis 的简写。**
>
> ```html
>     //Gird布局
>     <template>
>         <view>
>             <view v-for="(v, i) in list" class="row">
>                 <view v-for="(text, k) in v" class="item">
>                     <view>
>                         <text>{{text}}</text>
>                     </view>
>                 </view>
>             </view>
>         </view>
>     </template>
>     <script>
>         export default {
>             data() {
>                 return {
>                     list: [
>                         ['A', 'B', 'C'],
>                         ['D', 'E', 'F'],
>                         ['G', 'H', 'I']
>                     ]
>                 }
>             }
>         }
>     </script>
>     <style scoped>
>     .row {
>         flex-direction: row;
>         height: 80px;
>     }
>     .item {
>         flex: 1;
>         justify-content: center;
>         align-items: center;
>         border-width: 1;
>         border-style: solid;
>         border-color: #FFFFFF;
>         background-color: #00AAFF;
>     }
>     </style>
>     //等高模块
>     <template>
>       <view>
>         <view style="width:300px; height:100px;">
>           <view style="flex: 1;background-color:blue"></view>
>           <view style="flex: 1;background-color:red"></view>
>           <view style="flex: 1;background-color:yellow"></view>
>         </view>
>       </view>
>     </template>
> ```