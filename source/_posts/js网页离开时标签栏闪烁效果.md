---
title: js网页离开时标签栏闪烁效果
date: 2020-08-28 21:21:45
tags: 前端
---

之前有朋友问我博客里浏览器标签栏闪烁效果怎么做的

今天把代码贴出来吧

```javascript
// 使用message对象封装消息
        var message = {
            time: 0,
            title: document.title,
            timer: null,
            // 显示新消息提示
            show: function () {
                var title = message.title.replace("【　　　】", "").replace("【新消息】", "");
                // 定时器，设置消息切换频率闪烁效果就此产生
                message.timer = setTimeout(function () {
                    message.time++;
                    message.show();
                    if (message.time % 2 == 0) {
                        document.title = "【新消息】" + title
                    } else {
                        document.title = "【　　　】" + title
                    };
                }, 600);
                return [message.timer, message.title];
            },
            // 取消新消息提示
            clear: function () {
                clearTimeout(message.timer);
                document.title = message.title;
            }
        };
        var hiddenProperty = 'hidden' in document ? 'hidden' :
            'webkitHidden' in document ? 'webkitHidden' :
                'mozHidden' in document ? 'mozHidden' : null;
        var title = document.querySelector('title');
        var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
        var onVisibilityChange = function () {
            if (!document[hiddenProperty]) {
                message.clear()
            } else {
                message.show()
            }
        }
        document.addEventListener(visibilityChangeEvent, onVisibilityChange);
```

