---
title: drag事件
date: 2022-04-23 18:47:22
tags: 前端
---

> 生活最沉重的负担不是工作，而是无聊。——罗曼·罗兰

首先是`MDN`：https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API

然后是代码：

```html
<!DOCTYPE html>
<html>
    <head>
        <style>
            .drop-container{
                width: 200px;
                height: 200px;
                border: 1px solid red;
                background: #eee;
            }
            
            .drag-ball{
                width:60px;
                height:60px;
                background: red;
                border-radius: 50%;
            }
        </style>
    </head>
    <body>
        
        <div class="drag-ball" draggable="true" ondragstart="dragstart(event)">
        </div>
        
        <div class="drop-container" ondrop="drop(event)" ondragover="dragover(event)" >
        </div>
        
    </body>
    <script>
        function dragstart(e){
            console.log("拖动开始啦",e)
        }
        function dragover(e){
            console.log("拖到了容器中",e)
            // 此处需要阻止默认，否则将不会触发drop事件
            e.preventDefault()
        }
        function drop(e){
            console.log("放到了容器中",e)
        }
    </script>
</html>
```

我们拖动一下，效果如下：

![image-20220422185021754](/imgs/oss/picGo/image-20220422185021754.png)