---
title: CompositionEvent
date: 2022-05-18 12:59:51
tags: 前端
---

> 业余生活要有意义，不要越轨。——华盛顿

分享一个输入法事件：[`CompositionEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/CompositionEvent)

这个事件只在用户间接输入文本（如使用输入法）时触发：

例如下面这个例子：

```html
<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>

<body>
    <div class="control">
        <label for="name">On macOS, click in the textbox below,<br> then type <kbd>option</kbd> + <kbd>`</kbd>, then <kbd>a</kbd>:</label>
        <input type="text" id="example" name="example">
    </div>

    <div class="event-log">
        <label>Event log:</label>
        <textarea readonly class="event-log-contents" rows="8" cols="25"></textarea>
        <button class="clear-log">Clear</button>
    </div>
    <script>
        const inputElement = document.querySelector('input[type="text"]');
        const log = document.querySelector('.event-log-contents');
        const clearLog = document.querySelector('.clear-log');

        clearLog.addEventListener('click', () => {
            log.textContent = '';
        });

        function handleEvent(event) {
            log.textContent = log.textContent + `${event.type}: ${event.data}\n`;
        }

        inputElement.addEventListener('compositionstart', handleEvent);
        inputElement.addEventListener('compositionupdate', handleEvent);
        inputElement.addEventListener('compositionend', handleEvent);
    </script>
</body>
</html>
```

![image-20220518130432253](/imgs/oss/picGo/image-20220518130432253.png)

使用输入法进行输入时就会触发

![image-20220518130527714](/imgs/oss/picGo/image-20220518130527714.png)

如果不使用输入法输入，则不会触发

![image-20220518130614694](/imgs/oss/picGo/image-20220518130614694.png)