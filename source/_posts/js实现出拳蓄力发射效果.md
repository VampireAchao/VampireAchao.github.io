---
title: js实现出拳蓄力发射效果
date: 2024-02-13 22:35:52
tags: 前端
---

> 贤妻和健康是一个男子最宝贵的财富。——斯珀吉翁

分享一个蓄力出拳的特效

<iframe src="https://codepen.io/vampireachao/pen/abMQZPG"/>

这个效果放到了`codepen`里

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>蓄力发射拳头</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<div id="rocket-container">
  <div id="rocket">✊</div>
  <div id="shockwave" style="display: none;"></div> <!-- 新增冲击波元素 -->
</div>
<button id="launch-button">出拳</button>

<script src="script.js"></script>
</body>
</html>
```

`css`

```css
body, html {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

#rocket-container {
  position: relative; /* 容器相对定位 */
}

#rocket {
  font-size: 50px;
  opacity: 1;
}

#shockwave {
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba(255, 255, 0, 0.5); /* 模拟冲击波颜色 */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0); /* 初始化变换 */
  display: none; /* 初始不显示 */
}

@keyframes charge {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0.5; transform: translateY(50px); }
}

@keyframes launch {
  from { opacity: 0.5; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(-100px); }
}

@keyframes shockwaveAnimation {
  from { transform: translate(-50%, -50%) scale(0); opacity: 1; }
  to { transform: translate(-50%, -50%) scale(4); opacity: 0; }
}

```

`javascript`

```javascript

```
