---
title: Navigator.clipboard
date: 2022-08-05 12:44:10
tags: 前端
---

> 人类侥幸拥有了智慧，就应该善用它。——王小波

惯例，`MDN`：https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/clipboard

注意该`API`只能在`https`或者本地开发环境生效

> 剪贴板 [Clipboard API](https://developer.mozilla.org/zh-CN/docs/Web/API/Clipboard_API) 为 **[`Navigator`](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator)** 接口添加了只读属性 **`clipboard`**，该属性返回一个可以读写剪切板内容的 [`Clipboard`](https://developer.mozilla.org/zh-CN/docs/Web/API/Clipboard) 对象。 在 Web 应用中，剪切板 API 可用于实现剪切、复制、粘贴的功能。
>
> 只有在用户事先授予网站或应用对剪切板的访问许可之后，才能使用异步剪切板读写方法。许可操作必须通过取得权限 [Permissions API](https://developer.mozilla.org/zh-CN/docs/Web/API/Permissions_API) 的 `"clipboard-read"` 和/或 `"clipboard-write"` 项获得。

我们来写一段代码：

```html
<body>
    <div class="cliptext"></div>
    <script>
        console.log(document.querySelector(".cliptext"))
        navigator.clipboard.readText().then(
            clipText => document.querySelector(".cliptext").innerText = clipText);

    </script>
</body>
```

效果：

![image-20220805124602206](/imgs/oss/picGo/image-20220805124602206.png)

允许以后剪贴板内容已经被成功渲染到页面上

![image-20220805124630066](/imgs/oss/picGo/image-20220805124630066.png)