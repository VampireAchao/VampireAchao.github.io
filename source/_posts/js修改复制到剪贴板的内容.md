---
title: js修改复制到剪贴板的内容
date: 2022-07-24 13:54:02
tags: 前端
---

> 祝你今天愉快，你明天的愉快留着我明天再祝。——《爱你就像爱生命》

`MDN`：https://developer.mozilla.org/zh-CN/docs/Web/API/Element/copy_event

`demo`：

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>copy</title>
</head>

<body>
    <div id="copy">
        Hutool是一个小而全的Java工具类库，通过静态方法封装，降低相关API的学习成本，提高工作效率，使Java拥有函数式语言般的优雅，让Java语言也可以“甜甜的”。

        Hutool中的工具方法来自每个用户的精雕细琢，它涵盖了Java开发底层代码中的方方面面，它既是大型项目开发中解决小问题的利器，也是小型项目中的效率担当；
    </div>
    <script>
        var copy = document.getElementById('copy');
        copy.addEventListener('copy', (e) => {
            console.log({ e });
            e.clipboardData.setData('text/plain', 'Hello, world!');
            e.clipboardData.setData('text/html', '<b>Hello, world!</b>');
            e.preventDefault();
        })
    </script>
</body>
</html>
```

当我们复制上面的文本时，会被替换为`Hello, world!`