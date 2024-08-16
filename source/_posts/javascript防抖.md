---
title: javascript防抖
date: 2020-08-04 20:33:28
tags: 前端
---

`JavaScript`防抖：用于防止重复表单提交等场景

点击一次后，执行防抖函数`antiShake`，按钮设置为不可用状态，开始计时，计时结束移除不可用状态

```html
<button onclick="antiShake(this)">防抖测试</button>
    <script type="application/javascript">
        function antiShake(dom) {
            dom.setAttribute("disabled", "disabled");
            setTimeout(() => {
                dom.removeAttribute("disabled");
            }, 3000);
        }
    </script>
```

顺带聊聊

```javascript
//计时器清零,参数需传入计时器的返回值
clearTimeout();
```