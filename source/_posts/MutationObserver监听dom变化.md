---
title: MutationObserver监听dom变化
date: 2024-06-18 22:59:58
tags: 前端
---

> 人生意义到底是什么呢？吃得好一点，睡得好一点，多玩玩，不羡慕别人，不听管束，多储蓄人生经验，死而无憾，这就是最大的意义吧，一点也不复杂。—— 蔡澜《不如任性过生活》

mdn:

[MutationObserver.MutationObserver() - Web API | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver/MutationObserver)

[MutationObserver.observe() - Web API | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver/observe)

代码如下：

```javascript
    let app = document.querySelector("#app")
   var observerOptions = {
      attributes: true,     // 观察属性变动
      childList: true,      // 观察目标子节点的变化，是否有添加或删除
      subtree: true         // 观察后代节点，默认为false
   }
   // 创建一个DOM监听器，在DOM更新完成时触发
   let observer = new MutationObserver((mutationsList, observer)=>{
    
    // 取消监听
   observer.disconnect();
   })
    observer.observe(app,observerOptions)
```
