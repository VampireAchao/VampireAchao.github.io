---
title: js让光标选择节点中部分文本
date: 2022-07-01 13:32:35
tags: 前端
---

> 我走得很慢，但我从不后退。——林肯

如题，代码：

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title></title>
</head>

<body>
    <div id="container">ruben</div>
    <button>r</button>
    <button>u</button>
    <button>b</button>
    <button>e</button>
    <button>n</button>
    <button>ALL</button>
    <script>
        // 获取所有按钮
        document.querySelectorAll("button").forEach(btn => {
            // 给按钮绑定点击事件
            btn.addEventListener('click', function(event) {
                // 获取按钮内的文本
                const btnText = event.target.textContent
                // 获取需要选中的节点
                const container = document.querySelector("#container")
                // 获取节点内文本
                const contentText = container.textContent
                // 获取selection对象
                const selection = window.getSelection()
                // 移除上次选择结果
                selection.removeAllRanges()
                // 创建范围对象
                const range = document.createRange()
                if (contentText.includes(btnText)) {
                    // 如果节点文本包含按钮内文本，就获取节点中的文本节点
                    const textNode = container.firstChild
                    // 获取 按钮内文本 在 节点文本 中 文本节点 的下标
                    const offsetStart = contentText.indexOf(btnText)
                    // 设置范围起始点
                    range.setStart(textNode, offsetStart)
                    // 设置范围结束点
                    range.setEnd(textNode, offsetStart + btnText.length)
                } else {
                    // 如果内容不包含按钮中的内容，就直接选中整个节点
                    range.selectNode(container)
                }
                // 选中范围
                selection.addRange(range)
            })
        })
    </script>
</body></html>
```

效果：

![range-selection](/imgs/oss/picGo/range-selection.gif)

`Range`的`MDN`：https://developer.mozilla.org/zh-CN/docs/Web/API/Range/setStart

> # Range.setStart()
>
> 
>
> 
>
>  **`Range.setStart()`** 方法用于设置 [`Range`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range)的开始位置。
>
> 如果起始节点类型是 `Text`、`Comment` 或 `CDATASection`之一，那么 `startOffset` 指的是从起始节点算起字符的偏移量。 对于其他 `Node` 类型节点，`startOffset` 是指从起始结点开始算起子节点的偏移量。
>
>  如果设置的起始位点在结束点之下（在文档中的位置），将会导致选区折叠，起始点和结束点都会被设置为指定的起始位置。

`Selection`的`MDN`：https://developer.mozilla.org/zh-CN/docs/Web/API/Selection