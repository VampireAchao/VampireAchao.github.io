---
title: popper.js定位提示和泡泡弹框
date: 2024-06-25 22:16:03
tags: 前端
---

> 烈火试真金，逆境试强者。——塞内加

https://popper.js.org/docs/v2/

分享一个定位工具提示和弹出窗口的库

例如

```html
<!DOCTYPE html>
<title>Popper example</title>

<style>
  #tooltip {
    background-color: #333;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 13px;
  }
</style>

<button id="button" aria-describedby="tooltip">I'm a button</button>
<div id="tooltip" role="tooltip">I'm a tooltip</div>

<script src="https://unpkg.com/@popperjs/core@2"></script>
<script>
  const button = document.querySelector('#button');
  const tooltip = document.querySelector('#tooltip');

  // Pass the button, the tooltip, and some options, and Popper will do the
  // magic positioning for you:
  Popper.createPopper(button, tooltip, {
    placement: 'right',
  });
</script>
```

它可以实现在页面底部不足展示时自动跳到上面去这种元素的封装，非常实用
