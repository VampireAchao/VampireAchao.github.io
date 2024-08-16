---
title: 纯css实现炫酷头像效果
date: 2024-01-15 20:45:21
tags: 前端
---

> 官僚作风是一门使可能变成不可能的艺术。——萨尔塞多

分享一个炫酷头像效果：

从`b`站渡一教育的一个视频看到的（不是推广，只是注明出处）

```html
<style>
  img {
    --s: 280px;
    --c1: #c02942;
    --c2: #ecd078;
    --b: 5px;
    --f: 1;
    --bgOption: content-box no-repeat center/ calc(100% / var(--f)) 100%;
    --shrink: calc((var(--s) / var(--f) - var(--s)) / 2 - var(--b));

    width: var(--s);
    height: var(--s);
    cursor: pointer;
    transition: 0.5s;
    padding-top: 100px;
    outline: var(--b) solid var(--c1);
    outline-offset: var(--shrink);
    border-radius: 0 0 999px 999px;
    transform: scale(var(--f));
    background: radial-gradient(
        circle closest-side,
        var(--c2) calc(99% - var(--b)),
        var(--c1) calc(100% - var(--b)),
        var(--c1) 99%,
        transparent 100%
      )
      var(--bgOption);
    mask: linear-gradient(#000 0 0) no-repeat center calc(0px - var(--shrink)) /
        calc(100% / var(--f) - 2 * var(--b)) 50%,
      radial-gradient(circle closest-side, #000 99%, transparent)
        var(--bgOption);
  }
  img:hover {
    --f: 1.35;
  }
</style>
<div class="avatar">
  <img src="img/head.png" />
</div>
```

觉得挺有意思，就写着玩了玩儿，可以看我现在头像的样子
