---
title: dialog标签
date: 2024-06-01 19:46:35
tags: 前端
---

> 懂得兜圈子，绕道而行的人，往往是第一个登上山峰的人。——佚名

今天分享一个`html`标签`dialog`

[&lt;dialog&gt;：对话框元素 - HTML（超文本标记语言） | MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/dialog)

这是一个`2022`年新增的新标签

说白了就是一个弹框

简单示例：

```html
<dialog open>
  <p>Greetings, one and all!</p>
  <form method="dialog">
    <button>OK</button>
  </form>
</dialog>
```

我们可以对齐增加一个动画：

代码出处：

[Animating &lt;dialog&gt;](https://codepen.io/wesbos/pen/vYwLYxa?editors=1100)

```html
<!-- 
  Transition or Animate a <dialog> Modal Open + closed state

  Problem: The browser display:none; → display:block; on <dialog> when the modal opens. This means we can't transiton between then.

Solitions?
1. Use an animation on [open] or :modal. This works on opening, but does not work when closing since its immediately display: none;
2. display:block; and then visually hide. This works, but now the modal is a focus trap. pointer-events and user-select help mouse events, but not keyboard

Is the only way to animate both IN and OUT to do a bunch of sequental class add + remove with JS?!

-->
<button onClick="window.dialog.showModal()">Open Dialog</button>

<dialog id="dialog">
  <h2>Hello</h2>
  <p>click the button or press esc to close</p>
  <input type="text" placeholder="Youy shouldnt be able to type in me until I'm open">
  <form method="dialog">
    <button type="submit">Close</button>
  </form>
</dialog>


```

动画：

```css

```
