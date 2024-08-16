---
title: js中classList的toggle
date: 2024-06-03 19:45:18
tags: 前端
---

> 当你身处逆境时不邀自来的人，才是真正的朋友。——奇奥佛垃斯塔

### 在 HTML 中实现白天和夜晚主题切换

在现代网页设计中，为用户提供不同的主题（如白天和夜晚模式）是一种常见且友好的用户体验优化方式。通过使用 JavaScript 和 CSS，我们可以轻松地实现这一功能。本文将详细讲解如何使用简单的 HTML、CSS 和 JavaScript 实现一个白天和夜晚主题切换功能。

#### 实现步骤

1. **基本 HTML 结构**：
   首先，我们需要创建一个基本的 HTML 结构，包括一个按钮用于切换主题。

2. **CSS 样式**：
   接下来，我们定义白天和夜晚模式的样式。默认情况下，页面为白天模式。

3. **JavaScript 功能**：
   最后，通过 JavaScript 实现点击按钮切换主题的功能。

#### 代码示例

以下是完整的代码示例：

```html
<!DOCTYPE html>
<html>
<head>
    <title>Day-Night Toggle</title>
    <style>
        body {
            background-color: #f0f0f0;
            color: #333;
        }
        .night {
            background-color: #333;
            color: #f0f0f0;
        }
    </style>
</head>
<body>
    <h1>Day-Night Toggle</h1>
    <button onclick="toggleTheme()">Toggle</button>

    <script>
        function toggleTheme() {
            const body = document.body;
            body.classList.toggle('night');
        }
    </script>
</body>
</html>
```

#### 代码解析

1. **HTML 结构**：
   
   - `<h1>` 标签用于显示标题。
   - `<button>` 按钮用于触发主题切换。

2. **CSS 样式**：
   
   - 默认情况下，`body` 的背景颜色为浅灰色，文本颜色为深灰色，表示白天模式。
   - `.night` 类定义了夜晚模式的样式，背景颜色为深灰色，文本颜色为浅灰色。

3. **JavaScript 功能**：
   
   - `toggleTheme` 函数通过 `classList.toggle` 方法切换 `body` 元素的 `night` 类，从而实现主题切换。

#### 更多资源

- 想了解更多关于 `classList.toggle` 的使用，请访问 [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList#methods)。
- 学习更多关于 CSS 选择器和样式的知识，请访问 [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/CSS).

#### 总结

通过以上简单的步骤，我们就实现了一个基本的白天和夜晚主题切换功能。这种功能可以显著提升用户体验，特别是在不同光照环境下使用设备时。希望这篇文章对你有所帮助，更多内容请访问 [我的博客](https://vampireachao.github.io/)。
