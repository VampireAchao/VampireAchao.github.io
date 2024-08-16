---
title: konva实现双击编辑富文本
date: 2022-06-29 13:08:04
tags: 前端
---

> 那一天我二十一岁，在我一生的黄金时代，我有好多奢望。我想爱，我想吃，我想在一瞬间变成天上半明半暗的云。——《黄金时代》

完整代码放到了：https://gitee.com/VampireAchao/simple-konva-html

主要是这个文件

https://gitee.com/VampireAchao/simple-konva-html/blob/master/richtext-dragable.html

思路来源：https://konvajs.org/docs/sandbox/Rich_Text.html

主要思路：

1.双击时创建(我这里是隐藏显示再定位)富文本`dom`节点

2.通过[htmlToCanvas](https://VampireAchao.github.io/2022/06/22/htmlToCanvas/)转换`html`为`canvas`

3.使用`Konva.Image`渲染

效果还是蛮不错的，能做[polotno](https://polotno.com/)的类似案例

<iframe src="https://codesandbox.io/embed/github/polotno-project/polotno-site/tree/source/examples/polotno-demo?fontsize=11&amp;hidenavigation=1&amp;theme=dark&amp;view=preview" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
